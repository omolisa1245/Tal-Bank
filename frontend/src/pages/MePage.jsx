import React, { useState } from "react";
import {
    FaHistory,
    FaTachometerAlt,
    FaCreditCard,
    FaStore,
    FaUsers,
    FaShieldAlt,
    FaHeadset,
    FaGift,
    FaPhone,
    FaStar
} from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";

const MePage = () => {

    const navigate = useNavigate()
    const [active, setActive] = useState('history')

    const menu1 = [
        {
            icon: <FaHistory />,
            title: "Transaction History",
            path: '/history'
        },
        {
            icon: <FaTachometerAlt />,
            title: "Account Limits",
            subtitle: "View your transaction limits",
            path: "/account-limit"
        },
        {
            icon: <FaCreditCard />,
            title: "Bank Card/Account",
            subtitle: "Add payment option",
            path: "/bank-card"
        },
        {
            icon: <FaStore />,
            title: "Pay ME",
            subtitle: "Receive payment for your business"
        },
        {
            icon: <FaUsers />,
            title: "Share OPay with Others",
            subtitle: "Help a loved one get an account",
            badge: "New"
        }
    ];

    const menu2 = [
        {
            icon: <FaShieldAlt />,
            title: "Security Center",
            subtitle: "Protect your funds"
            
        },
        {
            icon: <FaHeadset />,
            title: "Customer Service Center"
        },
        {
            icon: <FaGift />,
            title: "Invitation",
            subtitle: "Invite friends and earn up to ₦5,600 Bonus"
        },
        {
            icon: <FaPhone />,
            title: "OPay USSD"
        },
        {
            icon: <FaStar />,
            title: "Rate Us"
        }
    ];

    return (
        <div className="w-full mx-auto bg-gray-100 min-h-screen pb-24">

            {/* HEADER */}
            <div className="bg-amber-100 p-5 rounded-b-3xl">

                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <MdVerified className="text-amber-500 text-2xl" />
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg">
                            Hi, OLAYEMI OLUWATOMIWA
                        </h2>

                        <div className="text-xs bg-amber-200 px-2 py-1 rounded-full w-fit mt-1">
                            Tier 3
                        </div>
                    </div>
                </div>

                {/* BALANCE */}
                <div className="mt-5">
                    <p className="text-gray-600 text-sm">
                        Total Balance
                    </p>

                    <h1 className="text-3xl font-bold mt-1">
                        ****
                    </h1>

                    <div className="bg-white rounded-full px-3 py-1 text-xs mt-2 w-fit">
                        Interest Credited Today ****
                    </div>
                </div>

                {/* SAFETY TIP */}
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-4 rounded-2xl mt-5 flex justify-between items-center">

                    <div>
                        <p className="font-semibold text-white">
                            ⚠️ 3 Safety Tips
                        </p>

                        <p className="text-xs text-white">
                            Make your account more secure.
                        </p>
                    </div>

                    <button className="bg-white text-amber-500 px-4 py-1 rounded-full text-sm font-semibold">
                        View
                    </button>

                </div>

            </div>

            {/* FIRST MENU */}
            <div className="bg-white mx-4 mt-4 rounded-2xl p-3">

                {menu1.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-between py-3 border-b cursor-pointer border-gray-50 last:border-none  ${active === item.title ? "bg-amber-500" : "bg-white" }`}
                       onClick={()=>navigate(item.path)}
                                
                               
                    >

                        <div className="flex items-center gap-3">

                            <div className="bg-amber-100 text-amber-500 p-2 rounded-lg text-lg">
                                {item.icon}
                            </div>

                            <div>
                                <p className="font-medium">{item.title}</p>

                                {item.subtitle && (
                                    <p className="text-xs text-gray-400">
                                        {item.subtitle}
                                    </p>
                                )}
                            </div>

                            

                        </div>

                        <div className="flex items-center gap-2">

                            {item.badge && (
                                <span className="bg-red-400 text-white text-xs px-2 py-0.5 rounded">
                                    {item.badge}
                                </span>
                            )}

                            <IoChevronForward className="text-gray-400" />

                        </div>

                    </div>
                ))}

            </div>

            {/* SECOND MENU */}
            <div className="bg-white mx-4 mt-4 rounded-2xl p-3">

                {menu2.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-gray-50 last:border-none"
                    >

                        <div className="flex items-center gap-3">

                            <div className="bg-amber-100 text-amber-500 p-2 rounded-lg text-lg">
                                {item.icon}
                            </div>

                            <div>
                                <p className="font-medium">{item.title}</p>

                                {item.subtitle && (
                                    <p className="text-xs text-gray-400">
                                        {item.subtitle}
                                    </p>
                                )}
                            </div>

                        </div>

                        <IoChevronForward className="text-gray-400" />

                    </div>
                ))}

                <div onClick={()=>navigate('/')} className="flex items-center gap-4 mt-5 cursor-pointer">
                    <IoMdLogOut className="text-amber-400 text-4xl font-extrabold bg-amber-600/30 rounded-full p-1"/>
                    <p className="text-black font-medium">Logout</p>
                </div>

            </div>

        </div>
    );
};

export default MePage;