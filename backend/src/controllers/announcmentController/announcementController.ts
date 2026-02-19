import { Request, Response } from "express";
import User from "../../models/authModel/userModels.js";
import Announcement from "../../models/announcmentModel/Announcment.js";
import Notification from "../../models/announcmentModel/notfication.js";
import MarketplaceItem from "../../models/commerceModel/MarketplaceItem.js";




export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const { title, content, department } = req.body;

    const announcement = await Announcement.create({
      title,
      content,
      department,
      createdBy: req.user.id
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

  } catch (error) {
    res.status(500).json({ message: "Failed to create announcement" });
  }
};

export const getItems = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const category = req.query.category;
    const department = req.query.department;

    let filter: any = {
      isActive: true,
      isSold: false,
      title: { $regex: search, $options: "i" }
    };

    if (category) filter.category = category;
    if (department) filter.department = department;

    const items = await MarketplaceItem.find(filter)
      .populate("createdBy", "name")
      .populate("department", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await MarketplaceItem.countDocuments(filter);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      items
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
};