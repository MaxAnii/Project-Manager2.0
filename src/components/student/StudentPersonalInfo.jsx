import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import StudentNavbar from "./StudentNavbar";
import EditStudentPersonalInfo from "./EditStudentPersonalInfo";
const StudentPersonalInfo = () => {
  const param = useParams();

  const [userdata, setUserData] = useState([]);
  const getdata = async () => {
    const response = await fetch(
      `http://localhost:5000/getpersonalinformation/student/${param.id}/`,
      {
        headers: {
          JToken: localStorage.getItem("JToken"),
        },
      }
    );
    const data = await response.json();
    setUserData(data);
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <div>
      <StudentNavbar
        id={param.id}
        collegeCode={param.collegeCode}
        dname={param.dname}
      ></StudentNavbar>

      <div className="background">
        <div className="info1">
          <div className="row g-1">
            <div className="col-6">
              <label className="form-label" style={{ fontWeight: "bold" }}>
                Name
              </label>
              <p>{userdata.name}</p>
            </div>
            <div className="col-6">
              <label className="form-label" style={{ fontWeight: "bold" }}>
                Email
              </label>
              <p>{userdata.email}</p>
            </div>
            <div className="col-6">
              <label className="form-label" style={{ fontWeight: "bold" }}>
                University ID
              </label>
              <p>{userdata.studentId}</p>
            </div>
            <div className="col-6">
              <label className="form-label" style={{ fontWeight: "bold" }}>
                Department
              </label>
              <p>{userdata.dname}</p>
            </div>
            <div className="col-6">
              <label className="form-label" style={{ fontWeight: "bold" }}>
                College Code
              </label>
              <p>{userdata.collegeCode}</p>
            </div>
            <div className="col-6">
              <label className="form-label" style={{ fontWeight: "bold" }}>
                Year
              </label>
              <p>{userdata.year}</p>
            </div>
            <div className="col-12">
              <label className="form-label" style={{ fontWeight: "bold" }}>
                College Name
              </label>
              <p>{userdata.collegeName}</p>
            </div>
            <EditStudentPersonalInfo
              userinfo={{ ...userdata }}
              getData={getdata}
            ></EditStudentPersonalInfo>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default StudentPersonalInfo;
