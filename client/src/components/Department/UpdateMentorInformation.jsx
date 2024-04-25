import React from "react";
import { useState } from "react";
const UpdateMentorInformation = (props) => {
  const [newInfo, setnewInfo] = useState({
    id: props.id,
    profId: props.profid,
    name: props.name,
    email: props.email,
  });

  const update = async () => {
    const data = await fetch(
      "http://localhost:5000/updateaddeduserinfo/department",
      {
        method: "PUT",
        headers: {
          JToken: localStorage.getItem("JToken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInfo),
      }
    );
    props.getData();
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#id${props.id}`}
      >
        edit
      </button>

      <div
        className="modal fade"
        id={`id${props.id}`}
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
                Update Information
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row g-3 project-form">
                <div className="col-auto col-md-5">
                  <label className="form-label">Department ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" Id"
                    value={"" || newInfo.profId}
                    onChange={(e) => {
                      setnewInfo({ ...newInfo, profId: e.target.value });
                    }}
                    required
                  />
                </div>

                <div className="col-auto col-md-7">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    value={"" || newInfo.email}
                    onChange={(e) => {
                      setnewInfo({ ...newInfo, email: e.target.value });
                    }}
                    required
                  />
                </div>
                <div className="col-auto col-md-12">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={"" || newInfo.name}
                    onChange={(e) => {
                      setnewInfo({ ...newInfo, name: e.target.value });
                    }}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={update}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMentorInformation;
