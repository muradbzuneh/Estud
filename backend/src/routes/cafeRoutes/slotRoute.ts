import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { createTimeSlot, getTimeSlot } from "../../controllers/cafeController/timeslot.controller.js";
import { Admin } from "mongodb";

const router = Router()

router.post("/", authenticate, authorize(["ADMIN"]), createTimeSlot)

router.get("/", authenticate, getTimeSlot)

export default router