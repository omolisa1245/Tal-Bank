// backend/routes/tv.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { payDstv, getDstvHistory } from "../controllers/dstvController.js";

const router = express.Router();

// Pay for DStv subscription
router.post("/pay", authMiddleware, payDstv);

// Get DStv transaction history
router.get("/history", authMiddleware, getDstvHistory)

export default router;