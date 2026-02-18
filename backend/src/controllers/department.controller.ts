import { Request, Response } from "express"
import Department from "../models/Department.js"

export const registerDepartment = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ message: "Department name is required" })
    }

    const department = await Department.create({ name })

    res.status(201).json({
      message: "Department created successfully",
      department: {
        id: department._id,
        name: department.name
      }
    })

  } catch (error: any) {

    // handle duplicate name error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Department already exists" })
    }

    res.status(500).json({ message: "Server error" })
  }
}   