import React, { useState } from "react";
import axios from "axios";

const DepositMoney = () => {

    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(null);

    const quickAmounts = [1000, 2000, 5000, 10000];

    const handleDeposit = async () => {
        if (!amount) return alert("Enter amount");

        try {
            setLoading(true);

            const token = localStorage.getItem("authToken");

            const res = await axios.post(
                "http://localhost:4000/api/wallet/deposit",
                { amount: Number(amount) },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setBalance(res.data.balance);
            setAmount("");
            alert("Deposit Successful 🎉");

        } catch (error) {
            alert(error.response?.data?.message || "Deposit failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

            <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-6">

                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-6">
                    Deposit Money
                </h2>

                {/* Balance Card */}
                <div className="bg-amber-500 text-white rounded-2xl p-5 mb-6 shadow-md">
                    <p className="text-sm">Wallet Balance</p>
                    <h3 className="text-3xl font-bold">
                        ₦{balance ? balance.toLocaleString() : "0.00"}
                    </h3>
                </div>

                {/* Amount Input */}
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">Enter Amount</label>

                    <input
                        type="number"
                        placeholder="₦ 0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full mt-2 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-400"
                    />
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    {quickAmounts.map((amt) => (
                        <button
                            key={amt}
                            onClick={() => setAmount(amt)}
                            className="bg-gray-100 hover:bg-amber-100 rounded-lg py-2 text-sm font-semibold"
                        >
                            ₦{amt}
                        </button>
                    ))}
                </div>

                {/* Deposit Button */}
                <button
                    onClick={handleDeposit}
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition"
                >
                    {loading ? "Processing..." : "Deposit"}
                </button>

            </div>

        </div>
    );
};

export default DepositMoney;