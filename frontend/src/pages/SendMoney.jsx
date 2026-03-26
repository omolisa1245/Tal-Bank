import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import TransferConfirm from "./TransferConfirm";
import EnterPin from "./EnterPin";
import TransferSuccess from "./TransferSuccess";
import CreateTransactionPinModal from "./CreateTransactionPinModal";
import { useAppContext } from "../context/AppContext";

const checkUserPin = async () => {
    try {
        const token = localStorage.getItem("authToken"); // correct key
        if (!token) throw new Error("No token found");

        const res = await axios.get(
            "https://tal-bank-sandy.vercel.app/api/users/check-pin",
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data.hasPin;
    } catch (error) {
        console.error("Failed to check PIN", error);
        return false;
    }
};



const SendMoney = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pinCreated, setPinCreated } = useAppContext();

    const [showPinModal, setShowPinModal] = useState(false);
    const [pinOpen, setPinOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const [amount, setAmount] = useState("");
    const [remark, setRemark] = useState("");
    const [enteredPin, setEnteredPin] = useState("");
    const [error, setError] = useState("");
    const [lastTransaction, setLastTransaction] = useState({
        accountNumber: "",
        amount: 0,
        remark: ""
    });

    const { accountNumber, receiverName } = location.state || {};
    const quickAmounts = [500, 1000, 2000, 5000, 9999, 10000];


    // Validate amount and open confirmation modal
    const handleConfirm = async () => {

        if (!amount || Number(amount) <= 0) {
            setError("You need to enter an amount");
            return;
        }

        setError("");

        const hasPin = await checkUserPin();

        if (!hasPin) {
            setShowPinModal(true);   // show create PIN only if needed
            return;
        }

        setConfirmOpen(true);
    };

    // Verify PIN and send transaction
    const handleVerifyAndSend = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");


            await axios.post(
                "https://tal-bank-sandy.vercel.app/api/users/verify-pin",
                { pin: enteredPin },
                { headers: { Authorization: `Bearer ${token}` } }
            );




            console.log("Account:", accountNumber);
            console.log("Amount:", amount);
            console.log("Remark:", remark);

            const transferRes = await axios.post(
                "https://tal-bank-sandy.vercel.app/api/transactions/transfer",
                {
                    accountNumber: accountNumber,
                    amount: Number(amount),
                    pin: enteredPin
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // Save transaction for success modal
            setLastTransaction({
                accountNumber,
                amount,
                remark
            });

            setPinOpen(false);
            setSuccessOpen(true);


        } catch (err) {
            console.error("Transaction error:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Transaction failed");
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const fetchPinStatus = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) return;

            const res = await axios.get(
                "https://tal-bank-sandy.vercel.app/api/users/check-pin",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!res.data.hasPin) setShowPinModal(true);
            else setPinCreated(true);  // update context

        };

        fetchPinStatus();
    }, []);



    return (

        <>
            {loading ? <BankingLoader /> : (

                <div className="min-h-screen bg-gray-50 p-4">

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                        <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
                        <h2 className="text-lg font-semibold">Transfer To Tal Account</h2>
                    </div>

                    {/* Create PIN Modal */}
                    {showPinModal && (
                        <CreateTransactionPinModal onClose={() => setShowPinModal(false)} />
                    )}

                    {/* Receiver Info */}
                    <div className="bg-gray-500 p-4 rounded-xl mb-4 shadow">
                        <div className="mt-2 flex items-center gap-4 text-sm text-amber-600 cursor-pointer">
                            <CgProfile className="text-gray-100 text-4xl" />
                            <div>
                                <p className="text-gray-50 text-sm font-bold">{receiverName}</p>
                                <p className="text-gray-50 text-sm">{accountNumber}</p>
                            </div>
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div className="bg-white p-4 rounded-xl shadow mb-4">
                        {error && <p className="text-red-500 text-sm mb-1">{error}</p>}
                        <p className="font-semibold mb-2">Amount</p>
                        <input
                            type="number"
                            placeholder="₦ Enter amount"
                            value={amount}
                            onChange={(e) => { setAmount(e.target.value); setError(""); }}
                            className={`w-full p-3 border rounded-lg outline-none transition 
            ${error ? "border-red-500" : "border-gray-300"}`}
                        />
                        {/* Quick Amount Buttons */}
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            {quickAmounts.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setAmount(item)}
                                    className="bg-gray-100 text-amber-700 text-sm py-2 rounded-lg"
                                >
                                    ₦{item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Remark Input */}
                    <div className="bg-white p-4 rounded-xl shadow mb-4">
                        <p className="font-semibold mb-2">Remark</p>
                        <input
                            type="text"
                            placeholder="What's this for? (Optional)"
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            className="w-full outline-none border-b border-gray-200 pb-2"
                        />
                    </div>

                    {/* Confirm Button */}
                    <button
                        onClick={handleConfirm}
                        className="bg-amber-500 text-white w-full py-4 mt-12 rounded-full font-semibold"
                    >
                        Confirm Transfer
                    </button>

                    {/* Transfer Confirm Modal */}
                    <TransferConfirm
                        accountNumber={accountNumber}
                        receiverName={receiverName}
                        amount={amount}
                        open={confirmOpen}
                        onClose={() => setConfirmOpen(false)}
                        openPin={() => { setConfirmOpen(false); setPinOpen(true); }}
                    />

                    {/* Enter PIN Modal */}
                    <EnterPin
                        open={pinOpen}
                        onClose={() => setPinOpen(false)}
                        pin={enteredPin}
                        setPin={setEnteredPin}
                        onComplete={handleVerifyAndSend}
                    />

                    {/* Success Modal */}
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

export default SendMoney;