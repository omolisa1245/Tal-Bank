import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

import userRouter from "./routes/userRouter.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import authRouter from "./routes/authRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import paystackRoutes from "./routes/paystackRoutes.js";
import { resolveAccount } from "./controllers/resolveAccount.js";
import merchantRoutes from "./routes/merchantRoutes.js";
import airtimeRoutes from "./routes/airtimeRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";
import bettingRoutes from "./routes/bettingRoutes.js";
import dstvRoutes from "./routes/dstvRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();


// ✅ Middleware
app.use(express.json());

// ✅ CORS CONFIG (FIXED)
app.use(cors({
  origin: "https://tal-bank-r7q4.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Handle preflight WITHOUT crashing
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "https://tal-bank-r7q4.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(200);
  }
  next();
});


// ✅ API Routes
app.use("/api/users", userRouter);
app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", authRouter);
app.use("/api/wallet", walletRoutes);
app.use("/api/paystack", paystackRoutes);
app.use("/api/resolve", resolveAccount);
app.use("/api/merchant", merchantRoutes);
app.use("/api/airtime", airtimeRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/betting", bettingRoutes);
app.use("/api/tv", dstvRoutes);


// ✅ Test route
app.get("/", (req, res) => {
  res.send("api working");
});


// ✅ Vercel handler
export default function handler(req, res) {
  return app(req, res);
}