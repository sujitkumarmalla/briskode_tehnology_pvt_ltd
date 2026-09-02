import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true
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
    chiefComplaint: {
      type: String,
      required: true,
      trim: true
    },
    symptoms: {
      type: String,
      trim: true
    },
    vitals: {
      bloodPressure: { type: String, trim: true },
      heartRate: { type: String, trim: true },
      temperature: { type: String, trim: true },
      weight: { type: String, trim: true },
      height: { type: String, trim: true }
    },
    diagnosis: {
      type: String,
      required: true,
      trim: true
    },
    clinicalNotes: {
      type: String,
      trim: true
    },
    treatmentPlan: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

const Consultation = mongoose.model("Consultation", consultationSchema);
export default Consultation;
