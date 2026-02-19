import mongoose from "mongoose"

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    timeSlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeSlot",
      required: true
    }
  },
  { timestamps: true }
)

// Prevent duplicate booking of same slot
reservationSchema.index({ user: 1, timeSlot: 1 }, { unique: true })

export default mongoose.model("Reservation", reservationSchema)