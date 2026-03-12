import { Response } from "express";
import mongoose from "mongoose";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import Reservation from "../../models/cafeModel/Reservation.js";
import TimeSlot from "../../models/cafeModel/timeSlot.js";

// Helper function to check time overlap
function checkTimeOverlap(
  slot1Start: string, 
  slot1End: string, 
  slot2Start: string, 
  slot2End: string
): boolean {
  return (
    // Slot 1 starts during slot 2
    (slot1Start >= slot2Start && slot1Start < slot2End) ||
    // Slot 1 ends during slot 2
    (slot1End > slot2Start && slot1End <= slot2End) ||
    // Slot 1 completely encompasses slot 2
    (slot1Start <= slot2Start && slot1End >= slot2End)
  );
}

export const createReservation = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { timeSlotId } = req.body;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(timeSlotId)) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid TimeSlot ID" });
    }

    const slot = await TimeSlot.findById(timeSlotId).session(session);
    if (!slot || !slot.isActive) {
      await session.abortTransaction();
      return res.status(404).json({ message: "TimeSlot not found or inactive" });
    }

    // FR-11: Check if slot is full (First Come, First Served)
    if (slot.availableSeats <= 0) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Slot is full. Booking disabled." });
    }

    // FR-13: Prevent overlapping bookings (FIXED with comprehensive overlap check)
    const existingReservations = await Reservation.find({
      user: userId,
      status: "confirmed"
    }).populate('timeSlot').session(session);

    const hasOverlap = existingReservations.some((res: any) => {
      if (!res.timeSlot) return false;
      const existingSlot = res.timeSlot;
      
      // Must be same date
      if (existingSlot.date.toDateString() !== slot.date.toDateString()) {
        return false;
      }
      
      // Check all overlap scenarios using helper function
      return checkTimeOverlap(
        slot.startTime,
        slot.endTime,
        existingSlot.startTime,
        existingSlot.endTime
      );
    });

    if (hasOverlap) {
      await session.abortTransaction();
      return res.status(400).json({ message: "You have an overlapping booking" });
    }

    // Create reservation
    const reservation = await Reservation.create([{
      user: userId,
      timeSlot: timeSlotId,
      status: "confirmed"
    }], { session });

    // Decrease available seats
    slot.availableSeats -= 1;
    await slot.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      message: "Reservation successful",
      reservation: reservation[0]
    });

  } catch (error: any) {
    await session.abortTransaction();
    
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already booked this slot" });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  } finally {
    session.endSession();
  }
};

export const getMyReservations = async (req: AuthRequest, res: Response) => {
  try {
    const reservations = await Reservation.find({
      user: req.userId
    })
      .populate({
        path: "timeSlot",
        select: "date startTime endTime capacity availableSeats"
      })
      .sort({ createdAt: -1 });

    res.status(200).json(reservations);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// FR-12: Cancel booking before slot time
export const cancelReservation = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findOne({
      _id: reservationId,
      user: req.userId,
      status: "confirmed"
    }).populate('timeSlot').session(session);

    if (!reservation) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Reservation not found" });
    }

    const slot: any = reservation.timeSlot;
    
    // Check if slot time has passed
    const slotDateTime = new Date(slot.date);
    const [hours, minutes] = slot.startTime.split(':');
    slotDateTime.setHours(parseInt(hours), parseInt(minutes));

    if (slotDateTime <= new Date()) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Cannot cancel past reservations" });
    }

    // Update reservation status
    reservation.status = "cancelled";
    await reservation.save({ session });

    // Increase available seats
    await TimeSlot.findByIdAndUpdate(
      slot._id,
      { $inc: { availableSeats: 1 } },
      { session }
    );

    await session.commitTransaction();

    res.status(200).json({ message: "Reservation cancelled successfully" });

  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: "Server error" });
  } finally {
    session.endSession();
  }
};

// FR-14: Café manager view bookings
export const getSlotBookings = async (req: AuthRequest, res: Response) => {
  try {
    const { slotId } = req.params;

    const reservations = await Reservation.find({
      timeSlot: slotId,
      status: "confirmed"
    })
      .populate("user", "name email studentId")
      .populate("timeSlot");

    const slot = await TimeSlot.findById(slotId);

    res.status(200).json({
      slot,
      totalBookings: reservations.length,
      reservations
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};