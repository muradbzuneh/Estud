import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
  userId?: string
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" })
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string }

    req.userId = decoded.id

    next()
  } catch (error) {
    res.status(401).json({ message: "Token invalid" })
  }
}