import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";
import Loader from "../Loader";
import { NavLink } from "react-router-dom";
const DepartmentInfo = () => {
  const navigate = useNavigate();
  var row = 1;
  const param = useParams();
  const [prof, setProf] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const getdata = async () => {
    setShowLoader(true);
    const response = await fetch(
      `http://localhost:5000/getProjectMentorList/admin/${param.collegeCode}/${param.dname}`,
      {
        headers: {
          JToken: localStorage.getItem("JToken"),
        },
      }
    );
    const data = await response.json();

    setProf(data);
    setShowLoader(false);
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <AdminNavbar id={param.id} collegeCode={param.collegeCode}></AdminNavbar>

      <div className="background">
        <div className="container-content">
          <div className="dheading">{param.dname}</div>
        </div>
      </div>
      {showLoader ? (
        <Loader></Loader>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>

              <th scope="col">Professor</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {prof.map((elem) => {
              return (
                <tr key={elem.id}>
                  <th scope="row">{row++}</th>

                  <td scope="col">
                    <NavLink
                      to={`/AdminHome/${param.id}/${param.collegeCode}/departmentInfo/${param.dname}/mentorprojectlist/${elem.id}`}
                      style={{ color: "black", textDecoration: "underline" }}
                    >
                      {elem.name}
                    </NavLink>
                  </td>
                  <td scope="col">{elem.email}</td>

                  <td scope="col"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default DepartmentInfo;
