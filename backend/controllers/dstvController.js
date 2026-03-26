// backend/controllers/dstvController.js
import Dstv from "../models/dstvModel.js"; // DStv model
import User from "../models/userModel.js";        // User model
import Wallet from "../models/walletModel.js";


export const payDstv = async (req, res) => {
  try {

    const { smartcard, package: selectedPackage, amount } = req.body;
    const user = req.user;

    if (!smartcard || !selectedPackage || !amount)
      return res.status(400).json({ message: "All fields are required" });

    const payAmount = Number(amount);

    // get wallet
    const wallet = await Wallet.findOne({ user: user._id });

    if (!wallet)
      return res.status(404).json({ message: "Wallet not found" });

    console.log("Wallet balance:", wallet.balance);
    console.log("Amount:", payAmount);

    if (wallet.balance < payAmount)
      return res.status(400).json({ message: "Insufficient balance" });

    // deduct balance
    wallet.balance -= payAmount;
    await wallet.save();

    // save transaction
    const transaction = await Dstv.create({
      user: user._id,
      type: "TV Payment",
      service: "DStv",
      accountNumber: smartcard,
      package: selectedPackage,
      amount: payAmount,
      status: "success",
    });

    res.status(200).json({
      message: "DStv payment successful",
      transaction
    });

  } catch (err) {
    console.error("DStv payment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all DStv transactions for logged-in user
export const getDstvHistory = async (req, res) => {
  try {
    const transactions = await Dstv.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Fetch DStv history error:", error);
    res.status(500).json({ message: "Server error" });
  }
};