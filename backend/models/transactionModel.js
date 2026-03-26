import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    type: {
        type: String,
        enum: ["transfer", "deposit", "withdraw"],
        required: true
    },

    status: {
        type: String,
        enum: ["success", "failed", "pending"],
        default: "pending"
    },

    amount: Number

}, { timestamps: true })

export default mongoose.model("Transaction", transactionSchema)