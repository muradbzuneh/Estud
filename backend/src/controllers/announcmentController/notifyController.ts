import { Request, Response } from "express";
import Notification from "../../models/announcmentModel/notfication.js";
import User from "../../models/authModel/userModels.js";


export const getMyNotifications = async (req: Request, res: Response) => {
  const notifications = await Notification.find({
    user: req.User._id
  }).sort({ createdAt: -1 });

  res.json(notifications);
  
const count = await Notification.countDocuments({
  user: req.user._id,
  isRead: false
});
};