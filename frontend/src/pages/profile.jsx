import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
export function UserProfile() {
    const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
    balance: 0
  });
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signup");
};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://paytm-tsu6.onrender.com/api/v1/user/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUserDetails({
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          username: response.data.user.username,
          balance: response.data.balance
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
        {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
            {userDetails.firstName.charAt(0)}
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome, {userDetails.firstName} {userDetails.lastName}
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            @{userDetails.username}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Balance Card */}
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-lg font-medium text-gray-900 mb-1">Account Balance</h3>
            <p className="text-4xl font-bold text-blue-600">
              ₹{userDetails.balance.toFixed(2)}
            </p>
          </div>

          {/* Personal Information */}
          <div className="px-6 py-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-500">First Name</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{userDetails.firstName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Name</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{userDetails.lastName}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-gray-500">Username</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{userDetails.username}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 bg-gray-50 text-right">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}