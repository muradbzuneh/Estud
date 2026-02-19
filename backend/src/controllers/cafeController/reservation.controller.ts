import { Response } from "express"
import mongoose from "mongoose"
import { AuthRequest } from "../../middlewares/auth.middleware.js"
import Reservation from "../../models/cafeModel/Reservation.js"
import TimeSlot from "../../models/cafeModel/timeSlot.js"

export const createReservation = async (req: AuthRequest, res: Response) => {
  try {
    const { timeSlotId } = req.body
    const userId = req.userId

    if (!mongoose.Types.ObjectId.isValid(timeSlotId)) {
      return res.status(400).json({ message: "Invalid TimeSlot ID" })
    }

    const slot = await TimeSlot.findById(timeSlotId)
    if (!slot) {
      return res.status(404).json({ message: "TimeSlot not found" })
    }

    // 1️⃣ Check capacity
    const reservationCount = await Reservation.countDocuments({
      timeSlot: timeSlotId
    })

    if (reservationCount >= slot.capacity) {
      return res.status(400).json({ message: "Slot is full" })
    }

    // 2️⃣ Check daily limit (max 3 per day)
    const startOfDay = new Date(slot.startTime)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(slot.startTime)
    endOfDay.setHours(23, 59, 59, 999)

    const dailyReservations = await Reservation.find({
      user: userId
    }).populate({
      path: "timeSlot",
      match: {
        startTime: { $gte: startOfDay, $lte: endOfDay }
      }
    })

    const validDailyReservations = dailyReservations.filter(r => r.timeSlot !== null)

    if (validDailyReservations.length >= 3) {
      return res.status(400).json({ message: "Daily reservation limit reached (3)" })
    }

    // 3️⃣ Create reservation
    const reservation = await Reservation.create({
      user: userId,
      timeSlot: timeSlotId
    })

    res.status(201).json({
      message: "Reservation successful",
      reservation
    })

  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already booked this slot" })
    }

    res.status(500).json({ message: "Server error" })
  }
}
export const getMyReservations = async (req: AuthRequest, res: Response) => {
  try {
    const reservations = await Reservation.find({
      user: req.userId
    })
      .populate("timeSlot")
      .sort({ createdAt: -1 })

    res.status(200).json(reservations)

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

export const cancelReservation = async (req: AuthRequest, res: Response) => {
  try {
    const { reservationId } = req.params

    const reservation = await Reservation.findOne({
      _id: reservationId,
      user: req.userId
    })

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" })
    }

    await reservation.deleteOne()

    res.status(200).json({ message: "Reservation cancelled successfully" })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}