import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import User from "../../models/authModel/userModels.js";
import Announcement from "../../models/announcmentModel/Announcment.js";
import Notification from "../../models/announcmentModel/notfication.js";
import ReadStatus from "../../models/announcmentModel/ReadStatus.js";

// FR-4, FR-5: Admin creates announcements with target groups
export const createAnnouncement = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, targetGroup, department, expiresAt, isImportant } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title || !content || !targetGroup || !expiresAt) {
      return res.status(400).json({ 
        message: "title, content, targetGroup, and expiresAt are required" 
      });
    }

    // Validate targetGroup
    if (!["UNIVERSITY", "DEPARTMENT", "CLASS"].includes(targetGroup)) {
      return res.status(400).json({ 
        message: "targetGroup must be UNIVERSITY, DEPARTMENT, or CLASS" 
      });
    }

    // Validate department for DEPARTMENT/CLASS target
    if ((targetGroup === "DEPARTMENT" || targetGroup === "CLASS") && !department) {
      return res.status(400).json({ 
        message: "department is required for DEPARTMENT or CLASS target" 
      });
    }

    // Handle uploaded image
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const announcement = await Announcement.create({
      title,
      content,
      image,
      targetGroup,
      department: targetGroup !== "UNIVERSITY" ? department : undefined,
      expiresAt: new Date(expiresAt),
      isImportant: isImportant || false,
      createdBy: userId
    });

    // Create notifications based on target group
    let targetUsers;
    if (targetGroup === "UNIVERSITY") {
      targetUsers = await User.find({ role: "STUDENT" });
    } else {
      targetUsers = await User.find({ 
        role: "STUDENT",
        departmentId: department 
      });
    }

    const notifications = targetUsers.map(student => ({
      user: student._id,
      title: "New Announcement",
      message: title,
      type: "announcement",
      referenceId: announcement._id
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      message: "Announcement created successfully",
      announcement
    });

  } catch (error: any) {
    res.status(500).json({ 
      message: "Failed to create announcement", 
      error: error.message 
    });
  }
};

// FR-6, FR-7: Students view announcements with filters and read status
export const getAnnouncements = async (req: AuthRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = String(req.query.search || "");
    const category = req.query.category as string | undefined;
    const userId = req.userId;

    // FR-7: Filter out expired announcements
    let filter: any = {
      isActive: true,
      expiresAt: { $gte: new Date() },
      title: { $regex: search, $options: "i" }
    };

    // Filter by category (targetGroup)
    if (category) {
      filter.targetGroup = category;
    }

    // Get user's department for filtering
    const user = await User.findById(userId);
    if (user && user.role === "STUDENT") {
      filter.$or = [
        { targetGroup: "UNIVERSITY" },
        { targetGroup: "DEPARTMENT", department: user.departmentId },
        { targetGroup: "CLASS", department: user.departmentId }
      ];
    }

    const announcements = await Announcement.find(filter)
      .populate("createdBy", "name")
      .populate("department", "name")
      .sort({ isImportant: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get read status for each announcement
    const readStatuses = await ReadStatus.find({
      user: userId,
      announcement: { $in: announcements.map(a => a._id) }
    });

    const readAnnouncementIds = new Set(
      readStatuses.map(rs => rs.announcement.toString())
    );

    const announcementsWithStatus = announcements.map(announcement => ({
      ...announcement.toObject(),
      isRead: readAnnouncementIds.has(announcement._id.toString())
    }));

    const total = await Announcement.countDocuments(filter);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      announcements: announcementsWithStatus
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch announcements" });
  }
};

// Get single announcement and mark as read
export const getAnnouncementById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const announcement = await Announcement.findById(id)
      .populate("createdBy", "name email")
      .populate("department", "name");

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    // Mark as read
    await ReadStatus.findOneAndUpdate(
      { user: userId, announcement: id },
      { user: userId, announcement: id, readAt: new Date() },
      { upsert: true, new: true }
    );

    res.json(announcement);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch announcement" });
  }
};

// Update announcement
export const updateAnnouncement = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Handle uploaded image
    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }

    const announcement = await Announcement.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json({
      message: "Announcement updated successfully",
      announcement
    });

  } catch (error: any) {
    res.status(500).json({ 
      message: "Failed to update announcement", 
      error: error.message 
    });
  }
};

// Delete announcement
export const deleteAnnouncement = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await Announcement.findByIdAndUpdate(id, { isActive: false });

    res.json({ message: "Announcement deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete announcement" });
  }
};
