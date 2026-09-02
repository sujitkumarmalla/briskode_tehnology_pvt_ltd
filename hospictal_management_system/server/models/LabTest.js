import mongoose from "mongoose";

const labTestSchema = new mongoose.Schema(
  {
    testCode: {
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
    category: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    sampleType: {
      type: String,
      default: "Blood",
      trim: true
    },
    referenceRange: {
      type: String,
      trim: true
    },
    unit: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const LabTest = mongoose.model("LabTest", labTestSchema);
export default LabTest;
