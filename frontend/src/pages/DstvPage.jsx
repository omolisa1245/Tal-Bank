import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TransferConfirm from "./TransferConfirm";
import EnterPin from "./EnterPin";
import TransferSuccess from "./TransferSuccess";
import BankingLoader from "../component/BankingLoader";

const packages = [
    { name: "DStv Renewal", price: null },
    { name: "DStv Padi", price: 4400 },
    { name: "DStv Yanga", price: 6000 },
    { name: "DStv Confam", price: 11000 },
    { name: "DStv Compact", price: 19000 },
    { name: "DStv Compact Plus", price: 30000 },
    { name: "DStv Stream Premium", price: 44500 },
];

export default function DstvPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const [smartcard, setSmartcard] = useState("");
    const [tab, setTab] = useState("hot");
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Modal states
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pinOpen, setPinOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [enteredPin, setEnteredPin] = useState("");
    const [lastTransaction, setLastTransaction] = useState({});

    // 1️⃣ Handle Confirm button click
    const handleConfirm = () => {
        if (!smartcard || !selectedPackage || !amount || Number(amount) <= 0) {
            setError("Enter Smartcard number and select a package");
            return;
        }
        setError("");
        setConfirmOpen(true);
    };

    // 2️⃣ Verify PIN and finalize payment
    const handleConfirmPin = async () => {
        if (!enteredPin) return alert("Enter your PIN");

        try {
            setLoading(true);

            // Verify PIN
            await axios.post(
                "https://tal-bank-9dzh.vercel.app/api/users/verify-pin",
                { pin: enteredPin },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Process DStv payment
            await axios.post(
                "https://tal-bank-9dzh.vercel.app/api/tv/pay",
                {
                    smartcard,
                    package: selectedPackage.name,
                    amount: Number(amount),
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Save last transaction for success modal
            setLastTransaction({
                accountNumber: smartcard,
                amount,
                remark: `${selectedPackage.name} Payment`,
            });

            setPinOpen(false);
            setConfirmOpen(false);
            setSuccessOpen(true);

            // Reset form
            setSmartcard("");
            setSelectedPackage(null);
            setAmount("");
            setEnteredPin("");

        } catch (err) {
            console.error("Payment failed:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Transaction failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? <BankingLoader /> : (

                <div className="bg-gray-100 min-h-screen pb-10">

                    {/* Header */}
                    <div className="flex justify-between items-center p-4">
                        <div className="flex items-center gap-3">
                            <ArrowLeft onClick={() => navigate('/')} size={20} />
                            <h2 className="text-lg font-semibold">TV</h2>
                        </div>
                        <span className="text-amber-600 font-medium">History</span>
                    </div>

                    {/* Provider Card */}
                    <div className="bg-white mx-4 rounded-xl p-4 flex items-center gap-3">
                        <div className="bg-amber-700 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold">
                            D
                        </div>
                        <p className="font-semibold">DStv</p>
                        <span className="text-gray-400 ml-auto">›</span>
                    </div>

                    {/* Smartcard Input */}
                    <div className="bg-white mx-4 mt-4 rounded-xl">
                        <div className="flex justify-between p-4 border-b border-gray-200 text-gray-500">
                            <h3 className="font-bold text-lg">Smartcard Number</h3>
                            <span>Beneficiaries ›</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Your Smartcard Number"
                            value={smartcard}
                            onChange={(e) => setSmartcard(e.target.value)}
                            className="w-full p-4 outline-none"
                        />
                    </div>

                    {/* Packages */}
                    <div className="bg-white mx-4 mt-4 rounded-xl p-4">
                        <div className="flex gap-6 mb-4">
                            <button
                                onClick={() => setTab("hot")}
                                className={`pb-1 ${tab === "hot" ? "border-b-2 border-amber-600 text-black" : "text-gray-400"}`}
                            >
                                Hot offers
                            </button>
                            <button
                                onClick={() => setTab("premium")}
                                className={`pb-1 ${tab === "premium" ? "border-b-2 border-amber-600 text-black" : "text-gray-400"}`}
                            >
                                Premium
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {packages.map((pkg, i) => (
                                <div
                                    key={i}
                                    className={`bg-gray-100 rounded-xl p-4 cursor-pointer ${selectedPackage === pkg ? "border-2 border-amber-500" : ""}`}
                                    onClick={() => {
                                        setSelectedPackage(pkg);
                                        setAmount(pkg.price || "");
                                    }}
                                >
                                    <p className="font-medium">{pkg.name}</p>
                                    {pkg.price ? (
                                        <>
                                            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded mt-1 inline-block">1 Month</span>
                                            <p className="mt-2 font-semibold">₦{pkg.price.toLocaleString()}</p>
                                        </>
                                    ) : (
                                        <p className="text-gray-400 mt-2">Enter amount</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {error && <p className="text-red-500 mt-2">{error}</p>}

                        <div className="flex items-center mt-6 gap-4">
                            <input
                                type="number"
                                placeholder="₦"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="flex-1 border-b outline-none pb-2 text-lg"
                            />
                            <button
                                onClick={handleConfirm}
                                className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600"
                            >
                                Pay
                            </button>
                        </div>
                    </div>

                    {/* Modals */}
                    <TransferConfirm
                        accountNumber={smartcard}
                        receiverName={selectedPackage?.name}
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
                        onComplete={handleConfirmPin}
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
}