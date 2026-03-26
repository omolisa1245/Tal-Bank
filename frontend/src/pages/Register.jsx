import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ReactCountryFlag from "react-country-flag"
import axios from "axios"
import logo from "../assets/logo.png"
import { FaArrowLeft } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Register = () => {

    const [phoneNumber, setPhoneNumber] = useState("")
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [step, setStep] = useState("phone")
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const inputs = useRef([])
    const navigate = useNavigate()

    const [country, setCountry] = useState({
        code: "+234",
        countryCode: "NG"
    })

    const countries = [
        { code: "+234", countryCode: "NG", name: "Nigeria" },
        { code: "+1", countryCode: "US", name: "USA" },
        { code: "+44", countryCode: "GB", name: "UK" },
        { code: "+91", countryCode: "IN", name: "India" }
    ]

    // FORMAT PHONE NUMBER
    const formatPhone = () => {
        return country.code + phoneNumber.replace(/^0+/, "")
    }

    const [accountNumber, setAccountNumber] = useState("")

    const [formData, setFormData] = useState({
        accountNumber: "",
        password: ""
    });


    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [otherName, setOtherName] = useState("")
    const [bvn, setBvn] = useState("")


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    useEffect(() => {
        const verifiedPhone = localStorage.getItem("verifiedPhone");
        if (verifiedPhone) {
            setFormData(prev => ({
                ...prev,
                phoneNumber: verifiedPhone
            }));
            setAccountNumber(verifiedPhone.replace("+234", "")); // display at top
        }
    }, []);



    // LOGIN
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("https://tal-bank-9dzh.vercel.app/api/users/login", {
                accountNumber: formData.accountNumber,
                password: formData.password
            });

            // Extract user and token from response
            const { user, token } = res.data;

            // Save to localStorage
            localStorage.setItem("authToken", token);
            localStorage.setItem("user", JSON.stringify(user));

            alert("Login successful");
            navigate("/dashboard");

        } catch (error) {
            console.log(error.response?.data);
            alert(error.response?.data?.message || "Login failed");
        }
    };


    // SEND OTP
    const sendOTP = async () => {

        const formattedPhone = "+234" + phoneNumber.replace(/^0+/, "")

        // save phone for OTP page
        localStorage.setItem("otpPhone", formattedPhone)

        if (!phoneNumber) {
            return alert("Enter phone number")
        }

        try {

            const res = await axios.post(
                "http://localhost:4000/api/auth/send-otp",
                { phoneNumber: formattedPhone }
            )

            alert(`Your OTP is: ${res.data.otp}`)
            navigate('/verify-otp')
            setStep("otp")

        } catch (error) {

            console.log(error.response?.data || error.message)

            alert("Failed to send OTP")

        }

    }



    return (
        <div className="bg-amber-50  w-full flex flex-col items-center  h-screen">
            <div className="flex items-center gap-130  px-8 pt-5 ">

                <FaArrowLeft
                    onClick={() => navigate(-1)}
                    className="text-xl cursor-pointer"
                />
                <h2 className="text-sm font-bold mb-2">
                    Help
                </h2>
            </div>
            <div className="flex flex-col mb-13 text-center">
                <img className="w-50 ml-12" src={logo} alt="" />
                <h1 className="text-xl text-center flex ml-12 font-bold -mt-7 ">
                    Get A TalBank Account
                </h1>
            </div>
            <div className=" w-[90%] bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center ">



                {!isLogin && (
                    <div className=" w-full ">

                        {/* PHONE STEP */}
                        {step === "phone" && (
                            <>
                                <h2 className="text-2xl font-bold text-amber-600 text-center mb-6">
                                    Secure Login
                                </h2>

                                <div className="flex items-center border rounded-lg overflow-hidden">

                                    <div className="flex items-center gap-1 px-3 bg-gray-50">

                                        <ReactCountryFlag
                                            countryCode={country.countryCode}
                                            svg
                                            style={{ width: "1.5em", height: "1.5em" }}
                                        />

                                        <select
                                            onChange={(e) => {
                                                const selected = countries[e.target.value]
                                                setCountry(selected)
                                            }}
                                            className="bg-transparent outline-none"
                                        >
                                            {countries.map((c, index) => (
                                                <option key={index} value={index}>
                                                    {c.code}
                                                </option>
                                            ))}

                                        </select>

                                    </div>
                                    <div className="w-0.5 h-8  bg-gray-300 border-0"></div>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="flex-1 px-3 py-3 outline-none"
                                    />

                                </div>

                                <button
                                    onClick={sendOTP}
                                    className="w-full mt-5 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg"
                                >
                                    Send OTP
                                </button>


                            </>
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

                )}

                {/* LOGIN */}
                {isLogin && (

                    <form className="w-full" onSubmit={handleLogin}>

                        <input
                            type="text"
                            name="accountNumber"
                            placeholder="Account Number"
                            value={formData.accountNumber}
                            maxLength={10}
                            onChange={handleChange}
                            className="w-full bg-gray-100 rounded-xl p-4 mb-4 outline-none"
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-gray-100 rounded-xl p-4 mb-4 outline-none"
                            />

                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-4 top-7 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-amber-500 text-white py-4 rounded-full font-semibold mb-6"
                        >
                            LOGIN
                        </button>

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


                    </form>

                )}
            </div>




        </div>
    )
}

export default Register