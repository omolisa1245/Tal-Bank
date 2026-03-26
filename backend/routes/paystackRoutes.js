import express from "express"
import { createRecipient, getBanks, resolveAccount, transferMoney, transferToBank, verifyAccount } from "../controllers/paystackController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/banks",authMiddleware, getBanks)
router.post("/verify-account",authMiddleware, verifyAccount)
router.post("/create-recipient",authMiddleware, createRecipient)
router.post("/transfer",authMiddleware, transferMoney)
router.post("/transfer-bank",authMiddleware, transferToBank)
router.post("/resolve-account",authMiddleware, resolveAccount)

export default router