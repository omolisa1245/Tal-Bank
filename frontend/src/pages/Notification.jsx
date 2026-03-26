import { useState } from "react";
import { useNavigate } from "react-router-dom";
import not1 from '../assets/not1.jpg'
import not2 from '../assets/not2.jpg'
import not3 from '../assets/not3.jpg'
import not4 from '../assets/not4.jpg'
import not5 from '../assets/not5.png'

const tabs = [
    { id: "transactions", label: "Transactions", count: 11 },
    { id: "services", label: "Services", count: 2 },
    { id: "activities", label: "Activities", count: 4 },
];

const notifications = [
    {
        id: 1,
        type: "activities",
        title: "Global Gift Cards Available!",
        message:
            "Purchase brand gift cards directly in the app. Tap more to get started.",
        time: "Today 16:07",
        image: not5,
    },
    {
        id: 2,
        type: "activities",
        title: "₦600 Instant Cashback",
        message:
            "No deposit required. Sign up today and enjoy instant cashback rewards.",
        time: "Today 15:14",
        image: not1,
           
    },
    {
        id: 3,
        type: "transactions",
        title: "₦5,000 Sent Successfully",
        message: "You sent ₦5,000 to John Doe.",
        time: "Yesterday 19:30",
        image: not3,
    },

    {
        id: 4,
        type: "activities",
        title: "₦5,000 Sent Successfully",
        message: "You sent ₦5,000 to John Doe.",
        time: "Yesterday 19:30",
        image: not3,
    },
    {
        id: 5,
        type: "services",
        title: "₦5,000 Sent Successfully",
        message: "You sent ₦5,000 to John Doe.",
        time: "Yesterday 19:30",
        image: not1,
    },

    {
        id: 6,
        type: "services",
        title: "₦5,000 Sent Successfully",
        message: "You sent ₦5,000 to John Doe.",
        time: "Yesterday 19:30",
        image: not4,
    },
];

export default function Notification() {
    const [activeTab, setActiveTab] = useState("activities");
    const navigate = useNavigate()

    const filteredNotifications = notifications.filter(
        (n) => n.type === activeTab
    );

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <button onClick={()=>navigate('/')} className="text-gray-600 hover:text-black cursor-pointer">←</button>
                        <span className="text-sm font-semibold">Notifications</span>
                    </div>
                    <button className="text-gray-600 hover:text-black cursor-pointer">⋮</button>
                </div>

                {/* Tabs */}
                <div className="flex  gap-3 mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-2 py-2 rounded-full text-xs font-medium transition 
                             ${activeTab === tab.id
                                    ? "bg-amber-100 text-amber-700 border border-amber-400"
                                    : "bg-white text-gray-600 border border-gray-200"
                                }`}
                        >
                            {tab.label}
                            {tab.count > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {filteredNotifications.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">
                            No notifications available.
                        </div>
                    ) : (
                        filteredNotifications.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
                            >
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="w-full h-30 object-cover"
                                    />
                                )}

                                <div className="p-5">
                                    <h2 className="font-semibold text-sm mb-1">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-600 text-xs mb-4">
                                        {item.message}
                                    </p>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 text-xs">{item.time}</span>
                                        <button className="text-amber-600 text-xs font-medium hover:underline">
                                            View →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}