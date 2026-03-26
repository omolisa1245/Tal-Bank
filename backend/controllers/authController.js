import bcrypt from "bcryptjs"
import User from "../models/userModel.js"
import OTP from "../models/otpModel.js";



export const sendOTP = async (req, res) => {

    try {

        let { phoneNumber } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        // normalize phone number
        phoneNumber = "+234" + phoneNumber.replace(/^0+/, "");

        // generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        // delete old OTP for this phone
        await OTP.deleteMany({ phoneNumber });

        // save new OTP
        await OTP.create({
            phoneNumber,
            otp,
            expiresAt: expires
        });

        console.log("OTP:", otp);

        res.status(200).json({
            message: "OTP sent successfully",
            otp: otp
        });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


export const verifyOTP = async (req, res) => {

    try {

        let { phoneNumber, otp } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        if (!otp) {
            return res.status(400).json({ message: "OTP is required" });
        }

        // normalize phone
        phoneNumber = "+234" + phoneNumber.replace(/^0+/, "");

        const record = await OTP.findOne({ phoneNumber });

        if (!record) {
            return res.status(400).json({ message: "OTP not found" });
        }

        if (record.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (record.expiresAt < new Date()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        await OTP.deleteMany({ phoneNumber });

        res.json({
            message: "Phone verified successfully"
        });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


export const completeRegistration = async (req, res) => {

    const { phoneNumber, firstName, lastName, bvn, password } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.firstName = firstName;
    user.lastName = lastName;
    user.bvn = bvn;
    user.password = hashedPassword;

    await user.save();

    res.json({
        message: "Registration completed",
        user
    });

};