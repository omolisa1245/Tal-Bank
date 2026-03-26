import mongoose from "mongoose";

const bettingSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    provider: {
        type: String,
        required: true
    },

    bettingId: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "success"
    },

    reference: {
        type: String
    }

}, { timestamps: true });

export default mongoose.models.Betting || mongoose.model("Betting", bettingSchema);