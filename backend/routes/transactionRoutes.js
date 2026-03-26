import express from "express"
import { getTransactionHistory, transferMoney} from "../controllers/transactionController.js"
import authMiddleware from "../middleware/authMiddleware.js"


const router = express.Router()

router.post("/transfer",authMiddleware,transferMoney)
router.get("/history",authMiddleware,getTransactionHistory)



export default router