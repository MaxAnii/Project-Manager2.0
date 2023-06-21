import React from "react";
import { useState } from "react";

const UploadReport = (props) => {
  const [report, setReport] = useState({});
  const uploadReport = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files',report);

    const response = await fetch('http://localhost:5000/uploadreport',
    {
        method:"POST",
        body:formData
    })
    
  };

  return (
    <div>
      <form onSubmit={uploadReport}>
        <div className="col-md-6">
          <div className="input-group ">
            <input
              type="file"
              className="form-control"
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
    </div>
  );
};

export default UploadReport;
