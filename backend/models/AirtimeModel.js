import mongoose from "mongoose";

const AirtimeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  phoneNumber: { type: String, required: true },
  network: { type: String, required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending"
  },
  reference: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Airtime", AirtimeSchema);