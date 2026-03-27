import React, { useState } from "react";
import axios from "axios";

const CreateTransactionPinModal = ({ onClose }) => {

    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {

        // ✅ Validate PIN match
        if (pin !== confirmPin) {
            setError("PINs do not match");
            return;
        }

        if (pin.length < 4) {
            setError("PIN must be at least 4 digits");
            return;
        }

        try {
            const token = localStorage.getItem("authToken");

            const res = await axios.post(
                "https://tal-bank-sandy.vercel.app/api/users/set-pin",
                { pin },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert(res.data.message);

            // ✅ Save correctly
            localStorage.setItem("pinCreated", "true");

            // ✅ Close modal + update parent
            if (typeof onClose === "function") {
                onClose();
            }

        } catch (error) {

            if (error.response) {
                setError(error.response.data.message);
            } else if (error.request) {
                setError("Server not responding");
            } else {
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
                    className="w-full mb-4 px-4 py-2 rounded-lg border"
                />

                <input
                    type="password"
                    placeholder="Confirm PIN"
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    className="w-full mb-4 px-4 py-2 rounded-lg border"
                />

                {error && (
                    <p className="text-red-600 mb-4 text-center">{error}</p>
                )}

                <button
                    onClick={handleSubmit}
                    className="w-full bg-amber-500 text-white py-2 rounded-lg mb-2"
                >
                    Set PIN
                </button>

                <button
                    onClick={onClose}
                    className="w-full bg-gray-200 py-2 rounded-lg"
                >
                    Cancel
                </button>

            </div>
        </div>
    );
};

export default CreateTransactionPinModal;