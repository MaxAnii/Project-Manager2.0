
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import StudentNavbar from './StudentNavbar';
import ProjectDetails from '../ProjectDetails';
const StudentHome = () => {
  var i=1;
  const param = useParams();
  
const [project,setProject] = useState([]);
const [listProject,setListProject]= useState([])
const [filter,setFilter] = useState('')
  const getProject=async()=>{
    const respone = await fetch(`http://localhost:5000/getprojectlist/student/${param.id}`,
    {
      headers:{
        JToken:localStorage.getItem('JToken')
      }
    });
    const data = await respone.json();
    setProject(data)
    setListProject(data)

  }

  useEffect(()=>{
    getProject()
    
   // eslint-disable-next-line
  },[])


  useEffect(()=>{
    if(filter!= ''){
      setListProject( project.filter((elem) => elem.status == filter)
      )
    }
  else setListProject(project)
  },[filter])



  return (
  <>
 
<StudentNavbar id={param.id} collegeCode={param.collegeCode} dname={param.dname}></StudentNavbar>
  <div className='background'>
 
<div className='container-content'>


<ul className=' row g-3 container-box'  type='none'>
  <li className='col-auto' ><button  className="btn btn-dark mb-3" onClick={()=>{
    setFilter('pending')
  }}>Pending Project</button></li>
  <li className='col-auto'> <button  className="btn btn-dark mb-3" onClick={()=>{
    setFilter('In Progess')
  }}>In Progess Project</button></li>

  <li className='col-auto'><button  className="btn btn-dark mb-3" onClick={()=>{
    setFilter('Rejected')
  }}>Rejected Project</button></li>

  <li className='col-auto'><button  className="btn btn-dark mb-3" onClick={()=>{
    setFilter('Finalized')
  }}>Finalized Project</button></li>


  <li className='col-auto'><button  className="btn btn-dark mb-3" onClick={()=>{
    setFilter('')
  }}>All Project</button></li>
</ul>
</div>
</div>


  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">PROJECT NAME</th>
        <th scope='col'>Project discreption</th>
        <th scope='col'>Status</th>

      </tr>
    </thead>
    <tbody>
     
    {listProject.map(elem=>{
    
   return(
      <tr key={uuid()}>
        <td scope="row" >{i++}</td>
        <td scope="col">{elem.projectName}</td>
        <td scope="col">{elem.description}</td>
     <td> {elem.status}</td>
     <td scope='col'>
     <ProjectDetails info={{...elem}}
     from='student'
     />
     </td>
      </tr>
    )
  })}
  
      
    </tbody>
  </table>


  </>
  )
}

export default StudentHome;