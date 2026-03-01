import mongoose from "mongoose";

const readStatusSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  announcement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Announcement",
    required: true
  },
  readAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Compound index to track read status per user per announcement
readStatusSchema.index({ user: 1, announcement: 1 }, { unique: true });

export default mongoose.model("ReadStatus", readStatusSchema);
