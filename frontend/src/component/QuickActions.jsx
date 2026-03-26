import React from 'react'
import { useNavigate } from "react-router-dom";


const QuickActions = () => {

     const navigate = useNavigate();
  return (
    <div>
         <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => navigate("/transfer")}
        className="bg-white shadow rounded-2xl p-4 text-center"
      >
        💸 Transfer
      </button>

      <button
        onClick={() => navigate("/airtime")}
        className="bg-white shadow rounded-2xl p-4 text-center"
      >
        📱 Airtime
      </button>

      <button
        onClick={() => navigate("/bills")}
        className="bg-white shadow rounded-2xl p-4 text-center"
      >
        💡 Bills
      </button>

      <button
        onClick={() => navigate("/history")}
        className="bg-white shadow rounded-2xl p-4 text-center"
      >
        📜 History
      </button>
    </div>
    </div>
  )
}

export default QuickActions