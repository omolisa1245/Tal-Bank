// routes/airtimeRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { buyAirtime, getAirtimeHistory}  from "../controllers/airtimeController.js";

const router = express.Router();

// POST /api/airtime/buy
router.post("/buy-airtime", authMiddleware, buyAirtime);
router.get("/history", authMiddleware, getAirtimeHistory);

export default router;