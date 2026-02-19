
import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: String,
  content: String,

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  isImportant: {
    type: Boolean,
    default: false
  },

  expiresAt: Date

}, { timestamps: true });

export default mongoose.model("Announcement", announcementSchema);