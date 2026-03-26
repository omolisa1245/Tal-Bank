import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FiCopy } from "react-icons/fi";

const AccountLimitPage = () => {
    const tiers = [
        {
            tier: "Tier 1",
            daily: "₦50,000",
            max: "₦300,000"
        },
        {
            tier: "Tier 2",
            daily: "₦200,000",
            max: "₦500,000"
        },
        {
            tier: "Tier 3",
            daily: "₦5,000,000",
            max: "Unlimited",
            current: true
        }
    ];

    return (
        <div className="max-w-md mx-auto min-h-screen bg-gray-100 pb-20">

            {/* HEADER */}
            <div className="flex items-center gap-3 p-4">
                <IoChevronBack className="text-xl cursor-pointer" />
                <h1 className="text-lg font-semibold">Account Limits</h1>
            </div>

            {/* ACCOUNT INFO CARD */}
            <div className="mx-4 bg-gray-800 rounded-2xl p-5 relative">

                <p className="text-sm text-gray-50">Account Info</p>

                <div className="flex items-center gap-3 mt-2">
                    <h2 className="text-2xl text-white font-bold tracking-wider">
                        906 964 4342
                    </h2>

                    <div className="bg-white p-2 rounded-full">
                        <FiCopy className="text-gray-600" />
                    </div>
                </div>

                <div className="mt-3 bg-amber-300 px-3 py-1 rounded-full text-sm w-fit">
                    OLAYEMI OLUWATOMIWA OLUWATOMIWA OMOLISA
                </div>

                {/* TIER BADGE */}
                <div className="absolute right-4 top-4 bg-amber-500 rounded-full w-15 h-15 flex items-center justify-center shadow">
                    <div className="text-center">
                        <p className="text-lg font-bold">3</p>
                        <p className="text-xs">Tier</p>
                    </div>
                </div>

            </div>

            {/* LINKED ID */}
            <div className="bg-white mx-4 mt-4 rounded-2xl p-4 flex justify-between items-center">
                <p className="font-medium">Linked ID</p>

                <div className="flex items-center gap-2 text-gray-500">
                    <p>BVN & NIN</p>
                    <IoChevronForward />
                </div>
            </div>

            {/* LIMIT INFO */}
            <div className="bg-white mx-4 mt-4 rounded-2xl p-4">

                <p className="font-medium mb-3">Limit Info</p>

                <div className="bg-gray-100 p-3 rounded-xl text-sm text-gray-500">
                    The higher your account tier, the higher your transaction limit.
                </div>

            </div>

            {/* LEVEL BENEFIT */}
            <div className="bg-white mx-4 mt-4 rounded-2xl p-4">

                <h3 className="font-semibold mb-4">Level Benefit</h3>

                <div className="border border-gray-100 rounded-xl overflow-hidden">

                    {/* TABLE HEADER */}
                    <div className="grid grid-cols-3 text-white bg-gray-600 p-3 text-sm font-medium">
                        <p>Tier</p>
                        <p className="text-center">Daily transaction limit</p>
                        <p className="text-right">Maximum account balance</p>
                    </div>

                    {/* TABLE ROWS */}
                    {tiers.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-3 p-4 border-t border-gray-100 items-center"
                        >

                            <div className="flex items-center gap-2">
                                <p>{item.tier}</p>

                                {item.current && (
                                    <span className="text-xs bg-amber-200 text-amber-700 px-2 py-0.5 rounded-full">
                                        Current
                                    </span>
                                )}
                            </div>

                            <p className="text-center">{item.daily}</p>

                            <p className="text-right">{item.max}</p>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
};

export default AccountLimitPage;