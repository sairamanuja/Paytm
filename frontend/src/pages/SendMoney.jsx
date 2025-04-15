import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react"; // You can use any icon library
import { useNavigate } from "react-router-dom";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showAnimation, setShowAnimation] = useState(false);
    const navigate = useNavigate();

    const handleTransfer = async () => {
        if (!amount || amount <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccess("");
        setShowAnimation(true);

        try {
            const response = await axios.post(
                "https://paytm-tsu6.onrender.com/api/v1/account/transfer",
                {
                    to: id,
                    amount: Number(amount)
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            setSuccess(`Successfully transferred ₹${amount} to ${name}`);
            setAmount(0);
        } catch (err) {
            setError(err.response?.data?.message || "Transaction failed. Please try again.");
        } finally {
            setIsLoading(false);
            setTimeout(() => setShowAnimation(false), 3000);
            setTimeout(() =>  navigate("/dashboard"), 3000);
            
           
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">

            <AnimatePresence>
                {showAnimation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            className="bg-white p-8 rounded-lg max-w-sm w-full mx-4 flex flex-col items-center"
                        >
                            {isLoading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="mb-4"
                                    >
                                        <Loader2 className="h-12 w-12 text-green-500" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold mb-2">Processing Payment</h3>
                                    <p className="text-gray-600">Please wait while we process your transaction</p>
                                    <motion.div 
                                        className="w-full bg-gray-200 h-2 mt-4 rounded-full overflow-hidden"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                    >
                                        <div className="h-full bg-green-500 rounded-full" />
                                    </motion.div>
                                </>
                            ) : (
                                <>
                                    {success ? (
                                        <>
                                            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                                            <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                                            <p className="text-gray-600">{success}</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                                <svg
                                                    className="h-6 w-6 text-red-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">Payment Failed</h3>
                                            <p className="text-gray-600">{error}</p>
                                        </>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            {error && !showAnimation && (
                                <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
                                    {error}
                                </div>
                            )}
                            {success && !showAnimation && (
                                <div className="text-green-500 text-sm p-2 bg-green-50 rounded-md">
                                    {success}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    value={amount}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button
                                onClick={handleTransfer}
                                disabled={isLoading}
                                className={`justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white ${
                                    isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"
                                }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    "Initiate Transfer"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};