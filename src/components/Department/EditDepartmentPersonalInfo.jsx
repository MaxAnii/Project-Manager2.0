import React from 'react'
import { useState,useEffect } from 'react';
const EditDepartmentPersonalInfo = (props) => {
    const [userData, setUserData] = useState({});
    const [oldPass, setOldPass] = useState("");
    const [checkPass, setCheckPass] = useState("");
    const [message, setMessage] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [newpass, setNewPass] = useState("");
    useEffect(() => {
      setUserData({ ...props.userinfo });
      setOldPass(props.userinfo.password);
    }, [props.userinfo]);
  
    const ChangePassword = (e) => {
      e.preventDefault();
      setShowPass(!showPass);
      setNewPass("");
      setUserData({...userData,password:oldPass})
    };
    const checkNewPass = () => {
      if (newpass !== ""  &&  userData.password !== "" ) {
        if (newpass !== userData.password) {
          setMessage("password is not matching");
        } else {
          if (newpass.length < 7) {
            setMessage("Password Should have minimum 8 charaters");
          } else if (newpass === oldPass) {
            setMessage("New password Should be different");
          } else {
            updateInfo();
          }
        }
      } else {
        updateInfo();
      }
    };
  
    const updateInfo = async () => {
      setMessage("");
      if(checkPass === ""){
          setMessage('Please provide password')
      }
      else if (checkPass !== oldPass) {
        setMessage("Incorrect Password");
      } 
      else {
        setMessage("Updating INfo");
        console.log(userData)
        await fetch("http://localhost:5000/updatepersonalinformation/department", {
          method: "PUT",
          headers: {
            JToken: localStorage.getItem("JToken"),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
       
      }
    };
  
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Edit Profile
        </button>
  
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Personal Information
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
  
              <div className="modal-body background" style={{paddingBottom:"0"}}>
                <form className="row g-3 ">
                  <div className="col-12">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="College Name"
                      required
                      value={userData.name || ""}
                      onChange={(e) => {
                        setUserData({ ...userData, name: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required
                      value={userData.email || ""}
                      onChange={(e) => {
                        setUserData({ ...userData, email: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <label>college Code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="College Code"
                      required
                      value={userData.collegeCode || ""}
                      onChange={(e) => {
                        setUserData({ ...userData, collegeCode: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-auto">
      <label>Department ID</label>
        <input type="text" className="form-control"  placeholder="Name"  
           required value={userData.hodid || ""} onChange={e=>{setUserData({...userData,hodid:e.target.value})}}
        />
      </div>
            
                  <div className="col-12">
                    <label>Change password</label>
  
                    <button
                      className="form-control bg-warning"
                      onClick={ChangePassword}
                    >
                      Click Here
                    </button>
                  </div>
  
                  {showPass ? (
                    <>
                      <div className="col-12">
                        <label>Enter New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="New Password"
                          required
                          value={newpass}
                          onChange={(e) => {
                            setNewPass(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-12">
                        <label>Confirm New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          required
                          onChange={(e) => {
                           setUserData({...userData,password:e.target.value})
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="col-12">
                    <label>Enter Your Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      value={checkPass}
                      onChange={(e) => setCheckPass(e.target.value)}
                    />
  
                    <p style={{ color: "red", fontWeight: "bolder" }}>
                      {message}
                    </p>
                  </div>
                </form>
              </div>
                  <div className="modal-footer" >
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={checkNewPass}>Update</button>
          </div>
           
            </div>
          </div>
        </div>
      </div>
    );
  };

export default EditDepartmentPersonalInfo