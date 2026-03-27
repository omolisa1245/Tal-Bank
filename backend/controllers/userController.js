import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { encryptBVN } from "../utils/bvnSecurity.js";


// ================= REGISTER =================
import walletModel from "../models/walletModel.js"
export const registerUser = async (req, res) => {
  try {
    console.log(req.body);

    const { phoneNumber, firstName, lastName, otherName, bvn, password } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const formattedPhone = phoneNumber.startsWith("+234")
      ? phoneNumber
      : "+234" + phoneNumber.replace(/^0+/, "");

    const userExists = await User.findOne({ phoneNumber: formattedPhone });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate account number
    const accountNumber = formattedPhone.replace("+234", "");

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔐 Encrypt BVN
    const encryptedBVN = encryptBVN(bvn);

    const user = await User.create({
      firstName,
      lastName,
      otherName,
      bvn: encryptedBVN,
      phoneNumber: formattedPhone,
      password: hashedPassword,
      accountNumber,
      pinCreated: false
    });

    await walletModel.create({
      user: user._id,
      accountNumber,
      balance: 0
    });

    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        accountNumber: user.accountNumber
      }
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};
// ================= LOGIN =================

export const loginUser = async (req, res) => {
  try {
    const { accountNumber, password } = req.body;

    if (!accountNumber || !password) {
      return res.status(400).json({ message: "Account number and password required" });
    }

    const user = await User.findOne({ accountNumber });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, accountNumber: user.accountNumber },
      process.env.JWT_SECRET,  // define this in your .env
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        accountNumber: user.accountNumber,
        pinCreated: user.pinCreated
      },
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ================= GET USER PROFILE =================


export const getUser = async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};




export const setTransactionPin = async (req, res) => {
  try {

    const { pin } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check if pin already exists
    if (user.pin) {
      return res.status(400).json({
        message: "Transaction PIN already created"
      });
    }

    const hashedPin = await bcrypt.hash(pin, 10);

    user.pin = hashedPin;
    user.pinCreated = true;

    await user.save();

    res.status(200).json({
      message: "Transaction PIN created successfully",
      pinCreated: true
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};

export const checkTransactionPin = async (req, res) => {

  const user = await User.findById(req.user.id)

  if (user.pin) {
    return res.json({ hasPin: true })
  }

  res.json({ hasPin: false })
}


export const verifyTransactionPin = async (req, res) => {
  try {
    const { pin } = req.body;
    const user = await User.findById(req.user.id).select("+pin");

    if (!user || !user.pin) {
      return res.status(400).json({ message: "Transaction PIN not set" });

    }

    console.log("Entered PIN:", pin);
    console.log("Stored PIN:", User.pin);


    const isMatch = await bcrypt.compare(pin.toString(), user.pin);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect transaction PIN" });
    }


    res.status(200).json({
      message: "PIN verified successfully",
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });


  }
};


export const sendResetPinOtp = async (req, res) => {

  try {

    const { phoneNumber } = req.body

    const user = await User.findOne({ phoneNumber })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    user.otp = otp
    user.otpExpires = Date.now() + 5 * 60 * 1000 // 5 minutes

    await user.save()

    res.json({
      message: "OTP sent successfully",
      otp // remove in production
    })

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}


export const verifyPinOtp = async (req, res) => {

  const { phoneNumber, otp } = req.body

  const user = await User.findOne({ phoneNumber })

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  if (user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" })
  }

  res.json({ message: "OTP verified" })

}



export const resetTransactionPin = async (req, res) => {

  try {

    const { phoneNumber, otp, newPin } = req.body

    const user = await User.findOne({ phoneNumber })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" })
    }

    const hashedPin = await bcrypt.hash(newPin, 10)

    user.pin = hashedPin
    user.pinCreated = true
    user.otp = null
    user.otpExpires = null

    await user.save()

    res.json({ message: "Transaction PIN reset successfully" })

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}