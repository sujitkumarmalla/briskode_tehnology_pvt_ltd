import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    specialization: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    qualification: {
      type: String,
      default: "MBBS, MD"
    },
    experience: {
      type: Number,
      default: 10
    },
    availability: {
      type: String,
      default: "Mon, Wed, Fri"
    },
    status: {
      type: String,
      enum: ["Available", "Busy", "On Leave"],
      default: "Available"
    },
    rating: {
      type: Number,
      default: 4.8
    },
    consultationFee: {
      type: Number,
      default: 800
    },
    email: String,
    phone: String,
    image: String,
    bio: String
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
