import React, { useEffect, useState } from "react";
import CreateTransactionPinModal from "./CreateTransactionPinModal";
import Navbar from '../component/Navbar'
import BalanceCard from '../component/BalanceCard'
import QuickActions from '../component/QuickActions'
import TransferCard from "../component/TransferCard";
import TransactionCard from "../component/TransactionCard";
import ServiceGrid from "../component/ServiceGrid";
import PromoBanner from "../component/PromoBanner";
import BottonNav from '../component/BottonNav';
import { useAppContext } from "../context/AppContext";
import axios from "axios"


const Dashboard = () => {


    const [showPinModal, setShowPinModal] = useState(false);




    useEffect(() => {

        const pinCreated = localStorage.getItem("pinCreated");

        if (pinCreated !== "true") {
            setShowPinModal(true);
        }

    }, []);

    return (
        <div>
            <div className=" mx-auto min-h-screen">
                <Navbar />
                <div className="space-y-4">
                    {showPinModal && (
                        <CreateTransactionPinModal onClose={() => setShowPinModal(false)} />
                    )}
                    <BalanceCard />

                    <TransferCard />
                    <TransactionCard />
                    <ServiceGrid />
                    <PromoBanner />

                </div>
            </div>
        </div>
    )
}

export default Dashboard