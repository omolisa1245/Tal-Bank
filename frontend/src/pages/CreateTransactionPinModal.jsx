// CreateTransactionPinModal.jsx
import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";


const CreateTransactionPinModal = ({ onClose }) => {
    const { setTransactionPin, setPinCreated } = useAppContext();
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        try {

            const token = localStorage.getItem("authToken");
            console.log("TOKEN:", token);

            const res = await axios.post(
                "https://tal-bank-9dzh.vercel.app/api/users/set-pin",
                { pin },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert(res.data.message);

            localStorage.setItem("pinCreated", "true");

            if (typeof onClose === "function") {
                onClose();
            }

        } catch (error) {

            console.log("FULL ERROR:", error);

            if (error.response) {
                console.log("SERVER RESPONSE:", error.response.data);
                setError(error.response.data.message);
            }
            else if (error.request) {
                console.log("NO RESPONSE FROM SERVER");
                setError("Server not responding");
            }
            else {
                console.log("REQUEST ERROR:", error.message);
                setError(error.message);
            }

        }

    };

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-80 sm:w-96">
                <h2 className="text-xl font-bold text-amber-900 mb-6 text-center">
                    Create Transaction PIN
                </h2>

                <input
                    type="password"
                    placeholder="Enter PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-50 focus:border-amber-50"
                />

                <input
                    type="password"
                    placeholder="Confirm PIN"
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-50 focus:border-amber-50"
                />

                {error && (
                    <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
                )}

                <button
                    onClick={handleSubmit}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg mb-2 transition-colors duration-200"
                >
                    Set PIN
                </button>

                <button
                    onClick={onClose}
                    className="w-full bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold py-2 rounded-lg transition-colors duration-200"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default CreateTransactionPinModal;