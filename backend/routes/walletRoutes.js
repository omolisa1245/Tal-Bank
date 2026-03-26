import express from "express"
import { depositMoney, getBalance } from "../controllers/walletController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import { resolveAccount } from "../controllers/resolveAccount.js"

const router = express.Router()

router.get("/balance",authMiddleware, getBalance)
router.get("/resolve/:accountNumber", authMiddleware, resolveAccount)
router.post("/deposit", authMiddleware, depositMoney);

export default router