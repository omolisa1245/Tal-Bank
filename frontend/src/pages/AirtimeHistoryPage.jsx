import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AirtimeHistoryPage = () => {

    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const token = localStorage.getItem("authToken");

                const res = await axios.get(
                    "https://tal-bank-sandy.vercel.app/api/airtime/history",
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

            <div className="flex items-center gap-3 p-5 bg-white">

                <FaArrowLeft
                    className="cursor-pointer"
                    onClick={() => navigate("/airtime")}
                />

                <h2 className="text-lg font-semibold">
                    Airtime History
                </h2>

            </div>

            {/* History List */}

            <div className="p-4">

                {loading ? (

                    <p>Loading...</p>

                ) : history.length === 0 ? (

                    <p className="text-gray-500">
                        No airtime transactions yet
                    </p>

                ) : (

                    history.map((item) => (

                        <div
                            key={item._id}
                            className="bg-white rounded-xl p-4 mb-3 shadow-sm"
                        >

                            <div className="flex justify-between">

                                <div>

                                    <p className="font-semibold">
                                        {item.network}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {item.phoneNumber}
                                    </p>

                                </div>

                                <div className="text-right">

                                    <p className="font-semibold">
                                        ₦{item.amount}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

};

export default AirtimeHistoryPage;