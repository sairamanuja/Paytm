import React from "react"
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup} from "../src/pages/Signup"
import { Signin } from "../src/pages/Signin"
import { SendMoney } from "../src/pages/SendMoney"
import { Dashboard } from "../src/pages/Dashboard"
function App() {

  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/send" element={<SendMoney />} />
      <Route path="/" element={<Dashboard />} />

    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
