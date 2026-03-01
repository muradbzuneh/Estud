import { registerDepartment, getDepartments } from "../../controllers/authController/department.controller.js";
import { Router } from "express";

const deptRoute = Router()

deptRoute.post("/register", registerDepartment)
deptRoute.get("/", getDepartments)

export default deptRoute