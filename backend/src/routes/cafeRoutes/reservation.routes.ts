import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { 
  createReservation, 
  getMyReservations, 
  cancelReservation,
  getSlotBookings
} from "../../controllers/cafeController/reservation.controller.js";

const router = Router();

// Create reservation (Students only)
router.post(
  "/",
  authenticate,
  authorize(["STUDENT"]),
  createReservation
);

// Get my reservations (Students only)
router.get(
  "/my",
  authenticate,
  authorize(["STUDENT"]),
  getMyReservations
);

// Cancel reservation (Students only)
router.delete(
  "/:reservationId",
  authenticate,
  authorize(["STUDENT"]),
  cancelReservation
);

// Get bookings for a specific slot (Café Manager only)
router.get(
  "/slot/:slotId",
  authenticate,
  authorize(["ADMIN", "CAFE_MANAGER"]),
  getSlotBookings
);

export default router;        