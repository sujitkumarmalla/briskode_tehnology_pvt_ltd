import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department"
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    tokenNumber: {
      type: String,
      trim: true
    },
    reason: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ["Scheduled", "Checked-In", "In Consultation", "Completed", "Cancelled", "No Show"],
      default: "Scheduled"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
