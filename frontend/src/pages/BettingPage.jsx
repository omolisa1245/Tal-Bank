import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import sporty from "../assets/sporty.svg";
import Bet9ja from "../assets/Bet9ja.png";
import onex from "../assets/xbet.png";
import dot from "../assets/dot.png";

import TransferConfirm from "./TransferConfirm";
import EnterPin from "./EnterPin";
import TransferSuccess from "./TransferSuccess";
import BankingLoader from "../component/BankingLoader";

const BettingPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const providers = [
        { name: "SportyBet", logo: sporty },
        { name: "Bet9ja", logo: Bet9ja },
        { name: "1xBet", logo: onex },
        { name: "More", logo: dot },
    ];

    const quickAmounts = [100, 500, 1000, 2000, 5000, 10000];

    const [selectedProvider, setSelectedProvider] = useState("SportyBet");
    const [userId, setUserId] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");



    // Modal states
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pinOpen, setPinOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [enteredPin, setEnteredPin] = useState("");
    const [lastTransaction, setLastTransaction] = useState({});
    const [receiverName, setReceiverName] = useState("");

    // 1️⃣ Check if user has a PIN
    const checkUserPin = async () => {
        try {
            const res = await axios.get(
                "http://localhost:4000/api/users/check-pin",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return res.data.hasPin;
        } catch (err) {
            console.error("Error checking PIN:", err.response?.data || err.message);
            return false;
        }
    };

    // 2️⃣ Handle Confirm button click
    const handleConfirm = async () => {
        if (!userId || !amount || Number(amount) <= 0) {
            setError("Enter Betting ID and valid amount");
            return;
        }
        setError("");

        const hasPin = await checkUserPin();
        if (!hasPin) {
            setPinOpen(true); // create PIN if not exists
            return;
        }

        setReceiverName(userId); // betting account
        setConfirmOpen(true);
    };

    // 3️⃣ Verify PIN and complete Betting payment
    const handleVerifyAndSend = async () => {
        if (!enteredPin) return alert("Enter your PIN");

        try {
            setLoading(true);

            // Verify PIN
            await axios.post(
                "http://localhost:4000/api/users/verify-pin",
                { pin: enteredPin },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Process Betting payment
            await axios.post(
                "http://localhost:4000/api/betting/pay",
                {
                    provider: selectedProvider,
                    bettingId: userId,
                    amount: Number(amount),
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setLastTransaction({
                accountNumber: userId,
                amount,
                remark: `${selectedProvider} Betting Payment`,
            });

            setPinOpen(false);
            setConfirmOpen(false);
            setSuccessOpen(true);

            setUserId("");
            setAmount("");
            setEnteredPin("");

        } catch (err) {
            console.error("Betting payment failed:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Transaction failed");
        } finally {
            setLoading(false);
        }
    };

    return (

        <>
            {loading ? <BankingLoader /> : (
                <div className="min-h-screen bg-gray-100 pb-10">

                    {/* Header */}
                    <div className="flex justify-between items-center p-5">
                        <div className="flex items-center gap-3">
                            <FaArrowLeft className="cursor-pointer" onClick={() => navigate("/dashboard")} />
                            <h2 className="text-lg font-semibold">Betting</h2>
                        </div>
                        <button onClick={() => navigate("/betting-history")} className="text-amber-600 font-medium">
                            History
                        </button>
                    </div>

                    {/* Providers */}
                    <div className="bg-white mx-4 mt-5 p-5 rounded-2xl flex justify-between mb-6">
                        {providers.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedProvider(item.name)}
                                className={`flex flex-col items-center cursor-pointer ${selectedProvider === item.name ? "text-amber-600" : "text-gray-400"}`}
                            >
                                <div className="bg-gray-100 p-3 rounded-full">
                                    <img src={item.logo} alt="" className="w-6 h-6 rounded-full object-contain" />
                                </div>
                                <p className="text-xs mt-1">{item.name}</p>
                            </div>
                        ))}
                    </div>

                    {/* Betting ID & Amount */}
                    <div className="bg-white mx-4 mt-2 p-5 rounded-2xl">
                        <label className="text-sm text-gray-500">User ID</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="Enter Betting ID"
                            className="w-full bg-gray-100 rounded-xl p-3 mt-2 outline-none mb-4"
                        />

                        <h3 className="font-medium mb-2">Select Amount</h3>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {quickAmounts.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setAmount(item)}
                                    className="bg-gray-100 rounded-xl py-5 text-lg font-semibold hover:bg-gray-200"
                                >
                                    ₦{item}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                placeholder="₦ 100 - 1,000,000"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="flex-1 border-b outline-none pb-2 text-lg"
                            />
                            <button onClick={handleConfirm} className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600">
                                Pay
                            </button>
                        </div>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>

                    {/* Modals */}
                    <TransferConfirm
                        accountNumber={userId}
                        receiverName={receiverName}
                        amount={amount}
                        open={confirmOpen}
                        onClose={() => setConfirmOpen(false)}
                        openPin={() => { setConfirmOpen(false); setPinOpen(true); }}
                    />

                    <EnterPin
                        open={pinOpen}
                        onClose={() => setPinOpen(false)}
                        pin={enteredPin}
                        setPin={setEnteredPin}
                        onComplete={handleVerifyAndSend}
                    />

                    <TransferSuccess
                        open={successOpen}
                        onClose={() => setSuccessOpen(false)}
                        accountNumber={lastTransaction.accountNumber}
                        amount={lastTransaction.amount}
                        remark={lastTransaction.remark}
                    />
                </div>
            )}

        </>

    );
};

export default BettingPage;