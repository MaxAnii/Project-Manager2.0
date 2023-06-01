import React from "react";
import { useState } from "react";

const RejectProjectReason = (props) => {
  const [reason, setReason] = useState("");

  return (
    <div>
      <div className="modal fade" id="secondModal"  data-bs-backdrop="static" data-bs-keyboard="false"  tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="staticBackdropLabel" >Reject Message</h5>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form>
            <div className="modal-body">
              <div className="col-12">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  placeholder="Enter Message"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                type="submit"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                onClick={() => props.updateStatus("Rejected")}
              >
                Reject
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectProjectReason;
