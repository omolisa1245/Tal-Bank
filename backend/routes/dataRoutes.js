// routes/dataRoutes.js
import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { buyData, getDataHistory } from "../controllers/dataController.js";

const router = express.Router();

router.post("/buy", authMiddleware, buyData);
router.get("/history", authMiddleware, getDataHistory);

export default router;