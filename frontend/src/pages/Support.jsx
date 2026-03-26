import React from "react";
import supporticon from '../assets/support-icon.png'


import {
    RiArrowLeftLine,
    RiMore2Fill,
    RiCustomerService2Line,
    RiExchangeFundsLine,
    RiLockLine,
    RiMessage2Line,
    RiChatSmile2Line,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Support = () => {
    const navigate = useNavigate()
    const quickActions = [
        { name: "Transfer Dispute", icon: RiExchangeFundsLine },
        { name: "Erroneous Transfer", icon: RiExchangeFundsLine },
        { name: "Account Limits", icon: RiCustomerService2Line },
        { name: "Password & PIN", icon: RiLockLine },
        { name: "Report Scam", icon: RiMessage2Line },
        { name: "SMS Alert", icon: RiMessage2Line },
        { name: "More", icon: RiMore2Fill },
    ];

    const faqs = [
        "What is Stamp Duty?",
        "Office Address",
        "How to increase the limit?",
        "How to change mobile number?",
        "How to download account statement?",
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-28">

            {/* HEADER */}
            <div className=" px-4 py-12">
                <div className="flex justify-between items-center -mt-6">
                    <RiArrowLeftLine onClick={() => navigate('/dashboard')} className="text-xl text-black cursor-pointer" />
                    <RiMore2Fill className="text-xl text-gray-600 cursor-pointer" />
                </div>

                <div className="flex items-center justify-between px-4">
                    <div className="mt-4">
                        <h2 className="text-xl text-amber-600 font-semibold">
                            Customer Service Center
                        </h2>
                        <p className="text-sm text-gray-500">
                            7*24h service for you
                        </p>
                    </div>
                    <div className="w-7 h-7 rounded-full">
                        <img className="w-12 h-12 object-cover cursor-pointer" src={supporticon} alt="" />
                    </div>
                </div>
            </div>

            {/* QUICK ACTION GRID */}
            <div className="bg-white mx-4 -mt-4 rounded-2xl p-4 shadow">
                <div className="grid grid-cols-4 gap-4 text-center">
                    {quickActions.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="flex flex-col items-center">
                                <div className="bg-gray-100 p-3 rounded-full text-amber-600 text-xl">
                                    <Icon />
                                </div>
                                <p className="text-xs mt-2">{item.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* MY FEEDBACK */}
            <div className="bg-white mx-4 mt-6 rounded-2xl p-4 shadow">
                <div className="flex justify-between mb-3">
                    <h3 className="font-semibold">My Feedback</h3>
                    <span className="text-sm text-gray-400">More</span>
                </div>

                <div className="bg-gray-100 text-center text-sm py-4 rounded-xl text-gray-400">
                    No records found in the past 90 days
                </div>
            </div>

            {/* HELP SECTION */}
            <div className="bg-white mx-4 mt-6 rounded-2xl p-4 shadow">
                <h3 className="font-semibold mb-4">Hot Issues</h3>

                {faqs.map((faq, index) => (
                    <div>
                        <div
                            key={index}
                            className="flex justify-between items-center py-3 border-b/90 last:border-none"
                        >
                            <span className="text-sm">{faq}</span>
                            <span className="text-gray-400">{">"}</span>
                            
                        </div>
                         <div className="w-[90%] h-1 bg-stone-100"></div>
                    </div>

                ))}
            </div>

            {/* LIVE CHAT BUTTON */}
            <div className=" px-6">
                <button className="bg-amber-600 w-full mt-10 py-4 rounded-full text-white font-semibold shadow-lg flex justify-center items-center gap-2">
                    <RiChatSmile2Line size={20} />
                    Live Chat
                </button>
            </div>

        </div>
    );
};

export default Support;