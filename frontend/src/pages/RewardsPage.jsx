import React, { useState } from "react";
import {
    FaChartLine,
    FaBullseye,
    FaLock,
    FaPiggyBank,
    FaWallet,
} from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { Eye, EyeOff } from "lucide-react";
import { useAppContext } from "../context/AppContext";


const FinancePage = () => {

    const [show, setShow] = useState(true);
     const { balance, formatMoney, } = useAppContext();
    const features = [
        { name: "OWealth", icon: <FaChartLine /> },
        { name: "Targets", icon: <FaBullseye /> },
        { name: "SafeBox", icon: <FaPiggyBank /> },
        { name: "Fixed", icon: <FaLock /> },
        { name: "Spend & Save", icon: <FaWallet /> },
    ];

    return (
        <div className="w-full mx-auto bg-gray-100 min-h-screen pb-20">

            {/* HEADER */}
            <div className="p-5 w-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Finance</h1>
                    <FiSettings className="text-xl text-gray-500" />
                </div>

                {/* TABS */}
                <div className="flex gap-8 mt-5 text-gray-500">
                    <p className="font-semibold border-b-4 border-black pb-1 text-black">
                        Savings
                    </p>
                    <p>Loan</p>
                </div>
            </div>

            {/* BALANCE CARD */}
            <div className="px-4">
                <div className="bg-gray-800 text-white rounded-2xl p-5">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm flex items-center gap-2">

                                Total Balance
                                <button
                                    onClick={() => setShow(!show)}
                                    className="text-white"
                                >
                                    {show ? <Eye size={22} /> : <EyeOff size={22} />}
                                </button>

                            </p>

                            <h2 className="text-3xl font-bold mt-1">  {show ? `${formatMoney(balance)}` : "*****"}</h2>
                        </div>

                        <div className="text-right">
                            <p className="text-sm">Interest Credited Today</p>
                            <p className="font-semibold mt-1">+₦ 0.09</p>
                        </div>
                    </div>
                </div>

                <div className="bg-amber-100 text-center py-3 rounded-b-2xl text-amber-700 text-sm">
                    View Assets Breakdown
                </div>
            </div>

            {/* FEATURES */}
            <div className="flex justify-between px-6 mt-6">
                {features.map((item, i) => (
                    <div key={i} className="text-center">
                        <div className="bg-amber-100 text-amber-600 w-14 h-14 flex items-center justify-center rounded-full text-xl mx-auto">
                            {item.icon}
                        </div>
                        <p className="text-xs mt-2 text-gray-600">{item.name}</p>
                    </div>
                ))}
            </div>

            {/* BANNER */}
            <div className="px-4 mt-6">
                <div className="bg-gradient-to-r from-yellow-900 to-black text-white rounded-2xl p-5">
                    <h2 className="text-xl font-bold">Millionaire saving challenge</h2>
                    <p className="text-sm mt-1">Under ₦3000 daily, ₦1M in 2026</p>

                    <button className="bg-yellow-300 text-black px-4 py-2 rounded-full text-sm mt-4">
                        START SAVING NOW
                    </button>
                </div>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-2 gap-4 px-4 mt-6">

                {/* Find Target */}
                <div className="bg-white rounded-2xl p-4 shadow">
                    <h3 className="text-amber-600 font-bold text-lg">
                        Find a Target
                    </h3>

                    <p className="text-gray-600 mt-2 text-sm">
                        Join <span className="text-amber-600 font-semibold">
                            6 Millions+
                        </span>{" "}
                        members saving together
                    </p>

                    <button className="bg-amber-500 text-white px-4 py-2 rounded-full mt-4 text-sm">
                        Join Now
                    </button>
                </div>

                {/* SafeBox */}
                <div className="bg-white rounded-2xl p-4 shadow">
                    <h3 className="text-amber-600 font-bold text-lg">
                        SafeBox
                    </h3>

                    <p className="text-gray-500 mt-2 text-sm">
                        Flexible savings with up to 15% p.a.
                    </p>
                </div>

                {/* Fixed */}
                <div className="bg-white rounded-2xl p-4 shadow col-span-1">
                    <h3 className="text-amber-600 font-bold text-lg">
                        Fixed
                    </h3>

                    <p className="text-gray-500 mt-2 text-sm">
                        Save for the rainy day
                    </p>
                </div>
            </div>

            {/* FOOTER NOTE */}
            <div className="text-center text-xs text-gray-400 mt-8 px-4">
                OWealth and Savings are Powered by OPay MicroFinance Bank Ltd.
            </div>
        </div>
    );
};

export default FinancePage;