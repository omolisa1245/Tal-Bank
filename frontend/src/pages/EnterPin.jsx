import React, { useEffect, useRef } from "react";

const EnterPin = ({ open, onClose, onComplete, pin, setPin }) => {
    const triggeredRef = useRef(false); // track if onComplete already fired

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); // only digits
        if (value.length <= 4) {
            setPin(value);
            // reset the triggered flag if user deletes digits
            if (value.length < 4) triggeredRef.current = false;
        }
    };

    // Trigger onComplete **once** when PIN reaches 4 digits
    useEffect(() => {
        if (pin.length === 4 && !triggeredRef.current) {
            triggeredRef.current = true;
            onComplete(pin);
        }
    }, [pin, onComplete]);

    if (!open) return null;

    return (
        <div className="fixed left-0 right-0 top-90 flex items-center justify-center z-50">
            {/* Overlay */}
            <div
                className="absolute opacity-40"
                onClick={onClose}
            ></div>

            {/* PIN Modal */}
            <div className="bg-white rounded-2xl shadow-xl p-6 w-90 z-10">
                <h2 className="text-center text-xl font-semibold mb-6">
                    Enter Transaction PIN
                </h2>

                {/* PIN dots */}
                <div className="flex justify-center gap-4 mb-8">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`w-4 h-4 rounded-full ${
                                pin.length > i ? "bg-amber-500" : "bg-gray-300"
                            }`}
                        />
                    ))}
                </div>

                {/* Hidden Input */}
                <input
                    type="password"
                    value={pin}
                    onChange={handleChange}
                    maxLength={4}
                    autoFocus
                    className="w-full text-center text-2xl border-b border-gray-300 focus:outline-none pb-2"
                    placeholder="Enter 4-digit PIN"
                />

                <button
                    onClick={onClose}
                    className="w-full mt-6 bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold py-2 rounded-lg transition-colors duration-200"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EnterPin;