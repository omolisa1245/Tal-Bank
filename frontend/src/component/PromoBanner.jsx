import React from 'react'

const PromoBanner = () => {
    return (
        <div>
            <div className="bg-gradient-to-r from-gray-800 to-amber-500 mb-17 rounded-2xl p-4 text-white shadow">
                <h3 className="font-bold">Merge Your Dance Cards</h3>
                <p className="text-sm">Unlock your rewards</p>
                <button className="mt-2 bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm">
                    Join Now
                </button>
            </div>
        </div>
    )
}

export default PromoBanner