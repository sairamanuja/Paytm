import React from "react"
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup} from "../src/pages/Signup"
import { Signin } from "../src/pages/Signin"
import { SendMoney } from "../src/pages/SendMoney"
import { Dashboard } from "../src/pages/Dashboard"
import { UserProfile } from "./pages/profile"
function App() {

  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Signin />} />
      <Route path="/send" element={<SendMoney />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<UserProfile/>} />


    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
