import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    medicineId: {
      type: String,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    genericName: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    manufacturer: {
      type: String,
      trim: true
    },
    batchNumber: {
      type: String,
      trim: true
    },
    expiryDate: {
      type: Date,
      required: true
    },
    purchasePrice: {
      type: Number,
      required: true,
      default: 0
    },
    sellingPrice: {
      type: Number,
      required: true,
      default: 0
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 0
    },
    minimumStock: {
      type: Number,
      default: 10
    },
    unit: {
      type: String,
      default: "Tablets",
      trim: true
    }
  },
  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
