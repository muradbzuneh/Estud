import {  Router } from "express";
import { upload } from "../../middlewares/upload.js";
import { registerStudent, updateProfile } from "../../controllers/authController/user.controller.js";
import { authenticate} from "../../middlewares/auth.middleware.js";
import { getProfile } from "../../controllers/authController/user.controller.js";

const router = Router();

router.post("/register", registerStudent)
router.get("/profile", authenticate, getProfile)
router.put("/profile", authenticate, upload.single('profileImage'), updateProfile)

export default router