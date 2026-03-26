// pages/DataHistoryPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DataHistoryPage = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const res = await axios.get("https://tal-bank-sandy.vercel.app/api/data/history", { headers: { Authorization: `Bearer ${token}` } });
                setHistory(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex items-center gap-3 p-5 bg-white">
                <FaArrowLeft className="cursor-pointer" onClick={() => navigate("/dashboard")} />
                <h2 className="text-lg font-semibold">Data History</h2>
            </div>

            <div className="p-4">
                {loading ? <p>Loading...</p> :
                    history.length === 0 ? <p className="text-gray-500">No data purchases yet</p> :
                        history.map((tx, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 mb-3 shadow-sm flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{tx.network} - {tx.plan}</p>
                                    <p className="text-sm text-gray-500">{tx.phoneNumber}</p>
                                    <p className="text-xs text-gray-400">{new Date(tx.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`font-semibold ${tx.status === "success" ? "text-green-600" : "text-red-600"}`}>₦{tx.amount}</p>
                                    <p className="text-xs text-gray-400">{tx.status}</p>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    );
};

export default DataHistoryPage;