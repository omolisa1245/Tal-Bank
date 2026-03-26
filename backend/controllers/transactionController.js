import User from "../models/userModel.js"
import Transaction from "../models/transactionModel.js"
import bcrypt from "bcryptjs"
import Wallet from "../models/walletModel.js"



export const transferMoney = async (req, res) => {

    try {

        const { accountNumber, pin } = req.body
        const amount = Number(req.body.amount)

        if (!accountNumber || !amount || !pin) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" })
        }

        const sender = await User.findById(req.user.id)

        if (!sender) {
            return res.status(404).json({ message: "Sender not found" })
        }

        if (!sender.pin) {
            return res.status(400).json({
                message: "Please set your transaction PIN first"
            })
        }

        const isPinCorrect = await bcrypt.compare(pin, sender.pin)

        if (!isPinCorrect) {
            return res.status(400).json({ message: "Incorrect PIN" })
        }

        const senderWallet = await Wallet.findOne({ user: sender._id })

        if (!senderWallet) {
            return res.status(404).json({ message: "Sender wallet not found" })
        }

        if (senderWallet.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" })
        }

        const receiverWallet = await Wallet.findOne({ accountNumber })

        if (!receiverWallet) {
            return res.status(404).json({ message: "Receiver not found" })
        }

        if (receiverWallet.user.toString() === sender._id.toString()) {
            return res.status(400).json({
                message: "You cannot transfer to yourself"
            })
        }

        // update balances
        senderWallet.balance -= amount
        receiverWallet.balance += amount

        await senderWallet.save()
        await receiverWallet.save()

        // save transaction
        await Transaction.create({
            sender: sender._id,
            receiver: receiverWallet.user,
            amount,
            type: "transfer",
            status: "success"
        })

        res.status(200).json({
            message: "Transfer successful",
            balance: senderWallet.balance
        })

    } catch (error) {
        console.error("Paystack Transfer Error:", error.response?.data || error.message);

        res.status(500).json({
            message: "Transfer failed",
            error: error.response?.data || error.message
        });

    }
}




export const getTransactionHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const transactions = await Transaction.find({ sender: userId })
            .populate("receiver", "firstName lastName accountNumber") // <- populate the correct fields
            .sort({ createdAt: -1 });

        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch transactions" });
    }
};