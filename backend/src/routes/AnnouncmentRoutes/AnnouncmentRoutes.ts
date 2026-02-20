// routes/announcementRoutes.ts
import express from "express";
import { createAnnouncement, getAnnouncements } from "../../controllers/announcmentController/announcementController.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", authenticate, authorize(["ADMIN"]), createAnnouncement);
router.get("/", authenticate, getAnnouncements);

export default router;       
