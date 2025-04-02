import React from "react";

import "./App.css";
import Header from "./header";
import Forgotpasswordmodel from "./model-forgot-password";
import Providermodel from "./model-provider";
import Loginmodel from "./model-login";
import Forgotsuccessfully from "./model-forgot-successfully";
import Registersuccessfullmodel from "./model-register-succesfull";
import Verificationmodel from "./model-verification";
import Registrationmodel from "./model-register";
import Footer from "./footer";
import { db } from "./firebase"; // Adjust path accordingly
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function Contactus() {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchContact = async () => {
      try {
        const contactRef = doc(db, "admin", "contact");
        const contactSnap = await getDoc(contactRef);

        if (contactSnap.exists()) {
          setContact(contactSnap.data());
        } else {
          console.log("No contact details found");
        }
      } catch (error) {
        console.error("Error fetching contact details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  return (
    <div className="main-wrapper">
      <Header />
      <Providermodel />
      <Loginmodel />
      <Forgotpasswordmodel />
      <Forgotsuccessfully />
      <Registersuccessfullmodel />
      <Verificationmodel />
      <Registrationmodel />
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Contact Us</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact Us
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="breadcrumb-bg">
            <img
              src="assets/img/bg/breadcrumb-bg-01.png"
              className="breadcrumb-bg-1"
              alt="Img"
            />
            <img
              src="assets/img/bg/breadcrumb-bg-02.png"
              className="breadcrumb-bg-2"
              alt="Img"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="page-wrapper">
          <div className="content">
            <div className="container">
              <div className="contacts">
                <div className="contacts-overlay-img d-none d-lg-block">
                  <img
                    src="assets/img/bg/bg-07.png"
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="contacts-overlay-sm d-none d-lg-block">
                  <img
                    src="assets/img/bg/bg-08.png"
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="contact-details">
                  <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4 d-flex">
                      <div className="card flex-fill">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <span className="rounded-circle">
                              <i className="ti ti-phone text-primary"></i>
                            </span>
                            <div>
                              <h6 className="fs-18 mb-1">Phone Number</h6>

                              <p className="fs-14">
                                {contact?.phone || "Title Not Available"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 d-flex">
                      <div className="card flex-fill">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <span className="rounded-circle">
                              <i className="ti ti-mail text-primary"></i>
                            </span>
                            <div>
                              <h6 className="fs-18 mb-1">Email Address</h6>

                              <p className="fs-14">
                                <a href={`mailto:${contact.email}`}>
                                  {contact?.email || "Title Not Available"}
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 d-flex">
                      <div className="card flex-fill">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <span className="rounded-circle">
                              <i className="ti ti-map-pin text-primary"></i>
                            </span>
                            <div>
                              <h6 className="fs-18 mb-1">Address</h6>
                              <p className="fs-14">
                                {contact.address}, {contact.city},{" "}
                                {contact.state}, {contact.country} -{" "}
                                {contact.pincode}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 d-flex align-items-center">
                    <div className="contact-img flex-fill">
                      <img
                        src="assets/img/services/service-76.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <div className="contact-queries flex-fill">
                      <h2>Get In Touch</h2>
                      <form action="#">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <div className="form-group">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Your Name"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <div className="form-group">
                                <input
                                  className="form-control"
                                  type="email"
                                  placeholder="Your Email Address"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <div className="form-group">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Your Phone Number"
                                />
                              </div>
                            </div>
                            <div className="mb-3">
                              <select className="select">
                                <option>Select Services</option>
                                <option>Car Repair</option>
                                <option>Interior Designing</option>
                                <option>House Cleaning</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <div className="form-group">
                                <textarea
                                  className="form-control"
                                  placeholder="Type Message"
                                  id="floatingTextarea"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 submit-btn">
                            <button
                              className="btn btn-dark d-flex align-items-center "
                              type="submit"
                            >
                              Send Message
                              <i className="feather-arrow-right-circle ms-2"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <div className="xb-cursor tx-js-cursor">
        <div className="xb-cursor-wrapper">
          <div className="xb-cursor--follower xb-js-follower"></div>
        </div>
      </div>
      <script
        data-cfasync="false"
        src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
      ></script>
      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="602a27cdd90845d2e453b99e-text/javascript"
      ></script>

      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="602a27cdd90845d2e453b99e-text/javascript"
      ></script>

      <script
        src="assets/js/wow.min.js"
        type="602a27cdd90845d2e453b99e-text/javascript"
      ></script>

      <script
        src="assets/plugins/owlcarousel/owl.carousel.min.js"
        type="602a27cdd90845d2e453b99e-text/javascript"
      ></script>

      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="602a27cdd90845d2e453b99e-text/javascript"
      ></script>

      <script
        src="assets/js/cursor.js"
        type="602a27cdd90845d2e453b99e-text/javascript"
      ></script>

      <script
        src="assets/plugins/intltelinput/js/intlTelInput.js"
        type="602a27cdd90845d2e453b99e-text/javascript"
      ></script>
      <script
        src="assets/plugins/ityped/index.js"
        type="602a27cdd90845d2e453b99e-text/javascript"
      ></script>
      <script
        src="assets/js/validation.js"
        type="602a27cdd90845d2e453b99e-text/javascript"
      ></script>
      <script
        src="assets/js/script.js"
        type="602a27cdd90845d2e453b99e-text/javascript"
      ></script>
      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="602a27cdd90845d2e453b99e-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e4dc14b9e48ef","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default Contactus;
