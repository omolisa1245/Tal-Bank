import React from "react";
import { Coins, Ticket, Gift, Users, Star } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottonNav from "../component/BottonNav";
import { useAppContext } from "../context/AppContext";


export default function FinancePage() {

    const navigate = useNavigate()
     const { balance, formatMoney, } = useAppContext();
    return (
        <div className="bg-gray-100 min-h-screen pb-20 w-full">

            {/* Header */}
            <div className="bg-gray-800 w-full text-white rounded-b-3xl p-9">

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">
                        <ArrowLeft onClick={() => navigate('/')} size={20} />
                        <h1 className="text-2xl font-bold">Rewards</h1>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        ...
                    </div>
                </div>

                {/* Cashback + Voucher */}
                <div className="flex w-full justify-between mt-6">

                    <div>
                        <p className="text-gray-50 w-full text-sm">Cashback</p>
                        <div className="flex items-center gap-2 text-2xl font-semibold">
                            <Coins className="text-amber-500" />
                            ₦77.75
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-50 text-sm">
                            Voucher
                            <span className="ml-2 bg-amber-400 text-white text-xs px-2 py-1 rounded">
                                ₦120
                            </span>
                        </p>

                        <div className="text-2xl font-semibold">
                            2
                        </div>
                    </div>

                </div>

            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-4 gap-4 px-4 -mt-6">

                {[
                    { name: "Friday Bonus", icon: <Gift /> },
                    { name: "Refer Friends", icon: <Users /> },
                    { name: "Voucher Pack", icon: <Ticket /> },
                    { name: "Play4aChild", icon: <Star /> }
                ].map((item, i) => (

                    <div
                        key={i}
                        className="bg-white rounded-xl p-3 text-center shadow"
                    >

                        <div className="bg-amber-100 w-12 h-12 mx-auto flex items-center justify-center rounded-lg text-amber-600">
                            {item.icon}
                        </div>

                        <p className="text-xs mt-2">
                            {item.name}
                        </p>

                    </div>

                ))}

            </div>

            {/* Hot Voucher */}
            <div className="bg-white rounded-2xl p-4 mx-4 mt-6">

                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">
                        Hot Vouchers
                    </h3>

                    <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded">
                        ₦
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4">

                    {/* Voucher Card */}
                    <div className="bg-amber-50 rounded-xl p-4 text-center">

                        <h2 className="text-2xl font-bold text-amber-600">
                            ₦100
                        </h2>

                        <p className="text-sm mt-1">
                            Bangbet ₦100 off
                        </p>

                        <p className="text-xs text-gray-500 mt-2">
                            ₦500 available
                        </p>

                        <button className="mt-3 bg-amber-500 text-white px-4 py-1 rounded-full">
                            Use
                        </button>

                    </div>

                    <div className="bg-amber-50 rounded-xl p-4 text-center">

                        <h2 className="text-2xl font-bold text-amber-600">
                            ₦20
                        </h2>

                        <p className="text-sm mt-1">
                            Betting Voucher
                        </p>

                        <p className="text-xs text-gray-500 mt-2">
                            ₦300 available
                        </p>

                        <button className="mt-3 bg-amber-500 text-white px-4 py-1 rounded-full">
                            Use
                        </button>

                    </div>

                </div>

                <div className="text-center mt-4 text-gray-600 text-sm">
                    View My Voucher →
                </div>

            </div>

            {/* Daily Bonus */}
            <div className="bg-white rounded-2xl p-4 mx-4 mt-6">

                <h3 className="font-semibold mb-4">
                    Daily Bonus
                </h3>

                {[
                    {
                        name: "Glo Airtime",
                        percent: "Up to 6%"
                    },
                    {
                        name: "9 Mobile Airtime",
                        percent: "Up to 5%"
                    },
                    {
                        name: "MTN/Airtel Airtime",
                        percent: "Up to 3.5%"
                    }
                ].map((item, i) => (

                    <div
                        key={i}
                        className="flex items-center justify-between mb-4"
                    >

                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                📱
                            </div>

                            <div>
                                <p className="font-medium">
                                    {item.name}
                                </p>

                                <p className="text-xs text-gray-500">
                                    Buy Airtime and get cashback
                                </p>

                            </div>

                        </div>

                        <button className="bg-amber-500 text-white px-5 py-1 rounded-full">
                            Go
                        </button>

                    </div>

                ))}

                <div className="text-center text-gray-500 text-sm">
                    View All ↓
                </div>

            </div>
          
        </div>
    );
}