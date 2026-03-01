import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studentId: {
    type: String,
    required: function(this: any) {
      return this.role === "STUDENT";
    },
    unique: true,
    sparse: true
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: function(this: any) {
      return this.role === "STUDENT";
    }
  },
  role: {
    type: String,
    enum: ["STUDENT", "ADMIN", "CAFE_MANAGER"],
    default: "STUDENT"
  },
  profileImage: {
    type: String,
    default: null
  }
},
{ timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;