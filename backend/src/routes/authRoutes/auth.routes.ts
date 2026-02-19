import { Router } from "express";
import { loginStudent } from "../../controllers/authController/auth.controller.js";



const Login =   Router()

Login.post("/login", loginStudent)

export default Login