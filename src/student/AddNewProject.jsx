
import { React,useEffect,useState } from 'react';
import StudentNavbar from './StudentNavbar';
import {  useParams } from 'react-router-dom'
import Select from 'react-select';
import { v4 } from 'uuid';
import './student.css'
import Footer from '../components/Footer'
const AddNewProject = () => {
  const param = useParams();
  var memberOptions = []
  var mentorOptions = []
  let day = new Date().getDate();
let month = new Date().getMonth();
let year = new Date().getFullYear();

  const [ProjectInfo,setProjectInfo] = useState({
    id:v4().slice(0,29),
    projectName:"",
    leaderId:param.id,
    description:"",
    mentorid:"",
    status:'pending',
   date: `${year}-${month+1}-${day}`
    
  })
  const [projectType ,setProjectType] = useState("")

  const [usn,setUsn] = useState([])
    const [mentor,setMentor] = useState([])
    const [projectMember, setProjectMember] =useState([])

    const getData= async()=>{
      if(projectType === 'interDepartment'){
      const mentorResponse= await fetch(`http://localhost:5000/getProjectMentorList/${projectType}/${param.collegeCode}/${param.dname}`)
      const mentorData =await mentorResponse.json()
      setMentor(mentorData)
      const memberResponse = await fetch(`http://localhost:5000/getProjectMemberList/${projectType}/${param.collegeCode}/${param.dname}`)
      const memberData = await memberResponse.json()
    setProjectMember(memberData)
    }
    else if(projectType === 'interCollege'){
        const mentorResponse= await fetch(`http://localhost:5000/getProjectMentorList/${projectType}/${param.collegeCode}`)
        const mentorData =await mentorResponse.json()
        setMentor(mentorData)
      const memberResponse = await fetch(`http://localhost:5000/getProjectMemberList/${projectType}/${param.collegeCode}`)
      const memberData = await memberResponse.json()
    setProjectMember(memberData)
    }

}
  useEffect(()=>{
    getData()
    // eslint-disable-next-line
  },[projectType])

  //seting fetched usn as option list for select
  for(var i=0;i<projectMember.length;i++){
memberOptions[i] = {
  value:projectMember[i].id,
  label:projectMember[i].studentId,
}
  }

  for(var i=0;i<mentor.length;i++){
mentorOptions[i] = {
  value:mentor[i].id,
  label:mentor[i].name
}
}


const submitProject=async(e)=>{
  e.preventDefault();

 fetch("http://localhost:5000/addNewProject/project",{
       method:"POST",
       headers:{
          //  JToken:localStorage.getItem('JToken'),
           Accept:"application/json",
           "Content-Type":"application/json"
         },
     body: JSON.stringify(ProjectInfo)
   })
 

   for(let i=0;i<usn.length;i++){
       const projectMemberDetails={
          projectId:ProjectInfo.id,
           memberId:usn[i].value,
         }
       fetch("http://localhost:5000/addNewProject/member",{
             method:"POST",
             headers:{
                 JToken:localStorage.getItem('JToken'),
                 Accept:"application/json",
         "Content-Type":"application/json"
       },
       body: JSON.stringify(projectMemberDetails)
     })
   }

   setProjectInfo({...ProjectInfo,projectName:"", 
   description:"",
   id:v4().slice(0,29)})
   setUsn([])
   alert("Project Submission Successful")


}


const handleChangeUsn=(selectedOption)=>{
  var arr = selectedOption

  setUsn(arr);
  if(arr.length>4)
  {
    alert("Cannot Add more then 4 members")
   setUsn(arr.slice(0,4))
  }
}

const setMentorId=(selectedOption)=>{
 setProjectInfo({...ProjectInfo,mentorid:selectedOption.value})
}

    return (
    <>
<StudentNavbar id={param.id} dname={param.dname} collegeCode={param.collegeCode}></StudentNavbar>


  <div className='background'>

<div className='container-content'>

<h3 className='heading'>
Add new project with Project Manager
</h3>

</div>
</div>

<div className='project-form'>

<form className="row g-3 FormContainer" onSubmit={submitProject}>
<div className="col-md-12 ">
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineCheckbox1" value="interDepartment" onChange={e=>setProjectType(e.target.value)} name='projectType'/>
  <label className="form-check-label" >Inter Department</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineCheckbox2" value="interCollege" onChange={()=>setProjectType("interCollege")}  name='projectType'/>
  <label className="form-check-label" >Inter College</label>
</div>
  </div>
  <div className="col-md-6">
    <label  className="form-label">Project Name</label>
    <input type="text" className="form-control" value={ProjectInfo.projectName}
    onChange={e=>{setProjectInfo({...ProjectInfo,projectName:e.target.value})}}
     required/>
  </div>
  <div className="col-md-6">
    <label  className="form-label">Mentor</label>
    <Select  
 options={mentorOptions} 
  onChange={setMentorId}
    placeholder="Search Project Mentor"
    noOptionsMessage={()=> "No member found"}
    required
/>

  </div>
  <div className="col-12">
    <label  className="form-label">Project Description</label>

  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
  value={ProjectInfo.description} onChange={e=>{setProjectInfo({...ProjectInfo,description:e.target.value})}}
  required ></textarea>

  </div>
    <label  className="form-label">Add Member</label>

<Select  
 options={memberOptions} isMulti
   onChange={handleChangeUsn}
    value={usn}
    placeholder="Search Project Member"
    noOptionsMessage={()=> "No member found"}
/>


  
  <div className="col-12">
  <button key="SubmitForm" type="submit" className="btn btn-success"  >Submit</button>
  </div>
  
</form>

</div>
<Footer></Footer>
    </>
  )
}

export default AddNewProject;