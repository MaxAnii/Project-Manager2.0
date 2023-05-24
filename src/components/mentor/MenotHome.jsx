import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
// import RejectModal from './rejectMessage';
import { v4 as uuid } from 'uuid';
import MentorNavbar from './MentorNavbar';
// import ProfNavbar from './ProfNavbar';
// import Title from '../Title';
const MentorHome = () => {
    const param = useParams();
    var row = 1;
    
const[project,setProject] = useState([])

const[member,setMember] = useState([])

const [condition,setCondition]= useState({
  thead:"New request",
  status:null,
  finalize:false,
  message:"Pending "
})

const getProject=async()=>{
  const respone = await fetch(`http://localhost:5000/profhome/project/${param.id}/project`,
  {
        headers:{
          JToken:localStorage.getItem('JToken')
        }});
  const data = await respone.json();
  setProject(data)

  const respone2 = await fetch(`http://localhost:5000/profhome/project/${param.id}/member`,
  {
        headers:{
          JToken:localStorage.getItem('JToken')
        }});
  const data2 = await respone2.json();
  setMember(data2)
}
// useEffect(()=>{
//   getProject()
// },[])

const [projectstatus1,setProjectStatus1] = useState({
  pid:"",
  status:"",
  reason:"",
  type:'accept'
})




const acceptProject=async(pid)=>{
setProjectStatus1({
  pid:pid,
  status:true,
  type:"accept"
})
}


const setstatus1=async()=>{
  await fetch("http://localhost:5000/profhome/projectstatus",{
    method:"PUT",
    headers:{
      JToken:localStorage.getItem('JToken'),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectstatus1),
  })
  getProject()
}
 
  // useEffect(()=>{
  //   setstatus1()
  // },[projectstatus1.pid])
  

// finazile

const [projectFinalize,setprojectFinalize] = useState({
  pid:"",
  finalize:true,
  type:'finalize'
})

const finalizeCondition =async(pid)=>{
setprojectFinalize({
...projectFinalize,
  pid:pid,
  finalize:true,

})
}


const FinalizeProject=async()=>{
  await fetch("http://localhost:5000/profhome/projectstatus/",{
    method:"PUT",
    headers:{
      JToken:localStorage.getItem('JToken'),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectFinalize),
  })
  getProject()
}
// useEffect(()=>{
//   FinalizeProject  ()
// },[projectFinalize.pid])



    return (<>
   
    
  {/* <ProfNavbar id={param.id} dname={param.dname} cc={param.cc}></ProfNavbar>
   */}
   <MentorNavbar></MentorNavbar>
    
  
  <div className='background'>
  {/* <Title collegecode= {param.cc}></Title> */}
  <div className='container-content'>

  <ul className=' row g-3 container-box'  type='none'>
  <li className='col-auto' ><button  className="btn btn-dark mb-3" onClick={()=>setCondition({
  thead:"New request",
  status:null,
  finalize:false,
  message:" "
})}>New request</button></li>
  <li className='col-auto'> <button  className="btn btn-dark mb-3" onClick={()=>setCondition({
    thead:"Finalize",
  status:true,
  finalize:false,
  message:"In Progess"
})}>In Progess Project</button></li>

  <li className='col-auto'><button  className="btn btn-dark mb-3" onClick={()=>setCondition({
  thead:"Reason",
  status:false,
  finalize:false,
  message:"Rejected"
})}>Rejected Project</button></li>

  <li className='col-auto'><button  className="btn btn-dark mb-3" onClick={()=>setCondition({
    thead:"Status",
  status:true,
  finalize:true,
  message:"Finalized"
})}>Finalized Project</button></li>
</ul>



  </div>
  </div>
  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">USN</th>
       
        <th scope="col">PROJECT NAME</th>
        <th scope='col'>Project discreption</th>
        
        
        {(condition.thead === 'New request')?<>
        <th scope="col">Accept</th>
        <th scope='col'>REJECT</th>
        </>:<th scope="col">{condition.thead}</th>}
      </tr>
    </thead>
    <tbody> 
    {project.map(elem=>{
if(elem.status === condition.status && elem.finalize === condition.finalize)
   return(
      <tr key={uuid()}>
        <td scope="row" >{row++}</td>
        <td scope='col'>{elem.lid}  {member.map(elem2=>{
          if(elem.pid === elem2.pid)
          return(<p key={uuid()}>{elem2.usn} </p>)
        })}
        </td>
        <td scope="col">{elem.name}</td>
        <td scope="col">{elem.description}</td>

        {(condition.message === 'Finalized')?<td scope="col">{condition.message}</td>:<></>}
        {(condition.message === 'Rejected')? <td scope="col">{elem.reason}</td>:<></>}
        {(condition.thead === 'New request')? <><td scope='col'><button  className="btn btn-dark mb-3" onClick={()=>{acceptProject(elem.pid)}} >Accept</button></td>
        <td scope='col'><RejectModal pid={elem.pid} getProject={getProject}></RejectModal></td></>:<></>}
        {(condition.message === 'In Progess')?<><td scope='col'><button  className="btn btn-dark mb-3" onClick={()=>{finalizeCondition(elem.pid)}} >Finalize</button></td></>:<></>}
      </tr>
    )
  })}
  
      
    </tbody>
  </table>
    </>
    )
}

export default MentorHome