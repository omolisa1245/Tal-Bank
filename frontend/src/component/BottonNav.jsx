import React, { useState } from "react";
import { RiHomeLine } from "react-icons/ri";
import { RiWalletLine } from "react-icons/ri";
import { RiGiftLine } from "react-icons/ri";
import { RiBankCardLine } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {

    const navigate = useNavigate();
    const [active, setActive] = useState("home");

    const menu = [
        {
            name: "home",
            label: "Home",
            icon: <RiHomeLine />,
            path: "/dashboard"
        },
        {
            name: "finance",
            label: "Finance",
            icon: <RiWalletLine />,
            path: "/reward"
        },
        {
            name: "reward",
            label: "Reward",
            icon: <RiGiftLine />,
            path: "/finance"
        },
        {
            name: "card",
            label: "Card",
            icon: <RiBankCardLine />,
            path: "/card-w"
        },
        {
            name: "me",
            label: "Me",
            icon: <RiUserLine />,
            path: "/me"
        }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 min-w-md mx-auto bg-white flex justify-around py-3 shadow-2xl">

            {menu.map((item) => (

                <div
                    key={item.name}
                    onClick={() => {
                        setActive(item.name);
                        navigate(item.path);
                    }}
                    className={`flex flex-col items-center text-sm cursor-pointer ${active === item.name ? "text-amber-500" : "text-gray-400"
                        }`}
                >

                    <div className="text-xl">
                        {item.icon}
                    </div>

                    {item.label}

                </div>

            ))}

        </div>
    );
};

export default BottomNav;