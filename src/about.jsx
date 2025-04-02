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

function About() {
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
              <h2 className="breadcrumb-title mb-2">About Us</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    About Us
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

      <div className="page-wrapper">
        <div className="content p-0">
          <div className="about-sec">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="about-img d-none d-md-block">
                    <div className="about-exp">
                      <span>12+ years of experiences</span>
                    </div>
                    <div className="abt-img">
                      <img
                        src="assets/img/providers/provider-23.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="about-content">
                    <h6>ABOUT OUR COMPANY</h6>
                    <h2>Best Solution For Cleaning Services</h2>
                    <p>
                      Welcome to localhand, your premier destination for
                      connecting with top-rated service providers and finding
                      the perfect match for your needs. Our platform is designed
                      to simplify the process of discovering, evaluating, and
                      hiring trusted professionals across a wide range of
                      services, from home improvement and IT support to personal
                      care and more.
                    </p>
                    <p>
                      At localhand, our mission is to bridge the gap between
                      service providers and customers by offering a seamless and
                      efficient marketplace experience. We aim to empower both
                      parties by providing a reliable platform where quality,
                      transparency, and customer satisfaction are our top
                      priorities.
                    </p>
                    <div className="row">
                      <div className="col-md-6">
                        <ul>
                          <li className="text-truncate">
                            <i className="ti ti-circle-check-filled text-dark me-1"></i>
                            We prioritize quality and reliability
                          </li>
                          <li className="text-truncate">
                            <i className="ti ti-circle-check-filled text-dark me-1"></i>
                            WeSaving your time and effort.
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul>
                          <li className="text-truncate">
                            <i className="ti ti-circle-check-filled text-dark me-1"></i>
                            Clear, detailed service listings & reviews
                          </li>
                          <li className="text-truncate">
                            <i className="ti ti-circle-check-filled text-dark me-1"></i>{" "}
                            Smooth and satisfactory experience.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="work-section px-0 my-0 work-bg">
            <div className="work-bg-2 d-none d-md-block">
              <img
                src="assets/img/bg/dotted.png"
                alt="img"
                className="img-fluid"
              />
            </div>
            <div className="work-bg-1 d-none d-md-block">
              <img
                src="assets/img/bg/bg-13.png"
                alt="img"
                className="img-fluid"
              />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <div className="section-heading">
                    <h2>How It Works</h2>
                    <p>
                      Straightforward process designed to make your experience
                      seamless and hassle-free.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 d-flex">
                  <div className=" card work-box flex-fill">
                    <div className="card-body">
                      <div className="work-icon">
                        <span>
                          <img
                            src="assets/img/icons/about-hands.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <h5>1. Search and Browse</h5>
                      <p>
                        Customers can browse or search for specific products or
                        services using categories, filters, or search bars.
                      </p>
                      <h4>01</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className=" card work-box flex-fill">
                    <div className="card-body">
                      <div className="work-icon">
                        <span>
                          <img
                            src="assets/img/icons/about-documents.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <h5>2 Add to Cart or Book Now</h5>
                      <p>
                        Customers can add items to their shopping cart. For
                        services, they may select a service and proceed to book.
                      </p>
                      <h4>02</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className=" card work-box flex-fill">
                    <div className="card-body">
                      <div className="work-icon">
                        <span>
                          <img
                            src="assets/img/icons/about-book.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <h5>Amazing Places</h5>
                      <p>
                        The Customer fulfills the order by either providing the
                        service to the buyer.
                      </p>
                      <h4>03</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="chooseus-sec">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="choose-content">
                    <h2>Why Choose Us</h2>
                    <p>
                      Choose us for reliable, personalized service and
                      exceptional results.
                    </p>
                    <div className="accordion" id="faq_accordion">
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseOne"
                            aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseOne"
                          >
                            24/7 Supports
                          </button>
                        </h2>
                        <div
                          id="panelsStayOpen-collapseOne"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#faq_accordion"
                        >
                          <div className="accordion-body">
                            <p>
                              Access round-the-clock support through our
                              dedicated helpdesk, available 24/7 to address any
                              issues or queries you may have. Whether it’s day
                              or night, our team is here to ensure you receive
                              timely assistance and seamless service.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseTwo"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseTwo"
                          >
                            Client’s reviews
                          </button>
                        </h2>
                        <div
                          id="panelsStayOpen-collapseTwo"
                          className="accordion-collapse collapse"
                          data-bs-parent="#faq_accordion"
                        >
                          <div className="accordion-body">
                            <p>
                              Access round-the-clock support through our
                              dedicated helpdesk, available 24/7 to address any
                              issues or queries you may have. Whether it’s day
                              or night, our team is here to ensure you receive
                              timely assistance and seamless service.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseThree"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseThree"
                          >
                            Professional Team
                          </button>
                        </h2>
                        <div
                          id="panelsStayOpen-collapseThree"
                          className="accordion-collapse collapse"
                          data-bs-parent="#faq_accordion"
                        >
                          <div className="accordion-body">
                            <p>
                              Access round-the-clock support through our
                              dedicated helpdesk, available 24/7 to address any
                              issues or queries you may have. Whether it’s day
                              or night, our team is here to ensure you receive
                              timely assistance and seamless service.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse4"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseThree"
                          >
                            Best Services
                          </button>
                        </h2>
                        <div
                          id="panelsStayOpen-collapse4"
                          className="accordion-collapse collapse"
                          data-bs-parent="#faq_accordion"
                        >
                          <div className="accordion-body">
                            <p>
                              Access round-the-clock support through our
                              dedicated helpdesk, available 24/7 to address any
                              issues or queries you may have. Whether it’s day
                              or night, our team is here to ensure you receive
                              timely assistance and seamless service.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="chooseus-img">
                    <img
                      src="assets/img/services/service-75.jpg"
                      className="img-fluid"
                      alt="img"
                    />
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="choose-icon">
                    <img
                      src="assets/img/icons/group-stars.svg"
                      className="img-fluid"
                      alt="img"
                    />
                    <div className="choose-info">
                      <h3>2583+</h3>
                      <p>Satisfied Clients</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="choose-icon">
                    <img
                      src="assets/img/icons/expert-team.svg"
                      className="img-fluid"
                      alt="img"
                    />
                    <div className="choose-info">
                      <h3>2583+</h3>
                      <p>Expert Team</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="choose-icon">
                    <img
                      src="assets/img/icons/about-documents.svg"
                      className="img-fluid"
                      alt="img"
                    />
                    <div className="choose-info">
                      <h3>2583+</h3>
                      <p>Project Completed</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="choose-icon border-0">
                    <img
                      src="assets/img/icons/expereience.svg"
                      className="img-fluid"
                      alt="img"
                    />
                    <div className="choose-info">
                      <h3>2583+</h3>
                      <p>Years of experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="providers-section abt-provider">
            <div className="container">
              <div className="section-heading">
                <div className="row">
                  <div className="col-md-6">
                    <p className="mb-0 fs-16">Meet Our Experts</p>
                    <h2 className="fs-32">Top Providers</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="card providerset p-0 flex-fill">
                    <div className="card-body">
                      <div className="providerset-img">
                        <a href="provider-details.html">
                          <img
                            src="assets/img/providers/provider-12.jpg"
                            alt="img"
                          />
                        </a>
                      </div>
                      <div className="providerset-content">
                        <div className="providerset-price">
                          <div className="d-flex justify-content-between align-items-center flex-fill">
                            <div className="providerset-name">
                              <h4 className="d-flex align-items-center">
                                <a
                                  href="provider-details.html"
                                  className="me-1 text-truncate"
                                >
                                  John Smith
                                </a>
                                <i className="ti ti-circle-check-filled text-success"></i>
                              </h4>
                              <span>Electrician</span>
                            </div>
                            <div className="providerset-prices">
                              <h6>
                                $20.00<span>/hr</span>
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="provider-rating">
                          <div className="rating fs-13">
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-half-filled text-warning me-1"></i>
                            <span className="fs-13">(320)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="card providerset p-0">
                    <div className="card-body">
                      <div className="providerset-img">
                        <a href="provider-details.html">
                          <img
                            src="assets/img/providers/provider-01.jpg"
                            alt="img"
                          />
                        </a>
                      </div>
                      <div className="providerset-content">
                        <div className="providerset-price">
                          <div className="d-flex justify-content-between align-items-center flex-fill">
                            <div className="providerset-name">
                              <h4 className="d-flex align-items-center">
                                <a
                                  href="provider-details.html"
                                  className="me-1"
                                >
                                  Michael
                                </a>
                                <i className="ti ti-circle-check-filled text-success"></i>
                              </h4>
                              <span>Carpenter</span>
                            </div>
                            <div className="providerset-prices">
                              <h6>
                                $50.00<span>/hr</span>
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="provider-rating">
                          <div className="rating fs-13">
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-half-filled text-warning me-1"></i>
                            <span className="fs-13">(228)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="card providerset p-0">
                    <div className="card-body">
                      <div className="providerset-img">
                        <a href="provider-details.html">
                          <img
                            src="assets/img/providers/provider-02.jpg"
                            alt="img"
                          />
                        </a>
                      </div>
                      <div className="providerset-content">
                        <div className="providerset-price">
                          <div className="d-flex justify-content-between align-items-center flex-fill">
                            <div className="providerset-name">
                              <h4 className="d-flex align-items-center">
                                <a
                                  href="provider-details.html"
                                  className="me-1"
                                >
                                  Antoinette
                                </a>
                                <i className="ti ti-circle-check-filled text-success"></i>
                              </h4>
                              <span>Cleaner</span>
                            </div>
                            <div>
                              <div className="providerset-prices">
                                <h6>
                                  $25.00<span>/hr</span>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="provider-rating">
                          <div className="rating fs-13">
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-half-filled text-warning me-1"></i>
                            <span className="fs-13">(130)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="card providerset p-0">
                    <div className="card-body">
                      <div className="providerset-img">
                        <a href="provider-details.html">
                          <img
                            src="assets/img/providers/provider-03.jpg"
                            alt="img"
                          />
                        </a>
                      </div>
                      <div className="providerset-content">
                        <div className="providerset-price">
                          <div className="d-flex justify-content-between align-items-center flex-fill">
                            <div className="providerset-name">
                              <h4 className="d-flex align-items-center">
                                <a
                                  href="provider-details.html"
                                  className="me-1"
                                >
                                  Thompson
                                </a>
                                <i className="ti ti-circle-check-filled text-success"></i>
                              </h4>
                              <span>Mechanic</span>
                            </div>
                            <div className="providerset-prices">
                              <h6>
                                $30.00<span>/hr</span>
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="provider-rating">
                          <div className="rating fs-13">
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-filled text-warning"></i>
                            <i className="ti ti-star-half-filled text-warning me-1"></i>
                            <span className="fs-13">(95)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="client-section client-section-about">
            <div className="container">
              <div className="overlay-img d-none d-md-block">
                <div className="overlay-img-left">
                  <img
                    src="assets/img/bg/transperent-circle.png"
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="overlay-img-right">
                  <img
                    src="assets/img/bg/bg-graphics.png"
                    alt="img"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-center">
                  <div className="section-heading">
                    <h2>Testimonials</h2>
                    <p>
                      Our clients rave about our seamless service, exceptional
                      quality, and unmatched customer support.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className=" owl-carousel testimonial-slider-3">
                    <div className=" card client-widget">
                      <div className="card-body">
                        <div className="client-img">
                          <a href="javascript:void(0);">
                            <img
                              className="img-fluid rounded-circle"
                              alt="Image"
                              src="assets/img/user/user-03.jpg"
                            />
                          </a>
                        </div>
                        <div className="client-content">
                          <p>
                            “I was thoroughly impressed with the quality and
                            efficiency of the service I received. The team was
                            professional, and the results exceeded my
                            expectations.”{" "}
                          </p>
                          <h5>John Doe</h5>
                          <h6>Director</h6>
                        </div>
                      </div>
                    </div>
                    <div className="card client-widget">
                      <div className="card-body">
                        <div className="client-img">
                          <a href="javascript:void(0);">
                            <img
                              className="img-fluid rounded-circle"
                              alt="Image"
                              src="assets/img/user/user-06.jpg"
                            />
                          </a>
                        </div>
                        <div className="client-content">
                          <p>
                            The value for money was excellent, and the quality
                            of work was outstanding. I felt that I received more
                            than what I paid for, with high standards and
                            professional results.
                          </p>
                          <h5>John Doe</h5>
                          <h6>Director</h6>
                        </div>
                      </div>
                    </div>
                    <div className="card client-widget">
                      <div className="card-body">
                        <div className="client-img">
                          <a href="javascript:void(0);">
                            <img
                              className="img-fluid rounded-circle"
                              alt="Image"
                              src="assets/img/user/user-07.jpg"
                            />
                          </a>
                        </div>
                        <div className="client-content">
                          <p>
                            “I was thoroughly impressed with the quality and
                            efficiency of the service I received. The team was
                            professional, and the results exceeded my
                            expectations.”
                          </p>
                          <h5>Mike Hussy</h5>
                          <h6>Director</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="service-offer about-service-offer">
            <div className="container">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="service-content">
                        <h6 className="display-6">
                          Looking for the Best Service Finder & Bookings
                        </h6>
                        <p>
                          We offer a comprehensive directory of top-rated
                          service providers, detailed profiles, and customer
                          reviews to help you make informed choices.
                        </p>

                        <div className="d-flex">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-white d-flex align-items-center"
                          >
                            Get Started{" "}
                            <i className="ms-1 ti ti-circle-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="service-img">
                        <img
                          src="assets/img/services/repair-img.png"
                          alt="img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default About;
