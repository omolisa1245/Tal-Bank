import express from "express";
import { registerUser, loginUser, getUser, sendResetPinOtp, verifyPinOtp, resetTransactionPin, setTransactionPin, checkTransactionPin, verifyTransactionPin } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile",authMiddleware, getUser);
router.post("/send-pin-otp", sendResetPinOtp)
router.post("/verify-pin-otp", verifyPinOtp)
router.post("/reset-pin", resetTransactionPin)
router.post("/set-pin", authMiddleware, setTransactionPin)
router.get("/check-pin", authMiddleware, checkTransactionPin)
router.post("/verify-pin", authMiddleware, verifyTransactionPin)




export default router;