import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    invoiceNumber: {
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
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment"
    },
    services: [
      {
        name: { type: String, required: true },
        category: {
          type: String,
          enum: ["Consultation", "Laboratory", "Medicines", "Bed Charges", "Other Services"],
          default: "Consultation"
        },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
        amount: { type: Number, required: true }
      }
    ],
    subtotal: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    },
    paidAmount: {
      type: Number,
      default: 0
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Partially Paid", "Paid", "Cancelled"],
      default: "Pending"
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Bank Transfer"],
      default: "Cash"
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);
export default Bill;
