import React from "react"
import axios from "axios"
import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleSignin = async () => {
        console.log(username, password)
        const response = await axios.post("https://paytm-tsu6.onrender.com/api/v1/user/login", { username, password })
        localStorage.setItem("token", response.data.token)
        console.log(response)
        alert("Signin Sucessfull")

        navigate("/dashboard")
    }
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="Enter your username" label={"Username"}  onChange={(e) => setUsername(e.target.value)} />
        <InputBox placeholder="Enter your password" label={"Password"} type="password" onChange={(e) => setPassword(e.target.value)} />
        <div className="pt-4">
          <Button label={"Sign in"} onClick={handleSignin} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}