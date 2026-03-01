import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { 
  createTimeSlot, 
  getTimeSlots, 
  getSlotById,
  updateTimeSlot,
  deleteTimeSlot
} from "../../controllers/cafeController/timeslot.controller.js";

const router = Router();

// Create time slot (Café Manager only)
router.post("/", authenticate, authorize(["ADMIN", "CAFE_MANAGER"]), createTimeSlot);

// Get all time slots (All authenticated users)
router.get("/", authenticate, getTimeSlots);

// Get single slot details
router.get("/:id", authenticate, getSlotById);

// Update time slot (Café Manager only)
router.put("/:id", authenticate, authorize(["ADMIN", "CAFE_MANAGER"]), updateTimeSlot);

// Delete/deactivate time slot (Café Manager only)
router.delete("/:id", authenticate, authorize(["ADMIN", "CAFE_MANAGER"]), deleteTimeSlot);

export default router;