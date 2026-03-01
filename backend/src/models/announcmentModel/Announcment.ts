import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: null
  },
  targetGroup: {
    type: String,
    enum: ["UNIVERSITY", "DEPARTMENT", "CLASS"],
    default: "UNIVERSITY"
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: function(this: any) {
      return this.targetGroup === "DEPARTMENT" || this.targetGroup === "CLASS";
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  isImportant: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Auto-deactivate expired announcements
announcementSchema.pre('find', function() {
  this.where({ 
    $or: [
      { expiresAt: { $gte: new Date() } },
      { isActive: true }
    ]
  });
});

export default mongoose.model("Announcement", announcementSchema);
