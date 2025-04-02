import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Footer from "./footer";

function Provider() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <header className="header header-one">
        <div className="container">
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="navbar-header">
              <a href="javascript:void(0);" id="mobile_btn">
                <span className="bar-icon">
                  <span />
                  <span />
                  <span />
                </span>
              </a>
              <a className="navbar-brand logo" href="index.html">
                <img
                  alt="Logo"
                  className="img-fluid"
                  src="assets/img/logo.svg"
                />
              </a>
              <a className="navbar-brand logo-small" href="index.html">
                <img
                  alt="Logo"
                  className="img-fluid"
                  src="assets/img/logo-small.svg"
                />
              </a>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <a className="menu-logo" href="index.html">
                  <img
                    alt="Logo"
                    className="img-fluid"
                    src="assets/img/logo.svg"
                  />
                </a>
                <a
                  className="menu-close"
                  href="javascript:void(0);"
                  id="menu_close"
                >
                  {" "}
                  <i className="fas fa-times" />
                </a>
              </div>
              <ul className="main-nav">
                <li className="has-submenu megamenu ">
                  <a href="javascript:void(0);">
                    Home <i className="fas fa-chevron-down" />
                  </a>
                  <ul className="submenu mega-submenu">
                    <li>
                      <div className="megamenu-wrapper">
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index.html">
                                  <img
                                    alt="img"
                                    className="img-fluid"
                                    src="assets/img/home-01.jpg"
                                  />
                                </a>
                              </div>
                              <div className="demo-info">
                                <a href="index.html">Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo ">
                              <div className="demo-img">
                                <a href="index-2.html">
                                  <img
                                    alt="img"
                                    className="img-fluid"
                                    src="assets/img/home-02.jpg"
                                  />
                                </a>
                              </div>
                              <div className="demo-info">
                                <a href="index-2.html">Electrical Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-3.html">
                                  <img
                                    alt="img"
                                    className="img-fluid"
                                    src="assets/img/home-3.jpg"
                                  />
                                </a>
                              </div>
                              <div className="demo-info">
                                <a href="index-3.html">Cleaning Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-4.html">
                                  <img
                                    alt="img"
                                    className="img-fluid"
                                    src="assets/img/home-04.jpg"
                                  />
                                </a>
                              </div>
                              <div className="demo-info">
                                <a href="index-4.html">Saloon Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-5.html">
                                  <img
                                    alt="img"
                                    className="img-fluid"
                                    src="assets/img/home-05.jpg"
                                  />
                                </a>
                              </div>
                              <div className="demo-info">
                                <a href="index-5.html">Catering Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-6.html">
                                  <img
                                    alt="img"
                                    className="img-fluid"
                                    src="assets/img/home-06.jpg"
                                  />
                                </a>
                              </div>
                              <div className="demo-info">
                                <a href="index-6.html">Car Wash Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-7.html">
                                  <img
                                    alt="img"
                                    className="img-fluid"
                                    src="assets/img/home-09.jpg"
                                  />
                                </a>
                              </div>
                              <div className="demo-info">
                                <a href="index-7.html">House Problem Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-8.html">
                                  <img
                                    alt="img"
                                    className="img-fluid"
                                    src="assets/img/home-08.jpg"
                                  />
                                </a>
                              </div>
                              <div className="demo-info">
                                <a href="index-8.html">Pet Grooming Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-9.html">
                                  <img
                                    alt="img"
                                    className="img-fluid"
                                    src="assets/img/home-10.jpg"
                                  />
                                </a>
                              </div>
                              <div className="demo-info">
                                <a href="index-9.html">Mechanic Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-10.html">
                                  <img
                                    alt="img"
                                    className="img-fluid"
                                    src="assets/img/home-07.jpg"
                                  />
                                </a>
                              </div>
                              <div className="demo-info">
                                <a href="index-10.html">Cleaning Home</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="has-submenu active">
                  <a href="javascript:void(0);">
                    Services <i className="fas fa-chevron-down" />
                  </a>
                  <ul className="submenu">
                    <li>
                      <a href="services-grid.html">Service Grid</a>
                    </li>
                    <li>
                      <a href="services-list.html">Service List</a>
                    </li>
                    <li className="has-submenu ">
                      <a href="javascript:void(0);">Service Details</a>
                      <ul className="submenu">
                        <li>
                          <a href="service-details.html">Service Details 1</a>
                        </li>
                        <li>
                          <a href="service-details2.html">Service Details 2</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="service-request.html">Service Request</a>
                    </li>
                    <li>
                      <a href="search.html">Search</a>
                    </li>
                    <li className="has-submenu active">
                      <a href="javascript:void(0);">Providers</a>
                      <ul className="submenu">
                        <li className="active">
                          <a href="providers.html">Providers List</a>
                        </li>
                        <li>
                          <a href="provider-details.html">Providers Details</a>
                        </li>
                      </ul>
                    </li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Categories</a>
                      <ul className="submenu">
                        <li>
                          <a href="categories.html">Categories 1</a>
                        </li>
                        <li>
                          <a href="categories-2.html">Categories 2</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="create-service.html">Create Service</a>
                    </li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="javascript:void(0);">
                    Customers <i className="fas fa-chevron-down" />
                  </a>
                  <ul className="submenu">
                    <li>
                      <a href="user-dashboard.html">Dashboard</a>
                    </li>
                    <li>
                      <a href="user-booking-list.html">Booking</a>
                    </li>
                    <li>
                      <a href="favourites.html">Favorites</a>
                    </li>
                    <li>
                      <a href="customer-wallet.html">Wallet</a>
                    </li>
                    <li>
                      <a href="customer-reviews.html">Reviews</a>
                    </li>
                    <li>
                      <a href="user-chat.html">Chat</a>
                    </li>
                    <li>
                      <a href="account-settings.html">Settings</a>
                    </li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="javascript:void(0);">
                    Providers <i className="fas fa-chevron-down" />
                  </a>
                  <ul className="submenu">
                    <li>
                      <a href="provider-dashboard.html">Dashboard</a>
                    </li>
                    <li>
                      <a href="provider-services.html">My Services</a>
                    </li>
                    <li>
                      <a href="provider-booking.html">Booking</a>
                    </li>
                    <li>
                      <a href="provider-payout.html">Payout</a>
                    </li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Settings</a>
                      <ul className="submenu">
                        <li>
                          <a href="provider-appointment-settings.html">
                            Appointment Settings
                          </a>
                        </li>
                        <li>
                          <a href="provider-accounts-settings.html">
                            Account Settings
                          </a>
                        </li>
                        <li>
                          <a href="provider-social-profile.html">
                            Social Profiles
                          </a>
                        </li>
                        <li>
                          <a href="provider-security-settings.html">Security</a>
                        </li>
                        <li>
                          <a href="provider-plan.html">Plan & Billings</a>
                        </li>
                        <li>
                          <a href="provider-notifcations.html">Notifications</a>
                        </li>
                        <li>
                          <a href="provider-connected-apps.html">
                            Connected Apps
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="provider-holiday.html">Holidays & Leave</a>
                    </li>
                    <li>
                      <a href="provider-coupons.html">Coupons</a>
                    </li>
                    <li>
                      <a href="provider-offers.html">Offers</a>
                    </li>
                    <li>
                      <a href="provider-reviews.html">Reviews</a>
                    </li>
                    <li>
                      <a href="provider-earnings.html">Earnings</a>
                    </li>
                    <li>
                      <a href="provider-chat.html">Chat</a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item has-submenu">
                  <a className="nav-link" href="javascript:void(0);">
                    Pages
                    <i className="fas fa-chevron-down" />
                  </a>
                  <ul className="submenu">
                    <li>
                      <a href="about-us.html">About</a>
                    </li>
                    <li className="has-submenu">
                      <a href="blog-grid.html">Blog</a>
                      <ul className="submenu">
                        <li>
                          <a href="blog-grid.html">Blog Grid</a>
                        </li>
                        <li>
                          <a href="blogs.html">Blog List</a>
                        </li>
                        <li>
                          <a href="blog-details.html">Blog Details</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="contact-us.html">Contact Us</a>
                    </li>
                    <li>
                      <a href="how-it-works.html">How It Works</a>
                    </li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Error Page</a>
                      <ul className="submenu">
                        <li>
                          <a href="error-404.html">404 Error</a>
                        </li>
                        <li>
                          <a href="error-500.html">500 Error</a>
                        </li>
                      </ul>
                    </li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Authentication</a>
                      <ul className="submenu">
                        <li>
                          <a href="login.html">Login</a>
                        </li>
                        <li>
                          <a href="register.html">Customer Signup</a>
                        </li>
                        <li>
                          <a href="provider-register.html">Provider Signup</a>
                        </li>
                        <li>
                          <a href="reset-password.html">Reset Password</a>
                        </li>
                        <li>
                          <a href="otp-phone.html">Phone OTP</a>
                        </li>
                        <li>
                          <a href="otp-email.html">Email OTP</a>
                        </li>
                        <li>
                          <a href="free-trail.html">Free Trial</a>
                        </li>
                      </ul>
                    </li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Booking</a>
                      <ul className="submenu">
                        <li>
                          <a href="booking.html">Booking 1</a>
                        </li>
                        <li>
                          <a href="user-booking.html">Booking 2</a>
                        </li>
                        <li>
                          <a href="booking-payment.html">Booking Checkout</a>
                        </li>
                        <li>
                          <a href="booking-success.html">Booking Success</a>
                        </li>
                        <li>
                          <a href="booking-details.html">Booking Details</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="categories.html">Categories</a>
                    </li>
                    <li>
                      <a href="pricing.html">Pricing Plan</a>
                    </li>
                    <li>
                      <a href="faq.html">FAQ</a>
                    </li>
                    <li>
                      <a href="maintenance.html">Maintenance</a>
                    </li>
                    <li>
                      <a href="coming-soon.html">Coming Soon</a>
                    </li>
                    <li>
                      <a href="privacy-policy.html">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="terms-condition.html">Terms & Conditions</a>
                    </li>
                    <li>
                      <a href="session-expired.html">Session Expired</a>
                    </li>
                    <li>
                      <a href="installer.html">Installer</a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="admin/index.html">
                    Admin
                  </a>
                </li>
              </ul>
            </div>
            <ul className="nav header-navbar-rht">
              <li className="nav-item">
                <a className="nav-link header-reg" href="register.html">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link header-login" href="login.html">
                  <i className="fa-regular fa-circle-user me-2" />
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Providers</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home-2" />
                    </a>
                  </li>
                  <li aria-current="page" className="breadcrumb-item active">
                    Providers
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
        <div className="content content-two">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-xl-3 col-lg-4 theiaStickySidebar">
                <div className="card">
                  <div className="card-body">
                    <form action="">
                      <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                        <h5>
                          <i className="ti ti-filter-check me-2" />
                          Filters
                        </h5>
                        <a href="javascript:void(0);">Reset Filter</a>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <label className="form-label">Search By Keyword</label>
                        <input
                          className="form-control"
                          placeholder="What are you looking for?"
                          type="text"
                        />
                      </div>
                      <div className="accordion">
                        <div className="accordion-item mb-3">
                          <div
                            className="accordion-header"
                            id="accordion-headingThree"
                          >
                            <div
                              aria-controls="accordion-collapseThree"
                              aria-expanded="true"
                              className="accordion-button p-0 mb-3"
                              data-bs-target="#accordion-collapseThree"
                              data-bs-toggle="collapse"
                              role="button"
                            >
                              Categories
                            </div>
                          </div>
                          <div
                            aria-labelledby="accordion-headingThree"
                            className="accordion-collapse collapse show"
                            id="accordion-collapseThree"
                          >
                            <div className="mb-3">
                              <div className="form-check mb-2">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    defaultChecked
                                    type="checkbox"
                                  />
                                  All Categories
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  Construction
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  Car Wash
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  Electrical
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  Cleaning
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="accordion border-bottom mb-3">
                        <div
                          className="accordion-header"
                          id="accordion-headingFour"
                        >
                          <div
                            aria-controls="accordion-collapseFour"
                            aria-expanded="true"
                            className="accordion-button p-0 mb-3"
                            data-bs-target="#accordion-collapseFour"
                            data-bs-toggle="collapse"
                            role="button"
                          >
                            Price Range
                          </div>
                        </div>
                        <div
                          aria-labelledby="accordion-headingFour"
                          className="accordion-collapse collapse show"
                          id="accordion-collapseFour"
                        >
                          <div className="row gx-2">
                            <div className="col-6">
                              <div className="mb-3">
                                <input
                                  className="form-control"
                                  placeholder="$ Min"
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="mb-3">
                                <input
                                  className="form-control"
                                  placeholder="$ Max"
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="accordion border-bottom mb-3">
                        <div
                          className="accordion-header"
                          id="accordion-headingFive"
                        >
                          <div
                            aria-controls="accordion-collapseFive"
                            aria-expanded="true"
                            className="accordion-button p-0 mb-3"
                            data-bs-target="#accordion-collapseFive"
                            data-bs-toggle="collapse"
                            role="button"
                          >
                            Location
                          </div>
                        </div>
                        <div
                          aria-labelledby="accordion-headingFive"
                          className="accordion-collapse collapse show"
                          id="accordion-collapseFive"
                        >
                          <div className="mb-3">
                            <div className="position-relative">
                              <input
                                className="form-control"
                                placeholder="Select Location"
                                type="text"
                              />
                              <span className="icon-addon">
                                <i className="ti ti-map-pin" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="accordion">
                        <div className="accordion-item mb-3">
                          <div
                            className="accordion-header"
                            id="accordion-headingTwo"
                          >
                            <div
                              aria-controls="accordion-collapseTwo"
                              aria-expanded="true"
                              className="accordion-button fs-18 p-0 mb-3"
                              data-bs-target="#accordion-collapseTwo"
                              data-bs-toggle="collapse"
                              role="button"
                            >
                              Ratings
                            </div>
                          </div>
                          <div
                            aria-labelledby="accordion-headingTwo"
                            className="accordion-collapse collapse show"
                            id="accordion-collapseTwo"
                          >
                            <div className="mb-3">
                              <div className="form-check mb-2">
                                <label className="form-check-label d-block">
                                  <input
                                    className="form-check-input"
                                    defaultChecked
                                    type="checkbox"
                                  />
                                  <span className="rating">
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <span className="float-end">(55)</span>
                                  </span>
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label d-block">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  <span className="rating">
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fa-regular fa-star filled" />
                                    <span className="float-end">(48)</span>
                                  </span>
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label d-block">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  <span className="rating">
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fa-regular fa-star filled" />
                                    <i className="fa-regular fa-star filled" />
                                    <span className="float-end">(13)</span>
                                  </span>
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label d-block">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  <span className="rating">
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fa-regular fa-star filled" />
                                    <i className="fa-regular fa-star filled" />
                                    <i className="fa-regular fa-star filled" />
                                    <span className="float-end">(05)</span>
                                  </span>
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label d-block">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  <span className="rating">
                                    <i className="fas fa-star filled" />
                                    <i className="fa-regular fa-star filled" />
                                    <i className="fa-regular fa-star filled" />
                                    <i className="fa-regular fa-star filled" />
                                    <i className="fa-regular fa-star filled" />
                                    <span className="float-end">(00)</span>
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-dark w-100" type="submit">
                        Search
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8">
                <div className="row">
                  <div className="col-xl-4 col-md-6">
                    <div className="card ">
                      <div className="card-body">
                        <div className="card-img card-img-hover mb-3">
                          <a href="provider-details.html">
                            <img
                              alt="Img"
                              src="assets/img/providers/provider-01.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div>
                              <h5 className="d-flex align-items-center mb-1">
                                <a href="provider-details.html">Michael</a>
                                <span className="text-success ms-2">
                                  <i className="fa fa-check-circle" />
                                </span>
                              </h5>
                              <span>Carpenter</span>
                            </div>
                            <p className="fs-18 fw-medium text-dark">
                              $50.00
                              <span className="fw-normal fs-13 text-default">
                                /hr
                              </span>
                            </p>
                          </div>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fa-solid fa-star-half-stroke filled" />
                            <span className="ms-2 d-inline-block">(320)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-img card-img-hover mb-3">
                          <a href="provider-details.html">
                            <img
                              alt="Img"
                              src="assets/img/providers/provider-02.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div>
                              <h5 className="d-flex align-items-center mb-1">
                                <a href="provider-details.html">Antoinette</a>
                                <span className="text-success ms-2">
                                  <i className="fa fa-check-circle" />
                                </span>
                              </h5>
                              <span>Cleaner</span>
                            </div>
                            <p className="fs-18 fw-medium text-dark">
                              $25.00
                              <span className="fw-normal fs-13 text-default">
                                /hr
                              </span>
                            </p>
                          </div>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fa-solid fa-star-half-stroke filled" />
                            <span className="ms-2 d-inline-block">(120)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-img card-img-hover mb-3">
                          <a href="provider-details.html">
                            <img
                              alt="Img"
                              src="assets/img/providers/provider-03.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div>
                              <h5 className="d-flex align-items-center mb-1">
                                <a href="provider-details.html">Thompson</a>
                                <span className="text-success ms-2">
                                  <i className="fa fa-check-circle" />
                                </span>
                              </h5>
                              <span>Mechanic</span>
                            </div>
                            <p className="fs-18 fw-medium text-dark">
                              $30.00
                              <span className="fw-normal fs-13 text-default">
                                /hr
                              </span>
                            </p>
                          </div>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fa-solid fa-star-half-stroke filled" />
                            <span className="ms-2 d-inline-block">(95)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-img card-img-hover mb-3">
                          <a href="provider-details.html">
                            <img
                              alt="Img"
                              src="assets/img/providers/provider-04.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div>
                              <h5 className="d-flex align-items-center mb-1">
                                <a href="provider-details.html">Lawrence</a>
                                <span className="text-success ms-2">
                                  <i className="fa fa-check-circle" />
                                </span>
                              </h5>
                              <span>Engineer</span>
                            </div>
                            <p className="fs-18 fw-medium text-dark">
                              $70.00
                              <span className="fw-normal fs-13 text-default">
                                /hr
                              </span>
                            </p>
                          </div>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fa-solid fa-star-half-stroke filled" />
                            <span className="ms-2 d-inline-block">(228)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-img card-img-hover mb-3">
                          <a href="provider-details.html">
                            <img
                              alt="Img"
                              src="assets/img/providers/provider-05.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div>
                              <h5 className="d-flex align-items-center mb-1">
                                <a href="provider-details.html">Ellen</a>
                                <span className="text-success ms-2">
                                  <i className="fa fa-check-circle" />
                                </span>
                              </h5>
                              <span>Designer</span>
                            </div>
                            <p className="fs-18 fw-medium text-dark">
                              $30.00
                              <span className="fw-normal fs-13 text-default">
                                /hr
                              </span>
                            </p>
                          </div>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fa-solid fa-star-half-stroke filled" />
                            <span className="ms-2 d-inline-block">(130)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-img card-img-hover mb-3">
                          <a href="provider-details.html">
                            <img
                              alt="Img"
                              src="assets/img/providers/provider-06.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div>
                              <h5 className="d-flex align-items-center mb-1">
                                <a href="provider-details.html">Nathaniel</a>
                                <span className="text-success ms-2">
                                  <i className="fa fa-check-circle" />
                                </span>
                              </h5>
                              <span>Plumber</span>
                            </div>
                            <p className="fs-18 fw-medium text-dark">
                              $45.00
                              <span className="fw-normal fs-13 text-default">
                                /hr
                              </span>
                            </p>
                          </div>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fa-solid fa-star-half-stroke filled" />
                            <span className="ms-2 d-inline-block">(95)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-img card-img-hover mb-3">
                          <a href="provider-details.html">
                            <img
                              alt="Img"
                              src="assets/img/providers/provider-07.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div>
                              <h5 className="d-flex align-items-center mb-1">
                                <a href="provider-details.html">Stephanie</a>
                                <span className="text-success ms-2">
                                  <i className="fa fa-check-circle" />
                                </span>
                              </h5>
                              <span>Carpenter</span>
                            </div>
                            <p className="fs-18 fw-medium text-dark">
                              $40.00
                              <span className="fw-normal fs-13 text-default">
                                /hr
                              </span>
                            </p>
                          </div>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fa-solid fa-star-half-stroke filled" />
                            <span className="ms-2 d-inline-block">(228)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-img card-img-hover mb-3">
                          <a href="provider-details.html">
                            <img
                              alt="Img"
                              src="assets/img/providers/provider-08.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div>
                              <h5 className="d-flex align-items-center mb-1">
                                <a href="provider-details.html">Charles</a>
                                <span className="text-success ms-2">
                                  <i className="fa fa-check-circle" />
                                </span>
                              </h5>
                              <span>Serviceman</span>
                            </div>
                            <p className="fs-18 fw-medium text-dark">
                              $55.00
                              <span className="fw-normal fs-13 text-default">
                                /hr
                              </span>
                            </p>
                          </div>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fa-solid fa-star-half-stroke filled" />
                            <span className="ms-2 d-inline-block">(130)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-img card-img-hover mb-3">
                          <a href="provider-details.html">
                            <img
                              alt="Img"
                              src="assets/img/providers/provider-09.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div>
                              <h5 className="d-flex align-items-center mb-1">
                                <a href="provider-details.html">George</a>
                                <span className="text-success ms-2">
                                  <i className="fa fa-check-circle" />
                                </span>
                              </h5>
                              <span>Mechanic</span>
                            </div>
                            <p className="fs-18 fw-medium text-dark">
                              $70.00
                              <span className="fw-normal fs-13 text-default">
                                /hr
                              </span>
                            </p>
                          </div>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fa-solid fa-star-half-stroke filled" />
                            <span className="ms-2 d-inline-block">(95)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-img card-img-hover mb-3">
                          <a href="provider-details.html">
                            <img
                              alt="Img"
                              src="assets/img/providers/provider-10.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div>
                              <h5 className="d-flex align-items-center mb-1">
                                <a href="provider-details.html">Nicholas</a>
                                <span className="text-success ms-2">
                                  <i className="fa fa-check-circle" />
                                </span>
                              </h5>
                              <span>Electrician</span>
                            </div>
                            <p className="fs-18 fw-medium text-dark">
                              $20.00
                              <span className="fw-normal fs-13 text-default">
                                /hr
                              </span>
                            </p>
                          </div>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fa-solid fa-star-half-stroke filled" />
                            <span className="ms-2 d-inline-block">(320)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-img card-img-hover mb-3">
                          <a href="provider-details.html">
                            <img
                              alt="Img"
                              src="assets/img/providers/provider-11.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div>
                              <h5 className="d-flex align-items-center mb-1">
                                <a href="provider-details.html">Gloria</a>
                                <span className="text-success ms-2">
                                  <i className="fa fa-check-circle" />
                                </span>
                              </h5>
                              <span>Cleaner</span>
                            </div>
                            <p className="fs-18 fw-medium text-dark">
                              $30.00
                              <span className="fw-normal fs-13 text-default">
                                /hr
                              </span>
                            </p>
                          </div>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fa-solid fa-star-half-stroke filled" />
                            <span className="ms-2 d-inline-block">(420)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-img card-img-hover mb-3">
                          <a href="provider-details.html">
                            <img
                              alt="Img"
                              src="assets/img/providers/provider-04.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div>
                              <h5 className="d-flex align-items-center mb-1">
                                <a href="provider-details.html">John Smith</a>
                                <span className="text-success ms-2">
                                  <i className="fa fa-check-circle" />
                                </span>
                              </h5>
                              <span>Electrician</span>
                            </div>
                            <p className="fs-18 fw-medium text-dark">
                              $20.00
                              <span className="fw-normal fs-13 text-default">
                                /hr
                              </span>
                            </p>
                          </div>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fa-solid fa-star-half-stroke filled" />
                            <span className="ms-2 d-inline-block">(320)</span>
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
      </div>
      <Footer/>
      <div className="back-to-top">
        <a
          className="back-to-top-icon align-items-center justify-content-center d-flex"
          href="#top"
        >
          <i className="fa-solid fa-arrow-up" />
        </a>
      </div>
      <div className="xb-cursor tx-js-cursor">
        <div className="xb-cursor-wrapper">
          <div className="xb-cursor--follower xb-js-follower" />
        </div>
      </div>
      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="9577364f36d3fcd41614a380-text/javascript"
      />
      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="9577364f36d3fcd41614a380-text/javascript"
      />
      <script
        src="assets/js/wow.min.js"
        type="9577364f36d3fcd41614a380-text/javascript"
      />
      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="9577364f36d3fcd41614a380-text/javascript"
      />
      <script
        src="assets/plugins/theia-sticky-sidebar/ResizeSensor.js"
        type="9577364f36d3fcd41614a380-text/javascript"
      />
      <script
        src="assets/plugins/theia-sticky-sidebar/theia-sticky-sidebar.js"
        type="9577364f36d3fcd41614a380-text/javascript"
      />
      <script
        src="assets/plugins/owlcarousel/owl.carousel.min.js"
        type="9577364f36d3fcd41614a380-text/javascript"
      />
      <script
        src="assets/js/cursor.js"
        type="9577364f36d3fcd41614a380-text/javascript"
      />
      <script
        src="assets/js/script.js"
        type="9577364f36d3fcd41614a380-text/javascript"
      />
      <script
        data-cf-settings="9577364f36d3fcd41614a380-|49"
        defer
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
      />
      <script
        crossOrigin="anonymous"
        data-cf-beacon='{"rayId":"908e4e2cadb38577","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        defer
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
      />
    </div>
  );
}

export default Provider;
