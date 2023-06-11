import React from 'react'
import { useState } from 'react'
import Title from './Title'
import './signuplogin.css'
import './home.css'
import Footer from './Footer'
const ForgotPassword = () => {
    const [show,setShow] = useState(false)
    const [info,setInfo] = useState({
        desgination:"",
        collegeCode:"",
        email:"",
        otp:""
    })
    const [data,setData] = useState([])
    const getEmail=async()=>{
       const respone  = await fetch("http://localhost:5000/getforgotpasswordemail",
        {
            method:"POST",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body:JSON.stringify(info)
        }
       )
       const data = await respone.json();
       setData(data)
       
    }


  return (
    <div>
        <Title></Title>
        <div className="container">
      
      </div>
      <div className="hero-section">
   </div>
      <div className="form-container">
        
        <form  onSubmit={getEmail}>
      <h1 >Reset Password</h1>
        <div className="mb-3 ">
              <label className="form-label">Desgination</label>
              <select
                className="form-select"
                value={info.desgination}
                onChange={(e) => {
                  setInfo({ ...info, desgination: e.target.value });
                }}
                required
              >
                <option defaultValue value="">Choose Your Desgination</option>
                <option>Student</option>
                <option>Professor</option>
                <option>HOD</option>
                <option>College Admin</option>
              </select>
            </div>
          <div className="contact-box  ">
            <div className="mb-3 ">
              <label className="form-label">College Code</label>
              <input
                type="name"
                className="form-control required"
                placeholder="Enter Your College Code"
                required
                value={info.collegeCode}
                autoComplete="current-password"
                onChange={(e) => {
                  setInfo({ ...info, collegeCode: e.target.value });
                }}
              />
            </div>
            <div className="mb-3 ">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control required"
                id="email"
                placeholder="Enter your Registered email "
                required
                value={info.email}
                autoComplete="current-password"
                onChange={(e) => {
                  setInfo({ ...info, email: e.target.value });
                }}
              />
            </div>
           { show? <div className="mb-3 ">
              <label className="form-label">OTP</label>
              <input
                type="text"
                className="form-control required"
                placeholder="Enter your Password "
                required
                value={info.otp}
              
                onChange={(e) => {
                  setInfo({ ...info, otp: e.target.value });
                }}
              />
            </div> :""}
         

            <button type="submit" className="btn btn-dark toggle-disabled login-btn">
              Send
            </button>
           
        
          </div>
        </form>
      </div>
      <div >
      <Footer ></Footer>
      </div>
    </div>
  )
}

export default ForgotPassword