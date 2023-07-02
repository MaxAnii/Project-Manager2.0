import React from "react";
import { v4 } from "uuid";
import { useState, useEffect } from "react";

const GetReport = (props) => {
  const [reportList, setReportList] = useState([]);
  const [reportDetails, setReportDetails] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const getReportDetails = async () => {
    setShowLoader(true);
    const response = await fetch(
      `http://localhost:5000/getreportdetails/${props.projectId}`,
      {
        headers: {
          JToken: localStorage.getItem("JToken"),
        },
      }
    );
    const data = await response.json();

    setReportDetails(data);
    setShowLoader(false);
  };

  const getProjectReport = async () => {
    setShowLoader(true);
    const reportUrlPromises = reportDetails.map(async (elem) => {
      const response = await fetch(
        `http://localhost:5000/getprojectreportlist/${elem.reportId}.pdf`,
        {
          headers: {
            JToken: localStorage.getItem("JToken"),
          },
        }
      );
      const data = await response.text();
      return { url: data, reportId: elem.reportId };
    });
    const reportUrls = await Promise.all(reportUrlPromises);
    setReportList(reportUrls);
    setShowLoader(false);
  };

  useEffect(() => {
    getReportDetails();
  }, []);
  useEffect(() => {
    getProjectReport();
  }, [reportDetails]);
  useEffect(() => {
    getReportDetails();
    getProjectReport();
  }, [props.getReportList]);

  const deleteReport = async (id) => {
    const response = await fetch(`http://localhost:5000/deletereport/${id}`, {
      method: "DELETE",
      headers: {
        JToken: localStorage.getItem("JToken"),
      },
    });
    getReportDetails();
    getProjectReport();
  };

  useEffect(() => {
    if (props.deleteAllReport) {
      reportDetails.map((elem) => {
        deleteReport(elem.reportId);
      });
    }
  }, [props.deleteAllReport]);

  return (
    <div>
      <div className="col-md-12">
        <label className="form-label">Project Reports</label>
        <div></div>
        {!showLoader ? (
          <>
            {reportDetails.map((elem) => {
              return (
                <div key={v4()}>
                  <div className="input-group mt-2 mb-2">
                    <input
                      className="form-control"
                      value={elem.reportName}
                      onChange={(e) => {}}
                    />

                    {reportList.map((elem2) => {
                      if (elem.reportId == elem2.reportId)
                        return (
                          <a
                            href={elem2.url}
                            className="input-group-text"
                            key={v4()}
                          >
                            <button className="input-group-text download-report">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="25"
                                fill="currentColor"
                                class="bi bi-cloud-download"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
                              </svg>
                            </button>
                          </a>
                        );
                    })}
                    {props.from == "student" ? (
                      <button
                        className="input-group-text delete-report"
                        onClick={() => deleteReport(elem.reportId)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="25"
                          fill="currentColor"
                          className="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}{" "}
          </>
        ) : (
          <>
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GetReport;
