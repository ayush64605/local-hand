import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

function Booking_success() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header/>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Bookings</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home-2" />
                    </a>
                  </li>
                  <li className="breadcrumb-item">Customer</li>
                  <li aria-current="page" className="breadcrumb-item active">
                    Bookings
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
            <div className="row">
              <div className="col-lg-12">
                <ul className="step-register row">
                  <li className="activate col-md-4">
                    <div className="multi-step-icon">
                      <span>
                        <img
                          alt="img"
                          src="assets/img/icons/calendar-icon.svg"
                        />
                      </span>
                    </div>
                    <div className="multi-step-info">
                      <h6>Appointment</h6>
                      <p>Choose time & date for the service</p>
                    </div>
                  </li>
                  <li className="activate col-md-4">
                    <div className="multi-step-icon">
                      <span>
                        <img alt="img" src="assets/img/icons/wallet-icon.svg" />
                      </span>
                    </div>
                    <div className="multi-step-info">
                      <h6>Payment</h6>
                      <p>Select Payment Gateway</p>
                    </div>
                  </li>
                  <li className="active col-md-4">
                    <div className="multi-step-icon">
                      <span>
                        <img alt="img" src="assets/img/icons/book-done.svg" />
                      </span>
                    </div>
                    <div className="multi-step-info">
                      <h6>Done </h6>
                      <p>Completion of Booking</p>
                    </div>
                  </li>
                </ul>
                <div className="row align-items-center">
                  <div className="col-md-5">
                    <div className="booking-done">
                      <img
                        alt="image"
                        className="img-fluid"
                        src="assets/img/payment-success.svg"
                      />
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="booking-done">
                      <h6>Successfully Completed Payment</h6>
                      <p>Your Booking has been Successfully Competed</p>
                      <div className="book-submit">
                      <a className="btn btn-dark" href="/"><i className="feather-arrow-left-circle" />Go to Home</a>
                
                        <a className="btn btn-light" href="invoice.html">
                          Booking History
                        </a>
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
      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="f023d26cd16871b7cbd6a96e-text/javascript"
      />
      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="f023d26cd16871b7cbd6a96e-text/javascript"
      />
      <script
        src="assets/js/wow.min.js"
        type="f023d26cd16871b7cbd6a96e-text/javascript"
      />
      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="f023d26cd16871b7cbd6a96e-text/javascript"
      />
      <script
        src="assets/js/moment.js"
        type="f023d26cd16871b7cbd6a96e-text/javascript"
      />
      <script
        src="assets/js/bootstrap-datetimepicker.min.js"
        type="f023d26cd16871b7cbd6a96e-text/javascript"
      />
      <script
        src="assets/plugins/owlcarousel/owl.carousel.min.js"
        type="f023d26cd16871b7cbd6a96e-text/javascript"
      />
      <script
        src="assets/js/cursor.js"
        type="f023d26cd16871b7cbd6a96e-text/javascript"
      />
      <script
        src="assets/js/script.js"
        type="f023d26cd16871b7cbd6a96e-text/javascript"
      />
      <script
        data-cf-settings="f023d26cd16871b7cbd6a96e-|49"
        defer
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
      />
      <script
        crossOrigin="anonymous"
        data-cf-beacon='{"rayId":"908e4e7cf96b4019","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        defer
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
      />
    </div>
  );
}

export default Booking_success;
