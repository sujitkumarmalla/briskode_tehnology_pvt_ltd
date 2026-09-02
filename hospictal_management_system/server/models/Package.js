import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    originalPrice: {
      type: Number,
      default: 0
    },
    discount: {
      type: String,
      default: "20% OFF"
    },
    description: {
      type: String,
      default: "Comprehensive health checkup package."
    },
    popular: {
      type: Boolean,
      default: false
    },
    testsCount: {
      type: Number,
      default: 50
    },
    badge: {
      type: String,
      default: "Popular Choice"
    },
    tests: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);
export default Package;
