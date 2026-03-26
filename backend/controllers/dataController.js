// controllers/dataController.js
import Data from "../models/DataModel.js";
import Wallet from "../models/walletModel.js";
import axios from "axios";

export const buyData = async (req, res) => {

    const { phoneNumber, network, plan, amount } = req.body;

    try {

        const wallet = await Wallet.findOne({ user: req.user.id });

        if (!wallet) {
            return res.status(404).json({
                success: false,
                message: "Wallet not found"
            });
        }

        if (wallet.balance < amount) {
            return res.status(400).json({
                success: false,
                message: "Insufficient balance"
            });
        }

        // NETWORK MAP
        const networkMap = {
            mtn: "mtn-data",
            airtel: "airtel-data",
            glo: "glo-data",
            "9mobile": "etisalat-data"
        };

        const serviceID = networkMap[network.toLowerCase()];

        if (!serviceID) {
            return res.status(400).json({
                success: false,
                message: "Invalid network selected"
            });
        }

        const response = await axios.post(
            "https://sandbox.vtpass.com/api/pay",
            {
                request_id: Date.now().toString(),
                serviceID: serviceID,
                amount: amount,
                phone: phoneNumber
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "api-key": process.env.VTPASS_API_KEY,
                    "secret-key": process.env.VTPASS_SECRET_KEY
                }
            }
        );

        // Deduct wallet
        wallet.balance -= amount;
        await wallet.save();

        const dataPurchase = await Data.create({
            user: req.user.id,
            phoneNumber,
            network,
            plan,
            amount,
            status: "success",
            reference: response.data?.requestId
        });

        res.json({
            success: true,
            message: "Data purchased successfully",
            data: dataPurchase
        });

    } catch (error) {

        console.log("DATA ERROR:", error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Data purchase failed"
        });

    }

};



export const getDataHistory = async (req, res) => {
    try {
        const dataHistory = await Data.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, data: dataHistory });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch data history" });
    }
}