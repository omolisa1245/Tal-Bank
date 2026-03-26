import mongoose from "mongoose";

const merchantSchema = new mongoose.Schema({
  merchantId: {
    type: String,
    required: true,
    unique: true
  },
  businessName: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["transfer", "deposit", "withdraw", "merchant", "airtime", "dstv"],
    required: true
  },

  accountNumber: String,
  bankCode: String,

  // ✅ ADD THIS
  balance: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("Merchant", merchantSchema);