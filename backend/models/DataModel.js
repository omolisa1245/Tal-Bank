// models/DataModel.js
import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  phoneNumber: { type: String, required: true },
  network: { type: String, required: true },
  plan: { type: String, required: true }, // e.g., "1GB", "2GB"
  amount: { type: Number, required: true },
  status: { type: String, enum: ["success", "failed"], default: "success" },
  reference: { type: String },
}, { timestamps: true });

export default mongoose.models.Data || mongoose.model("Data", dataSchema);