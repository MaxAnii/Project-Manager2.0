import React from "react";
import { useState } from "react";
import { v4 } from "uuid";
const UploadReport = (props) => {
  console.log(props.projectId)
  const [report, setReport] = useState({});
  const[message,setMessage] = useState("");
  const [reportDetails,setReportDetails] = useState({
    name:"",
    reportId:v4(),
    projectId:props.projectId
  })
  const uploadReport = async (e) => {
    setMessage("")
    e.preventDefault();
    const fileName = report.name.split('.');
 
    const fileExtension = fileName[fileName.length-1]
    if(fileExtension != 'pdf'){
      setMessage("Please choose pdf file only")
    }
    else {
    const formData = new FormData();
    formData.append('files',report);

console.log(reportDetails)
     const data1 =  await fetch('http://localhost:5000/uploadreportdetails',{
        method:"POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportDetails)}
        )
console.log(data1)
   const data2 =  await fetch(`http://localhost:5000/uploadreport/${reportDetails.reportId}`,
    {
        method:"POST",
        body:formData
    })
  console.log(data2)
  }
    
  setReportDetails({
    projectId:props.projectId,
    name:"",
    reportId:v4()
  })


  }


  return (
    <div>
      <form onSubmit={uploadReport}>
        <div className="col-md-12">
          <div className="input-group">
        <input type="text" className="form-control " placeholder="enter the file name" value={reportDetails.name} onChange={e=>setReportDetails({...reportDetails,name:e.target.value})} required></input>
            <input
              type="file"
              className="form-control "
              id="inputGroupFile02"
              required
              onChange={(e) => setReport(e.target.files[0])}
            />
            <button type="submit" className="input-group-text">
              Upload
            </button>
          </div>
        </div>
      </form>
      <p style={{color:"red"}}>{message}</p>
    </div>
  );
};

export default UploadReport;
