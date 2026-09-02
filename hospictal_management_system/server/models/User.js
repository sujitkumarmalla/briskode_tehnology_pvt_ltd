import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "DOCTOR", "RECEPTIONIST", "PHARMACIST", "LABORATORY"],
      uppercase: true
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department"
    },
    specialization: {
      type: String,
      trim: true
    },
    qualification: {
      type: String,
      trim: true
    },
    experience: {
      type: String,
      trim: true
    },
    consultationFee: {
      type: Number,
      default: 0
    },
    availableDays: [
      {
        type: String
      }
    ],
    workingHours: {
      type: String,
      default: "09:00 AM - 05:00 PM"
    },
    profileImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
