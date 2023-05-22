// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";

import { useState } from "react"


const LoginForm = () => {
// localStorage.removeItem('auth')
// localStorage.removeItem('JToken')
// const {info} = useAuth();
// const userInformation = GolobalContext()

//   const navigate = useNavigate()

  const[loginInfo,setLoginInfo]=useState({
    collegeCode:"",
    email:"",
    password:"",
    desgination:""
  })
  
 const [error,setError]=useState("")

  
  
  
//   const login=async(e)=>{
//  setError("")
// e.preventDefault();


//   const response =await fetch(`http://localhost:5000/login/${loginInfo.collegeCode}/${loginInfo.email}/${loginInfo.password}/${loginInfo.desgination}`,  {
//     withCredentials: true
//   })

//   const data = await response.json()


//   if(data.length !== 0){
//      info.auth=true
//      localStorage.setItem("JToken", data.JToken);
//   localStorage.setItem('auth',true)
//   userInformation.setdata(data)
//     if(loginInfo.desgination === 'College Admin')
//    navigate(`/home/${data.collegecode}/${data.id}`,{state:{id:"ansar"

//    }})
//   else if(loginInfo.desgination === "HOD")
//   navigate(`/hodhome/${data.id}/${data.dname}/${data.collegecode}`)
//   else if (loginInfo.desgination === "Professor")
//   navigate(`/profhome/${data.profid}/${data.cc}/${data.dname}`)
//   else
//   navigate(`/StudentHome/${data.usn}/${data.collegecode}/${data.dname}`)
//   }
//   else{
// setError("Details Not Exist")
//   }
// }


  return (
    <>

<div className='container'>
<div >

</div>

</div>


    <div className='form'>
    <div style={{color:"red"}}><h3>{error}</h3></div>
    <form >
          <div className="contact-box  "  >
            <div className="mb-3 ">
                <label className="form-label">College Code</label>
                <input type="name" className="form-control required"  placeholder="Enter Your College Code"  required
                  value={loginInfo.collegeCode}   autoComplete="current-password" onChange={e=>{setLoginInfo({...loginInfo,collegeCode:e.target.value})}}
                />
              </div>
            <div className="mb-3 ">
            <label  className="form-label">Email address</label>
            <input type="email" className="form-control required" id="email" placeholder="Enter your Registered email " required
               value={loginInfo.email}  autoComplete="current-password" onChange={e=>{setLoginInfo({...loginInfo,email:e.target.value})}}
            />
          </div>
          <div className="mb-3 ">
            <label  className="form-label">Password</label>
            <input type="password" className="form-control required"  placeholder="Enter your Password " required
               value={loginInfo.password}  autoComplete="current-password" onChange={e=>{setLoginInfo({...loginInfo,password:e.target.value})}}
            />
          </div>
          <div className="mb-3 ">
            <label  className="form-label">Desgination</label>
          <select className="form-select" value={loginInfo.desgination} onChange={e=>{setLoginInfo({...loginInfo,desgination:e.target.value})}} required>
  <option defaultValue value=""></option>
  <option >Student</option>
  <option >Professor</option>
  <option>HOD</option>
  <option >College Admin</option>
</select>
</div>
          <button type="submit" className="btn btn-dark toggle-disabled "  >Login</button>
          </div>
        </form>
</div>

    </>
  )
}

export default LoginForm