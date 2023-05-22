import React from 'react'
import Title from './Title'
import Footer from './Footer'
import LoginForm from './LoginForm'
import SignUp from './SignUp'
import { useState } from 'react'
import './signuplogin.css'
const SignUpLogin = () => {
  const [show,setShow]=useState(true)
  return (
    <div>
    <Title></Title>
    <div className="hero-section">
      <h1 >Welcome to the Project Management System</h1>
   </div>
   <div className='form-container'>





       {show?<><LoginForm></LoginForm> 
       <p>Don't have an account?  <button onClick={()=>setShow(false)} className='toggel'>SignUp</button></p>
       </>:
       <>

       <SignUp></SignUp>
       <p>Already have an account? <button onClick={()=>setShow(true)} className='toggel'>login</button></p>
       </>
       }
      </div>

      <div className='form-footer'>
      <Footer></Footer>
      </div>
      
    </div>
  )
}

export default SignUpLogin