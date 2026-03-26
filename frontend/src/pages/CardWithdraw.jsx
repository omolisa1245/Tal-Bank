import { useState } from "react";
import { ShieldCheck, Wallet, BadgeDollarSign } from "lucide-react";
import { Zap, Globe, Store, Palette, } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import card1 from '../assets/card1.png'

export default function CardWithdrawal() {
    const [activeTab, setActiveTab] = useState("physical");
    const navigate = useNavigate();

    const features = [
        {
            icon: <Zap size={22} />,
            title: "Instant Access",
            desc: "Use it instantly after quick application",
        },
        {
            icon: <Globe size={22} />,
            title: "40K+ online merchants accepted",
            desc: "GooglePlay, Netflix, Jumia, Konga, Uber Wallet Funding and more",
        },
        {
            icon: <Store size={22} />,
            title: "Self-managed Transactions",
            desc: "Unique Merchant Control, Unlimited Convenience",
        },
        {
            icon: <Palette size={22} />,
            title: "NO maintenance fee",
            desc: "Free & switch your favorite card design anytime",
        },
        {
            icon: <ShieldCheck size={22} />,
            title: "Safe & Secure",
            desc: "CBN licensed, NDIC Insured",
        },
    ]

    return (
        <div className="min-h-screen mb-15 bg-gray-100 flex flex-col">

            {/* Header */}
            <div className="px-6 pt-6 pb-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 mb-6">
                        <FaArrowLeft
                            className="cursor-pointer"
                            onClick={() => navigate('/dashboard')}
                        />
                        <h2 className="text-lg font-semibold">
                            Card Withdrawal
                        </h2>
                    </div>
                    <button className="text-amber-600 font-medium">Q&A</button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-12 mt-4 text-gray-500 font-medium">
                <button
                    onClick={() => setActiveTab("virtual")}
                    className={`pb-2 ${activeTab === "virtual"
                        ? "border-b-2 border-black text-black"
                        : ""
                        }`}
                >
                    Virtual Card
                </button>

                <button
                    onClick={() => setActiveTab("physical")}
                    className={`pb-2 ${activeTab === "physical"
                        ? "border-b-2 border-black text-black"
                        : ""
                        }`}
                >
                    Physical Card
                </button>
            </div>

            {/* Card Container */}
            {activeTab === "physical" && (<div className="flex-1 px-5 mt-6">
                <div className="bg-white rounded-3xl p-5 shadow-sm">

                    {/* Card Label */}
                    <div className="flex justify-center mb-4">
                        <span className="bg-green-100 text-amber-600 px-4 py-1 rounded-full text-sm">
                            Tal Verve Classic
                        </span>
                    </div>

                    {/* Card Preview */}
                    <div className="bg-gray-50 rounded-2xl p-4 mb-6">

                        <div className="bg-gradient-to-r from-gray-600 to-gray-800 h-40 rounded-xl p-12 text-white flex flex-col justify-between">

                            <div className="flex justify-between">
                                <span className="text-lg font-bold">MyBank</span>
                                <span className="text-sm">Verve Debit</span>
                            </div>

                            <div className="text-lg tracking-widest">
                                **** **** **** 2456
                            </div>

                            <div className="flex justify-between text-sm">
                                <span>John Doe</span>
                                <span>12/29</span>
                            </div>

                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-6">

                        <div className="flex gap-4 items-start">
                            <div className="bg-green-100 p-3 rounded-xl">
                                <Wallet className="text-amber-600" size={22} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    Free Application and Usage
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    <span className="text-amber-600 font-medium">Free</span> application,
                                    <span className="text-amber-600 font-medium"> Zero</span> maintenance
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="bg-green-100 p-3 rounded-xl">
                                <BadgeDollarSign className="text-amber-600" size={22} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Earn</h3>
                                <p className="text-gray-500 text-sm">
                                    Flexible spending with
                                    <span className="text-amber-600 font-medium"> 15% </span>
                                    annual interest
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="bg-green-100 p-3 rounded-xl">
                                <ShieldCheck className="text-amber-600" size={22} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Security</h3>
                                <p className="text-gray-500 text-sm">
                                    <span className="text-amber-600 font-medium">CBN</span> licensed,
                                    <span className="text-amber-600 font-medium"> NDIC</span> insured
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>)

            }

            {activeTab === "virtual" && (
                <div className="min-h-screen bg-gray-100 flex flex-col">



                    {/* Card Preview */}


                    {/* Features */}
                    <div className="px-5 flex-1 mt-6">
                        <div className="bg-white rounded-3xl p-5 shadow-sm">
                            <div className="px-5 ">
                                {activeTab === "virtual" && (
                                    <div className="bg-gradient-to-r mb-6 from-gray-600 to-gray-800 h-40 rounded-xl p-12 text-white flex flex-col justify-between">

                                        <div className="flex justify-between">
                                            <span className="text-lg font-bold">MyBank</span>
                                            <span className="text-sm">Verve Debit</span>
                                        </div>

                                        <div className="text-lg tracking-widest">
                                            **** **** **** 2456
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span>John Doe</span>
                                            <span>12/29</span>
                                        </div>

                                    </div>
                                )}


                            </div>

                            {/* Badge */}


                            <div className="space-y-6">
                                {features.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="bg-green-100 text-amber-600 p-3 rounded-xl">
                                            {item.icon}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>


                </div>
            )}

            {/* Bottom Button */}
            <div className="p-6">
                <button className="w-full bg-amber-600 text-white py-4 rounded-full text-lg font-semibold shadow-md hover:bg-amber-700 transition">
                    Get It Now
                </button>
            </div>

        </div>
    );
}