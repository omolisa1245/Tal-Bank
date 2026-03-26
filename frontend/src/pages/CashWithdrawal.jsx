import React, { useState } from "react";
import { ArrowLeft, ScanLine, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CashWithdrawal = () => {
    const navigate = useNavigate();

    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");

    const quickAmounts = [500, 1000, 2000, 5000, 9999, 10000];

    const handleQuickAmount = (value) => {
        setAmount(value.toString());
    };

    const isValid =
        accountNumber.length === 10 &&
        Number(amount) >= 10;

    return (
        <div className="min-h-screen bg-gray-100 p-4">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <FaArrowLeft
                    className="cursor-pointer"
                    onClick={() => navigate('/withdraw')}
                />
                <h2 className="text-lg font-semibold">
                    Cash Withdrawal
                </h2>
            </div>

            {/* Recipient Account */}
            <div className="mb-6">
                <label className="block text-sm mb-2">
                    Recipient Account
                </label>

                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            maxLength={10}
                            value={accountNumber}
                            onChange={(e) =>
                                setAccountNumber(
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                            placeholder="10-digit account number"
                            className="w-full bg-gray-200 p-4 rounded-xl outline-none"
                        />

                        <ScanLine
                            size={20}
                            className="absolute right-4 top-4 text-amber-600"
                        />
                    </div>

                    <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center">
                        <User className="text-amber-600" />
                    </div>
                </div>
            </div>

            {/* Quick Amount Selection */}
            <div className="mb-6">
                <label className="block text-sm mb-4">
                    Select Amount
                </label>

                <div className="grid grid-cols-3 gap-4">
                    {quickAmounts.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleQuickAmount(item)}
                            className={`py-4 rounded-xl font-medium transition ${Number(amount) === item
                                    ? "bg-amber-600 text-white"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            ₦{item.toLocaleString()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Manual Amount Input */}
            <div className="mb-10">
                <label className="block text-sm mb-2">
                    Enter amount
                </label>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) =>
                        setAmount(e.target.value)
                    }
                    placeholder="₦ 10.00 - 5,000,000.00"
                    className="w-full bg-gray-200 p-4 rounded-xl outline-none"
                />
            </div>

            {/* Next Button */}
            <button
                disabled={!isValid}
                className={`w-full py-4 rounded-full text-white font-semibold transition ${isValid
                        ? "bg-amber-600"
                        : "bg-amber-300 cursor-not-allowed"
                    }`}
            >
                Next
            </button>

        </div>
    );
};

export default CashWithdrawal;