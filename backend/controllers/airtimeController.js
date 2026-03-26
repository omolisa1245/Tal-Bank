import axios from "axios";
import Wallet from "../models/walletModel.js";
import Airtime from "../models/AirtimeModel.js";

export const buyAirtime = async (req, res) => {
  const { phoneNumber, network, amount } = req.body;

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

    const networkMap = {
      mtn: "mtn",
      airtel: "airtel",
      glo: "glo",
      "9mobile": "etisalat"
    };

    const serviceID = networkMap[network.toLowerCase()];

    const response = await axios.post(
      "https://sandbox.vtpass.com/api/pay",
      {
        request_id: Date.now().toString(),
        serviceID,
        amount,
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

    wallet.balance -= amount;
    await wallet.save();

    const airtime = await Airtime.create({
      user: req.user.id,
      phoneNumber,
      network,
      amount,
      status: "success",
      reference: response.data?.requestId
    });

    res.json({
      success: true,
      message: "Airtime purchased successfully",
      data: airtime
    });

  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Airtime purchase failed"
    });
  }
};

export const getAirtimeHistory = async (req, res) => {
  try {
    const airtimes = await Airtime.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: airtimes
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch airtime history"
    });
  }
};