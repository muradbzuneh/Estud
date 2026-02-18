import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { createTimeSlot, getTimeSlot } from "../controllers/timeslot.controller.js";
import { Admin } from "mongodb";

const router = Router()

router.post("/", protect, authorize(["Admin"]), createTimeSlot)

router.get("/", protect, getTimeSlot)

export default router