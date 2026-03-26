import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  accountNumber: {
    type: String,
    unique: true
  },

  balance: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);

export default Wallet;