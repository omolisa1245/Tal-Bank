import Betting from "../models/BettingModel.js";
import Wallet from "../models/walletModel.js";
import axios from "axios";

export const payBet = async (req, res) => {

    const { provider, bettingId, amount } = req.body;

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

        // simulate betting payment (or call VTpass betting API)

        wallet.balance -= amount;
        await wallet.save();

        const bet = await Betting.create({
            user: req.user.id,
            provider,
            bettingId,
            amount,
            reference: "BET" + Date.now()
        });

        res.json({
            success: true,
            message: "Bet payment successful",
            data: bet
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Bet payment failed"
        });

    }

};


export const getBetHistory = async (req, res) => {

  try {

    const history = await Betting.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: history
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bet history"
    });

  }

};