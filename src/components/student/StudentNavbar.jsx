import React from "react";
import { NavLink } from "react-router-dom";

// import Logout from "../Logout";
const StudentNavbar = (props) => {

  return (
    <>
      <div className="title"> 
      <nav
        className="navbar navbar-expand-lg"
        
      >

      
        <div className="container-fluid">
          <a className="navbar-brand" href="#" >
            Project Manager
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to={`/StudentHome/${props.id}/${props.collegeCode}/${props.dname}`}
                  className="navLink"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={`/AddNewProject/${props.id}/${props.collegeCode}/${props.dname}`}
                  className="navLink"
                >
                  New Project
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  // to={`/MyInfo/${props.cc}/${props.id}`}
                  className="navLink"
                >
                  My Account
                </NavLink>
              </li>

              <li className="nav-item">
                {/* <Logout></Logout> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
        </div>
    </>
  );
};

export default StudentNavbar;
