import {  Router } from "express";
import { registerStudent } from "../../controllers/authController/user.controller.js";
import { authenticate} from "../../middlewares/auth.middleware.js";
import { getProfile } from "../../controllers/authController/user.controller.js";

const router = Router();

router.post("/register", registerStudent)
router.get("/profile", authenticate, getProfile)

export default router