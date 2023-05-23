import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
// import "./hoddetails.css"
import AdminNavbar from './AdminNavbar'
// import Title from '../Title'
const DepartmentInfo = () => {
  const navigate = useNavigate()
    var row=1
    const param = useParams();
 
    const [prof,setProf]=useState([])
    
    
const getdata=async()=>{
    const response =await  fetch(`http://localhost:5000/proflist/${param.cc}/${param.dname}`,
    {
      headers:{
        JToken:localStorage.getItem('JToken')
      }
    })
    const data = await response.json()
   
    setProf(data)

}
// useEffect(()=>{
//     getdata()
// },[])

const seeDetails=(profid)=>{
  navigate(`/home/${param.cc}/${param.id}/hoddetail/${param.dname}/profDetails/${profid}`)
}

  return (
    <>
        
        <AdminNavbar ></AdminNavbar>

<div className='background'>
{/* <Title collegecode= {param.cc}></Title> */}
<div className='container-content'>
<div className='dheading'>{param.dname}</div>


</div>
</div>
<table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      
      <th scope="col">Professor</th>
      <th scope="col">Email</th>
    
      <th scope="col">See Details</th>
    </tr>
  </thead>
  <tbody>
   
  {prof.map(elem=>{
  return(
    <tr key={elem.id}>
      <th scope="row" >{row++}</th>
      
      <td scope="col">{elem.name}</td>
      <td scope="col">{elem.email}</td>

      <td scope='col'><button  className="btn btn-dark mb-3" onClick={()=>{seeDetails(elem.id)}}>See Details</button></td>
    </tr>
  )
})}
    
  </tbody>
</table>
  </>
   
    
  )
}

export default DepartmentInfo