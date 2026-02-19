import { Request, Response, NextFunction } from "express"
import Jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
  userId?: string
  userRole?: string
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" })
    }

    const token = authHeader.split(" ")[1]

    const decoded = Jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string; role: string }

    console.log("Decoded Token:", decoded) // 🔥 DEBUG

    req.userId = decoded.id
    req.userRole = decoded.role  // 🔥 THIS IS VERY IMPORTANT

    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" })
  }
}