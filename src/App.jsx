import React from "react";
import{ BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import './App.css'
import SignUpLogin from "./components/SignUpLogin";
import AdminHome from "./components/Admin/AdminHome";
import DepartmentInfo from "./components/Admin/DepartmentInfo";
import DepartmentHome from "./components/Department/DepartmentHome";
import MentorHome from "./components/mentor/MenotHome";
import StudentHome from "./student/StudentHome";
import AddNewProject from "./student/AddNewProject";
function App() {
  return (
    <>
    
    {/* <SignUpLogin></SignUpLogin> */}
<BrowserRouter>
  
  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/loginSignup" element={<SignUpLogin></SignUpLogin>}/>
  <Route path="/AdminHome/:id/:collegeCode" element={<AdminHome></AdminHome>}/>
  <Route path="/AdminHome/:id/:collegeCode/departmentInfo/:dname" element={<DepartmentInfo></DepartmentInfo>}/>








  <Route path='/DepartmentHome/:id/:collegeCode/:dname' element={<DepartmentHome></DepartmentHome>}/>


















  <Route path="/MentorHome/:id/:collegeCode/:dname" element={<MentorHome></MentorHome>}/>















  <Route path="/StudentHome/:id/:collegeCode/:dname" element={<StudentHome></StudentHome>}/>
  <Route path='/AddNewProject/:id/:collegeCode/:dname' element={<AddNewProject></AddNewProject>}/>
  </Routes>
   
   </BrowserRouter>

    </>
  )
}

export default App
