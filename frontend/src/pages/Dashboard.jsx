import React, { useEffect, useState } from "react";
import CreateTransactionPinModal from "./CreateTransactionPinModal";
import Navbar from '../component/Navbar';
import BalanceCard from '../component/BalanceCard';
import TransferCard from "../component/TransferCard";
import TransactionCard from "../component/TransactionCard";
import ServiceGrid from "../component/ServiceGrid";
import PromoBanner from "../component/PromoBanner";

const Dashboard = () => {

    const [showPinModal, setShowPinModal] = useState(false);
    const [pinCreated, setPinCreated] = useState(null);

    useEffect(() => {
        const storedPin = localStorage.getItem("pinCreated");
        setPinCreated(storedPin === "true");
    }, []);

    useEffect(() => {
        if (pinCreated === false) {
            setShowPinModal(true);
        } else {
            setShowPinModal(false);
        }
    }, [pinCreated]);

    return (
        <div className=" min-h-screen px-2">
            <Navbar />

            <div className="space-y-4">

                {showPinModal && (
                    <CreateTransactionPinModal
                        onClose={() => {
                            setShowPinModal(false);
                            setPinCreated(true); // 🔥 sync state
                        }}
                    />
                )}

                <BalanceCard />
                <TransferCard />
                <TransactionCard />
                <ServiceGrid />
                <PromoBanner />

            </div>
        </div>
    );
};

export default Dashboard;