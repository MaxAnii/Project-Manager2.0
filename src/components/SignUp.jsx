import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
  localStorage.removeItem("Acess");

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    id: uuid().slice(0, 20),
    name: "",
    collegeName: "",
    collegeCode: "",
    email: "",
    password: "",
    dname: "",
    desgination: "",
    studentId: "",
    year: "",
  });

  const [condition, setCondition] = useState({
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const [departmaent, setDepartment] = useState([]);
  const [collegeName, setCollegeName] = useState();
  let userExits = [];
  useEffect(() => {
    userInfo.desgination === "Student" ? setShow(true) : setShow(false);
  }, [userInfo.desgination]);

  const getDepartmentList = async () => {
    const response = await fetch(
      `http://localhost:5000/getDepartmentList/collegeName/${userInfo.collegeCode}`
    );
    const data = await response.json();
    if (data.length) {
      setDepartment(data);

      setCollegeName(data[0].collegeName);
    }
  };

  const checkDetialsExits = async () => {
    const response = await fetch(
      `http://localhost:5000/checkuserdetialsexits/${userInfo.collegeCode}/${userInfo.email}/${userInfo.desgination}`
    );
    const data = await response.json();
    userExits = data;
    console.log(userExits.length);
  };

  useEffect(() => {
    if (userInfo.desgination === "Student") {
      getDepartmentList();
    }
  }, [userInfo.collegeCode]);

  const register = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    await checkDetialsExits();

    if (userInfo.password.length < 8) {
      setErrorMessage("password should have 8 characters");
    } else if (userInfo.password !== condition.password) {
      setErrorMessage("password is not matching");
    } else if (
      userExits.length != 0 &&
      userInfo.desgination == "College Admin"
    ) {
      setErrorMessage("College code not available");
    } else if (userExits.length != 0 && userInfo.desgination == "Student") {
      setErrorMessage("Email already exits");
    } else {
      const response = await fetch("http://localhost:5000/signUp", {
        withCredentials: true,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();

      if (data.length !== 0) {
        localStorage.setItem("Acces", true);
        localStorage.setItem("JToken", data.JToken);
        setErrorMessage("success");
        if (userInfo.desgination === "College Admin")
          navigate(`/AdminHome/${userInfo.id}/${userInfo.collegeCode}`);
        else
          navigate(
            `/StudentHome/${userInfo.id}/${userInfo.collegeCode}/${userInfo.dname}`
          );
      }
    }
  };

  return (
    <>
      <div className="form signUp">
        <form onSubmit={register}>
          <div className="contact-box">
            <div className="mb-3 ">
              <label className="form-label">Desgination</label>
              <select
                className="form-select"
                value={userInfo.desgination}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, desgination: e.target.value });
                }}
                required
              >
                <option defaultValue value="">
                  Sign Up As
                </option>
                <option>Student</option>
                <option>College Admin</option>
              </select>
            </div>
            <div className="mb-3 ">
              {show ? (
                <>
                  <label className="form-label">User Name</label>
                  <input
                    type="name"
                    className="form-control required"
                    placeholder="Enter Your Name"
                    required
                    value={userInfo.name}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, name: e.target.value });
                    }}
                  />{" "}
                </>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3 ">
              <label className="form-label">College Code</label>
              <input
                type="name"
                className="form-control required"
                placeholder="Enter Your College Code"
                required
                value={userInfo.collegeCode}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, collegeCode: e.target.value });
                }}
              />
            </div>
            <div className="mb-3 ">
              <label className="form-label">College Name</label>
              {show ? (
                <>
                  <select
                    className="form-select"
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, collgeName: e.target.value });
                    }}
                    required
                  >
                    <option>{collegeName}</option>
                  </select>
                </>
              ) : (
                <input
                  type="name"
                  className="form-control required"
                  placeholder="Enter Your College Name"
                  required
                  value={userInfo.collegeName}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, collegeName: e.target.value });
                  }}
                />
              )}
            </div>
            {show ? (
              <>
                <div className="mb-3 ">
                  <label className="form-label">University Seat Number</label>
                  <input
                    type="name"
                    className="form-control required"
                    placeholder="Enter Your USN"
                    required
                    value={userInfo.studentId}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, studentId: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-3 ">
                  <label className="form-label">Current Year</label>
                  <select
                    className="form-select"
                    value={userInfo.year}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, year: e.target.value });
                    }}
                    required
                  >
                    <option defaultValue>Choose Year </option>
                    <option>1st</option>
                    <option>2nd</option>
                    <option>3rd </option>
                    <option>4rd</option>
                  </select>
                </div>
                <div className="mb-3 ">
                  <label className="form-label">Department</label>
                  <select
                    className="form-select"
                    value={userInfo.dname}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, dname: e.target.value });
                    }}
                    required
                  >
                    <option defaultValue>choose Department</option>
                    {departmaent.map((elem) => {
                      return <option key={uuid()}>{elem.dname}</option>;
                    })}
                  </select>
                </div>
              </>
            ) : (
              ""
            )}

            <div className="mb-3 ">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control required"
                id="email"
                placeholder="Enter your Registered email "
                required
                value={userInfo.email}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, email: e.target.value });
                }}
              />
            </div>
            <div className="mb-3 ">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control required"
                placeholder="Enter Password "
                required
                value={userInfo.password}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, password: e.target.value });
                }}
              />
            </div>
            <div className="mb-3 ">
              <label className="form-label">Confrom Password</label>
              <input
                type="password"
                className="form-control required"
                placeholder="Conform Password "
                required
                value={condition.password}
                onChange={(e) => {
                  setCondition({ ...condition, password: e.target.value });
                }}
              />
            </div>

            <div style={{ color: "white", textAlign: "center" }}>
              {" "}
              {errorMessage}{" "}
            </div>

            <button type="submit" className="btn btn-dark toggle-disabled ">
              SignUp
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
