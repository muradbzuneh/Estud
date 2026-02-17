import mongoose from "mongoose";
import { timeStamp } from "node:console";


 const departmentSchema =new mongoose.Schema({
    name:{ type: String, required: true },
},
{timestamps: true}
)

export default mongoose.model("Department", departmentSchema)        