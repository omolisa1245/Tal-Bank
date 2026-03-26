import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const TransactionCard = () => {
    const navigate = useNavigate();
    const { transactions } = useAppContext();


    const userId = localStorage.getItem("userId");
    const trans = transactions.slice(0, 1); // show only 3 recent transactions

    return (
        <div className="bg-white flex w-full items-center justify-between rounded-2xl py-4 shadow">

            {/* Transactions */}
            <div className="">

                {trans.map((item) => {

                    const isDebit = item.sender === userId;

                    return (
                        <div
                            key={item._id}
                            className="flex w-screen px-10 -ml-5 justify-between  items-center "
                        >

                            <div>
                                <div>
                                    <p className="font-semibold">
                                        {isDebit ? "Transfer Sent" : "Money Received"}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <p className={`font-bold ${isDebit ? "text-red-500" : "text-green-500"}`}>
                                    {isDebit ? "-" : "+"} ₦{item.amount.toLocaleString()}
                                </p>

                            </div>
                            <div className="flex ">
                                <button
                                    onClick={() => navigate("/history")}
                                    className="text-lg font-bold text-gray-500 hover:text-black"
                                >
                                    History →
                                </button>
                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default TransactionCard;
