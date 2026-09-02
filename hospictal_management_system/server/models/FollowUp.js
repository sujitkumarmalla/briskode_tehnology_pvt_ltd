import mongoose from "mongoose";

const followUpSchema = new mongoose.Schema(
  {
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
    followUpDate: {
      type: Date,
      required: true
    },
    reason: {
      type: String,
      trim: true
    },
    instructions: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

const FollowUp = mongoose.model("FollowUp", followUpSchema);
export default FollowUp;
