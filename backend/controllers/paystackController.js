import axios from "axios"
import Transaction from "../models/transactionModel.js"
import walletModel from "../models/walletModel.js"

export const getBanks = async (req, res) => {
    try {

        const response = await axios.get(
            "https://api.paystack.co/bank",
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                }
            }
        )

        res.json(response.data)

    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const resolveAccount = async (req, res) => {

    try {

        const { account_number, bank_code } = req.body;

        if (!account_number || !bank_code) {
            return res.status(400).json({ message: "Account number and bank code are required" });
        }

        const response = await axios.get(
            `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        res.json({
            account_name: response.data.data.account_name,
            account_number: response.data.data.account_number,
        });

    } catch (error) {

        console.log("🔥 FULL ERROR:");
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Message:", error.message);

        res.status(500).json({
            message: error.response?.data?.message || "Account resolve failed",
            error: error.response?.data || error.message
        })
    }

}

export const createRecipient = async (req, res) => {
    try {
        const { account_number, bank_code, name } = req.body;

        const response = await axios.post(
            "https://api.paystack.co/transferrecipient",
            {
                type: "nuban",
                name,
                account_number,
                bank_code,
                currency: "NGN",
            },
            {
                headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
            }
        );

        if (!response || !response.data) {
            return res.status(500).json({ status: false, message: "No data from Paystack" });
        }

        res.json({
            status: true,
            data: {
                recipient_code: response.data.data.recipient_code,
            },
        });
    } catch (error) {
        console.error("Paystack create recipient error:", error.response?.data || error.message);
        res.status(500).json({
            status: false,
            message: error.response?.data?.message || "Failed to create recipient",
        });
    }
};




export const verifyAccount = async (req, res) => {

    const { account_number, bank_code } = req.body

    try {

        const response = await axios.get(
            `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                }
            }
        )

        res.json(response.data)

    } catch (error) {
        res.status(500).json(error.response.data)
    }
}



export const transferMoney = async (req, res) => {

    const { recipientCode, amount } = req.body

    try {

        const transfer = await axios.post(
            "https://api.paystack.co/transfer",
            {
                source: "balance",
                amount: amount * 100, // NGN to kobo
                recipient: recipientCode,
                reason: "Transfer via app",
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        res.json(transfer.data)

    } catch (error) {
        res.status(500).json(error.response.data)
    }
}



export const transferToBank = async (req, res) => {
    const { recipient_code, amount } = req.body;

    try {
        const wallet = await walletModel.findOne({ user: req.user.id });

        if (!wallet) {
            return res.status(404).json("Wallet not found");
        }

        if (wallet.balance < amount) {
            return res.status(400).json("Insufficient balance");
        }

        const response = await axios.post(
            "https://api.paystack.co/transfer",
            {
                source: "balance",
                amount: amount * 100, // ✅ ONLY HERE
                recipient: recipient_code,
                reason: "TalBank transfer"
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        wallet.balance -= amount;
        await wallet.save();

        await Transaction.create({
            user: req.user.id,
            amount,
            type: "transfer",
            status: "success",
            reference: response.data.data.reference
        });

        res.json({
            message: "Transfer successful",
            data: response.data
        });

    } catch (error) {
        console.error("PAYSTACK ERROR:", error.response?.data || error.message);

        res.status(400).json({
            error: error.response?.data || error.message
        });
    }
};