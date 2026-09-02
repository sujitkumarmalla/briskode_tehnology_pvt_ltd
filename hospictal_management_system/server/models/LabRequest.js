import mongoose from "mongoose";

const labRequestSchema = new mongoose.Schema(
  {
    requestId: {
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
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment"
    },
    consultation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation"
    },
    testName: {
      type: String,
      required: true,
      trim: true
    },
    testCatalog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabTest"
    },
    priority: {
      type: String,
      enum: ["Normal", "Urgent", "Emergency"],
      default: "Normal"
    },
    clinicalNotes: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ["Requested", "Sample Collected", "Processing", "Completed", "Cancelled"],
      default: "Requested"
    },
    sampleId: {
      type: String,
      trim: true
    },
    sampleType: {
      type: String,
      trim: true
    },
    collectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    collectedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

const LabRequest = mongoose.model("LabRequest", labRequestSchema);
export default LabRequest;
