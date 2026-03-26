import React from "react";
import { useNavigate } from "react-router-dom";
import { TbArrowsTransferDown } from "react-icons/tb";
import { MdElectricBolt, MdPhoneIphone } from "react-icons/md";
import { FaTv, FaHandHoldingUsd } from "react-icons/fa";
import { IoIosFootball } from "react-icons/io";
import { RiRefund2Line } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";

const ServiceGrid = () => {

    const navigate = useNavigate();

    const services = [
        { name: "Airtime", icon: MdPhoneIphone, path: "/airtime" },
        { name: "Data", icon: TbArrowsTransferDown, path: "/data" },
        { name: "Betting", icon: IoIosFootball, path: "/betting" },
        { name: "Dstv", icon: FaTv, path: "/dstv" },
        { name: "Withdraw", icon: BiMoneyWithdraw, path: "/withdraw" },
        { name: "Cashback", icon: RiRefund2Line, path: "/cashback" },
        { name: "Loans", icon: FaHandHoldingUsd, path: "/loans" },
        { name: "Electricity", icon: MdElectricBolt, path: "/electricity" },
    ];

    return (
        <div className="bg-white rounded-2xl p-4 shadow">

            <div className="flex justify-between mb-4">
                <h3 className="font-semibold">Services</h3>
                <span onClick={()=>navigate('/all-services')} className="text-sm text-gray-400 cursor-pointer">More</span>
            </div>

            <div className="grid grid-cols-4 gap-4 text-center">

                {services.map((service, index) => {

                    const IconComponent = service.icon;

                    return (
                        <div
                            key={index}
                            onClick={() => navigate(service.path)}
                            className="flex flex-col items-center cursor-pointer active:scale-95 transition"
                        >

                            <div className="bg-amber-100 p-3 rounded-full text-xl">
                                <IconComponent className="text-amber-500" />
                            </div>

                            <p className="text-xs mt-1">{service.name}</p>

                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default ServiceGrid;