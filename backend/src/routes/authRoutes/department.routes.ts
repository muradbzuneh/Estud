import { registerDepartment } from "../../controllers/authController/department.controller.js";
import { Router } from "express";

const deptRoute = Router()

deptRoute.post("/register", registerDepartment)

export default deptRoute