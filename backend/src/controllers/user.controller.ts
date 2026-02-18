import { Request, Response } from "express"
import bcrypt from "bcrypt"
import Department from "../models/Department.js"
import User from "../models/userModels.js"
import { AuthRequest  } from "../middlewares/auth.middleware.js"


export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const student = await User.findById(req.userId)
      .select("-password")
      .populate("departmentId")

    if (!student) {
      return res.status(404).json({ message: "Student not found" })
    }

    res.status(200).json(student)

  } catch (error:any) {
    res.status(500).json({ message: "Server error" , error: error.message})
  }
}

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, studentId, password, role, departmentId } = req.body

    // 1️⃣ Check department exists
    // const department = await Department.findById(departmentId)
    // if (!department) {
    //   return res.status(400).json({ message: "Department not found" })
    // }

    // 2️⃣ Check if email already exists
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" })
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    let department = null 

    if (role === "STUDENT") {
      department = await Department.findById(departmentId)
      if (!department) {
        return res.status(400).json({ message: "Department not found" })
      }
    }

    // 4️⃣ Create student
    const student = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
      departmentId: role === "STUDENT" ? departmentId : undefined,
      studentId: role === "STUDENT" ? studentId : undefined
    })

    res.status(201).json({
      message: "Student registered successfully",
      student: {
        id: student.studentId,
        name: student.name,
        role: student.role
      }
    })

  } catch (error:any) {
    res.status(500).json({ message: "Registration failed", error: error.message })
  }
}