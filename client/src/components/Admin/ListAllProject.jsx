import { React, useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import ProjectDetails from "../ProjectDetails";
import Loader from "../Loader";
const ListAllproject = () => {
  const param = useParams();
  var row = 1;

  const [project, setProject] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [filter, setFilter] = useState("");
  const [departmaent, setDepartment] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const getProject = async () => {
    setShowLoader(true);
    const respone = await fetch(
      `http://localhost:5000/getprojectlist/admin/${param.collegeCode}`,
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

  const getDepartmentList = async () => {
    const response = await fetch(
      `http://localhost:5000/getDepartmentList/collegeName/${param.collegeCode}`,
      {
        headers: {
          JToken: localStorage.getItem("JToken"),
        },
      }
    );
    const data = await response.json();
    if (data.length) {
      setDepartment(data);
    }
  };

  useEffect(() => {
    getProject();
    getDepartmentList();
  }, []);

  const filterProject = () => {
    if (filter != "" && departmentFilter != "") {
      setListProject(
        project.filter(
          (elem) => elem.status == filter && elem.dname == departmentFilter
        )
      );
    } else if (filter != "" && departmentFilter === "") {
      setListProject(project.filter((elem) => elem.status == filter));
    } else if (filter === "" && departmentFilter != "") {
      setListProject(project.filter((elem) => elem.dname == departmentFilter));
    } else setListProject(project);
  };

  useEffect(() => {
    filterProject();
  }, [departmentFilter, filter]);

  useEffect(() => {
    if (nameFilter) {
      filterProject();
      setListProject(
        project.filter((elem) => elem.projectName.includes(nameFilter))
      );
    } else filterProject();
  }, [nameFilter]);

  return (
    <>
      <AdminNavbar
        id={param.id}
        collegeCode={param.collegeCode}
        dname={param.dname}
      ></AdminNavbar>

      <div className="background">
        <div className="container-content">
          <ul className=" row g-4 container-box" type="none">
            <li className="col-auto">
              {" "}
              <select
                className="btn btn-dark mb-3"
                value={departmentFilter}
                onChange={(e) => {
                  setDepartmentFilter(e.target.value);
                  setFilter("");
                }}
              >
                <option value="">Filter By Department </option>
                <option value="">All </option>
                {departmaent.map((elem) => {
                  return <option key={uuid()}>{elem.dname}</option>;
                })}
              </select>
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
                  setFilter("In Progess");
                }}
              >
                In progess
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

          <input
            type="text"
            placeholder="Search Project"
            className="form-control mb-3 search-project"
            value={nameFilter}
            onChange={(e) => {
              setNameFilter(e.target.value);
            }}
          ></input>
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
              <th scope="col">Department</th>
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
                    <td scope="col">{elem.dname}</td>

                    <td>
                      {" "}
                      <ProjectDetails
                        info={{ ...elem }}
                        from="admin"
                      ></ProjectDetails>
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

export default ListAllproject;
