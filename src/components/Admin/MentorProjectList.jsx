import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { v4 as uuid } from "uuid";
import ProjectDetaials from "../ProjectDetails";
import Loader from "../Loader";
const MentorProjectList = () => {
  const param = useParams();
  var row = 1;

  const [project, setProject] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [filter, setFilter] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const getProject = async () => {
    setShowLoader(true);
    const respone = await fetch(
      `http://localhost:5000/getprojectlist/mentor/${param.mentorid}`,
      {
        headers: {
          JToken: localStorage.getItem("JToken"),
        },
      }
    );
    const data = await respone.json();
    setProject(data);
    setListProject(data);
    setTimeout(() => {
      setShowLoader(false);
    }, 1500);
  };
  useEffect(() => {
    getProject();
  }, []);

  useEffect(() => {
    if (filter != "") {
      setListProject(project.filter((elem) => elem.status == filter));
    } else setListProject(project);
  }, [filter]);

  return (
    <>
      <AdminNavbar id={param.id} collegeCode={param.collegeCode}></AdminNavbar>

      <div className="background">
        <div className="container-content">
          <ul className=" row g-3 container-box" type="none">
            <li className="col-auto">
              <button
                className="btn btn-dark mb-3"
                onClick={() => {
                  setFilter("pending");
                }}
              >
                Pending Project
              </button>
            </li>
            <li className="col-auto">
              {" "}
              <button
                className="btn btn-dark mb-3"
                onClick={() => {
                  setFilter("In Progess");
                }}
              >
                In Progess Project
              </button>
            </li>

            <li className="col-auto">
              <button
                className="btn btn-dark mb-3"
                onClick={() => {
                  setFilter("Finalized");
                }}
              >
                Finalized Project
              </button>
            </li>

            <li className="col-auto">
              <button
                className="btn btn-dark mb-3"
                onClick={() => {
                  setFilter("");
                }}
              >
                All Project
              </button>
            </li>
          </ul>
        </div>
      </div>
      {showLoader ? (
        <Loader></Loader>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">PROJECT NAME</th>
              <th scope="col">Project discreption</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {listProject.map((elem) => {
              if (elem.status !== "Rejected")
                return (
                  <tr key={uuid()}>
                    <td scope="row">{row++}</td>

                    <td scope="col">{elem.projectName}</td>
                    <td scope="col">{elem.description}</td>
                    <td scope="col">{elem.status}</td>

                    <td>
                      {" "}
                      <ProjectDetaials
                        info={{ ...elem }}
                        from="admin"
                      ></ProjectDetaials>
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default MentorProjectList;
