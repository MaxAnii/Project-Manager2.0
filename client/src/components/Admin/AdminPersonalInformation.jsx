import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Footer from "../Footer";
import Loader from "../Loader";
import EditAdminPersonalInfo from "./EditAdminPersonalInfo";

const AdminPersonalInformation = () => {
  const params = useParams();

  const [userdata, setUserData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const getdata = async () => {
    setShowLoader(true);
    const response = await fetch(
      `http://localhost:5000/getpersonalinformation/admin/${params.id}/`,
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
      <AdminNavbar
        collegeCode={params.collegeCode}
        id={params.id}
      ></AdminNavbar>

      <div className="background">
        <div className="info1">
          {showLoader ? (
            <Loader className="profile-loader admin-loader"></Loader>
          ) : (
            <>
              {" "}
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
              <div className="col-12">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                  Email
                </label>
                <p>{userdata.email}</p>
              </div>
              <EditAdminPersonalInfo
                userinfo={{ ...userdata }}
                getdata={getdata}
              ></EditAdminPersonalInfo>{" "}
            </>
          )}
        </div>
      </div>
      <div className="college-info"></div>

      <Footer></Footer>
    </div>
  );
};

export default AdminPersonalInformation;
