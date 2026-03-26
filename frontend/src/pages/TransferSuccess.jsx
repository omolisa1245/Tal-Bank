import React, { useState } from "react";
import BankingLoader from "../component/BankingLoader";

const TransferSuccess = ({ open, onClose, amount }) => {

    const [loading, setLoaading] = useState(false)
    return (
        <>
            {loading ? <BankingLoader /> : (
                <div
                    className={`fixed inset-0 flex items-center justify-center bg-black/40 transition ${open ? "visible opacity-100" : "invisible opacity-0"
                        }`}
                >
                    <div className="bg-white w-[320px] rounded-3xl p-8 text-center shadow-xl">

                        {/* Animated Circle */}
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center animate-bounce">
                                <svg
                                    className="w-10 h-10 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Transfer Successful
                        </h2>

                        <p className="text-gray-500 mb-6">
                            ₦{Number(amount).toLocaleString()} has been sent successfully.
                        </p>

                        <button
                            onClick={onClose}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-full font-semibold"
                        >
                            Done
                        </button>

                    </div>
                </div>
            )}
        </>

    );
};

export default TransferSuccess;