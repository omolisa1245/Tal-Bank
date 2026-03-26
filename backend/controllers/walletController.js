import walletModel from "../models/walletModel.js";

export const getBalance = async (req, res) => {
  try {

    const userId = req.user.id; // from JWT middleware

    const wallet = await walletModel.findOne({ user: userId });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.json({
      balance: wallet.balance,
      accountNumber: wallet.accountNumber
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const depositMoney = async (req, res) => {

    try {

        const { amount } = req.body

        // validate amount
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" })
        }

        const wallet = await walletModel.findOneAndUpdate(
            { user: req.user.id },
            { $inc: { balance: amount } },
            { returnDocument: "after" }
        )

        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found" })
        }

        res.json({
            message: "Deposit successful",
            balance: wallet.balance
        })

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}
