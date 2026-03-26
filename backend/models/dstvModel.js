import mongoose from "mongoose";

const dstvSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  service: { type: String, required: true },
  accountNumber: { type: String, required: true },
  package: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["success", "failed"], default: "success" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Dstv", dstvSchema);