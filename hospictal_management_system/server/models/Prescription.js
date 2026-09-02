import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    prescriptionId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    consultation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation"
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment"
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
    medicines: [
      {
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
        medicineName: { type: String, required: true, trim: true },
        dosage: { type: String, required: true, trim: true },
        route: { type: String, default: "Oral", trim: true },
        frequency: { type: String, required: true, trim: true },
        duration: { type: String, required: true, trim: true },
        quantity: { type: Number, required: true, default: 1 },
        instructions: { type: String, trim: true }
      }
    ],
    status: {
      type: String,
      enum: ["Pending", "Processing", "Dispensed", "Cancelled"],
      default: "Pending"
    },
    dispensedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    dispensedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
