import React, {  useEffect } from 'react'
import {  useNavigate , useParams} from 'react-router-dom'
import { useState } from 'react'
// import UpdateInfo from '../UpdateInfo'
import { v4 as uuid } from 'uuid'
import AdminNavbar from './AdminNavbar'
import './admin.css'
// import Title from './../Title'

const AdminHome = () => {


const param = useParams()

var row = 1;
const navigate = useNavigate()
const [newHodDetails,setnewHodDetails]= useState({
    collegeCode:param.collegeCode,
    dname:"",
    name:"",
    email:"",
    password:"",
    hodid:"",
    id:uuid().slice(0,20),
})
const [departmentDetails,setDepartmentDetails]=useState([])
useEffect(() => {
  getData();
}, []);


const getData=async()=>{
 const response = await fetch(`http://localhost:5000/getInformationDashBoard/College Admin/${param.collegeCode}`,
 {
  headers:{
    JToken:localStorage.getItem('JToken')
  }
})
 const data = await response.json();
 setDepartmentDetails(data);
}
const addNewDepartment=async(e)=>{

e.preventDefault();

  const response=await fetch(`http://localhost:5000/addNewMember/College Admin`, {
    method: "POST",
    headers: {
    //   JToken:localStorage.getItem('JToken'),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newHodDetails),
  });
const data = await response.json();

  setnewHodDetails({...newHodDetails,
    collegeCode:param.cc,
    dname:"",
    name:"",
    email:"",
    password:"",
    hodid:"",
    id:uuid().slice(0,20),
  })

  getData();

}

const seeDetails=(dname,cc)=>{
   navigate(`/AdminHome/${param.id}/${param.collegeCode}/departmentInfo/${dname}`)
}

  return (<>
 
  <AdminNavbar cc={param.cc} id={param.id}></AdminNavbar>
<div className='background'>
{/* <Title collegecode= {param.cc}></Title> */}
<div className='container-content'>

<form className="row g-3 container-box" onSubmit={addNewDepartment}>
  <div className="col-auto">
    
    <input type="text"  className="form-control" placeholder='Department'
    value={newHodDetails.dname} onChange={e=>{setnewHodDetails({...newHodDetails,dname:e.target.value})}} required/>
  </div>
  <div className="col-auto">
    
    <input type="text"  className="form-control" placeholder='HOD Id'
    value={newHodDetails.hodid} onChange={e=>{setnewHodDetails({...newHodDetails,hodid:e.target.value})}} required/>
  </div>
  <div className="col-auto">
   
    <input type="text" className="form-control"  placeholder="HOD Name"
       value={newHodDetails.name} onChange={e=>{setnewHodDetails({...newHodDetails,name:e.target.value})}}
       required
    />
  </div>
  <div className="col-auto">
    
    <input type="email" className="form-control"  placeholder="HOD email"
       value={newHodDetails.email} onChange={e=>{setnewHodDetails({...newHodDetails, email:e.target.value})}}
       required
    />
  </div>
  <div className="col-auto">
    
    <input type="text" className="form-control"  placeholder="HOD Password"
       value={newHodDetails.password} onChange={e=>{setnewHodDetails({...newHodDetails,password:e.target.value})}}
       required
    />
  </div>
  <div className="col-auto">
    <button type='submit' className="btn btn-dark mb-3" >Add</button>
  </div>
</form>
</div>
</div>
<table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Department</th>
      <th scope="col">HOD Name</th>
      <th scope="col">See Details</th>

    </tr>
  </thead>
  <tbody>
  {departmentDetails.map(elem=>{
  return(
    <tr key={elem.id}>
      <th  scope="row" >{row++}</th>
      <th  scope='col'>{elem.dname}</th>
      <td  scope="col">{elem.name}</td>
     
{/* <td scope='col'><UpdateInfo id={elem.hodid} name={elem.name}
  department={elem.dname} email={elem.email} desgination="College Admin" MainId={elem.id}
/></td> */}
      <td scope='col'><button  className="btn btn-dark mb-3" onClick={()=> seeDetails(elem.dname)  }>See Details</button></td>
    </tr>
  )
})}
    
  </tbody>
</table>
  </>
  )
}

export default AdminHome