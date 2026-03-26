import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },

  accountNumber: {
    type: String,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  firstName: String,
  lastName: String,
  otherName: String,
  bvn: String,

  walletBalance: {
    type: Number,
    default: 0
  },
  
  isVerified: {
    type: Boolean,
    default: false
  },

  pin: {
    type: String,

  },

  pinCreated: {
    type: Boolean,
    default: false
  },

  otp: String,
  otpExpires: Date

}, { timestamps: true });

export default mongoose.model("User", userSchema);