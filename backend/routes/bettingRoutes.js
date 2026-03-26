import express from "express";
import { payBet, getBetHistory } from "../controllers/bettingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/pay", authMiddleware, payBet);

router.get("/history", authMiddleware, getBetHistory);

export default router;