import React from "react";
import{ BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import './App.css'
import SignUpLogin from "./components/SignUpLogin";
import AdminHome from "./components/Admin/AdminHome";
import DepartmentInfo from "./components/Admin/DepartmentInfo";
import DepartmentHome from "./components/Department/DepartmentHome";
import MentorHome from "./components/mentor/MenotHome";
import StudentHome from "./components/student/StudentHome";
import AddNewProject from "./components/student/AddNewProject";
import MentorProjectList from "./components/Admin/MentorProjectList";
import DepartmentMentorProjectList from "./components/Department/DepartmentMentorProjectList";
import ListAllproject from "./components/Admin/ListAllProject";
import ListDepartmentProject from "./components/Department/ListDepartmentProject";
import ListDepartmentProjectInMentor from "./components/mentor/ListDepartmentProjectInMentor";
import AdminPersonalInformation from "./components/Admin/AdminPersonalInformation";
import DepartmentPersonalInfo from "./components/Department/DepartmentPersonalInfo";
import MentorPersonalInfo from "./components/mentor/MentorPersonalInfo";
import StudentPersonalInfo from "./components/student/StudentPersonalInfo";
import ForgotPassword from "./components/ForgotPassword";


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
  <Route path="/AdminHome/:id/:collegeCode/departmentInfo/:dname/mentorprojectlist/:mentorid" element={<MentorProjectList></MentorProjectList>}/>
  <Route path="/AdminHome/:id/:collegeCode/listallproject" element={<ListAllproject></ListAllproject>}/>
  <Route path="/AdminHome/:id/:collegeCode/personalinfo" element={<AdminPersonalInformation></AdminPersonalInformation>}/>







  <Route path='/DepartmentHome/:id/:collegeCode/:dname' element={<DepartmentHome></DepartmentHome>}/>
  <Route path='/DepartmentHome/:id/:collegeCode/:dname/mentorprojectlist/:mentorid' element={<DepartmentMentorProjectList></DepartmentMentorProjectList>}/>
  <Route path='/DepartmentHome/:id/:collegeCode/:dname/departmentprojectlist' element={<ListDepartmentProject></ListDepartmentProject>}/>
  <Route path='/DepartmentHome/:id/:collegeCode/:dname/personalInfo' element={<DepartmentPersonalInfo></DepartmentPersonalInfo>}/>


















  <Route path="/MentorHome/:id/:collegeCode/:dname" element={<MentorHome></MentorHome>}/>
  <Route path="/MentorHome/:id/:collegeCode/:dname/getdepartmentlist" element={<ListDepartmentProjectInMentor></ListDepartmentProjectInMentor>}/>
  <Route path="/MentorHome/:id/:collegeCode/:dname/personalInfo" element={<MentorPersonalInfo></MentorPersonalInfo>}/>
  















  <Route path="/StudentHome/:id/:collegeCode/:dname" element={<StudentHome></StudentHome>}/>
  <Route path='/AddNewProject/:id/:collegeCode/:dname' element={<AddNewProject></AddNewProject>}/>
  <Route path="/StudentHome/:id/:collegeCode/:dname/personalInfo" element={<StudentPersonalInfo></StudentPersonalInfo>}/>
   <Route path="/forgot_password" element={<ForgotPassword></ForgotPassword>}/>





  </Routes>
   









   </BrowserRouter>

    </>
  )
}

export default App
