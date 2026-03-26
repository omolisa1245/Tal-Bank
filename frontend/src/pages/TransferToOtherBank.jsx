import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

import not1 from "../assets/not1.jpg";
import firstBank from "../assets/firstBank.svg";
import zenithBank from "../assets/zenithBank.svg";
import accessBank from "../assets/accessBank.svg";
import gtBank from "../assets/gtBank.svg";

import EnterPin from "./EnterPin";
import TransferSuccess from "./TransferSuccess";
import TransferConfirm from "./TransferConfirm";
import BankingLoader from "../component/BankingLoader";

const TransferToOtherBank = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    // 🔹 STATES
    const [accountNumber, setAccountNumber] = useState("");
    const [selectedBank, setSelectedBank] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [amount, setAmount] = useState("");
    const [accountName, setAccountName] = useState("");
    const [remark, setRemark] = useState("");
    const [loading, setLoading] = useState(false);
    const [banks, setBanks] = useState([]);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pinOpen, setPinOpen] = useState(false);
    const [enteredPin, setEnteredPin] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);

    const [lastTransaction, setLastTransaction] = useState({
        accountNumber: "",
        amount: 0,
        remark: "",
    });

    // 🔥 FIX: Match logo using bank name (NOT code)
    const getBankLogo = (name) => {
        const lower = name.toLowerCase();

        if (lower.includes("first")) return firstBank;
        if (lower.includes("zenith")) return zenithBank;
        if (lower.includes("access")) return accessBank;
        if (lower.includes("gt")) return gtBank;

        return null;
    };

    // 🔹 FETCH BANKS
    const fetchBanks = async () => {
        try {
            const res = await axios.get(
                "http://localhost:4000/api/paystack/banks",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const mapped = res.data.data.map((bank) => ({
                ...bank,
                logo: getBankLogo(bank.name), // ✅ FIXED
            }));

            setBanks(mapped);
        } catch (err) {
            console.log("Bank fetch error", err);
        }
    };

    useEffect(() => {
        fetchBanks();
    }, []);

    // 🔹 RESOLVE ACCOUNT (debounced)
    useEffect(() => {
        if (accountNumber.length === 10 && selectedBank) {
            const timer = setTimeout(() => {
                resolveAccount(accountNumber, selectedBank.code);
            }, 800);

            return () => clearTimeout(timer);
        }
    }, [accountNumber, selectedBank]);

    const resolveAccount = async (acc, code) => {
        if (loading || accountName) return; // ✅ prevent repeat calls

        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:4000/api/paystack/resolve-account",
                { account_number: acc, bank_code: code },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setAccountName(res.data.account_name);
        } catch (err) {
            console.log("Resolve error:", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 TRANSFER
    const handlePaystackTransfer = async (pin) => {
        if (!pin) return alert("Enter PIN");
        if (!selectedBank) return alert("Select bank");

        try {
            setLoading(true);

            const recipientRes = await axios.post(
                "http://localhost:4000/api/paystack/create-recipient",
                {
                    account_number: accountNumber,
                    bank_code: selectedBank.code,
                    name: accountName,

                },
                { headers: { Authorization: `Bearer ${token}` } }

            );

            const recipientCode = recipientRes.data.data.recipient_code;

            await axios.post(
                "http://localhost:4000/api/paystack/transfer-bank",
                {
                    recipient_code: recipientCode,
                    amount: Number(amount),
                    reason: remark || "Transfer",
                    pin,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPinOpen(false);
            setLastTransaction({ accountNumber, amount, remark });
            setShowSuccessModal(true);
            
            setAccountNumber("");
            setSelectedBank(null);
            setAccountName("");
            setAmount("");
            setRemark("");
            setEnteredPin("");
        } catch (err) {
            console.log("ERROR:", err.response?.data || err.message);
            setShowFailModal(true);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid =
        accountNumber.length === 10 &&
        selectedBank &&
        Number(amount) > 0 &&
        accountName;

    return (
        <>
            {loading ? (
                <BankingLoader />
            ) : (
                <div className="min-h-screen bg-gray-100 p-4">

                    {/* HEADER */}
                    <div
                        onClick={() => navigate("/dashboard")}
                        className="flex gap-2 mb-4 cursor-pointer"
                    >
                        <FaArrowLeft />
                        <h2>Transfer to Bank</h2>
                    </div>

                    {/* BANNER */}
                    <img
                        src={not1}
                        className="h-32 w-full rounded-xl mb-4"
                        alt=""
                    />

                    {/* FORM */}
                    <div className="bg-white p-4 rounded-xl">

                        <input
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder="Account Number"
                            className="w-full p-3 mb-2 bg-gray-100"
                        />

                        {accountName && (
                            <p className="text-green-600">{accountName}</p>
                        )}

                        {/* BANK SELECT */}
                        <div
                            onClick={() => setOpenDropdown(!openDropdown)}
                            className="p-3 bg-gray-100 cursor-pointer flex justify-between items-center"
                        >
                            {selectedBank ? (
                                <div className="flex items-center gap-2">
                                    {selectedBank.logo && (
                                        <img
                                            src={selectedBank.logo}
                                            alt=""
                                            className="w-6 h-6"
                                        />
                                    )}
                                    <span>{selectedBank.name}</span>
                                </div>
                            ) : (
                                "Select Bank"
                            )}
                        </div>

                        {/* DROPDOWN */}
                        {openDropdown && (
                            <div className="bg-white shadow mt-1 rounded max-h-60 overflow-y-auto">
                                {banks.map((b, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setSelectedBank(b);
                                            setOpenDropdown(false);
                                        }}
                                        className="p-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2"
                                    >
                                        {b.logo && (
                                            <img
                                                src={b.logo}
                                                alt=""
                                                className="w-5 h-5"
                                            />
                                        )}
                                        <span>{b.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Amount"
                            className="w-full p-3 mt-3 bg-gray-100"
                        />

                        <input
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            placeholder="Remark"
                            className="w-full p-3 mt-3 bg-gray-100"
                        />

                        <button
                            onClick={() => setConfirmOpen(true)}
                            disabled={!isFormValid}
                            className="w-full mt-4 bg-amber-600 text-white py-3 rounded"
                        >
                            Transfer
                        </button>
                    </div>

                    {/* CONFIRM */}
                    <TransferConfirm
                        accountNumber={accountNumber}
                        receiverName={accountName}
                        amount={amount}
                        open={confirmOpen}
                        onClose={() => setConfirmOpen(false)}
                        openPin={() => {
                            setConfirmOpen(false);
                            setPinOpen(true);
                        }}
                    />

                    {/* PIN */}
                    <EnterPin
                        open={pinOpen}
                        onClose={() => setPinOpen(false)}
                        pin={enteredPin}
                        setPin={setEnteredPin}
                        onComplete={handlePaystackTransfer}
                    />

                    {/* SUCCESS */}
                    <TransferSuccess
                        open={showSuccessModal}
                        onClose={() => setShowSuccessModal(false)}
                        accountNumber={lastTransaction.accountNumber}
                        amount={lastTransaction.amount}
                        remark={lastTransaction.remark}
                    />

                    {/* FAIL */}
                    {showFailModal && (
                        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                            <div className="bg-white p-4 rounded">
                                <p className="text-red-500">Transfer Failed</p>
                                <button onClick={() => setShowFailModal(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default TransferToOtherBank;