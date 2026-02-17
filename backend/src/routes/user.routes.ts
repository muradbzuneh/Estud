import {  Router } from "express";
import { registerStudent } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerStudent)

export default router