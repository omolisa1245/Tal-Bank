import { QrCode, Store, User } from "lucide-react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TransferConfirm from "./TransferConfirm";
import EnterPin from "./EnterPin";
import TransferSuccess from "./TransferSuccess";
import BankingLoader from "../component/BankingLoader";

const vendors = [
  { id: 1, name: "Amazon" },
  { id: 2, name: "Walmart" },
  { id: 3, name: "Best Buy" },
  { id: 4, name: "Target" },
  { id: 5, name: "eBay" },
];

export default function PayMerchant() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const [enteredPin, setEnteredPin] = useState("");
  const [loading, setLoading] = useState(false);

  const [lastTransaction, setLastTransaction] = useState({
    accountNumber: "",
    amount: "",
    remark: "",
  });

  const handlePayMerchant = () => {
    if (!merchantId || !amount) {
      alert("Enter merchant ID and amount");
      return;
    }
    setConfirmOpen(true);
  };

  const handleVerifyAndSend = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.post(
        "http://localhost:4000/api/merchant/pay-merchant",
        {
          merchantId,
          merchantName: selectedVendor?.name || "Merchant",
          amount: Number(amount),
          note: "Merchant payment",
          pin: enteredPin,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update transaction
      setLastTransaction({
        accountNumber: merchantId,
        amount,
        remark: "Merchant payment",
      });

      setPinOpen(false);
      setSuccessOpen(true);
      setConfirmOpen(false);

      // Reset form
      setMerchantId("");
      setAmount("");
      setEnteredPin("");
      setSelectedVendor(null);

    } catch (error) {
      alert(error.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <BankingLoader />}

      <div className="min-h-screen bg-gray-100 mb-16 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <FaArrowLeft
            className="cursor-pointer"
            onClick={() => navigate("/dashboard")}
          />
          <h1 className="text-lg font-semibold">Pay Merchant</h1>
          <button className="text-amber-600">
            <QrCode size={22} />
          </button>
        </div>

        {/* Main Content */}
        <div className="px-5 flex-1">

          {/* Merchant Input */}
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-5">
            <label className="text-sm text-gray-500">
              Merchant ID / Business Name
            </label>
            <div className="flex items-center mt-2 border border-gray-200 rounded-xl px-3 py-3">
              <Store className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Enter Merchant ID"
                value={merchantId}
                onChange={(e) => setMerchantId(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Vendor Selection */}
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-xl">
              <User className="text-amber-600" />
            </div>
            <div className="w-full">
              <select
                className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                onChange={(e) => {
                  const vendor = vendors.find((v) => v.id === Number(e.target.value));
                  setSelectedVendor(vendor);
                }}
                value={selectedVendor?.id || ""}
              >
                <option value="" disabled>Choose a vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount */}
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-5">
            <label className="text-sm text-gray-500">Amount</label>
            <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3 mt-2">
              <span className="text-gray-500 mr-2">₦</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full outline-none text-lg"
              />
            </div>
          </div>

          {/* Note */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <label className="text-sm text-gray-500">Payment Note (Optional)</label>
            <input
              type="text"
              placeholder="Add note"
              className="w-full border border-gray-200 rounded-xl px-3 py-3 mt-2 outline-none"
            />
          </div>
        </div>

        {/* Pay Button */}
        <div className="p-6">
          <button
            onClick={handlePayMerchant}
            className="w-full bg-amber-600 text-white py-4 rounded-full text-lg font-semibold shadow-md hover:bg-amber-700 transition"
          >
            Pay Merchant
          </button>
        </div>

        {/* Modals */}
        <TransferConfirm
          accountNumber={merchantId}
          receiverName={selectedVendor?.name || "Merchant"}
          amount={amount}
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          openPin={() => { setConfirmOpen(false); setPinOpen(true); }}
        />

        <EnterPin
          open={pinOpen}
          onClose={() => setPinOpen(false)}
          pin={enteredPin}
          setPin={setEnteredPin}
          onComplete={handleVerifyAndSend}
        />

        <TransferSuccess
          open={successOpen}
          onClose={() => setSuccessOpen(false)}
          accountNumber={lastTransaction.accountNumber}
          amount={lastTransaction.amount}
          remark={lastTransaction.remark}
        />
      </div>
    </>
  );
}