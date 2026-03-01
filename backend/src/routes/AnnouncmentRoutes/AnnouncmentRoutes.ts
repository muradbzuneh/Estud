import express from "express";
import { upload } from "../../middlewares/upload.js";
import { 
  createAnnouncement, 
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement
} from "../../controllers/announcmentController/announcementController.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";

const router = express.Router();

// Create announcement with optional image (Admin only)
router.post("/", authenticate, authorize(["ADMIN"]), upload.single('image'), createAnnouncement);

// Get all announcements (All authenticated users)
router.get("/", authenticate, getAnnouncements);

// Get single announcement (All authenticated users)
router.get("/:id", authenticate, getAnnouncementById);

// Update announcement with optional image (Admin only)
router.put("/:id", authenticate, authorize(["ADMIN"]), upload.single('image'), updateAnnouncement);

// Delete announcement (Admin only)
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteAnnouncement);

export default router;       
