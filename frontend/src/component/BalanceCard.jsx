import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const BalanceCard = () => {
  const [show, setShow] = useState(true);
   const { balance, formatMoney, } = useAppContext();
 

  return (
    <div>
      <div className="bg-gray-800 p-6 rounded-2xl shadow">
        <p className="text-amber-500">Available Balance</p>

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-stone-100">
            {show ? `${formatMoney(balance)}` : "*****"}
          </h2>

          <button
            onClick={() => setShow(!show)}
            className="text-white"
          >
            {show ? <Eye size={22} /> : <EyeOff size={22} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;