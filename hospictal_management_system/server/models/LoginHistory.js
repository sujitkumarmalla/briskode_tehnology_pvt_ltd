import mongoose from "mongoose";

const loginHistorySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
    role: {
      type: String,
      default: "admin"
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED_CREDENTIALS", "FAILED_OTP", "OTP_REQUESTED"],
      required: true
    },
    ipAddress: {
      type: String,
      default: "127.0.0.1"
    },
    userAgent: {
      type: String,
      default: "Unknown"
    },
    details: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const LoginHistory = mongoose.model("LoginHistory", loginHistorySchema);
export default LoginHistory;
