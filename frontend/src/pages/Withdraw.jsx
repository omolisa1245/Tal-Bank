import React from "react";
import { ArrowLeft, ChevronRight, MapPin, CreditCard, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Withdraw = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 p-4">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <FaArrowLeft
                    className="cursor-pointer"
                    onClick={() => navigate('/')}
                />
                <h2 className="text-lg font-semibold">Withdraw</h2>
            </div>

            {/* Withdraw via Merchant */}
            <div
                onClick={() => navigate("/cash-w")}
                className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center mb-4 cursor-pointer hover:shadow-md transition"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Store className="text-amber-600" />
                    </div>

                    <div>
                        <p className="font-semibold text-sm">
                            Withdraw via Talbank merchants
                        </p>
                        <p className="text-xs text-gray-500">
                            Send money to a merchant wallet and get cash equivalent
                        </p>
                    </div>
                </div>

                <ChevronRight className="text-gray-400" />
            </div>

            {/* Withdraw with Card */}
            <div
                onClick={() => navigate("/card-w")}
                className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center mb-4 cursor-pointer hover:shadow-md transition"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="text-amber-600" />
                    </div>

                    <div>
                        <p className="font-semibold text-sm">
                            Withdraw with Talbank Card
                        </p>
                        <p className="text-xs text-gray-500">
                            Withdraw from any ATM or POS around you
                        </p>
                    </div>
                </div>

                <ChevronRight className="text-gray-400" />
            </div>

            {/* Find Nearby */}
            <div
                onClick={() => navigate("/withdraw/nearby")}
                className="bg-purple-200 rounded-2xl p-4 flex justify-between items-center cursor-pointer hover:shadow-md transition"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                        <MapPin className="text-white" />
                    </div>

                    <p className="font-medium text-sm">
                        Click here to find nearby merchant or ATM
                    </p>
                </div>

                <ChevronRight className="text-gray-600" />
            </div>

        </div>
    );
};

export default Withdraw;