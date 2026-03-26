import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const TransferConfirm = ({ open, onClose, amount, accountNumber, receiverName, openPin }) => {

    const [activeBtn, setActiveBtn] = useState("pay");
    const { balance, formatMoney, } = useAppContext();

    const handleRecheck = () => {
        setActiveBtn("recheck");
        setTimeout(() => {
            onClose();   // slide back
        }, 200);
    };

    const handlePay = () => {
        setActiveBtn("pay");
        console.log("Payment processing...");
    };

    return (
        <div
            className={`fixed  left-0 right-0 top-50 flex items-end justify-center transition-all duration-300 ${open ? "visible" : "invisible"
                }`}
        >

            {/* Overlay */}
            <div
                className={`absolute left-0 right-0 top-85 bg-black transition-opacity duration-300 ${open ? "opacity-40" : "opacity-0"
                    }`}
                onClick={onClose}
            ></div>

            {/* Bottom Sheet */}
            <div
                className={`relative  bg-white w-full rounded-t-3xl px-6 pb-26 transform transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"
                    }`}
                style={{ height: "50vh" }}
            >

                <div className="mt-2">
                    <button
                        className="absolute top-4 left-4 text-gray-500"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                    <h1 className="text-center text-xl font-bold text-gray-800 mb-6">
                        ₦{Number(amount).toLocaleString()}
                    </h1>
                </div>

                <div className="space-y-3 text-gray-600">

                    <div className="flex justify-between">
                        <span>Account Number</span>
                        <span>{accountNumber}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Name</span>
                        <span className="font-medium">{receiverName}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Amount</span>
                        <span className="bg-amber-100 text-amber-600 px-2 rounded">
                            ₦{Number(amount).toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-gray-100 rounded-xl">
                    <p className="font-medium">Available Balance {formatMoney(balance)}</p>

                    <div className="flex justify-between mt-2 text-sm">
                        <span>Wallet</span>
                        <span>- ₦{Number(amount).toLocaleString()}</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-5 mt-6">

                    {/* Recheck */}
                    <button
                        onClick={handleRecheck}
                        className={`w-full py-3 rounded-full font-semibold transition ${activeBtn === "recheck"
                            ? "bg-gray-600 text-white"
                            : "bg-gray-200 text-gray-600"
                            }`}
                    >
                        Recheck
                    </button>

                    {/* Pay */}
                    <button
                        onClick={() => {
                            onClose();      // close confirm page
                            setTimeout(() => {
                                openPin();    // open pin page
                            }, 300);
                        }}
                        className={`w-full py-3 rounded-full font-semibold transition ${activeBtn === "pay"
                            ? "bg-amber-500 text-white"
                            : "bg-amber-200 text-amber-600"
                            }`}
                    >
                        Pay
                    </button>

                </div>

            </div>
        </div>
    );
};

export default TransferConfirm;