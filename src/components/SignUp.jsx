import React, { useEffect, useState } from 'react'
// import {v4 as uuid } from 'uuid'
// import useAuth from '../hooks/useAuth';
// import './start.css'
// import { useNavigate } from "react-router-dom";
const SignUp = () => {
//   localStorage.removeItem('auth')
//   localStorage.removeItem('JToken')
//   const {info} = useAuth();




//   const navigate = useNavigate();

  // to get userInfo 
  const [userInfo,setUserInfo]=useState({
   
    id:"",
    name:"",
    collegeName:"",
    collegeCode:"",
    email:"",
    password:"",
    dname:"",
    desgination:"",
    userid: ""
  })

  const [condition,setCondition] = useState({
    password:"",
  
  })
const [errorMessage,setErrorMessage] = useState('')
const [show,setShow] = useState(false)
const [departmaent,setDepartment]= useState([{
    dname:"cse"
},{
    dname:"ae"
}])

useEffect(()=>{
  
  (userInfo.desgination === "Student") ? setShow(true): setShow(false)
},[userInfo.desgination])

// const getDepartmentList=async()=>{ 

//     const response = await fetch(`http://localhost:5000/departmentInfo/${userInfo.collegeCode}`,
//     {
//       headers:{
//         JToken:localStorage.getItem('JToken')
//       }
//     });
//   const data = await response.json();
//   setDepartment(data);
// }

// useEffect( ()=>{
 
//  if(userInfo.desgination === "Student" ) {
//     getDepartmentList();
// }
// },[userInfo.collegeCode])


  const register=async(e)=>{
    e.preventDefault()
    setErrorMessage("")
if(userInfo.password.length < 8){
setErrorMessage("password should have 8 characters")
}
 else if(userInfo.password !== condition.password){
setErrorMessage("password is not matching");
    }

else{

//  const response =  await fetch("http://localhost:5000", {
//   withCredentials: true,
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userInfo),
//   });
//   const data = await response.json()

//   if(data.length !==0)
//  {
//   info.auth = true
//   localStorage.setItem('auth',true);
//   localStorage.setItem('JToken',data.JToken)

//   if(userInfo.desgination === 'College Admin')
//   navigate(`/home/${userInfo.collegeCode}/${userInfo.userid}`)
// else
// navigate(`/studenthome/${userInfo.userid}/${userInfo.collegeCode}/${userInfo.dname}`)
// }


}  
  

  }
  return (
   <>


        <div className='form signUp'  >
    <form onSubmit={register}>
  
          <div className="contact-box  "  >
  <div className="mb-3 ">
            <label  className="form-label">Desgination</label>
            <select className="form-select" value={userInfo.desgination} onChange={e=>{setUserInfo({...userInfo,desgination:e.target.value})}} required>
  <option defaultValue value="">Sign Up As</option>
  <option >Student</option>
  <option >College Admin</option>
</select>
</div>
          <div className="mb-3 ">
                <label className="form-label">User Name</label>
                <input type="name" className="form-control required"  placeholder="Enter Your Name"  required
                  value={userInfo.name} onChange={e=>{setUserInfo({...userInfo,name:e.target.value})}}
                />
              </div>
              <div className="mb-3 ">
                <label className="form-label">College Name</label>
                <input type="name" className="form-control required"  placeholder="Enter Your College Name"  required
                  value={userInfo.collegeName} onChange={e=>{setUserInfo({...userInfo,collegeName:e.target.value})}}
                />
              </div>
              <div className="mb-3 ">
                <label className="form-label">College Code</label>
                <input type="name" className="form-control required"  placeholder="Enter Your College Code"  required
                  value={userInfo.collegeCode} onChange={e=>{setUserInfo({...userInfo,collegeCode:e.target.value})}}
                />
              </div>
             
              <div className="mb-3 ">
                <label className="form-label">User Id</label>
                <input type="name" className="form-control required"  placeholder="Enter Your Id"  required
                  value={userInfo.id} onChange={e=>{setUserInfo({...userInfo,id:e.target.value})}}
                />
              </div>
              { show ?  
              <> <div className="mb-3 ">
            <label  className="form-label">Department</label>
            <select className="form-select" 
          value={userInfo.dname} onChange={e=>{setUserInfo({...userInfo,dname:e.target.value})}} required>
                  
                   <option defaultValue >choose Department</option>
                   {departmaent.map(elem=>{
                    return(
                      <option >{elem.dname}</option>)})
}
</select>
</div>
</>
              :"" }
             
           
            <div className="mb-3 ">
            <label  className="form-label">Email address</label>
            <input type="email" className="form-control required" id="email" placeholder="Enter your Registered email " required
              value={userInfo.email} onChange={e=>{setUserInfo({...userInfo,email:e.target.value})}}
            />
          </div>
          <div className="mb-3 ">
            <label  className="form-label">Password</label>
            <input type="password" className="form-control required"  placeholder="Enter Password " required
              value={userInfo.password} onChange={e=>{setUserInfo({...userInfo,password:e.target.value})}}
            />
          </div>
          <div className="mb-3 ">
            <label  className="form-label">Confrom Password</label>
            <input type="password" className="form-control required"  placeholder="Conform Password " required
              value={condition.password} onChange={e=>{setCondition({...condition,password:e.target.value})}}
            />
          </div>

         <div style={{color: "red"}}> {errorMessage} </div>


          <button type="submit" className="btn btn-dark toggle-disabled ">SignUp</button>
          </div>
        </form>
</div>


   </>
  )
}

export default SignUp;