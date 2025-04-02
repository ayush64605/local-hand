import React from "react";
import "./App.css";
function Resetpasswordmodel() {
  return (
    <div
        className="modal fade"
        id="reset-password"
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
              <div className="text-center mb-3">
                <h3 className="mb-2">Reset Password</h3>
                <p className="fs-14">
                  Your new password must be different from previous used
                  passwords.
                </p>
              </div>
              <form action="#">
                <div className="input-block mb-3">
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <div className="pass-group" id="passwordInput">
                      <input
                        type="password"
                        className="form-control pass-input"
                      />
                    </div>
                  </div>
                  <div
                    className="password-strength d-flex"
                    id="passwordStrength"
                  >
                    <span id="poor"></span>
                    <span id="weak"></span>
                    <span id="strong"></span>
                    <span id="heavy"></span>
                  </div>
                  <div id="passwordInfo" className="mb-2"></div>
                  <p className="fs-12">
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols.
                  </p>
                </div>
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <label className="form-label">Confirm Password</label>
                  </div>
                  <input type="password" className="form-control" />
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-lg btn-linear-primary w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#success-modal"
                  >
                    Save Change
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

  )
}
export default Resetpasswordmodel