import express from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { 
  getNotifications, 
  markAsRead, 
  markAllAsRead,
  deleteNotification
} from "../../controllers/announcmentController/notifyController.js";

const router = express.Router();

// Get user's notifications
router.get("/", authenticate, getNotifications);

// Mark single notification as read
router.patch("/:id/read", authenticate, markAsRead);

// Mark all notifications as read
router.patch("/read-all", authenticate, markAllAsRead);

// Delete notification
router.delete("/:id", authenticate, deleteNotification);

export default router;
