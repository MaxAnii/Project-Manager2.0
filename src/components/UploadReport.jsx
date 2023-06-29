import React from "react";
import { useState } from "react";
import { v4 } from "uuid";
const UploadReport = (props) => {
  const [report, setReport] = useState({});
  const [message, setMessage] = useState("");
  const [reportDetails, setReportDetails] = useState({
    name: "",
    reportId: v4(),
    projectId: props.projectId,
  });
  const [showLoader, setShowLoader] = useState(false);
  const uploadReport = async (e) => {
    setShowLoader(true);
    setMessage("");
    e.preventDefault();
    const fileName = report.name.split(".");

    const fileExtension = fileName[fileName.length - 1];
    if (fileExtension != "pdf") {
      setMessage("Please choose pdf file only");
    } else {
      const formData = new FormData();
      formData.append("files", report);

      const data2 = await fetch(
        `http://localhost:5000/uploadreport/${reportDetails.reportId}`,
        {
          method: "POST",
          headers: {
            JToken: localStorage.getItem("JToken"),
          },
          body: formData,
        }
      );

      if (data2.status === 200) {
        const data1 = await fetch("http://localhost:5000/uploadreportdetails", {
          method: "POST",
          headers: {
            JToken: localStorage.getItem("JToken"),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reportDetails),
        });
        props.setGetReportList(!props.getReportList);
        setReportDetails({
          projectId: props.projectId,
          name: "",
          reportId: v4(),
        });
        setShowLoader(false);
      }
    }
  };

  return (
    <div>
      {/* <form onSubmit={uploadReport}> */}
      {/* <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="enter the file name"
            value={reportDetails.name}
            onChange={(e) =>
              setReportDetails({ ...reportDetails, name: e.target.value })
            }
            required
          ></input>
        </div>

        <div className="col-md-6">
          <input
            type="file"
            className="form-control "
            id="inputGroupFile02"
            required
            onChange={(e) => setReport(e.target.files[0])}
          />
        </div> */}
      <form className="row g-3 FormContainer" onSubmit={uploadReport}>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="enter the file name"
            value={reportDetails.name}
            onChange={(e) =>
              setReportDetails({ ...reportDetails, name: e.target.value })
            }
            required
          ></input>
        </div>
        <div className="col-md-5">
          <input
            type="file"
            className="form-control "
            id="inputGroupFile02"
            required
            onChange={(e) => setReport(e.target.files[0])}
          />
        </div>
        <div className="col-md-2">
          {showLoader ? (
            <>
              <button className="btn btn-primary" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Uploading...
              </button>
            </>
          ) : (
            <button type="submit" className="input-group-text">
              Upload
            </button>
          )}
        </div>
      </form>
      <p style={{ color: "red" }}>{message}</p>
    </div>
  );
};

export default UploadReport;
