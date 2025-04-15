import React, { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const [balance, setBalance] = useState("Loading...");
    const token = localStorage.getItem("token");
   const navigate = useNavigate();
    useEffect(() => {
    if(!token){
      navigate("/signup")
    }

        const fetchBalance = async () => {
            try {
                const response = await axios.get(
                    "https://paytm-tsu6.onrender.com/api/v1/account/balance", 
                    {
                        headers: { 
                            Authorization: `Bearer ${localStorage.getItem("token")}` 
                        }
                    }
                );
                console.log("Current balance:", response.data.balance);
                setBalance(response.data.balance.toLocaleString());
            } catch (error) {
                console.error("Error fetching balance:", error);
                setBalance("Error");
            }
        };

        fetchBalance();
    }, []);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    );
};