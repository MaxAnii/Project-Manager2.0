import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MentorNavbar from "./MentorNavbar";
import Footer from "../Footer";
import EditMentorPersonalInfo from "./EditMentorPersonalInfo";
import Loader from "../Loader";
const MentorPersonalInfo = () => {
  const param = useParams();

  const [userdata, setUserData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const getdata = async () => {
    setShowLoader(true);
    const response = await fetch(
      `http://localhost:5000/getpersonalinformation/mentor/${param.id}/`,
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
      <MentorNavbar
        id={param.id}
        collegeCode={param.collegeCode}
        dname={param.dname}
      ></MentorNavbar>
      <div className="background">
        <div className="info1">
          <div className="row g-1">
            {showLoader ? (
              <Loader className="profile-loader"></Loader>
            ) : (
              <>
                {" "}
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
                  <p>{userdata.profId}</p>
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
                <EditMentorPersonalInfo
                  userinfo={{ ...userdata }}
                  getData={getdata}
                ></EditMentorPersonalInfo>{" "}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MentorPersonalInfo;
