import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: String, // User ID or Role name like 'DOCTOR', 'PHARMACIST', 'LABORATORY', 'ADMIN', 'RECEPTIONIST'
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["appointment", "lab", "prescription", "inventory", "billing", "bed", "general"],
      default: "general"
    },
    isRead: {
      type: Boolean,
      default: false
    },
    link: {
      type: String
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
