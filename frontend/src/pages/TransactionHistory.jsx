import { ArrowLeft, ArrowUp, Percent, CircleDollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function TransactionHistory() {
    const navigate = useNavigate();
     const { transactions } = useAppContext();


  

    const getIcon = (type) => {
        switch (type) {
            case "transfer":
                return <ArrowUp className="text-amber-600" />;
            case "interest":
                return <Percent className="text-purple-600" />;
            default:
                return <CircleDollarSign className="text-amber-600" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <ArrowLeft
                        className="cursor-pointer"
                        onClick={() => navigate('/dashboard')}
                    />
                    <h2 className="text-lg font-semibold">Transactions</h2>
                </div>

                <button className="text-amber-600 font-medium">
                    Download
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-4">
                <select className="flex-1 bg-gray-200 rounded-xl py-2 px-3">
                    <option>All Categories</option>
                </select>

                <select className="flex-1 bg-gray-200 rounded-xl p-3">
                    <option>All Status</option>
                </select>
            </div>

            {/* Month Summary */}
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">

                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">Mar 2026</h3>

                    <button className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm">
                        Analysis
                    </button>
                </div>

                <div className="flex gap-6 text-gray-500 text-sm mb-4">
                    <span>In: ₦30,010.45</span>
                    <span>Out: ₦232,130.00</span>
                </div>

                <div className="mb-4 w-full h-0.5 bg-gray-200" />

                {/* Transactions */}
                <div className="bg-white rounded-xl shadow p-4">

                    <h2 className="text-lg font-semibold mb-4">
                        Transaction History
                    </h2>

                    {transactions.length === 0 ? (
                        <p className="text-gray-400">No transactions yet</p>
                    ) : (
                        transactions.map((tx) => (
                            <div
                                key={tx._id}
                                className="flex justify-between items-center border-b border-gray-300 py-3"
                            >
                                <div>
                                    <p className="font-medium">
                                        {tx.type === "transfer" ? "Transfer" : "Transaction"}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {new Date(tx.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <p className="text-amber-600 font-semibold">
                                    ₦{tx.amount.toLocaleString()}
                                </p>
                            </div>
                        ))
                    )}

                </div>

            </div>
        </div>
    );
}