import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import User from "../../models/authModel/userModels.js";
import Announcement from "../../models/announcmentModel/Announcment.js";
import Notification from "../../models/announcmentModel/notfication.js";

export const createAnnouncement = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, department } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title || !content || !department) {
      return res.status(400).json({ message: "title, content and department are required" });
    }

    const announcement = await Announcement.create({
      title,
      content,
      department,
      createdBy: userId
    });

    const students = await User.find({ department });

    const notifications = students.map(student => ({
      user: student._id,
      title: "New Announcement",
      message: title,
      type: "announcement",
      referenceId: announcement._id
    }));

    await Notification.insertMany(notifications);

    res.status(201).json(announcement);

  } catch (error:any) {
    res.status(500).json({ message: "Failed to create announcement",  error: error.message });
  }
};

export const getAnnouncements = async (req: AuthRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = String(req.query.search || "");
    const department = req.query.department as string | undefined;

    let filter: any = {
      title: { $regex: search, $options: "i" }
    };

    if (department) filter.department = department;

    const announcements = await Announcement.find(filter)
      .populate("createdBy", "name")
      .populate("department", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Announcement.countDocuments(filter);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      announcements
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch announcements" });
  }
};
