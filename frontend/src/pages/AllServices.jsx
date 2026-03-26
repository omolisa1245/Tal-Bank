import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
    Search,
    Zap,
    ShoppingBag,
    Tv,
    School,
    CreditCard,
    Globe,
    Building,
    HeartHandshake
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const recentlyUsed = [
    { name: "Merchant Payments", icon: <CreditCard size={22} /> }
];

const ecommerce = [
    { name: "Oraimo", icon: <ShoppingBag size={22} /> },
    { name: "AliExpress", icon: <ShoppingBag size={22} />, tag: "NEW" },
    { name: "Gift Cards", icon: <CreditCard size={22} /> },
    { name: "Chowdeck", icon: <ShoppingBag size={22} />, tag: "HOT" }
];

const bills = [
    { name: "Electricity", icon: <Zap size={22} />, tag: "HOT" },
    { name: "Solar", icon: <Zap size={22} /> },
    { name: "Products and Services", icon: <ShoppingBag size={22} /> },
    { name: "School & Exam", icon: <School size={22} /> },

    { name: "Credit and Loans", icon: <CreditCard size={22} /> },
    { name: "Internet Services", icon: <Globe size={22} /> },
    { name: "Financial Services", icon: <Building size={22} /> },
    { name: "Invoice Payments", icon: <CreditCard size={22} /> },

    { name: "Aid Grants and Donations", icon: <HeartHandshake size={22} /> },
    { name: "Religious", icon: <Building size={22} /> },
    { name: "Government Payments", icon: <Building size={22} /> },
    { name: "Embassies", icon: <Building size={22} /> },

    { name: "TV (Others)", icon: <Tv size={22} /> },
    { name: "Shopping", icon: <ShoppingBag size={22} /> },
    { name: "Online Shopping", icon: <ShoppingBag size={22} /> },
    { name: "Merchant Payments", icon: <CreditCard size={22} /> }
];

export default function AllServices() {

    const navigate = useNavigate()
    return (
        <div className="bg-gray-100 min-h-screen pb-10">

            {/* Header */}
            <div className="flex justify-between items-center p-4">

                <div className="flex items-center gap-3">

                    <FaArrowLeft
                        className="cursor-pointer"
                        onClick={() => navigate('/')}
                    />
                    <h2 className="text-lg font-semibold">All Service</h2>
                </div>

                <Search className="text-gray-600" />

            </div>

            {/* Recently Used */}
            <div className="bg-white mx-4 rounded-xl p-4">

                <h3 className="font-semibold mb-4">Recently Used</h3>

                <div className="grid grid-cols-4 gap-6">

                    {recentlyUsed.map((item, index) => (

                        <div key={index} className="text-center">

                            <div className="bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                                {item.icon}
                            </div>

                            <p className="text-sm mt-2">
                                {item.name}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

            {/* Ecommerce */}
            <div className="bg-white mx-4 mt-4 rounded-xl p-4">

                <h3 className="font-semibold mb-4">
                    E-commerce
                </h3>

                <div className="grid grid-cols-4 gap-6">

                    {ecommerce.map((item, index) => (

                        <div key={index} className="text-center relative">

                            {item.tag && (
                                <span className="absolute -top-2 left-8 text-xs bg-red-500 text-white px-1 rounded">
                                    {item.tag}
                                </span>
                            )}

                            <div className="bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                                {item.icon}
                            </div>

                            <p className="text-sm mt-2">
                                {item.name}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

            {/* Bills Payment */}
            <div className="bg-white mx-4 mt-4 rounded-xl p-4">

                <h3 className="font-semibold mb-4">
                    Bills Payment
                </h3>

                <div className="grid grid-cols-4 gap-6">

                    {bills.map((item, index) => (

                        <div key={index} className="text-center relative">

                            {item.tag && (
                                <span className="absolute -top-2 left-8 text-xs bg-amber-500 text-white px-1 rounded">
                                    {item.tag}
                                </span>
                            )}

                            <div className="bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto text-amber-500">
                                {item.icon}
                            </div>

                            <p className="text-sm mt-2">
                                {item.name}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}