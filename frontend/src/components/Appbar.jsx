import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Appbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                setFirstName(response.data.user.firstName);
            } catch (error) {
                console.error("Error fetching user data:", error);
                // Handle unauthorized (401) by redirecting to login
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/signup");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/signup");
    };

    const handleProfileClick = () => {
        navigate("/profile");
        setIsDropdownOpen(false);
    };

    if (loading) {
        return (
            <div className="shadow h-14 flex justify-between items-center px-4">
                <div className="text-lg font-medium">PayTM App</div>
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="shadow h-14 flex justify-between items-center px-4">
            <div className="text-lg font-medium">PayTM App</div>
            
            <div className="flex items-center gap-2">
                <span>Hello, {firstName || "User"}</span>
                
                <div className="relative">
                    <div 
                        className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {(firstName ? firstName[0] : 'U').toUpperCase()}
                    </div>
                    
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <button 
                                onClick={handleProfileClick}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                Your Profile
                            </button>
                          
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};