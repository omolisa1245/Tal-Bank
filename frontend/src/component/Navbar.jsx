import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { AiOutlineScan } from "react-icons/ai";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineNotifications } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { MdOutlineContentCopy } from "react-icons/md";

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const copyAccountNumber = () => {
        if (user?.accountNumber) {
            navigator.clipboard.writeText(user.accountNumber);
            alert("Account number copied");
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) return;

                const res = await axios.get("https://tal-bank-sandy.vercel.app/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Adjust depending on backend response structure
                setUser(res.data.user || res.data);
                localStorage.setItem("user", JSON.stringify(res.data.user || res.data));

            } catch (error) {
                console.log("Error fetching user:", error.response?.data || error.message);
                localStorage.removeItem("authToken");
                localStorage.removeItem("user");
            }
        }

        fetchUser();
    }, []);

    // Notifications example
    const notifications = [
        { id: 1, type: "message", count: 2 },
        { id: 2, type: "order", count: 11 },
        { id: 3, type: "alert", count: 4 },
    ];
    const totalNotifications = notifications.reduce((total, item) => total + item.count, 0);

    return (
        <div className="flex items-center px-3 py-3 justify-between mr-2 text-black/60  rounded-b-3xl">

            <div className=''>
                <div className='flex w-30 items-center -mt-4 -ml-3 cursor-pointer'>
                    <img onClick={() => navigate('/profile')} className='w-30' src={logo} alt="" />
                </div>

                <div className='ml-4 -mt-7 flex items-center'>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <h2 className="text-sm w-full font-semibold">
                                Hi, {user.firstName}
                            </h2>
                            <div className="flex items-center gap-2  px-3 py-2 rounded">
                                <span className="text-xs font-semibold">{user.accountNumber}</span>

                                <MdOutlineContentCopy onClick={copyAccountNumber} className='text-sm cursor-pointer' />
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => navigate('/auth-page')} className='bg-amber-500 px-4 font-bold py-1 cursor-pointer hover:bg-amber-400 rounded-4xl'>Login</button>
                    )}
                </div>
            </div>

            <div className='flex items-center gap-6'>
                <IoIosHelpCircleOutline onClick={() => navigate('/support')} className='text-2xl cursor-pointer' />
                <AiOutlineScan onClick={() => navigate('/scan')} className='text-2xl cursor-pointer' />
                <div className="relative inline-block">
                    <MdOutlineNotifications onClick={() => navigate('/notification')} className='text-2xl cursor-pointer' />
                    {totalNotifications > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-bold p-1 rounded-full">
                            {totalNotifications}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar