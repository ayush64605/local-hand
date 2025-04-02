import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Provider_header from './provider-header'
import Provider_sidebar from './provider-sidebar'

function Provider_social_profile() {
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
            <h5>Social Profiles</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="row align-items-center">
              <div className="col-xl-5 col-lg-5 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <select className="select">
                    <option>Select</option>
                    <option>Facebook</option>
                    <option>Instagram</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-6 col-lg-5 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">URL</label>
                  <select className="select">
                    <option>Select</option>
                    <option>www.facebook.com</option>
                    <option>www.instagram.com</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-1 col-lg-2 col-sm-12">
                <label></label>
                <div className=" d-flex align-items-center form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    id="status-1"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-xl-5 col-lg-5 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <select className="select">
                    <option>Select</option>
                    <option>Facebook</option>
                    <option>Instagram</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-6 col-lg-5 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">URL</label>
                  <select className="select">
                    <option>Select</option>
                    <option>www.facebook.com</option>
                    <option>www.instagram.com</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-1 col-lg-2 col-sm-12">
                <label></label>
                <div className=" d-flex align-items-center form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    id="status-two"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-xl-5 col-lg-5 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <select className="select">
                    <option>Select</option>
                    <option>Facebook</option>
                    <option>Instagram</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-6 col-lg-5 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">URL</label>
                  <select className="select">
                    <option>Select</option>
                    <option>www.facebook.com</option>
                    <option>www.instagram.com</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-1 col-lg-2 col-sm-12">
                <label></label>
                <div className=" d-flex align-items-center form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    id="status-3"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-xl-5 col-lg-5 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <select className="select">
                    <option>Select</option>
                    <option>Facebook</option>
                    <option>Instagram</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-6 col-lg-5 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">URL</label>
                  <select className="select">
                    <option>Select</option>
                    <option>www.facebook.com</option>
                    <option>www.instagram.com</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-1 col-lg-2 col-sm-12">
                <label></label>
                <div className=" d-flex align-items-center form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    id="status-4"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-xl-5 col-lg-5 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <select className="select">
                    <option>Select</option>
                    <option>Linkedin</option>
                    <option>Instagram</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-6 col-lg-5 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">URL</label>
                  <select className="select">
                    <option>Select</option>
                    <option>www.Linedin.com</option>
                    <option>www.instagram.com</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-1 col-lg-2 col-sm-12">
                <label></label>
                <div className=" d-flex align-items-center form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    id="status-5"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>
            <div className="acc-submit d-flex justify-content-end">
              <a className="btn btn-light me-3" href="javascript:void(0);">
                Cancel
              </a>
              <a className="btn btn-dark" href="javascript:void(0);">
                Save Changes
              </a>
            </div>
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
          <form action="javascript:void(0);">
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
    src="assets/js/jquery-3.7.1.min.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    src="assets/js/jquery.slimscroll.min.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    src="assets/js/bootstrap.bundle.min.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    src="assets/js/wow.min.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    src="assets/plugins/select2/js/select2.min.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    src="assets/plugins/owlcarousel/owl.carousel.min.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    src="assets/js/cursor.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    src="assets/plugins/countup/jquery.counterup.min.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    dangerouslySetInnerHTML={{
      __html: "  ",
    }}
    src="assets/plugins/countup/jquery.waypoints.min.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    src="assets/plugins/apexchart/apexcharts.min.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    src="assets/plugins/apexchart/chart-data.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    src="assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    src="assets/plugins/simple-calendar/jquery.simple-calendar.min.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    src="assets/js/calender.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    src="assets/js/script.js"
    type="cb63d4cb605c8151f0d06cbb-text/javascript"
  />
  <script
    data-cf-settings="cb63d4cb605c8151f0d06cbb-|49"
    defer
    src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
  />
  <script
    crossOrigin="anonymous"
    data-cf-beacon='{"rayId":"908e4e4d4f888577","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
    defer
    integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
    src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
  />
</div>;

    </div>
  )
}

export default Provider_social_profile
