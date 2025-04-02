import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Provider_header from './provider-header'
import Provider_sidebar from './provider-sidebar'

function Provider_security_setting() {
  const [count, setCount] = useState(0)

  return (
    <div className='provider-page'>
      <div>
  <div className="main-wrapper">
   <Provider_header/>
   <Provider_sidebar/>
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="row">
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
            <h5>Security Settings</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-md-4 d-flex mb-3">
            <div className="linked-item flex-fill">
              <div className="linked-wrap">
                <div className="linked-acc">
                  <span className="link-icon rounded-circle">
                    <i className="ti ti-lock" />
                  </span>
                  <div className="linked-info">
                    <h6 className="fs-16">Password</h6>
                    <p className="text-gray fs-12">
                      Last Changed :{" "}
                      <span className="text-dark fs-12">
                        22 Sep 2023, 10:30:55 AM
                      </span>
                    </p>
                  </div>
                </div>
                <div className="linked-action">
                  <button
                    className="btn btn-dark btn-sm"
                    data-bs-target="#change-password"
                    data-bs-toggle="modal">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4 d-flex mb-3">
            <div className="linked-item flex-fill">
              <div className="linked-wrap">
                <div className="linked-acc">
                  <span className="link-icon rounded-circle">
                    <i className="ti ti-fingerprint-scan" />
                  </span>
                  <div className="linked-info row align-items-center">
                    <div className="col-md-9">
                      <h6 className="fs-16">Two Factor </h6>
                      <p className="text-gray fs-12 text-truncate">
                        Strengthens security with an extra step.
                      </p>
                    </div>
                    <div className="col-md-3">
                      <div className=" d-flex align-items-center justify-content-end form-check form-switch mb-3">
                        <input
                          className="form-check-input"
                          id="status-two"
                          type="checkbox"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="linked-action">
                  <button className="btn btn-dark btn-sm">Disable</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4 d-flex mb-3">
            <div className="linked-item flex-fill">
              <div className="linked-wrap">
                <div className="linked-acc">
                  <span className="link-icon rounded-circle">
                    <i className="ti ti-device-mobile" />
                  </span>
                  <div className="linked-info row align-items-center">
                    <div className="col-md-9">
                      <h6 className="fs-16 text-truncate">
                        Phone Number Verification{" "}
                      </h6>
                      <p className="text-gray fs-12 text-truncate">
                        Verified Mobile Number :{" "}
                        <span className="text-dark fs-12"> +99264710583</span>
                      </p>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex justify-content-end">
                        <span>
                          <i className="ti ti-circle-check-filled text-success" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="linked-action">
                  <button
                    className="btn btn-dark btn-sm"
                    data-bs-target="#change-phone-number"
                    data-bs-toggle="modal">
                    Change
                  </button>
                  <button className="btn btn-light btn-sm">Remove</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4 d-flex mb-3">
            <div className="linked-item flex-fill">
              <div className="linked-wrap">
                <div className="linked-acc">
                  <span className="link-icon rounded-circle">
                    <i className="ti ti-mail" />
                  </span>
                  <div className="linked-info row align-items-center">
                    <div className="col-md-9">
                      <h6 className="fs-16 text-truncate">
                        Email Verification
                      </h6>
                      <p className="text-gray fs-12 text-truncate">
                        Verified Email :
                        <span className="text-dark fs-12">
                          {" "}
                          <a
                            className="__cf_email__"
                            data-cfemail="abc2c5cdc4ebced3cac6dbc7ce85c8c4c6"
                            href="">
                          </a>
                        </span>
                      </p>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex justify-content-end">
                        <span>
                          <i className="ti ti-circle-check-filled text-success" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="linked-action">
                  <button
                    className="btn btn-dark btn-sm"
                    data-bs-target="#change-email"
                    data-bs-toggle="modal">
                    Change
                  </button>
                  <button className="btn btn-light btn-sm">Remove</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4 d-flex mb-3">
            <div className="linked-item flex-fill">
              <div className="linked-wrap">
                <div className="linked-acc">
                  <span className="link-icon rounded-circle">
                    <i className="ti ti-device-imac" />
                  </span>
                  <div className="linked-info row align-items-center">
                    <div className="col-md-9">
                      <h6 className="fs-16 text-truncate">Device Management</h6>
                      <p className="text-gray fs-12 text-truncate">
                        Last Changed :
                        <span className="text-dark fs-12">
                          {" "}
                          22 Jul 2024, 10:30:55 AM
                        </span>
                      </p>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex justify-content-end">
                        <span>
                          <i className="ti ti-circle-check-filled text-success" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="linked-action">
                  <a
                    className="btn btn-dark btn-sm"
                    href="provider-device-management.html">
                    Manage
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4 d-flex mb-3">
            <div className="linked-item flex-fill">
              <div className="linked-wrap">
                <div className="linked-acc">
                  <span className="link-icon rounded-circle">
                    <i className="ti ti-user-edit" />
                  </span>
                  <div className="linked-info row align-items-center">
                    <div className="col-md-9">
                      <h6 className="fs-16 text-truncate">Account Activity</h6>
                      <p className="text-gray fs-12 text-truncate">
                        Last Changed :
                        <span className="text-dark fs-12">
                          {" "}
                          22 Jul 2024, 10:30:55 AM
                        </span>
                      </p>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex justify-content-end">
                        <span>
                          <i className="ti ti-circle-check-filled text-success" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="linked-action">
                  <a
                    className="btn btn-dark btn-sm"
                    href="provider-login-activity.html">
                    Manage
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      aria-hidden="true"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="change-password"
      tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header d-flex align-items-center justify-content-between  border-0">
            <h5>Change Password</h5>
            <a
              aria-label="Close"
              data-bs-dismiss="modal"
              href="javascript:void(0);">
              <i className="ti ti-circle-x-filled fs-20" />
            </a>
          </div>
          <form action="">
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <div className="pass-group">
                      <input
                        className="pass-input form-control"
                        type="password"
                      />
                      <span className="toggle-password feather-eye-off" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <div className="pass-group">
                          <input
                            className="pass-input form-control"
                            type="password"
                          />
                          <span className="toggle-password feather-eye-off" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div>
                        <label className="form-label">
                          Confirm New Password
                        </label>
                        <div className="pass-group">
                          <input
                            className="pass-input form-control"
                            type="password"
                          />
                          <span className="toggle-password feather-eye-off" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="modal-footer">
            <button
              className="btn bg-gray"
              data-bs-dismiss="modal"
              type="button">
              Cancel
            </button>
            <button className="btn btn-dark" type="button">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      aria-hidden="true"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="change-email"
      tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header d-flex align-items-center justify-content-between  border-0">
            <h5>Change Email</h5>
            <a
              aria-label="Close"
              data-bs-dismiss="modal"
              href="javascript:void(0);">
              <i className="ti ti-circle-x-filled fs-20" />
            </a>
          </div>
          <form action="">
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Current Email Address</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">New Email Address</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div>
                        <label className="form-label">
                          Confirm New Password
                        </label>
                        <div className="pass-group">
                          <input
                            className="pass-input form-control"
                            type="password"
                          />
                          <span className="toggle-password feather-eye-off" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="modal-footer">
            <button
              className="btn bg-gray"
              data-bs-dismiss="modal"
              type="button">
              Cancel
            </button>
            <button className="btn btn-dark" type="button">
              Change Email
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      aria-hidden="true"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="change-phone-number"
      tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header d-flex align-items-center justify-content-between  border-0">
            <h5>Current Phone Number</h5>
            <a
              aria-label="Close"
              data-bs-dismiss="modal"
              href="javascript:void(0);">
              <i className="ti ti-circle-x-filled fs-20" />
            </a>
          </div>
          <form action="">
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Current Phone Number</label>
                    <input
                      className="form-control"
                      id="phone"
                      name="phone"
                      type="text"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">New Phone Number</label>
                        <input
                          className="form-control"
                          id="phone1"
                          name="phone"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div>
                        <label className="form-label">
                          Confirm New Password
                        </label>
                        <div className="pass-group">
                          <input
                            className="pass-input form-control"
                            type="password"
                          />
                          <span className="toggle-password feather-eye-off" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="modal-footer">
            <button
              className="btn bg-gray"
              data-bs-dismiss="modal"
              type="button">
              Cancel
            </button>
            <button className="btn btn-dark" type="button">
              Change Number
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="modal fade custom-modal" id="del-account">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
            <h5 className="modal-title">Delete Account</h5>
            <a
              aria-label="Close"
              data-bs-dismiss="modal"
              href="javascript:void(0);">
              <i className="ti ti-circle-x-filled fs-20" />
            </a>
          </div>
          <form action="#">
            <div className="modal-body">
              <p className="mb-3">
                Are you sure you want to delete This Account? To delete your
                account, Type your password.
              </p>
              <div className="mb-0">
                <label className="form-label">Password</label>
                <div className="pass-group">
                  <input
                    className="form-control pass-input"
                    placeholder="*************"
                    type="password"
                  />
                  <span className="toggle-password feather-eye-off" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <a
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
                href="javascript:void(0);">
                Cancel
              </a>
              <button className="btn btn-dark" type="submit">
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <script
    data-cfasync="false"
    src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
  />
  <script
    src="assets/js/jquery-3.7.1.min.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    src="assets/js/jquery.slimscroll.min.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    src="assets/js/bootstrap.bundle.min.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    src="assets/js/wow.min.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    src="assets/plugins/select2/js/select2.min.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    src="assets/plugins/owlcarousel/owl.carousel.min.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    src="assets/js/cursor.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    src="assets/plugins/countup/jquery.counterup.min.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    dangerouslySetInnerHTML={{
      __html: "  ",
    }}
    src="assets/plugins/countup/jquery.waypoints.min.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    src="assets/plugins/apexchart/apexcharts.min.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    src="assets/plugins/apexchart/chart-data.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    src="assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    src="assets/plugins/simple-calendar/jquery.simple-calendar.min.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    src="assets/js/calender.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    src="assets/plugins/intltelinput/js/intlTelInput.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    src="assets/js/script.js"
    type="541da57423b7b6086e93ab4a-text/javascript"
  />
  <script
    data-cf-settings="541da57423b7b6086e93ab4a-|49"
    defer
    src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
  />
  <script
    crossOrigin="anonymous"
    data-cf-beacon='{"rayId":"908e4e4e88914019","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
    defer
    integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
    src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
  />
</div>;

    </div>
  )
}

export default Provider_security_setting
