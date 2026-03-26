import express from "express"
import {sendOTP,verifyOTP,completeRegistration} from "../controllers/authController.js"


const router = express.Router()

router.post("/send-otp", sendOTP)
router.post("/verify-otp", verifyOTP)
router.post("/complete-registration", completeRegistration)


export default router