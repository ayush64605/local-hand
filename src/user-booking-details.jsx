import React from "react";

import { Link } from "react-router-dom";
import Footer from "./footer";
function User_booking_details() {
  return (
    <>
      <div>
        <div className="breadcrumb-bar text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <h2 className="breadcrumb-title mb-2">Dashboard</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">
                        <i className="ti ti-home-2" />
                      </a>
                    </li>
                    <li className="breadcrumb-item">Customer</li>
                    <li aria-current="page" className="breadcrumb-item active">
                      Dashboard
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
                      <ol className="breadcrumb mb-4">
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
                  <div className="row booking-details">
                    <div className="col-md-4">
                      <div>
                        <h4 className="mb-2">Booking ID: 2378910</h4>
                        <p className="fs-12">
                          <i className="feather-calendar me-1" /> 22 Sep 2023
                          10:23 AM
                        </p>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="d-flex gap-3 justify-content-end">
                        <a
                          className="btn btn-light d-flex align-items-center justify-content-center"
                          href="javascript:void(0);"
                        >
                          <i className="ti ti-current-location me-1" />
                          LiveTrack
                        </a>
                        <a href="/user-invoice" className="btn btn-light d-flex align-items-center justify-content-center">
                       
                          <i className="ti ti-file-text me-1" />
                          Invoice
                          </a>
                        <a
                          className="btn btn-light d-flex align-items-center justify-content-center"
                          href="javascript:void(0);"
                        >
                          <i className="ti ti-printer me-1" />
                          Print
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="slot-box mt-3">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="slot-booked">
                          <h6>Booked Slot</h6>
                          <ul>
                            <li className="fs-12 d-flex align-items-center mb-2">
                              <i className="feather-calendar me-1" /> 22 Sep
                              2023
                            </li>
                            <li className="fs-12 d-flex align-items-center">
                              <i className="feather-clock  me-1" /> 10:00AM -
                              11:00AM
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="slot-user">
                          <h6>Services Provider</h6>
                          <div className="slot-chat">
                            <div className="slot-user-img d-flex align-items-center">
                              <img
                                alt="image"
                                className="avatar rounded-circle  me-2"
                                src="assets/img/profiles/avatar-31.jpg"
                              />
                              <div className="slot-user-info">
                                <p className="mb-1 fs-12">John Doe</p>
                                <p className="mb-0 fs-12">
                                  <a
                                    className="__cf_email__"
                                    data-cfemail="b9d3d6d1d7f9dcc1d8d4c9d5dc97dad6d4"
                                    href=""
                                  ></a>
                                </p>
                              </div>
                            </div>
                            <div className="chat-item d-flex align-items-center">
                              <div className="slot-user-info">
                                <p className="mb-0 fs-12">+1 888 888 8888</p>
                                <p className="mb-0 fs-12">Montana, USA</p>
                              </div>
                              <div>
                                <a
                                  className="btn btn-sm btn-dark d-flex align-items-center"
                                  href="user-chat.html"
                                >
                                  {" "}
                                  <i className="ti ti-message me-1" /> Chat
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="slot-action">
                          <h6>Booking Status</h6>
                          <span className="badge badge-success-100 p-2 me-3">
                            Completed
                          </span>
                          <span className="badge badge-skyblue p-2">
                            Pending
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="payment-summary">
                    <div className="row">
                      <div className="col-md-6 service-location">
                        <h6 className="order-title">
                          Service Location & Contact Details
                        </h6>
                        <div className="slot-address">
                          <ul>
                            <li>
                              <span>
                                <i className=" ti ti-map-pin" />
                              </span>
                              <div>
                                <h6>Address</h6>
                                <p>38 Taylor Street Mount Vernon, NY 10550</p>
                              </div>
                            </li>
                            <li>
                              <span>
                                <i className="ti ti-mail" />
                              </span>
                              <div>
                                <h6>Email</h6>
                                <p>
                                  <a
                                    className="__cf_email__"
                                    data-cfemail="016b6e696f726c687569416479606c716d642f626e6c"
                                    href=""
                                  ></a>
                                </p>
                              </div>
                            </li>
                            <li>
                              <span>
                                <i className="ti ti-phone" />
                              </span>
                              <div>
                                <h6>Phone</h6>
                                <p>+1 888 888 8888</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="slot-pay">
                          <p> Payment</p>
                          <span className="fs-14">
                            Visa **** **** **** **56{" "}
                            <img alt="Img" src="assets/img/icons/visa.svg" />
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6 order-summary">
                        <h6 className="order-title">Order Summary</h6>
                        <div className="ord-summary">
                          <div className="order-amt">
                            <div className="order-info">
                              <div className="order-img">
                                <img
                                  alt="img"
                                  src="assets/img/providers/provider-26.jpg"
                                />
                              </div>
                              <div className="order-profile">
                                <h6>Computer Services</h6>
                                <p>Newyork, USA</p>
                              </div>
                            </div>
                            <h5>$599.00</h5>
                          </div>
                          <ul>
                            <li>
                              Sub Total <span className="ord-amt">$257.00</span>
                            </li>
                            <li>
                              <p className="ord-code mb-0">
                                {" "}
                                Discount{" "}
                                <span className=" ms-2 p-2 badge badge-info-transparent">
                                  NEW 2024
                                </span>
                              </p>{" "}
                              <span className="ord-amt">-$11.00</span>
                            </li>
                            <li>
                              Tax @ 12.5% <span className="ord-amt">$5.36</span>
                            </li>
                            <li className="ord-total mb-0">
                              Total <span className="ord-amt">$251.36</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="row booking">
                        <div className="col-md-6">
                          <h6 className="order-title">Booking History</h6>
                          <div className="book-history">
                            <ul>
                              <li>
                                <h6>Booking</h6>
                                <p>
                                  <i className="ti ti-calendar me-1" />{" "}
                                  September 5, 2023
                                </p>
                              </li>
                              <li>
                                <h6>Provider Accept</h6>
                                <p>
                                  <i className="ti ti-calendar me-1" />{" "}
                                  September 5, 2023
                                </p>
                              </li>
                              <li>
                                <h6>Completed on</h6>
                                <p>
                                  <i className="ti ti-calendar me-1" />{" "}
                                  September 5, 2023
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="order-reviews">
                            <div className="row align-items-center mb-4">
                              <div className="col-5">
                                <h6 className="order-title">Reviews</h6>
                              </div>
                              <div className="col-7 text-end d-flex justify-content-end">
                                <a
                                  className="btn btn-sm d-flex align-items-center btn-dark"
                                  data-bs-target="#add-review"
                                  data-bs-toggle="modal"
                                  href="javascript:void(0);"
                                >
                                  <i className="feather-plus-circle me-2" />
                                  Add Review
                                </a>
                              </div>
                            </div>
                            <ul>
                              <li>
                                <div className="order-comment">
                                  <div className="rating">
                                    <i className="ti ti-star-filled text-warning" />
                                    <i className="ti ti-star-filled text-warning" />
                                    <i className="ti ti-star-filled text-warning" />
                                    <i className="ti ti-star-filled text-warning" />
                                    <i className="ti ti-star-filled text-warning" />
                                  </div>
                                  <h6>
                                    A wonderful experience was all the help...
                                  </h6>
                                  <p>
                                    <i className="fa-solid fa-calendar-days me-1" />{" "}
                                    September 5, 2023
                                  </p>
                                </div>
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
          </div>
        </div>
        
        <Footer/>
        <div className="modal fade custom-modal" id="add-review">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                <h5 className="modal-title">Write A Review</h5>
                <a
                  aria-label="Close"
                  data-bs-dismiss="modal"
                  href="javascript:void(0);"
                >
                  <i className="ti ti-circle-x-filled fs-20" />
                </a>
              </div>
              <form action="">
                <div className="modal-body">
                  <div className="write-review">
                    <div className="review-add d-flex align-items-center mb-3">
                      <div className="rev-img me-2">
                        <img
                          alt="image"
                          src="assets/img/services/service-19.jpg"
                        />
                      </div>
                      <div>
                        <h6 className="fs-16 fw-medium mb-1">
                          Computer Services
                        </h6>
                        <p className="fs-12">Newyork, USA</p>
                      </div>
                    </div>
                    <div className="form-info d-flex align-items-center justify-content-between mb-3">
                      <p className="fw-medium text-dark mb-0">
                        Rate The Service
                      </p>
                      <div className="rating-select mb-0">
                        <a href="javascript:void(0);">
                          <i className="fas fa-star" />
                        </a>
                        <a href="javascript:void(0);">
                          <i className="fas fa-star" />
                        </a>
                        <a href="javascript:void(0);">
                          <i className="fas fa-star" />
                        </a>
                        <a href="javascript:void(0);">
                          <i className="fas fa-star" />
                        </a>
                        <a href="javascript:void(0);">
                          <i className="fas fa-star" />
                        </a>
                      </div>
                    </div>
                    <div className="mb-0">
                      <label className="col-form-label">
                        Write your Review
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Please write your review"
                        rows="4"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <a
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                    href="javascript:void(0);"
                  >
                    Cancel
                  </a>
                  <button className="btn btn-dark" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <script
          data-cfasync="false"
          src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
        />
        <script
          src="assets/js/jquery-3.7.1.min.js"
          type="131775fd2bd9747f35198e27-text/javascript"
        />
        <script
          src="assets/js/bootstrap.bundle.min.js"
          type="131775fd2bd9747f35198e27-text/javascript"
        />
        <script
          src="assets/js/wow.min.js"
          type="131775fd2bd9747f35198e27-text/javascript"
        />
        <script
          src="assets/plugins/select2/js/select2.min.js"
          type="131775fd2bd9747f35198e27-text/javascript"
        />
        <script
          src="assets/plugins/owlcarousel/owl.carousel.min.js"
          type="131775fd2bd9747f35198e27-text/javascript"
        />
        <script
          src="assets/js/cursor.js"
          type="131775fd2bd9747f35198e27-text/javascript"
        />
        <script
          src="assets/js/script.js"
          type="131775fd2bd9747f35198e27-text/javascript"
        />
        <script
          data-cf-settings="131775fd2bd9747f35198e27-|49"
          defer
          src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        />
        <script
          crossOrigin="anonymous"
          data-cf-beacon='{"rayId":"908e4e7e2bdf8577","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
          defer
          integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
          src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        />
      </div>
      ;
    </>
  );
}

export default User_booking_details