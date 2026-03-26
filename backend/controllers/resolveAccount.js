import walletModel from "../models/walletModel.js";
import User from "../models/userModel.js";

export const resolveAccount = async (req, res) => {

  try {

    const { accountNumber } = req.params;

    if (!accountNumber) {
      return res.status(400).json({
        message: "Account number required"
      });
    }

    const wallet = await walletModel.findOne({ accountNumber });

    if (!wallet) {
      return res.status(404).json({
        message: "Account not found"
      });
    }

    const user = await User.findById(wallet.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      accountNumber: wallet.accountNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};