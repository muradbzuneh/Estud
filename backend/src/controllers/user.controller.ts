import { Request, Response } from "express"
import bcrypt from "bcrypt"
import Department from "../models/Department.js"
import User from "../models/userModels.js"

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, studentId, password, departmentId } = req.body

    // 1️⃣ Check department exists
    const department = await Department.findById(departmentId)
    if (!department) {
      return res.status(400).json({ message: "Department not found" })
    }

    // 2️⃣ Check if email already exists
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" })
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4️⃣ Create student
    const student = await User.create({
      name,
      email,
      studentId,
      password: hashedPassword,
      departmentId: departmentId
    })

    res.status(201).json({
      message: "Student registered successfully",
      student: {
        id: student.studentId,
        name: student.name,
        email: student.email
      }
    })

  } catch (error:any) {
    res.status(500).json({ message: "Registration failed", error: error.message })
  }
}