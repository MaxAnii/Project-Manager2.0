
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import StudentNavbar from './StudentNavbar';
import ProjectDetails from '../components/ProjectDetails';
// import Title from '../Title';
const StudentHome = () => {
  var i=1;
  const param = useParams();
  
const [project,setProject] = useState([]);
const [member,setMember] = useState([]);
const [condition,setCondition]= useState({
  thead:"Status",
  status:null,
  finalize:false,
  message:"Pending "
})

  const getProject=async()=>{
    const respone = await fetch(`http://localhost:5000/getprojectlist/student/${param.id}`)
    // {
    //   headers:{
    //     JToken:localStorage.getItem('JToken')
    //   }
    // });
    const data = await respone.json();
    setProject(data)
  
    // const respone2 = await fetch(`http://localhost:5000/student/projectlist/${param.id}/member`,
    // {
    //   headers:{
    //     JToken:localStorage.getItem('JToken')
    //   }
    // });
    // const data2 = await respone2.json();
    // setMember(data2)
  }

  useEffect(()=>{
    getProject()
    
   // eslint-disable-next-line
  },[])

  return (
  <>
 
<StudentNavbar id={param.id} collegeCode={param.collegeCode} dname={param.dname}></StudentNavbar>
  <div className='background'>
 
<div className='container-content'>


<ul className=' row g-3 container-box'  type='none' >
<li className='col-auto' ><button  className="btn btn-dark mb-3" onClick={()=>setCondition({
  thead:"Status",
  status:null,
  finalize:false,
  message:"Pending "
})}>Pending Project</button></li>

  <li className='col-auto' > <button  className="btn btn-dark mb-3" onClick={()=>setCondition({
    thead:"Status",
  status:true,
  finalize:false,
  message:"In Progess "
})}>In Progess Project</button></li>


  <li className='col-auto' ><button  className="btn btn-dark mb-3" onClick={()=>setCondition({
  thead:"Reason",
  status:false,
  finalize:false,
  message:"Rejected "
})}>Rejected Project</button></li>


  <li className='col-auto' ><button  className="btn btn-dark mb-3" onClick={()=>setCondition({
    thead:"Status",
  status:true,
  finalize:true,
  message:"Finalized "
})}>Finalized Project</button></li>
</ul>
</div>
</div>


  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        {/* <th scope="col">USN</th> */}
       {/* <th scope='col'>Mentor Name</th> */}
        <th scope="col">PROJECT NAME</th>
        <th scope='col'>Project discreption</th>
        
        <th scope="col">{condition.thead}</th>
      </tr>
    </thead>
    <tbody>
     
    {project.map(elem=>{
    
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