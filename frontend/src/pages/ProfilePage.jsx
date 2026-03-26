import { useRef, useState, useEffect } from "react";
import { Camera, Upload } from "lucide-react";
import { MdOutlineContentCopy } from "react-icons/md";
import { RiArrowLeftLine, RiArrowRightSLine, RiMedalLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    // ===== Fetch user data =====
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!token) return;
                const res = await axios.get("http://localhost:4000/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(res.data); // <--- check the shape of your response
                setUser(res.data.user || res.data);
            } catch (error) {
                console.error(error.response?.data || error.message);
            }
        };

        fetchUser();
    }, [token]);

    // ===== Upload Handlers =====
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            setShowOptions(false);
        }
    };

    const copyAccountNumber = () => {
        if (user?.accountNumber) {
            navigator.clipboard.writeText(user.accountNumber);
            alert("Account number copied!");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen w-full mx-auto pb-20">
            {/* Header */}
            <div className="flex w-full items-center p-4 bg-white shadow-sm">
                <RiArrowLeftLine onClick={() => navigate("/dashboard")} className="text-2xl mr-2 cursor-pointer" />
                <h1 className="text-lg font-medium">My Profile</h1>
            </div>

            {/* Profile Card */}
            <div className="bg-white w-full rounded-2xl m-4 p-5 shadow-sm">
                {/* Avatar */}
                <div className="flex w-full flex-col items-center">
                    <div className="relative ">
                        <img
                            src={profileImage || user?.profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                            alt="profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg cursor-pointer"
                            onClick={() => setShowOptions(true)}
                        />
                        <p className="text-center mt-3 text-gray-500 text-sm">Click image to change</p>
                    </div>

                    {/* Upload Options Modal */}
                    {showOptions && (
                        <div className="fixed w-full inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl w-80 p-6 shadow-lg">
                                <h2 className="text-lg font-semibold mb-4 text-center">Upload Profile Picture</h2>



                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="w-full flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50"
                                >
                                    <Upload className="text-amber-600" />
                                    Upload from Device
                                </button>

                                <button
                                    onClick={() => setShowOptions(false)}
                                    className="w-full mt-4 text-gray-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Hidden Inputs */}
                    <input
                        type="file"
                        accept="image/*"
                        capture="user"
                        ref={cameraInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                    />

                    <h2 className="mt-3 font-semibold text-gray-800">{user?.name || "Your Name"}</h2>
                </div>

                {/* Account Number */}
                <div className="flex justify-between items-center mt-6 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold">{user?.accountNumber || "N/A"}</span>
                        <MdOutlineContentCopy onClick={copyAccountNumber} className="text-sm cursor-pointer" />
                    </div>
                </div>

                {/* Tier */}
                <div className="flex justify-between items-center mt-4 text-sm">
                    <span className="text-gray-600">Account Tier</span>
                    <div className="flex items-center gap-1 bg-amber-100 text-amber-600 px-2 py-1 rounded-full text-xs">
                        <RiMedalLine />
                        Tier 3
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="bg-white rounded-2xl mx-4 shadow-sm">
                <ProfileRow title="First Name" value={user?.firstName  || "N/A"} />
                <ProfileRow title="Last Name" value={user?.lastName || "N/A"} />
                <ProfileRow title="Mobile Number" value={user?.phoneNumber || "N/A"} />
                <ProfileRow title="Nickname" value={user?.otherName || "N/A"} />
                <ProfileRow title="Date of Birth" value={user?.dob || "N/A"} />
                <ProfileRow title="Email" value={user?.email || "N/A"} />
                <ProfileRow title="Address" value={user?.address || "N/A"} />
            </div>
        </div>
    );
};

const ProfileRow = ({ title, value }) => {
    return (
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 last:border-none">
            <span className="text-gray-700 text-sm">{title}</span>
            <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">{value}</span>
                <RiArrowRightSLine className="text-gray-400 text-xl" />
            </div>
        </div>
    );
};

export default ProfilePage;