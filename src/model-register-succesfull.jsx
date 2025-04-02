import React from "react";
import "./App.css";
function Registersuccessfullmodel() {
  return (
    <div
        className="modal fade"
        id="success_modal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-4">
                <span className="success-icon mx-auto mb-4">
                  <i className="ti ti-check"></i>
                </span>
                <h4 className="mb-1">Registration Successful</h4>
                <p>
                  You will get a Verification link Via email for the Verify the
                  Account.
                </p>
              </div>
              <a
                href="javascript:void(0);"
                data-bs-dismiss="modal"
                className="btn btn-linear-primary"
              >
                Close
              </a>
            </div>
          </div>
        </div>
      </div>
  )
}
export default Registersuccessfullmodel