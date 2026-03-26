import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BetHistoryPage = () => {

    const navigate = useNavigate();

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const token = localStorage.getItem("authToken");

                const res = await axios.get(
                    "https://tal-bank-sandy.vercel.app/api/betting/history",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setHistory(res.data.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchHistory();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <div className="flex items-center gap-3 p-5 bg-white shadow-sm">

                <FaArrowLeft
                    className="cursor-pointer"
                    onClick={() => navigate(-1)}
                />

                <h2 className="text-lg font-semibold">
                    Betting History
                </h2>

            </div>

            {/* History List */}
            <div className="p-4">

                {loading ? (

                    <p className="text-center text-gray-500">
                        Loading...
                    </p>

                ) : history.length === 0 ? (

                    <p className="text-center text-gray-500">
                        No betting transactions yet
                    </p>

                ) : (

                    history.map((bet, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-xl p-4 mb-3 shadow-sm flex justify-between items-center"
                        >

                            <div>

                                <p className="font-semibold">
                                    {bet.provider}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Bet ID: {bet.bettingId}
                                </p>

                                <p className="text-xs text-gray-400">
                                    {new Date(bet.createdAt).toLocaleString()}
                                </p>

                            </div>

                            <div className="text-right">

                                <p className="font-semibold text-green-600">
                                    -₦{bet.amount}
                                </p>

                                <p className="text-xs text-gray-400">
                                    {bet.status}
                                </p>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

};

export default BetHistoryPage;