import React from 'react'
import { v4 } from 'uuid'
import { useState,useEffect } from 'react'
const GetReport = (props) => {


    const [reportList,setReportList] = useState([])
    const [reportDetails,setReportDetails] = useState([])
    const getReportDetails =async()=>{
        const response = await fetch(`http://localhost:5000/getreportdetails/${props.projectId}`,{
          headers:{
            JToken:localStorage.getItem('JToken')
          }
        })
        const data = await response.json();
        setReportDetails(data);
    }

    const getProjectReport=async()=>{
       
       const reportUrl = reportDetails.map(async elem=>{
            const response = await fetch(`http://localhost:5000/getprojectreportlist/${elem.reportId}.pdf`,{
              headers:{
                JToken:localStorage.getItem('JToken')
              }
            });
            return ( response.url)
        })

      setReportList(reportUrl)
     
        }
        

        useEffect(()=>{
           getReportDetails();
           
          },[])
       useEffect(()=>{
        getProjectReport()
       },[reportDetails])

       const deleteReport=async(id)=>{
        const response = await fetch(`http://localhost:5000/deletereport/${id}`,
        {
          method:"DELETE",
          headers:{
            JToken:localStorage.getItem('JToken')
          }
        }
        )
        getReportDetails();
        getProjectReport()
       }

useEffect(()=>{
  if(props.deleteAllReport)
{
  reportDetails.map((elem)=>{
    deleteReport(elem.reportId);
  })
}

},[props.deleteAllReport])


  return (
    <div>
        <div className="col-md-12">
  <label className="form-label">Project Reports</label>
       
       {
        reportDetails.map((elem)=>{
          return(
            <div key={v4()}>
            <div className="input-group mt-2 mb-2">
            <input
             
              className="form-control"
            value={elem.reportName}
            onChange={e=>{}}
            />
        
            {
                reportList.map((elem2)=>{
                
               
return(
    <a href={elem2} className="input-group-text" key={v4()}>  <button  className="input-group-text" >
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
</svg>
            </button> </a>
)

           
                   
                   
                })
            }
            {
              (props.from == 'student') ? 
            <button  className="input-group-text " onClick={()=>deleteReport(elem.reportId)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
            </button> :""
            }
               
  

          
          </div>
            </div>
          )
        })
       }
        </div>
    </div>
  )
}

export default GetReport