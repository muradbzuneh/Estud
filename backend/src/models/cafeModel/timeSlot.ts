import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    required: true 
  },
  startTime: { 
    type: String, 
    required: true 
  },
  endTime: { 
    type: String, 
    required: true 
  },
  capacity: { 
    type: Number, 
    required: true,
    min: 1
  },
  availableSeats: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Initialize availableSeats to capacity
timeSlotSchema.pre('save', function(next) {
  if (this.isNew) {
    this.availableSeats = this.capacity;
  };
  
});

// Compound index to prevent duplicate slots
timeSlotSchema.index({ date: 1, startTime: 1, endTime: 1 }, { unique: true });

export default mongoose.model("TimeSlot", timeSlotSchema);