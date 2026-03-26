import React from 'react'
import { FcBriefcase } from "react-icons/fc";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdPersonPinCircle } from "react-icons/md";
import { TbBuildingBank } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

function TransferCard() {

    const navigate = useNavigate()
    return (
        <div>
            <div className="bg-white rounded-2xl p-4 shadow">
                <h3 className="font-semibold mb-4">Money Transfer</h3>

                <div className="flex justify-between text-center px-4">
                    <div onClick={() => navigate('/to-tal')} className="flex flex-col cursor-pointer items-center">
                        <div className="bg-indigo-100 p-2 rounded-xl text-xl"><MdPersonPinCircle className='text-3xl text-blue-400' /></div>
                        <p className="text-sm mt-1">To TalBank</p>
                    </div>

                    <div onClick={()=>navigate('/other-bank')} className="flex flex-col items-center cursor-pointer">
                        <div className="bg-purple-100 p-2 rounded-xl text-xl"><TbBuildingBank className='text-3xl text-amber-500' /></div>
                        <p className="text-sm mt-1">To Other Bank</p>
                    </div>

                    <div onClick={()=>navigate('/deposit-money')} className="flex flex-col items-center cursor-pointer">
                        <div className="bg-green-100 p-2 rounded-xl text-xl"><RiSecurePaymentLine className='text-3xl text-green-600' /></div>
                        <p className="text-sm mt-1">Deposit</p>
                    </div>
                    <div onClick={()=>navigate('/pay-m')} className="flex flex-col items-center cursor-pointer">
                        <div className="bg-green-100 p-2 rounded-xl text-xl"><FcBriefcase className='text-3xl' /></div>
                        <p className="text-sm mt-1">Pay Merchant</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransferCard