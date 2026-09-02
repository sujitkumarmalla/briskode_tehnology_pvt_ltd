import mongoose from "mongoose";

const labResultSchema = new mongoose.Schema(
  {
    resultId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    labRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabRequest",
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
    testName: {
      type: String,
      required: true,
      trim: true
    },
    findings: [
      {
        parameter: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
        referenceRange: { type: String, trim: true },
        unit: { type: String, trim: true },
        isAbnormal: { type: Boolean, default: false }
      }
    ],
    remarks: {
      type: String,
      trim: true
    },
    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    status: {
      type: String,
      enum: ["Draft", "Finalized"],
      default: "Finalized"
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const LabResult = mongoose.model("LabResult", labResultSchema);
export default LabResult;
