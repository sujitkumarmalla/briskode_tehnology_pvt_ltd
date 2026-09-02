import mongoose from "mongoose";

const pharmacySaleSchema = new mongoose.Schema(
  {
    saleId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription"
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient"
    },
    patientName: {
      type: String,
      trim: true
    },
    medicines: [
      {
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true }
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
    total: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Bank Transfer"],
      default: "Cash"
    },
    soldBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const PharmacySale = mongoose.model("PharmacySale", pharmacySaleSchema);
export default PharmacySale;
