import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import mtn from "../assets/mtn.png";
import glo from "../assets/glo.png";
import airtel from "../assets/airtel.png";
import mobile from "../assets/mobile.png";

import TransferConfirm from "./TransferConfirm";
import EnterPin from "./EnterPin";
import TransferSuccess from "./TransferSuccess";
import BankingLoader from "../component/BankingLoader";

const DataPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const networks = [
        { name: "MTN", logo: mtn },
        { name: "Airtel", logo: airtel },
        { name: "Glo", logo: glo },
        { name: "9mobile", logo: mobile },
    ];

    const dataPlans = [
        { size: "1GB", price: 500 },
        { size: "2.5GB", price: 750 },
        { size: "3.5GB", price: 1500 },
    ];

    const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [phone, setPhone] = useState("");
    const [plan, setPlan] = useState("1GB");
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
        if (!phone || !plan || !amount || Number(amount) <= 0) {
            setError("Enter all fields and valid amount");
            return;
        }
        setError("");

        try {
            const hasPin = await checkUserPin();
            if (!hasPin) {
                setPinOpen(true); // show create PIN modal if none
                return;
            }

            setReceiverName(phone); // could resolve name from backend
            setConfirmOpen(true); // show confirm modal
        } catch (err) {
            console.error("PIN check failed:", err);
            alert("Unable to verify PIN status");
        }
    };

    // 3️⃣ Verify PIN and complete Data purchase
    const handleVerifyAndSend = async () => {
        if (!enteredPin) return alert("Enter your PIN");

        try {
            setLoading(true);

            // Verify PIN with backend
            await axios.post(
                "http://localhost:4000/api/users/verify-pin",
                { pin: enteredPin },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Perform Data purchase
            await axios.post(
                "http://localhost:4000/api/data/buy",
                {
                    phoneNumber: phone,
                    network: selectedNetwork.name,
                    plan,
                    amount: Number(amount),
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Save transaction details
            setLastTransaction({
                accountNumber: phone,
                amount,
                remark: `Data top-up (${plan}) for ${selectedNetwork.name}`,
            });

            // Close modals & reset
            setPinOpen(false);
            setConfirmOpen(false);
            setSuccessOpen(true);
            setPhone("");
            setAmount("");
            setEnteredPin("");

        } catch (err) {
            console.error("Data purchase failed:", err.response?.data || err.message);
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
                            <h2 className="text-lg font-semibold">Mobile Data</h2>
                        </div>
                        <button onClick={() => navigate("/data-history")} className="text-amber-600 font-medium">
                            History
                        </button>
                    </div>

                    {/* Network + Phone */}
                    <div className="bg-white mx-4 mt-4 p-4 rounded-xl flex justify-between items-center">
                        <div className="flex items-center gap-3 relative">
                            <button onClick={() => setOpenDropdown(!openDropdown)} className="flex items-center gap-2 px-3 py-2">
                                <img src={selectedNetwork.logo} alt={selectedNetwork.name} className="w-6 h-6 rounded-full" />
                                <span className="text-sm">{selectedNetwork.name}</span>
                                <ChevronDown size={16} />
                            </button>

                            {openDropdown && (
                                <div className="absolute top-12 left-0 bg-white border shadow rounded-lg w-40 z-10">
                                    {networks.map((n, i) => (
                                        <div key={i} onClick={() => { setSelectedNetwork(n); setOpenDropdown(false); }} className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                                            <img src={n.logo} alt="" className="w-6 h-6" />
                                            {n.name}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone number" className="outline-none text-lg ml-2" />
                        </div>

                        <ChevronRight size={20} />
                    </div>

                    {/* Data Plans */}
                    <div className="bg-white mx-4 mt-5 p-5 rounded-2xl">
                        <h3 className="font-semibold mb-4">Data Plans</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {dataPlans.map((p, i) => (
                                <div key={i} className={`bg-gray-100 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-200 ${plan === p.size ? "border-2 border-amber-500" : ""}`}
                                    onClick={() => { setPlan(p.size); setAmount(p.price); }}
                                >
                                    <p className="font-bold text-lg">{p.size}</p>
                                    <p className="mt-2 font-semibold">₦{p.price}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center mt-6 gap-4">
                            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="₦" className="flex-1 border-b outline-none pb-2 text-lg" />
                            <button onClick={handleConfirm} className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600">
                                {loading ? "Processing..." : "Buy"}
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

export default DataPage;