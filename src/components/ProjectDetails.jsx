import React from "react";
import { useState } from "react";
import "./home.css";
import RejectProjectReason from "./RejectProjectReason";
import { useEffect } from "react";
import { v4 } from "uuid";
import UploadReport from "./UploadReport";
import GetReport from "./GetReport";
import Loader from "./Loader";

const ProjectDetails = (props) => {
  const [ProjectDetails, setProjectDetails] = useState({
    id: props.info.id,
    projectName: props.info.projectName,
    mentorName: props.info.name,
    des: props.info.description,
    StartDate: props.info.StartDate,
    finalizeDate: props.info.finalizeDate,
    status: props.info.status,
    reason: props.info.rejectReason,
  });

  const [projectMember, setProjectMember] = useState([]);
  const [deleteReport, setdeleteReport] = useState(false);
  const [getReportList, setGetReportList] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const getMemberList = async () => {
    setShowLoader(true);
    const respone = await fetch(
      `http://localhost:5000/getmemberlist/${ProjectDetails.id}`,
      {
        headers: {
          JToken: localStorage.getItem("JToken"),
        },
      }
    );
    const data = await respone.json();

    setProjectMember(data);
    setShowLoader(false);
  };

  useEffect(() => {
    getMemberList();
  }, []);

  const updateProjectStatus = async (newStatus, rejectReason) => {
    const newStatusObj = {
      id: ProjectDetails.id,
      status: newStatus,
      reason: rejectReason,
    };

    await fetch(`http://localhost:5000/updateprojectstatus/notfinalize`, {
      method: "PUT",
      headers: {
        JToken: localStorage.getItem("JToken"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStatusObj),
    });
    props.getData();
  };
  const finalizeProject = () => {
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    const finalizeDate = {
      date: `${year}-${month}-${day}`,
      id: ProjectDetails.id,
      status: "Finalized",
    };
    fetch(`http://localhost:5000/updateprojectstatus/finalize`, {
      method: "PUT",
      headers: {
        JToken: localStorage.getItem("JToken"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalizeDate),
    });
  };
  const deleteProject = () => {
    setdeleteReport(true);
    fetch(`http://localhost:5000/deleteproject/${ProjectDetails.id}`, {
      method: "DELETE",
      headers: {
        JToken: localStorage.getItem("JToken"),
      },
    });
    props.getData();
  };

  return (
    <div>
      <button
        className="btn btn-dark"
        type="button"
        data-bs-target={`#myModal${ProjectDetails.id}`}
        data-bs-toggle="modal"
      >
        See Details
      </button>

      <div className="modal fade" id={`myModal${ProjectDetails.id}`}>
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title">Project Details</h5>
              <button
                className="btn-close modal-close-btn p-3 m-2"
                type="button"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="project-details modal-body">
              <form className="row g-3 FormContainer">
                <div className="col-md-6">
                  <label className="form-label">Project Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={ProjectDetails.projectName}
                    readOnly
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Mentor Name</label>

                  <input
                    type="text"
                    className="form-control"
                    value={ProjectDetails.mentorName}
                    readOnly
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Project Description</label>

                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    readOnly
                    value={ProjectDetails.des}
                    required
                  ></textarea>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Status</label>

                  <input
                    type="text"
                    className="form-control"
                    value={ProjectDetails.status}
                    readOnly
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Starting Date</label>

                  <input
                    type="text"
                    className="form-control"
                    value={ProjectDetails.StartDate.slice(0, 10)}
                    readOnly
                  />
                </div>
                {props.info.status !== "Rejected" ? (
                  <div className="col-md-4">
                    <label className="form-label">Finalized Date</label>

                    <input
                      type="text"
                      className="form-control"
                      value={ProjectDetails.finalizeDate || "Not yet finalized"}
                      readOnly
                    />
                  </div>
                ) : (
                  <div className="col-12">
                    <label className="form-label">Reject Reason</label>

                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      readOnly
                      value={ProjectDetails.reason}
                      required
                    ></textarea>
                  </div>
                )}
                <div className="col-md-12">
                  <label className="form-label" style={{ display: "block" }}>
                    Project Member
                  </label>
                  {showLoader ? (
                    <div className="spinner-border" role="status">
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    projectMember.map((elem) => {
                      return (
                        <div
                          className="col-md-3 "
                          style={{ display: "inline-flex", margin: "2px" }}
                          key={v4()}
                        >
                          <input
                            type="text"
                            className="form-control form-label"
                            value={elem.studentId}
                            readOnly
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </form>

              {props.info.status == "In Progess" ||
              props.info.status == "Finalized" ? (
                <>
                  <GetReport
                    projectId={props.info.id}
                    from={props.from}
                    deleteAllReport={deleteReport}
                    getReportList={getReportList}
                  ></GetReport>
                </>
              ) : (
                ""
              )}

              {props.from == "student" && props.info.status == "In Progess" ? (
                <>
                  <label className="form-label"> Add Project Report</label>
                  <UploadReport
                    projectId={props.info.id}
                    setGetReportList={setGetReportList}
                    getReportList={getReportList}
                  ></UploadReport>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="modal-footer">
              {props.from == "mentor" && props.info.status == "pending" ? (
                <>
                  <button
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={() => updateProjectStatus("In Progess", "")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#secondModal"
                  >
                    Reject
                  </button>
                </>
              ) : props.from === "mentor" &&
                props.info.status === "In Progess" ? (
                <button
                  className="btn btn-dark"
                  type="button"
                  data-bs-toggle="modal"
                  onClick={finalizeProject}
                >
                  finalize
                </button>
              ) : props.from === "student" &&
                props.info.status !== "Finalized" ? (
                <button
                  className="btn btn-danger"
                  type="button"
                  data-bs-toggle="modal"
                  onClick={deleteProject}
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      <RejectProjectReason
        updateStatus={updateProjectStatus}
      ></RejectProjectReason>
    </div>
  );
};

export default ProjectDetails;
