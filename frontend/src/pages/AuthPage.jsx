import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const AuthPage = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");

  const [formData, setFormData] = useState({
    accountNumber: "",
    password: "",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [bvn, setBvn] = useState("");

  useEffect(() => {
    const verifiedPhone = localStorage.getItem("verifiedPhone");
    if (verifiedPhone) {
      setFormData(prev => ({ ...prev, phoneNumber: verifiedPhone }));
      setAccountNumber(verifiedPhone.replace("+234", "")); // display at top
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ----------------- LOGIN -----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://tal-bank-sandy.vercel.app/api/users/login`, {
        accountNumber: formData.accountNumber,
        password: formData.password,
      });

      const { user, token } = res.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("pinCreated", user.pinCreated);

      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  // ----------------- REGISTER -----------------
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const verifiedPhone = localStorage.getItem("verifiedPhone");
      if (!verifiedPhone) {
        alert("Please verify your phone first");
        return;
      }

      const res = await axios.post(`https://tal-bank-sandy.vercel.app/api/users/register`, {
        phoneNumber: verifiedPhone,
        firstName,
        lastName,
        otherName,
        bvn,
        password: formData.password,
      });

      const generatedAccount = res.data.user.accountNumber;

      alert(`Account created successfully! Your account number is ${generatedAccount}`);

      // set accountNumber for login
      setFormData(prev => ({ ...prev, accountNumber: generatedAccount }));
      setAccountNumber(generatedAccount);
      setIsLogin(true);

    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="mx-auto min-h-screen bg-white px-5 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <IoArrowBack onClick={() => navigate('/')} className="text-xl cursor-pointer" />
        <p className="text-amber-500 text-sm">Help</p>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img className='w-50 object-cover' src={logo} alt="logo" />
      </div>

      <h2 className="text-2xl font-semibold mb-6">
        {isLogin ? "Log in to your account" : "Create an Account"}
      </h2>

      {/* REGISTER */}
      {!isLogin && (
        <form onSubmit={handleRegister}>
          <input
            value={accountNumber}
            disabled
            className="w-full bg-gray-200 rounded-xl p-4 mb-4 outline-none"
            placeholder="Account Number"
          />
          <input
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-gray-100 rounded-xl p-4 mb-4 outline-none"
          />
          <input
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-gray-100 rounded-xl p-4 mb-4 outline-none"
          />
          <input
            placeholder="Other Name (Optional)"
            onChange={(e) => setOtherName(e.target.value)}
            className="w-full bg-gray-100 rounded-xl p-4 mb-4 outline-none"
          />
          <input
            placeholder="BVN"
            onChange={(e) => setBvn(e.target.value)}
            className="w-full bg-gray-100 rounded-xl p-4 mb-4 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-xl p-4 mb-4 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-4 rounded-full font-semibold"
          >
            REGISTER
          </button>
        </form>
      )}

      {/* LOGIN */}
      {isLogin && (
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="accountNumber"
            placeholder="Account Number"
            value={formData.accountNumber}
            maxLength={10}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-xl p-4 outline-none"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl p-4 pr-12 outline-none"
            />
            <span
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-4 rounded-full font-semibold"
          >
            LOGIN
          </button>
        </form>
      )}

      {/* Switch */}
      <div className="text-center text-sm text-gray-600 mt-6">
        {isLogin ? (
          <>
            Don't have an account?
            <span
              onClick={() => setIsLogin(false)}
              className="text-amber-500 ml-1 cursor-pointer"
            >
              Register
            </span>
          </>
        ) : (
          <>
            Already have an account?
            <span
              onClick={() => setIsLogin(true)}
              className="text-amber-500 ml-1 cursor-pointer"
            >
              Login
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;