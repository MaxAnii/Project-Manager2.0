import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DepartmentNavbar from "./DepartmentNavbar";
import Footer from "../Footer";
import EditDepartmentPersonalInfo from "./EditDepartmentPersonalInfo";
import Loader from "../Loader";
const DepartmentPersonalInfo = () => {
  const param = useParams();

  const [userdata, setUserData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const getdata = async () => {
    setShowLoader(true);
    const response = await fetch(
      `http://localhost:5000/getpersonalinformation/department/${param.id}/`,
      {
        headers: {
          JToken: localStorage.getItem("JToken"),
        },
      }
    );
    const data = await response.json();
    setUserData(data);
    setShowLoader(false);
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <div>
      <DepartmentNavbar
        id={param.id}
        collegeCode={param.collegeCode}
        dname={param.dname}
      ></DepartmentNavbar>
      <div className="background">
        <div className="info1">
          <div className="row g-1">
            {showLoader ? (
              <Loader className="profile-loader"></Loader>
            ) : (
              <>
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
                    Department ID
                  </label>
                  <p>{userdata.hodid}</p>
                </div>
                <div className="col-6">
                  <label className="form-label" style={{ fontWeight: "bold" }}>
                    Department
                  </label>
                  <p>{userdata.dname}</p>
                </div>
                <div className="col-12">
                  <label className="form-label" style={{ fontWeight: "bold" }}>
                    College Name
                  </label>
                  <p>{userdata.collegeName}</p>
                </div>
                <div className="col-12">
                  <label className="form-label" style={{ fontWeight: "bold" }}>
                    College Code
                  </label>
                  <p>{userdata.collegeCode}</p>
                </div>

                <EditDepartmentPersonalInfo
                  userinfo={{ ...userdata }}
                  getData={getdata}
                ></EditDepartmentPersonalInfo>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default DepartmentPersonalInfo;
