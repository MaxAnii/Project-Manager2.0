import React from 'react'
import { useState } from 'react'
import Title from './Title'
import './signuplogin.css'
import './home.css'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
const ForgotPassword = () => {
    const [showOtp,setShowOtp] = useState(false)
    const [showResetPassword,setShowResetPassword] = useState(true)
    const [info,setInfo] = useState({
        desgination:"",
        collegeCode:"",
        email:"",
        otp:"",
        CheckPassword:""
    })
    const [message,setMessage]=useState("");
    const [data,setData] = useState([])
    const [newInfo,setNewInfo] = useState({
      id:"",
      password:"",
      desgination:""
    })
    const navigate = useNavigate()

    const getEmail=async(e)=>{
      e.preventDefault();
      setMessage("")
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
       if(data.length !== 0){
        setMessage("Email Sent")
        setShowOtp(true);
         setData(data)
         setNewInfo({...newInfo,id:data[0].id});
         
       }
       else{
        setMessage("No such details")
       }
       
       
    }
const checkOTP=(e)=>{
e.preventDefault();
  if(data[0].otp === info.otp){
    setMessage("OPT verified")
    setShowResetPassword(false)
  }
  else{
    setMessage("Incorrect OTP")
  }
}


const setNewPassword=async(e)=>{
e.preventDefault();

if(info.CheckPassword != newInfo.password){
  setMessage("Password is not matching")
} 
else if (info.CheckPassword.length <7){
 setMessage("password should have atleast 8 characters")
}
else{
  let data = await fetch("http://localhost:5000/updateyourpassword",
  {
    method:"POST",
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body:JSON.stringify(newInfo)
  }
  )


  setMessage("Password Updated")
  setTimeout(()=>{
    navigate("/loginSignup")
  },1000)
}

}
  return (
    <div>
        <Title></Title>
        <div className="container">
      
      </div>
      <div className="hero-section">
   </div>
      <div className="form-container">
        
    
      <h1 >Reset Password</h1>
     <h3 style={{color:"red",textAlign:"center"}}>{message}</h3> 
     {  showResetPassword?
      <>    <form  onSubmit={getEmail}>
        <div className="mb-3 ">
              <label className="form-label">Desgination</label>
              <select
                className="form-select"
                value={info.desgination}
                onChange={(e) => {
                  setInfo({ ...info, desgination: e.target.value });
                    setNewInfo({...newInfo,desgination:e.target.value})}}
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
                onChange={(e) => {
                  setInfo({ ...info, email: e.target.value });
                }}
              />
            </div>
          
         

            <button type="submit" className="btn btn-dark toggle-disabled login-btn">
              Send password reset email 
            </button>
           
        
          </div>
        </form>
      { showOtp? <form onSubmit={checkOTP}>
        <div className="mb-3 ">
              <label className="form-label">OTP</label>
              <input
                type="text"
                className="form-control required"
                placeholder="Enter OTP "
                required
                value={info.otp}
              
                onChange={(e) => {
                  setInfo({ ...info, otp: e.target.value });
                }}
              />
            </div> 
            <button type="submit" className="btn btn-dark toggle-disabled login-btn otp">
              verifiy OTP
            </button>
        </form>:""} </> :
         <form onSubmit={setNewPassword}>
        <div className="mb-3 ">
              <label className="form-label">Enter New Password</label>
              <input
                type="text"
                className="form-control required"
             
                placeholder="Enter New Password "
                required
                value={info.CheckPassword}
                onChange={(e) => {
                  setInfo({ ...info, CheckPassword: e.target.value });
                }}
              />
            </div>
            <div className="mb-3 ">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control required"
              
                placeholder="Confirm Your Password "
                required
                value={newInfo.password}
                onChange={(e) => {
                  setNewInfo({ ...newInfo, password: e.target.value });
                }}
              />
            </div>
            <button type="submit" className="btn btn-dark toggle-disabled login-btn">
             Change Password
            </button>
        </form>}
      </div>
      <div >
      <Footer ></Footer>
      </div>
    </div>
  )
}

export default ForgotPassword