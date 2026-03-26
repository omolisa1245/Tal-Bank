import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import not5 from "../assets/not5.png";
import mtn from "../assets/mtn.png";
import glo from "../assets/glo.png";
import airtel from "../assets/airtel.png";
import mobile from "../assets/mobile.png";

import TransferConfirm from "./TransferConfirm";
import EnterPin from "./EnterPin";
import TransferSuccess from "./TransferSuccess";
import BankingLoader from "../component/BankingLoader";


const AirtimePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");


    const networks = [
        { name: "MTN", logo: mtn },
        { name: "Airtel", logo: airtel },
        { name: "Glo", logo: glo },
        { name: "9mobile", logo: mobile },
    ];

    const quickAmounts = [50, 100, 200, 500, 1000, 2000];

    const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [phone, setPhone] = useState("");
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
        setLoading(true); // START loader

        try {
            const res = await axios.get(
                "https://tal-bank-9dzh.vercel.app/api/users/check-pin",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return res.data.hasPin;
        } catch (err) {
            console.error("Error checking PIN:", err.response?.data || err.message);
            return false;
        } finally {
            setLoading(false); // STOP loader
        }
    };

    // 2️⃣ Handle Confirm button click
    const handleConfirm = async () => {
        if (!amount || Number(amount) <= 0) {
            setError("You need to enter an amount");
            return;
        }
        if (!phone) {
            setError("Enter a phone number");
            return;
        }
        setError("");

        try {
            const hasPin = await checkUserPin();
            if (!hasPin) {
                setPinOpen(true); // show create PIN modal if none
                return;
            }

            setReceiverName(phone); // you can call resolveAccount(phone, selectedNetwork.name) if needed
            setConfirmOpen(true); // show TransferConfirm modal
        } catch (err) {
            console.error("PIN check failed:", err);
            alert("Unable to verify PIN status");
        }
    };

    // 3️⃣ Verify PIN and complete Airtime transaction
    const handleVerifyAndSend = async () => {
        if (!enteredPin) return alert("Enter your PIN");

        try {
            setLoading(true);

            // Verify PIN with backend
            await axios.post(
                "https://tal-bank-9dzh.vercel.app/api/users/verify-pin",
                { pin: enteredPin },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Perform Airtime transaction
            await axios.post(
                "https://tal-bank-9dzh.vercel.app/api/airtime/buy-airtime",
                {
                    phoneNumber: phone,
                    amount: Number(amount),
                    network: selectedNetwork.name
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Save transaction details
            setLastTransaction({
                accountNumber: phone,
                amount,
                remark: `Airtime top-up for ${selectedNetwork.name}`
            });

            // Close modals and reset form
            setPinOpen(false);
            setConfirmOpen(false);
            setSuccessOpen(true);
            setPhone("");
            setAmount("");
            setEnteredPin("");

        } catch (err) {
            console.error("Airtime transaction failed:", err.response?.data || err.message);
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
                            <FaArrowLeft className="cursor-pointer" onClick={() => navigate('/dashboard')} />
                            <h2 className="text-lg font-semibold">Airtime</h2>
                        </div>
                        <button onClick={() => navigate("/airtime-history")} className="text-amber-600 font-medium">
                            History
                        </button>
                    </div>

                    {/* Banner */}
                    <div className="px-4">
                        <img src={not5} alt="promo" className="rounded-xl w-full h-35 object-cover" />
                    </div>

                    {/* Phone + Network */}
                    <div className="bg-white mx-4 mt-4 p-4 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3 relative">
                            {/* Network Dropdown */}
                            <button onClick={() => setOpenDropdown(!openDropdown)} className="flex items-center gap-2 px-3 py-2">
                                <img src={selectedNetwork.logo} alt={selectedNetwork.name} className="w-6 h-6 rounded-full object-contain" />
                                <span className="text-sm font-medium">{selectedNetwork.name}</span>
                                <ChevronDown size={16} />
                            </button>

                            {openDropdown && (
                                <div className="absolute top-12 left-0 w-40 bg-white shadow-lg rounded-lg border z-10">
                                    {networks.map((network, index) => (
                                        <div
                                            key={index}
                                            onClick={() => { setSelectedNetwork(network); setOpenDropdown(false); }}
                                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <img src={network.logo} alt={network.name} className="w-6 h-6 object-contain" />
                                            <span className="text-sm">{network.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Phone Input */}
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter phone number"
                                className="outline-none text-lg font-medium ml-2"
                            />
                        </div>
                        <ChevronRight size={20} />
                    </div>

                    {/* Top Up Section */}
                    <div className="bg-white mx-4 mt-5 p-5 rounded-2xl">
                        <h3 className="font-semibold text-gray-700 mb-4">Top up</h3>

                        <div className="grid grid-cols-3 gap-3">
                            {quickAmounts.map((item, index) => (
                                <button key={index} onClick={() => setAmount(item)}
                                    className="bg-gray-100 rounded-xl py-5 text-lg font-semibold hover:bg-gray-200">
                                    ₦{item}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center mt-6 gap-4">
                            <input
                                type="number"
                                placeholder="₦ 50 - 500,000"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="flex-1 border-b outline-none pb-2 text-lg"
                            />
                            <button
                                onClick={handleConfirm}
                                className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600"
                            >
                                {loading ? "Processing..." : "Pay"}
                            </button>
                        </div>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>

                    {/* Modals */}
                    <TransferConfirm
                        accountNumber={phone}
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

export default AirtimePage;