import Merchant from "../models/merchantModel.js";
import Transaction from "../models/transactionModel.js";
import Wallet from "../models/walletModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const payMerchant = async (req, res) => {
  try {
    const { merchantId, amount, note, pin } = req.body;
    const userId = req.user.id;


    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    
    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) return res.status(400).json({ message: "Invalid PIN" });


    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });


    if (wallet.balance < amount)
      return res.status(400).json({ message: "Insufficient balance" });

    const merchant = await Merchant.findOne({ merchantId: String(merchantId) });
    if (!merchant) return res.status(404).json({ message: "Merchant not found" });

   
    wallet.balance -= amount;
    await wallet.save();

   
    const transaction = await Transaction.create({
      userId,
      merchantId,
      amount,
      note,
      type: "transfer",
      status: "success",
    });

    res.json({ success: true, transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};