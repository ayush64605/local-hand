import React from "react";
import "./App.css";
function Verificationmodel() {
  return (
    <div
        className="modal fade"
        id="otp-email-modal"
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
              <form action="#" className="digit-group">
                <div className="text-center mb-3">
                  <h3 className="mb-2">Email OTP Verification</h3>
                  <p className="fs-14">
                    OTP sent to your Email Address ending ******
                    <a
                      href=""
                      className="__cf_email__"
                      data-cfemail="0d6962684d68756c607d6168236e6260"
                    >
                      [email&#160;protected]
                    </a>
                  </p>
                </div>
                <div className="text-center otp-input">
                  <div className="d-flex align-items-center mb-3">
                    <input
                      type="text"
                      className="rounded w-100 py-sm-3 py-2 text-center fs-26 fw-bold me-3"
                      id="digit-1"
                      name="digit-1"
                      data-next="digit-2"
                      maxLength="1"
                    />
                    <input
                      type="text"
                      className="rounded w-100 py-sm-3 py-2 text-center fs-26 fw-bold me-3"
                      id="digit-2"
                      name="digit-2"
                      data-next="digit-3"
                      data-previous="digit-1"
                      maxLength="1"
                    />
                    <input
                      type="text"
                      className="rounded w-100 py-sm-3 py-2 text-center fs-26 fw-bold me-3"
                      id="digit-3"
                      name="digit-3"
                      data-next="digit-4"
                      data-previous="digit-2"
                      maxLength="1"
                    />
                    <input
                      type="text"
                      className="rounded w-100 py-sm-3 py-2 text-center fs-26 fw-bold"
                      id="digit-4"
                      name="digit-4"
                      data-next="digit-5"
                      data-previous="digit-3"
                      maxLength="1"
                    />
                  </div>
                  <div>
                    <div className="badge bg-danger-transparent mb-3">
                      <p className="d-flex align-items-center ">
                        <i className="ti ti-clock me-1"></i>09:59
                      </p>
                    </div>
                    <div className="mb-3 d-flex justify-content-center">
                      <p>
                        Didnt get the OTP?{" "}
                        <a href="javascript:void(0);" className="text-primary">
                          Resend OTP
                        </a>
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-lg btn-linear-primary w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#reset-password"
                      >
                        Verify & Proceed
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

  )
}
export default Verificationmodel