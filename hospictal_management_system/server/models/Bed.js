import mongoose from "mongoose";

const bedSchema = new mongoose.Schema(
  {
    bedNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    ward: {
      type: String,
      required: true,
      trim: true
    },
    bedType: {
      type: String,
      enum: ["General", "Semi-Private", "Private", "ICU", "Emergency"],
      default: "General"
    },
    chargePerDay: {
      type: Number,
      default: 500
    },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Reserved", "Maintenance"],
      default: "Available"
    },
    assignedPatient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient"
    },
    assignedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

const Bed = mongoose.model("Bed", bedSchema);
export default Bed;
