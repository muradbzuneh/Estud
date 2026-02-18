import { Router } from "express";
import { loginStudent } from "../controllers/auth.controller.js";
import 

const Login =   Router()

Login.post("/login", loginStudent)

export default Login