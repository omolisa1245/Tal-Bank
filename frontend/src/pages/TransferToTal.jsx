import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import not5 from "../assets/not5.png";
import { BsPersonFill } from "react-icons/bs";
import { MdArrowForwardIos } from "react-icons/md";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { useAppContext } from "../context/AppContext";

const TransferToTal = () => {
    const navigate = useNavigate();
    const { transactions } = useAppContext();

    const [activeTab, setActiveTab] = useState("recents");
    const [accountNumber, setAccountNumber] = useState("");
    const [receiverName, setReceiverName] = useState("");

    // Only take the latest 3 transactions
    const recents = transactions?.slice(0, 3) || [];

    // Resolve account by number
    const resolveAccount = async (number) => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.get(
                `http://localhost:4000/api/wallet/resolve/${number}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setReceiverName(res.data.name);
        } catch (error) {
            setReceiverName("Account not found");
        }
    };

    const handleAccountChange = (e) => {
        const value = e.target.value;
        setAccountNumber(value);
        setReceiverName("");
        if (value.length === 10 && /^\d+$/.test(value)) {
            resolveAccount(value);
        }
    };

    const handleRecentClick = (account, name) => {
        setAccountNumber(account);
        setReceiverName(name);
        resolveAccount(account);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 mb-20">
            {/* Header */}
            <div className="flex items-center py-2 justify-between mb-4">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                >
                    <FaArrowLeft className="text-lg" />
                    <h2 className="text-lg">Transfer to Talbank</h2>
                </div>
                <p
                    onClick={() => navigate("/history")}
                    className="text-amber-600 text-sm cursor-pointer"
                >
                    History
                </p>
            </div>

            {/* Banner */}
            <div>
                <img
                    className="h-30 w-full mb-5 object-cover rounded-3xl"
                    src={not5}
                    alt=""
                />
            </div>

            {/* Info */}
            <div className="bg-gray-700 text-gray-50 rounded-xl p-3 mb-4 text-sm">
                Instant, Zero Issues, Free
            </div>

            {/* Recipient Input */}
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                <h3 className="font-semibold mb-3">Recipient Account</h3>
                <input
                    type="text"
                    placeholder="Account Number"
                    className="w-full bg-gray-100 p-3 rounded-xl outline-none"
                    value={accountNumber}
                    onChange={handleAccountChange}
                />

                {receiverName && (
                    <div
                        onClick={() =>
                            receiverName !== "Account not found" &&
                            navigate("/send-money", {
                                state: { accountNumber, receiverName },
                            })
                        }
                        className={`mt-2 flex items-center gap-4 text-sm cursor-pointer ${receiverName === "Account not found"
                            ? "text-red-500"
                            : "text-green-600"
                            }`}
                    >
                        <CgProfile className="text-gray-400 text-2xl" />
                        <div>
                            <p className="text-sm font-bold">{receiverName}</p>
                            <p className="text-xs text-gray-500">{accountNumber}</p>
                        </div>
                    </div>
                )}

                <p className="text-sm text-gray-500 mt-2">
                    Don’t know the account number?{" "}
                    <span className="text-amber-600 cursor-pointer">Ask them →</span>
                </p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex justify-around mb-4">
                    <button
                        onClick={() => setActiveTab("recents")}
                        className={`pb-2 ${activeTab === "recents"
                            ? "text-amber-600 border-b-2 border-amber-600"
                            : "text-gray-500"
                            }`}
                    >
                        Recents
                    </button>

                    <button
                        onClick={() => setActiveTab("favourites")}
                        className={`pb-2 ${activeTab === "favourites"
                            ? "text-amber-600 border-b-2 border-amber-600"
                            : "text-gray-500"
                            }`}
                    >
                        Favourites
                    </button>
                </div>

                {/* Recents */}
                {activeTab === "recents" && recents.length === 0 && (
                    <p className="text-center text-gray-400 py-4">
                        No recent transactions
                    </p>
                )}

                {activeTab === "recents" &&
                    recents.map((item, index) => (
                        <div
                            key={item._id || index}
                            onClick={() =>
                                handleRecentClick(
                                    item.receiver?.accountNumber,
                                    `${item.receiver?.firstName || ""} ${item.receiver?.lastName || ""}`.trim()
                                )
                            }
                            className="cursor-pointer"
                        >
                            <div className="flex items-center gap-3 py-3">
                                <div className="w-10 relative h-10 bg-gray-200 rounded-full">
                                    <BsPersonFill className="absolute text-3xl left-1 top-1 text-stone-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">
                                        {`${item.receiver?.firstName || ""} ${item.receiver?.lastName || ""}`.trim() || "Unknown"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {item.receiver?.accountNumber || "No account"}
                                    </p>
                                </div>
                            </div>
                            <div className="w-[90%] h-0.5 bg-stone-100"></div>
                        </div>
                    ))}

                {/* View All */}
                <div className="flex items-center text-sm justify-center py-5">
                    <div className="flex items-center gap-3.5 mt-8 bg-gray-300 rounded-4xl p-2 cursor-pointer">
                        <span>View All</span>
                        <MdArrowForwardIos />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransferToTal;