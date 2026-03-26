import express from "express";
import { payMerchant } from "../controllers/merchantController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createMerchant } from "../controllers/createMerchant.js";

const router = express.Router();

router.post("/pay-merchant",authMiddleware, payMerchant);
router.post("/create-merchant", createMerchant);

export default router;