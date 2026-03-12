import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import TimeSlot from "../../models/cafeModel/timeSlot.js";
import Reservation from "../../models/cafeModel/Reservation.js";

// Helper function to validate time format (HH:MM)
function validateTimeFormat(time: string): boolean {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

// FR-8: Café manager creates time slots
export const createTimeSlot = async (req: Request, res: Response) => {
  try {
    const { date, startTime, endTime, capacity } = req.body;

    if (!date || !startTime || !endTime || !capacity) {
      return res.status(400).json({ 
        message: "date, startTime, endTime, and capacity are required" 
      });
    }

    // Validate time format
    if (!validateTimeFormat(startTime) || !validateTimeFormat(endTime)) {
      return res.status(400).json({ 
        message: "Time must be in HH:MM format (e.g., 09:00, 14:30)" 
      });
    }

    // Validate endTime is after startTime
    if (startTime >= endTime) {
      return res.status(400).json({ 
        message: "End time must be after start time" 
      });
    }

    // FR-9: Validate capacity
    if (capacity < 1) {
      return res.status(400).json({ message: "Capacity must be at least 1" });
    }

    const slot = await TimeSlot.create({
      date: new Date(date),
      startTime,
      endTime,
      capacity,
      availableSeats: capacity
    });

    res.status(201).json({
      message: "TimeSlot successfully created",
      slot
    });

  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Time slot already exists for this date and time" 
      });
    }
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// FR-10: Students view available slots with real-time seat info
export const getTimeSlots = async (req: AuthRequest, res: Response) => {
  try {
    const { date } = req.query;
    
    let filter: any = { 
      isActive: true,
      date: { $gte: new Date() } // Only future slots
    };

    if (date) {
      const queryDate = new Date(date as string);
      const nextDay = new Date(queryDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      filter.date = {
        $gte: queryDate,
        $lt: nextDay
      };
    }

    const slots = await TimeSlot.find(filter).sort({ date: 1, startTime: 1 });

    // Add booking status for each slot
    const slotsWithStatus = slots.map(slot => ({
      ...slot.toObject(),
      isFull: slot.availableSeats === 0,
      bookingEnabled: slot.availableSeats > 0
    }));

    res.status(200).json(slotsWithStatus);

  } catch (error: any) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Get slot details with remaining seats
export const getSlotById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const slot = await TimeSlot.findById(id);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    const reservationCount = await Reservation.countDocuments({
      timeSlot: id,
      status: "confirmed"
    });

    res.status(200).json({
      ...slot.toObject(),
      currentBookings: reservationCount,
      remainingSeats: slot.availableSeats,
      isFull: slot.availableSeats === 0
    });

  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update slot (for café manager)
export const updateTimeSlot = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate time format if times are being updated
    if (updates.startTime && !validateTimeFormat(updates.startTime)) {
      return res.status(400).json({ 
        message: "Start time must be in HH:MM format" 
      });
    }

    if (updates.endTime && !validateTimeFormat(updates.endTime)) {
      return res.status(400).json({ 
        message: "End time must be in HH:MM format" 
      });
    }

    const slot = await TimeSlot.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.status(200).json({
      message: "Slot updated successfully",
      slot
    });

  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete/deactivate slot
export const deleteTimeSlot = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if there are active reservations
    const activeReservations = await Reservation.countDocuments({
      timeSlot: id,
      status: "confirmed"
    });

    if (activeReservations > 0) {
      return res.status(400).json({ 
        message: "Cannot delete slot with active reservations" 
      });
    }

    await TimeSlot.findByIdAndUpdate(id, { isActive: false });

    res.status(200).json({ message: "Slot deactivated successfully" });

  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};