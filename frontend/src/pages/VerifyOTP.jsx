import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import security from "../assets/security.png"
import { FaArrowLeft } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

const VerifyOTP = () => {

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [phoneNumber, setPhoneNumber] = useState("")
  const inputs = useRef([])
  const navigate = useNavigate()

  // get phone number from previous page
  useEffect(() => {

    const savedPhone = localStorage.getItem("otpPhone")

    if (!savedPhone) {
      alert("Phone number not found")
      navigate("/register")
      return
    }

    setPhoneNumber(savedPhone)

  }, [])

  const handleChange = (value, index) => {

    const digits = value.replace(/\D/g, "")
    if (!digits) return

    const newOtp = [...otp]

    digits.split("").forEach((digit, i) => {
      if (index + i < 6) {
        newOtp[index + i] = digit
      }
    })

    setOtp(newOtp)

    const nextIndex = Math.min(index + digits.length, 5)
    inputs.current[nextIndex]?.focus()

  }

  const handlePaste = (e) => {

    e.preventDefault()

    const paste = e.clipboardData.getData("text")
    const digits = paste.replace(/\D/g, "").slice(0, 6)

    const newOtp = ["", "", "", "", "", ""]

    digits.split("").forEach((digit, i) => {
      newOtp[i] = digit
    })

    setOtp(newOtp)

  }

  const handleKeyDown = (e, index) => {

    if (e.key === "Backspace") {

      const newOtp = [...otp]

      if (otp[index]) {
        newOtp[index] = ""
        setOtp(newOtp)
      } else if (index > 0) {
        inputs.current[index - 1].focus()
      }

    }

  }

  const verifyOTP = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      alert("Please enter the complete OTP");
      return;
    }

    const phoneNumber = localStorage.getItem("otpPhone"); // normalized phone
    if (!phoneNumber) return alert("Phone number missing");

    try {
      const res = await axios.post(
        "https://tal-bank-sandy.vercel.app/api/auth/verify-otp",
        { phoneNumber, otp: code }
      );
      console.log(res.data);
      localStorage.setItem("verifiedPhone", phoneNumber);
      alert("Phone verified!");
      navigate("/auth-page");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Invalid OTP");
    }
  };

  return (

    <div className="min-h-screen w-full flex flex-col pl-[4rem]  bg-amber-50">
      <div className="w-full">
        {/* Header */}
        <div className="flex  items-center gap-70 pt-6">

          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="text-xl cursor-pointer"
          />

          <h2 className="text-sm font-bold mb-2">
            OTP Verify
          </h2>
        </div>

        <div className=" flex ml-13 flex-col  ">
          {/* Icon */}
          <div className=" flex   mb-6">
            <img className="bg-amber-100 p-3 w-25 ml-17 rounded-full" src={security} alt="" />
          </div>

          {/* Title */}

          <h1 className="text-xl ml-10 font-bold mb-2">Verification Code</h1>
          <p className="text-gray-500 text-center mb-4 w-[270px] mt-3">
            We have sent the verification code to your phone number
          </p>

          {/* Phone */}
          <div className="flex items-center mb-8 gap-3">
            <p className="font-semibold ml-14">
              {phoneNumber || "+234-8012345678"}
            </p>
            <FaPen className="text-gray-700 cursor-pointer" />
          </div>
        </div>

      </div>

    

      <div className="bg-white p-8 rounded-2xl shadow-xl w-[80%]  text-center">

        <h2 className="text-2xl font-bold text-amber-600 mb-2">
          Verify OTP
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Code sent to {phoneNumber}
        </p>

        <div className="flex justify-between mb-6">

          {otp.map((digit, index) => (

            <input
              key={index}
              type="text"
              inputMode="numeric"
              value={digit}
              ref={(el) => (inputs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
            />

          ))}

        </div>

        <button
          onClick={verifyOTP}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg"
        >
          Verify OTP
        </button>

      </div>

    </div>

  )
}

export default VerifyOTP