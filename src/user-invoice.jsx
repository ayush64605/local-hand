import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./header";
import User_dashboard_sidebar from "./user-dashboard-sidebar";
import Footer from "./footer";

function User_invoice() {
  const [count, setCount] = useState(0);

  return (
    <div>
  <div className="breadcrumb-bar text-center">
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-12">
          <h2 className="breadcrumb-title mb-2">Invoice</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <a href="index.html">
                  <i className="ti ti-home-2" />
                </a>
              </li>
              <li className="breadcrumb-item">Customer</li>
              <li aria-current="page" className="breadcrumb-item active">
                Invoice
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="breadcrumb-bg">
        <img
          alt="Img"
          className="breadcrumb-bg-1"
          src="assets/img/bg/breadcrumb-bg-01.png"
        />
        <img
          alt="Img"
          className="breadcrumb-bg-2"
          src="assets/img/bg/breadcrumb-bg-02.png"
        />
      </div>
    </div>
  </div>
  <div className="page-wrapper">
    <div className="content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 mx-auto">
            <div className="breadcrumb">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li aria-current="page" className="breadcrumb-item">
                    Orders
                  </li>
                  <li aria-current="page" className="breadcrumb-item">
                    ID 2378910
                  </li>
                </ol>
              </nav>
            </div>
            <div className="row invoice-details">
              <div className="col-md-4">
                <div>
                  <img
                    alt="img"
                    className="img-fluid"
                    src="assets/img/logo.svg"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="text-end">
                  <h5 className="mb-1">Invoice</h5>
                  <div className="d-flex gap-3 justify-content-end">
                    <span className="fs-12 d-flex align-items-center">
                      <i className="ti ti-file-text me-1" />
                      #LL2378910
                    </span>
                    <span className="fs-12 d-flex align-items-center">
                      <i className="ti ti-calendar me-1" />
                      Issue date: 22 Sep 2022
                    </span>
                    <span className="fs-12 d-flex align-items-center">
                      <i className="ti ti-calendar me-1" />
                      Due date: 25 Jan 2023
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoice-wrap">
              <div className="row">
                <div className="col-md-6">
                  <div className="invoice-address">
                    <h6 className="mb-2">Invoice From:</h6>
                    <ul>
                      <li>LocalHand</li>
                      <li>
                        367 Hillcrest Lane, Irvine, California, United States
                      </li>
                      <li className="mb-0">
                        <a
                          className="__cf_email__"
                          data-cfemail="7d090f081811040e1811113d18051c100d1118531e1210"
                          href="#">
                          [email protected]
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="invoice-address d-flex justify-content-end">
                    <div>
                      <h6 className="mb-2">Invoice To:</h6>
                      <ul>
                        <li>Example Company Name</li>
                        <li>1620 Jerry Dove Drive Myrtle Beach, SC 29577</li>
                        <li>
                          <a
                            className="__cf_email__"
                            data-cfemail="f1bd989d9d98909fb3bc90929e9fb18399888590df929e9c"
                            href="#">
                            [email protected]
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 ">
                    <div className="table-resposnive">
                      <table className="table datatable">
                        <thead>
                          <tr>
                            <th>Services</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Hours</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <p className="fs-14">Computer Repair</p>
                            </td>
                            <td>
                              <p className="fs-14 text-gray">
                                Reliable computer repair,
                                <br /> fast and efficient.
                              </p>
                            </td>
                            <td>
                              <span className="fs-14 text-gray">$80</span>
                            </td>
                            <td>
                              <p className="fs-14 text-gray">1 Hour</p>
                            </td>
                            <td>
                              <span className="fs-14 text-gray">$80</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="fs-14">Car Repair Services</p>
                            </td>
                            <td>
                              <p className="fs-14 text-gray">
                                Trusted car repair for smooth,
                                <br /> safe driving.
                              </p>
                            </td>
                            <td>
                              <span className="fs-14 text-gray">$80</span>
                            </td>
                            <td>
                              <p className="fs-14 text-gray">1 Hour</p>
                            </td>
                            <td>
                              <span className="fs-14 text-gray">$80</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="fs-14">Steam Car Wash</p>
                            </td>
                            <td>
                              <p className="fs-14 text-gray">
                                Premium steam car wash
                                <br /> for a spotless shine.
                              </p>
                            </td>
                            <td>
                              <span className="fs-14 text-gray">$80</span>
                            </td>
                            <td>
                              <p className="fs-14 text-gray">1 Hour</p>
                            </td>
                            <td>
                              <span className="fs-14 text-gray">$80</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="fs-14">House Cleaning </p>
                            </td>
                            <td>
                              <p className="fs-14 text-gray">
                                Expert house cleaning for a
                                <br /> sparkling space.
                              </p>
                            </td>
                            <td>
                              <span className="fs-14 text-gray">$80</span>
                            </td>
                            <td>
                              <p className="fs-14 text-gray">1 Hour</p>
                            </td>
                            <td>
                              <span className="fs-14 text-gray">$80</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="invoice-payment">
                    <h6 className="mb-4">Payment info:</h6>
                    <ul>
                      <li>Credit Card - 123***********789</li>
                      <li className="mb-0">
                        <span>Amount:</span> $252.36
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-end">
                    <div className="invoice-total">
                      <ul>
                        <li className="d-flex justify-content-between gap-5">
                          Sub Total <span>$244.00</span>
                        </li>
                        <li className="d-flex justify-content-between gap-5">
                          Tax(5%) <span>$8.36</span>
                        </li>
                        <li className="d-flex justify-content-between gap-5 mb-0">
                          Total <span className="text-dark">$252.36</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="invoice-terms rounded">
                  <h6 className="fs-14 mb-3">Terms & Conditions:</h6>
                  <ul>
                    <li>
                      All payments must be made according to the agreed
                      schedule. Late payments may incur additional fees.
                    </li>
                    <li className="mb-0">
                      Cancellations must be made within 10 days of service.
                      Refunds are subject to review and may not be granted if
                      the service has been substantially performed.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <Footer/>
  <script
    data-cfasync="false"
    src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
  />
  <script
    src="assets/js/jquery-3.7.1.min.js"
    type="68f0f3559841f758f85dd6cb-text/javascript"
  />
  <script
    src="assets/js/bootstrap.bundle.min.js"
    type="68f0f3559841f758f85dd6cb-text/javascript"
  />
  <script
    src="assets/js/wow.min.js"
    type="68f0f3559841f758f85dd6cb-text/javascript"
  />
  <script
    src="assets/plugins/select2/js/select2.min.js"
    type="68f0f3559841f758f85dd6cb-text/javascript"
  />
  <script
    src="assets/plugins/owlcarousel/owl.carousel.min.js"
    type="68f0f3559841f758f85dd6cb-text/javascript"
  />
  <script
    src="assets/js/cursor.js"
    type="68f0f3559841f758f85dd6cb-text/javascript"
  />
  <script
    src="assets/js/script.js"
    type="68f0f3559841f758f85dd6cb-text/javascript"
  />
  <script
    data-cf-settings="68f0f3559841f758f85dd6cb-|49"
    defer
    src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
  />
  <script
    crossOrigin="anonymous"
    data-cf-beacon='{"rayId":"908e59220ee78602","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
    defer
    integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
    src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
  />
</div>

  )
}
export default User_invoice