import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Support from './pages/Support';
import Notification from './pages/Notification';
import Scanner from './pages/Scanner';
import TransferToTal from './pages/TransferToTal';
import TransferToOtherBank from './pages/TransferToOtherBank';
import Withdraw from './pages/Withdraw';
import CashWithdrawal from './pages/CashWithdrawal';
import CardWithdrawal from './pages/CardWithdraw';
import PayMerchant from './pages/PayMerchant';
import TransactionHistory from './pages/TransactionHistory';
import AirtimePage from './pages/AirtimePage';
import DataPage from './pages/DataPage';
import BettingPage from './pages/BettingPage';
import DstvPage from './pages/DstvPage';
import AllServices from './pages/AllServices';
import FinancePage from './pages/FinancePage';
import RewardsPage from './pages/RewardsPage';
import MePage from './pages/MePage';
import AccountLimitPage from './pages/AccountLimitPage';
import AddBankCardPage from './pages/AddBankCardPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import BottomNav from './component/BottonNav';
import Register from './pages/Register';
import VerifyOTP from './pages/VerifyOTP';
import SendMoney from './pages/SendMoney';
import DepositMoney from './pages/DepositMoney';
import AirtimeHistoryPage from './pages/AirtimeHistoryPage';
import DataHistoryPage from './pages/DataHistoryPage';
import BetHistoryPage from './pages/BetHistoryPage';
import CreateTransactionPinModal from './pages/CreateTransactionPinModal';

const App = () => {

  const location = useLocation();

  // pages where BottomNav should NOT appear
  const hiddenRoutes = ["/auth-page", "/otp-page","/verify-otp","/send-money","/verify-otp", '/'];

const hideBottomNav = hiddenRoutes.includes(location.pathname);
 

  return (
    <>
      <div className="min-h-screen w-screen bg-gray-100 pb-12 px-5 ">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/support" element={<Support />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/scan" element={<Scanner/>} />
          <Route path="/to-tal" element={<TransferToTal/>} />
          <Route path="/other-bank" element={<TransferToOtherBank/>} />
          <Route path="/withdraw" element={<Withdraw/>} />
          <Route path="/cash-w" element={<CashWithdrawal/>} />
          <Route path="/card-w" element={<CardWithdrawal/>} />
          <Route path="/pay-m" element={<PayMerchant/>} />
          <Route path="/history" element={<TransactionHistory/>} />
          <Route path="/airtime" element={<AirtimePage/>} />
          <Route path="/data" element={<DataPage/>} />
          <Route path="/betting" element={<BettingPage/>} />
          <Route path="/dstv" element={<DstvPage/>} />
          <Route path="/all-services" element={<AllServices/>} />
          <Route path="/finance" element={<FinancePage/>} />
          <Route path="/reward" element={<RewardsPage/>} />
          <Route path="/me" element={<MePage/>} />
          <Route path="/account-limit" element={<AccountLimitPage/>} />
          <Route path="/bank-card" element={<AddBankCardPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/auth-page" element={<AuthPage/>} />
          <Route path="/verify-otp" element={<VerifyOTP/>} />
          <Route path="/" element={<Register/>} />
          <Route path="/send-money" element={<SendMoney/>} />
          <Route path="/deposit-money" element={<DepositMoney/>} />
          <Route path="/airtime-history" element={<AirtimeHistoryPage/>} />
          <Route path="/data-history" element={<DataHistoryPage/>} />
          <Route path="/betting-history" element={<BetHistoryPage/>} />
          
        </Routes>
      </div>

      {!hideBottomNav && <BottomNav />}
    </>
  )
}

export default App