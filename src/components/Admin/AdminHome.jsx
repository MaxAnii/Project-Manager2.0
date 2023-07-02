import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import UpdateDepartmentInfo from "./UpdateDepartmentInfo";
import { v4 as uuid } from "uuid";
import AdminNavbar from "./AdminNavbar";
import Loader from "../Loader";
import "./admin.css";
import { NavLink } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  const param = useParams();

  var row = 1;
  const [newHodDetails, setnewHodDetails] = useState({
    collegeCode: param.collegeCode,
    dname: "",
    name: "",
    email: "",
    password: "",
    hodid: "",
    id: uuid().slice(0, 20),
  });
  const [departmentDetails, setDepartmentDetails] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setShowLoader(true);
    const response = await fetch(
      `http://localhost:5000/getInformationDashBoard/College Admin/${param.collegeCode}`,
      {
        headers: {
          JToken: localStorage.getItem("JToken"),
        },
      }
    );

    const data = await response.json();
    setDepartmentDetails(data);
    setShowLoader(false);
  };

  const addNewDepartment = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:5000/addNewMember/College Admin`,
      {
        method: "POST",
        headers: {
          JToken: localStorage.getItem("JToken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHodDetails),
      }
    );
    const data = await response.json();

    setnewHodDetails({
      ...newHodDetails,
      dname: "",
      name: "",
      email: "",
      password: "",
      hodid: "",
      id: uuid().slice(0, 20),
      collegeCode: param.collegeCode,
    });

    getData();
  };

  const seeDetails = (dname, cc) => {
    navigate(
      `/AdminHome/${param.id}/${param.collegeCode}/departmentInfo/${dname}`
    );
  };

  return (
    <>
      <AdminNavbar id={param.id} collegeCode={param.collegeCode}></AdminNavbar>
      <div className="background">
        <div className="container-content">
          <form className="row g-3 container-box" onSubmit={addNewDepartment}>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Department"
                value={newHodDetails.dname}
                onChange={(e) => {
                  setnewHodDetails({ ...newHodDetails, dname: e.target.value });
                }}
                required
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="HOD Id"
                value={newHodDetails.hodid}
                onChange={(e) => {
                  setnewHodDetails({ ...newHodDetails, hodid: e.target.value });
                }}
                required
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="HOD Name"
                value={newHodDetails.name}
                onChange={(e) => {
                  setnewHodDetails({ ...newHodDetails, name: e.target.value });
                }}
                required
              />
            </div>
            <div className="col-auto">
              <input
                type="email"
                className="form-control"
                placeholder="HOD email"
                value={newHodDetails.email}
                onChange={(e) => {
                  setnewHodDetails({ ...newHodDetails, email: e.target.value });
                }}
                required
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="HOD Password"
                value={newHodDetails.password}
                onChange={(e) => {
                  setnewHodDetails({
                    ...newHodDetails,
                    password: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-dark mb-3">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
      {showLoader ? (
        <Loader></Loader>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Department</th>
              <th scope="col">HOD Name</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {departmentDetails.map((elem) => {
              return (
                <tr key={elem.id}>
                  <th scope="row">{row++}</th>
                  <th scope="col">
                    <NavLink
                      to={`/AdminHome/${param.id}/${param.collegeCode}/departmentInfo/${elem.dname}`}
                      style={{ color: "black", textDecoration: "underline" }}
                    >
                      {elem.dname}
                    </NavLink>
                  </th>
                  <td scope="col">{elem.name}</td>

                  <td scope="col">
                    <UpdateDepartmentInfo
                      id={elem.id}
                      hodid={elem.hodid}
                      name={elem.name}
                      department={elem.dname}
                      email={elem.email}
                      getData={getData}
                    ></UpdateDepartmentInfo>
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

export default AdminHome;
