import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
    startTime:{type:Date, required: true},
    endTime :{type: Date,  requred: true},
    capacity:{type: Number, required: true}
},
{timestamps:true}
)

export default mongoose.model("TimeSlot", timeSlotSchema)