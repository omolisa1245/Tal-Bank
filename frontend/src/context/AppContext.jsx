import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // USER & LOADING
  const [user, setUser] = useState(null); // store logged-in user
  const [loading, setLoading] = useState(true); // true until user is fetched

  // OTHER STATES
  const [transactionPin, setTransactionPin] = useState("");
  const [pinCreated, setPinCreated] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [banks, setBanks] = useState([]);
  const [showPinModal, setShowPinModal] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Fetch user on app load
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("https://tal-bank-9dzh.vercel.app/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user || res.data);
        localStorage.setItem("user", JSON.stringify(res.data.user || res.data));
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    fetchUser();
  }, []);

  // Fetch balance
  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const res = await axios.get("https://tal-bank-9dzh.vercel.app/api/wallet/balance", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBalance(res.data.balance);
      setAccountNumber(res.data.accountNumber);
    } catch (error) {
      console.error("Balance error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (user) fetchBalance();
  }, [user]);

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const res = await axios.get("https://tal-bank-9dzh.vercel.app/transactions/history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransactions(res.data);
    } catch (error) {
      console.error("Transaction error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (user) fetchTransactions();
  }, [user]);

  const formatMoney = (amount) => {
    return amount.toLocaleString("en-NG", { style: "currency", currency: "NGN" });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading, // <-- expose loading globally
        transactionPin,
        setTransactionPin,
        pinCreated,
        setPinCreated,
        balance,
        fetchBalance,
        formatMoney,
        transactions,
        accountNumber,
        banks,
        showPinModal,
        setShowPinModal,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);