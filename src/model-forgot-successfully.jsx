import React from "react";
import "./App.css";
function Forgotsuccessfully() {
  return (
    <div
        className="modal fade"
        id="success-modal"
        tabIndex="-1"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-end pb-0 border-0">
              <a
                href="javascript:void(0);"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-circle-x-filled fs-20"></i>
              </a>
            </div>
            <div className="modal-body p-4">
              <div className="text-center">
                <span className="success-check mb-3 mx-auto">
                  <i className="ti ti-check"></i>
                </span>
                <h4 className="mb-2">Success</h4>
                <p>A new password has been sent to your email. Please check your inbox.</p>
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-lg btn-linear-primary w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#login-modal"
                  >
                    Back to login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
export default Forgotsuccessfully