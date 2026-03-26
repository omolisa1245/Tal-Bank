import Merchant from "../models/merchantModel.js";

export const createMerchant = async (req, res) => {
    try {

        const { merchantId, businessName } = req.body;

        const merchant = await Merchant.create({
            merchantId,
            businessName
        });

        res.json({
            success: true,
            merchant
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};