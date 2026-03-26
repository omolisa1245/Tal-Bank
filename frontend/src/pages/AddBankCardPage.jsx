import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { FiInfo } from "react-icons/fi";

const AddBankCardPage = () => {

    const [tab, setTab] = useState("card");

    return (
        <div className="max-w-md mx-auto min-h-screen bg-gray-100 pb-20">

            {/* HEADER */}
            <div className="flex items-center gap-3 p-4">
                <IoChevronBack className="text-xl cursor-pointer" />
                <h1 className="text-lg font-semibold">
                    Add a Bank Card/Account
                </h1>
            </div>

            {/* TABS */}
            <div className="flex justify-around">

                <button
                    onClick={() => setTab("card")}
                    className={`pb-3 font-medium ${tab === "card"
                            ? "text-amber-600 border-b-2 border-amber-600"
                            : "text-gray-400"
                        }`}
                >
                    Bank Card
                </button>

                <button
                    onClick={() => setTab("account")}
                    className={`pb-3 font-medium ${tab === "account"
                            ? "text-amber-600 border-b-2 border-amber-600"
                            : "text-gray-400"
                        }`}
                >
                    Bank Account
                </button>

            </div>

            {/* BVN NOTICE */}
            <div className="mx-4 mt-4 bg-amber-100 p-4 rounded-xl text-sm text-gray-700">
                To ensure the security of your funds, you can only add a bank card
                linked to your <span className="font-semibold text-amber-700">BVN(3344******)</span>
            </div>

            {/* FORM CARD */}
            <div className="bg-white mx-4 mt-4 rounded-2xl p-5">

                {/* CARD NUMBER */}
                <label className="text-sm text-gray-700">Card Number</label>

                <input
                    type="text"
                    placeholder="Enter 16-19 digit card number"
                    className="w-full bg-gray-100 rounded-xl p-4 mt-2 outline-none"
                />

                <p className="text-red-500 text-sm mt-2">
                    Invalid card number
                </p>

                {/* EXPIRY + CVV */}
                <div className="grid grid-cols-2 gap-4 mt-5">

                    <div>
                        <label className="text-sm text-gray-700">
                            Expiry Date
                        </label>

                        <div className="flex items-center bg-gray-100 rounded-xl p-4 mt-2">
                            <input
                                type="text"
                                placeholder="MM"
                                className="bg-transparent w-10 outline-none"
                            />

                            <span className="mx-2">/</span>

                            <input
                                type="text"
                                placeholder="YY"
                                className="bg-transparent w-10 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-700 flex items-center gap-1">
                            CVV <FiInfo className="text-gray-400 text-xs" />
                        </label>

                        <input
                            type="text"
                            placeholder="Enter CVV"
                            className="w-full bg-gray-100 rounded-xl p-4 mt-2 outline-none"
                        />
                    </div>

                </div>

                {/* PIN */}
                <div className="mt-5">
                    <label className="text-sm text-gray-700">
                        PIN
                    </label>

                    <input
                        type="password"
                        placeholder="Enter Card PIN"
                        className="w-full bg-gray-100 rounded-xl p-4 mt-2 outline-none"
                    />
                </div>

            </div>

            {/* FOOTER TEXT */}
            <p className="text-center text-sm text-gray-500 mt-6">
                Add <span className="text-amber-600 font-semibold">₦1.00</span> to your
                OPay account for bank card verification
            </p>

            {/* CONFIRM BUTTON */}
            <div className="px-4 mt-6">
                <button className="w-full bg-amber-400 text-white py-4 rounded-full text-lg font-semibold">
                    Confirm
                </button>
            </div>

        </div>
    );
};

export default AddBankCardPage;