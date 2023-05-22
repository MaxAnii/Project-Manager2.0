import React from "react";
import{ BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import './App.css'
import SignUpLogin from "./components/SignUpLogin";
function App() {
  return (
    <>
    
    {/* <SignUpLogin></SignUpLogin> */}
<BrowserRouter>
  
  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/loginSignup" element={<SignUpLogin></SignUpLogin>}/>
  </Routes>
   
   </BrowserRouter>

    </>
  )
}

export default App
