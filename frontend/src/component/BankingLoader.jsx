import React from "react";

const BankingLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative w-16 h-16 animate-spin">
        
        {/* Dot 1 (Blue) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>

        {/* Dot 2 (Amber) */}
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-amber-500 rounded-full"></div>

        {/* Dot 3 (Purple / or any color you like) */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-purple-600 rounded-full"></div>

      </div>
    </div>
  );
};

export default BankingLoader;