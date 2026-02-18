import {  Router } from "express";
import { registerStudent } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.conroller.js";
import { getProfile } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerStudent)
router.get("/profile", protect, getProfile)

export default router