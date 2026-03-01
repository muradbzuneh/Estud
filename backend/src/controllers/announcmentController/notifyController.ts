import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import Notification from "../../models/announcmentModel/notfication.js";

// Get user's notifications
export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const unreadCount = await Notification.countDocuments({
      user: userId,
      isRead: false
    });

    const total = await Notification.countDocuments({ user: userId });

    res.json({
      notifications,
      unreadCount,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error: any) {
    res.status(500).json({ 
      message: "Failed to fetch notifications", 
      error: error.message 
    });
  }
};

// Mark notification as read
export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: userId },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({
      message: "Notification marked as read",
      notification
    });

  } catch (error: any) {
    res.status(500).json({ 
      message: "Failed to update notification", 
      error: error.message 
    });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    await Notification.updateMany(
      { user: userId, isRead: false },
      { isRead: true }
    );

    res.json({ message: "All notifications marked as read" });

  } catch (error: any) {
    res.status(500).json({ 
      message: "Failed to update notifications", 
      error: error.message 
    });
  }
};

// Delete notification
export const deleteNotification = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const notification = await Notification.findOneAndDelete({
      _id: id,
      user: userId
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification deleted successfully" });

  } catch (error: any) {
    res.status(500).json({ 
      message: "Failed to delete notification", 
      error: error.message 
    });
  }
};
