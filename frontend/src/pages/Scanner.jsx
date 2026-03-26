import React, { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Scanner = () => {
   const navigate = useNavigate()
    useEffect(() => {
        const scanner = new Html5Qrcode("reader");

        scanner.start(
            { facingMode: "environment" }, // back camera
            {
                fps: 10,
                qrbox: 250,
            },
            (decodedText) => {
                alert(`Scanned: ${decodedText}`);
                scanner.stop();
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            scanner.stop().catch(() => { });
        };
    }, []);

    return (
        <div className="bg-black min-h-screen text-white">

            {/* HEADER */}
            <div className="flex items-center p-4">
                <RiArrowLeftLine onClick={()=>navigate('/dashboard')} size={24} />
                <h2 className="ml-4 text-lg font-semibold">Scan to Pay</h2>
            </div>

            {/* CAMERA VIEW */}
            <div className="flex justify-center mt-10">
                <div
                    id="reader"
                    className="w-80 h-80 rounded-2xl overflow-hidden"
                />
            </div>

            <p className="text-center mt-6 text-gray-400">
                Align QR code within the frame
            </p>
        </div>
    );
};

export default Scanner;