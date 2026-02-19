import { Router } from "express"
import { authenticate } from "../../middlewares/auth.middleware.js"
import { authorize } from "../../middlewares/role.middleware.js"
import { createReservation, getMyReservations, cancelReservation } from "../../controllers/cafeController/reservation.controller.js"

const router = Router()

// Only STUDENT can book
router.post(
  "/",
  authenticate,
  authorize(["STUDENT"]),
  createReservation
)

router.get(
    "/my",
    authenticate,
    authorize(["STUDENT"]),
    getMyReservations
    
)
router.delete(
    "/:reservationId",
    authenticate,
    authorize(["STUDENT"]),
    cancelReservation
    
)

export default router        