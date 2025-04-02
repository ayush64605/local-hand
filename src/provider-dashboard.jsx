import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Provider_header from "./provider-header";
import Provider_sidebar from "./provider-sidebar";

function Provider_dashboard() {
  const [count, setCount] = useState(0);

  return (
    <div className="provider-page">
      <div className="main-wrapper">
        <Provider_header />
        <Provider_sidebar/>
        <div className="page-wrapper">
          <div className="content container-fluid pb-0">
            <div className="row justify-content-center">
              <div className="col-xxl-3 col-md-6">
                <div className="row flex-fill">
                  <div className="col-12">
                    <div className="card prov-widget">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="mb-2">
                            <p className="mb-1">Upcoming Appointments</p>
                            <h5>
                              <span className="counter">12</span>+
                            </h5>
                          </div>
                          <span className="prov-icon bg-info d-flex justify-content-center align-items-center rounded">
                            <i className="ti ti-calendar-check"></i>
                          </span>
                        </div>
                        <p className="fs-12">
                          <span className="text-success me-2">
                            12% <i className="ti ti-arrow-badge-up-filled"></i>
                          </span>
                          from Last Week
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card prov-widget">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="mb-2">
                            <p className="mb-1">Completed Appointments</p>
                            <h5>
                              <span className="counter">68</span>+
                            </h5>
                          </div>
                          <span className="prov-icon bg-success d-flex justify-content-center align-items-center rounded">
                            <i className="ti ti-calendar-check"></i>
                          </span>
                        </div>
                        <p className="fs-12">
                          <span className="text-danger me-2">
                            12%{" "}
                            <i className="ti ti-arrow-badge-down-filled"></i>
                          </span>
                          from Last Week
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card prov-widget">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="mb-2">
                            <p className="mb-1">Canceled Appointments</p>
                            <h5>
                              <span className="counter">08</span>+
                            </h5>
                          </div>
                          <span className="prov-icon bg-danger d-flex justify-content-center align-items-center rounded">
                            <i className="ti ti-calendar-check"></i>
                          </span>
                        </div>
                        <p className="fs-12">
                          <span className="text-danger me-2">0%</span>from Last
                          Week
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 d-flex" style={{justifyContent:"center", alignItems:"center"}}>
                <img src="assets/img/logo.png" alt="" style={{width:"250px", height:"100px" }}/>
              </div>
              <div className="col-xxl-3 col-md-6">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div>
                      <div className="d-flex justify-content-center flex-column mb-3">
                        <h5 className="text-center">
                          1,500{" "}
                          <span className="text-success">
                            <i className="ti ti-arrow-badge-up-filled"></i>
                          </span>
                        </h5>
                        <p className="fs-12 text-center">
                          Total earned last week so far
                        </p>
                      </div>
                      <div className="d-flex justify-content-around mb-3">
                        <div>
                          <p className="mb-0">Total Income</p>
                          <h5>8145</h5>
                        </div>
                        <div>
                          <p className="mb-0">Total Due</p>
                          <h5>8145</h5>
                        </div>
                      </div>
                      <div id="daily-chart"></div>
                      <div className="d-flex justify-content-center flex-column">
                        <span className="text-success text-center fs-12 mb-4">
                          Performance is 30% better last month
                        </span>
                        <a
                          href="provider-earnings.html"
                          className="btn btn-dark"
                        >
                          View All Earnings
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-xxl-4 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h6>Top Services</h6>
                      <a href="service-details.html" className="btn border">
                        View All
                      </a>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex">
                        <a
                          href="service-details.html"
                          className="avatar avatar-lg me-2"
                        >
                          <img
                            src="assets/img/services/service-56.jpg"
                            className="rounded-circle"
                            alt="Img"
                          />
                        </a>
                        <div>
                          <a
                            href="service-details.html"
                            className="fw-medium mb-0"
                          >
                            Installation Box
                          </a>
                          <div className="fs-12 d-flex align-items-center gap-2">
                            <span className="pe-2 border-end">
                              300 Bookings
                            </span>
                            <span className="pe-2 border-end">$400K</span>
                            <span>
                              <i className="ti ti-star-filled text-warning me-1 me-1"></i>
                              4.9
                            </span>
                          </div>
                        </div>
                      </div>
                      <a href="service-details.html">
                        <i className="ti ti-chevron-right"></i>
                      </a>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex">
                        <a
                          href="service-details.html"
                          className="avatar avatar-lg me-2"
                        >
                          <img
                            src="assets/img/services/service-57.jpg"
                            className="rounded-circle"
                            alt="Img"
                          />
                        </a>
                        <div>
                          <a
                            href="service-details.html"
                            className="fw-medium mb-0"
                          >
                            Plumbing Services
                          </a>
                          <div className="fs-12 d-flex align-items-center gap-2">
                            <span className="pe-2 border-end">
                              287 Bookings
                            </span>
                            <span className="pe-2 border-end">$320K</span>
                            <span>
                              <i className="ti ti-star-filled text-warning me-1"></i>
                              4.9
                            </span>
                          </div>
                        </div>
                      </div>
                      <a href="service-details.html">
                        <i className="ti ti-chevron-right"></i>
                      </a>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex">
                        <a
                          href="service-details.html"
                          className="avatar avatar-lg me-2"
                        >
                          <img
                            src="assets/img/services/service-58.jpg"
                            className="rounded-circle"
                            alt="Img"
                          />
                        </a>
                        <div>
                          <a
                            href="service-details.html"
                            className="fw-medium mb-0"
                          >
                            House Renovation
                          </a>
                          <div className="fs-12 d-flex align-items-center gap-2">
                            <span className="pe-2 border-end">
                              250 Bookings
                            </span>
                            <span className="pe-2 border-end">$300K</span>
                            <span>
                              <i className="ti ti-star-filled text-warning me-1"></i>
                              4.9
                            </span>
                          </div>
                        </div>
                      </div>
                      <a href="service-details.html">
                        <i className="ti ti-chevron-right"></i>
                      </a>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex">
                        <a
                          href="service-details.html"
                          className="avatar avatar-lg me-2"
                        >
                          <img
                            src="assets/img/services/service-59.jpg"
                            className="rounded-circle"
                            alt="Img"
                          />
                        </a>
                        <div>
                          <a
                            href="service-details.html"
                            className="fw-medium mb-0"
                          >
                            Painting Services
                          </a>
                          <div className="fs-12 d-flex align-items-center gap-2">
                            <span className="pe-2 border-end">
                              214 Bookings
                            </span>
                            <span className="pe-2 border-end">$280K</span>
                            <span>
                              <i className="ti ti-star-filled text-warning me-1"></i>
                              4.9
                            </span>
                          </div>
                        </div>
                      </div>
                      <a href="service-details.html">
                        <i className="ti ti-chevron-right"></i>
                      </a>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex">
                        <a
                          href="service-details.html"
                          className="avatar avatar-lg me-2"
                        >
                          <img
                            src="assets/img/services/service-60.jpg"
                            className="rounded-circle"
                            alt="Img"
                          />
                        </a>
                        <div>
                          <a
                            href="service-details.html"
                            className="fw-medium mb-0"
                          >
                            Power restoration
                          </a>
                          <div className="fs-12 d-flex align-items-center gap-2">
                            <span className="pe-2 border-end">
                              115 Bookings
                            </span>
                            <span className="pe-2 border-end">$210K</span>
                            <span>
                              <i className="ti ti-star-filled text-warning me-1"></i>
                              4.9
                            </span>
                          </div>
                        </div>
                      </div>
                      <a href="service-details.html">
                        <i className="ti ti-chevron-right"></i>
                      </a>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex">
                        <a
                          href="service-details.html"
                          className="avatar avatar-lg me-2"
                        >
                          <img
                            src="assets/img/services/service-61.jpg"
                            className="rounded-circle"
                            alt="Img"
                          />
                        </a>
                        <div>
                          <a
                            href="service-details.html"
                            className="fw-medium mb-0"
                          >
                            Mosaic Cleaning Service
                          </a>
                          <div className="fs-12 d-flex align-items-center gap-2">
                            <span className="pe-2 border-end">
                              102 Bookings
                            </span>
                            <span className="pe-2 border-end">$190K</span>
                            <span>
                              <i className="ti ti-star-filled text-warning me-1"></i>
                              4.9
                            </span>
                          </div>
                        </div>
                      </div>
                      <a href="service-details.html">
                        <i className="ti ti-chevron-right"></i>
                      </a>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex">
                        <a
                          href="service-details.html"
                          className="avatar avatar-lg me-2"
                        >
                          <img
                            src="assets/img/services/service-62.jpg"
                            className="rounded-circle"
                            alt="Img"
                          />
                        </a>
                        <div>
                          <a
                            href="service-details.html"
                            className="fw-medium mb-0"
                          >
                            Light Installation
                          </a>
                          <div className="fs-12 d-flex align-items-center gap-2">
                            <span className="pe-2 border-end">
                              102 Bookings
                            </span>
                            <span className="pe-2 border-end">$190K</span>
                            <span>
                              <i className="ti ti-star-filled text-warning me-1"></i>
                              4.9
                            </span>
                          </div>
                        </div>
                      </div>
                      <a href="service-details.html">
                        <i className="ti ti-chevron-right"></i>
                      </a>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-0">
                      <div className="d-flex">
                        <a
                          href="service-details.html"
                          className="avatar avatar-lg me-2"
                        >
                          <img
                            src="assets/img/services/service-63.jpg"
                            className="rounded-circle"
                            alt="Img"
                          />
                        </a>
                        <div>
                          <a
                            href="service-details.html"
                            className="fw-medium mb-0"
                          >
                            Cieling Fan Change
                          </a>
                          <div className="fs-12 d-flex align-items-center gap-2">
                            <span className="pe-2 border-end">
                              102 Bookings
                            </span>
                            <span className="pe-2 border-end">$190K</span>
                            <span>
                              <i className="ti ti-star-filled text-warning me-1"></i>
                              4.9
                            </span>
                          </div>
                        </div>
                      </div>
                      <a href="service-details.html">
                        <i className="ti ti-chevron-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h6>Bookings</h6>
                      <a href="javascript:void(0);" className="btn border">
                        View All
                      </a>
                    </div>
                    <div id="datetimepickershow"></div>
                    <div className="book-crd">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                            <div className="d-flex align-items-center">
                              <a
                                href="booking-details.html"
                                className="avatar avatar-lg flex-shrink-0 me-2"
                              >
                                <img
                                  src="assets/img/services/service-63.jpg"
                                  className="rounded-circle"
                                  alt="Img"
                                />
                              </a>
                              <div>
                                <a
                                  href="booking-details.html"
                                  className="fw-medium"
                                >
                                  Plan & Design
                                </a>
                                <span className="d-block fs-12">
                                  <i className="ti ti-clock me-1"></i>05:30 PM -
                                  06:00 PM
                                </span>
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                              <a
                                href="booking-details.html"
                                className="avatar avatar-sm me-2"
                              >
                                <img
                                  src="assets/img/user/user-01.jpg"
                                  className="rounded-circle"
                                  alt="user"
                                />
                              </a>
                              <a href="booking-details.html">
                                <i className="ti ti-chevron-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="book-crd">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                            <div className="d-flex">
                              <a
                                href="booking-details.html"
                                className="avatar avatar-lg flex-shrink-0 me-2"
                              >
                                <img
                                  src="assets/img/services/service-56.jpg"
                                  className="rounded-circle"
                                  alt="Img"
                                />
                              </a>
                              <div>
                                <a
                                  href="booking-details.html"
                                  className="fw-medium"
                                >
                                  Installation & Maintenance
                                </a>
                                <span className="fs-12 d-block">
                                  <i className="ti ti-clock"></i>04:30 PM -
                                  05:00 PM
                                </span>
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                              <a
                                href="javascript:void(0);"
                                className="avatar avatar-sm me-2"
                              >
                                <img
                                  src="assets/img/user/user-01.jpg"
                                  className="rounded-circle"
                                  alt="user"
                                />
                              </a>
                              <a href="booking-details.html">
                                <i className="ti ti-chevron-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="book-crd">
                      <div className="card mb-0">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                            <div className="d-flex align-items-center">
                              <a
                                href="booking-details.html"
                                className="avatar avatar-lg flex-shrink-0 me-2"
                              >
                                <img
                                  src="assets/img/services/service-63.jpg"
                                  className="rounded-circle"
                                  alt="Img"
                                />
                              </a>
                              <div>
                                <a
                                  href="booking-details.html"
                                  className="fw-medium"
                                >
                                  Plan & Design
                                </a>
                                <span className="d-block fs-12">
                                  <i className="ti ti-clock me-1"></i>05:30 PM -
                                  06:00 PM
                                </span>
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                              <a
                                href="booking-details.html"
                                className="avatar avatar-sm me-2"
                              >
                                <img
                                  src="assets/img/user/user-01.jpg"
                                  className="rounded-circle"
                                  alt="user"
                                />
                              </a>
                              <a href="booking-details.html">
                                <i className="ti ti-chevron-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <h6 className="mb-4">Top Locations</h6>
                    <div id="deals-chart"></div>
                    <div>
                      <p>Top Locations & Users</p>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex">
                          <span className="avatar avatar-lg me-2">
                            <img
                              src="assets/img/icons/flag-01.svg"
                              className="rounded-circle "
                              alt="flag"
                            />
                          </span>
                          <div>
                            <p className="text-dark fw-medium mb-0">
                              Saudi Arabia
                            </p>
                            <span className="fs-12">California</span>
                          </div>
                        </div>
                        <span className="badge badge-info">
                          <i className="ti ti-point-filled"></i>
                          300 Bookings
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex">
                          <span className="avatar avatar-lg me-2">
                            <img
                              src="assets/img/icons/flag-02.svg"
                              className="rounded-circle "
                              alt="flag"
                            />
                          </span>
                          <div>
                            <p className="text-dark fw-medium mb-0">Honkong</p>
                            <span className="fs-12">California</span>
                          </div>
                        </div>
                        <span className="badge badge-info">
                          <i className="ti ti-point-filled"></i>
                          300 Bookings
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-0">
                        <div className="d-flex">
                          <span className="avatar avatar-lg me-2">
                            <img
                              src="assets/img/icons/flag-03.svg"
                              className="rounded-circle "
                              alt="flag"
                            />
                          </span>
                          <div>
                            <p className="text-dark fw-medium mb-0">Germany</p>
                            <span className="fs-12">California</span>
                          </div>
                        </div>
                        <span className="badge badge-info">
                          <i className="ti ti-point-filled"></i>
                          300 Bookings
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h6>Latest Reviews</h6>
                      <a href="provider-reviews.html" className="btn border">
                        View All
                      </a>
                    </div>
                    <div className=" border-bottom pb-3 mb-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                        <div className="d-flex">
                          <a
                            href="javascript:void(0);"
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <img
                              src="assets/img/profiles/avatar-01.jpg"
                              className="rounded-circle"
                              alt="Img"
                            />
                          </a>
                          <div>
                            <a
                              href="provider-reviews.html"
                              className="fw-medium"
                            >
                              Maude Rossi
                            </a>
                            <div className="d-flex align-items-center">
                              <p className="fs-12 mb-0 pe-2 border-end">
                                For{" "}
                                <span className="text-info">
                                  Plumbing installation
                                </span>
                              </p>
                              <span className="avatar avatar-sm mx-2">
                                <img
                                  src="assets/img/user/user-03.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="user"
                                />
                              </span>
                              <span className="fs-12">rebecca</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex">
                          <span className="text-warning fs-10 me-1">
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                          </span>
                          <span className="fs-12">4.9</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-bottom pb-3 mb-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                        <div className="d-flex">
                          <a
                            href="javascript:void(0);"
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <img
                              src="assets/img/profiles/avatar-02.jpg"
                              className="rounded-circle"
                              alt="Img"
                            />
                          </a>
                          <div>
                            <a
                              href="provider-reviews.html"
                              className="fw-medium"
                            >
                              Livengood
                            </a>
                            <div className="d-flex align-items-center">
                              <p className="fs-12 mb-0 pe-2 border-end">
                                For{" "}
                                <span className="text-info">
                                  {" "}
                                  Plumbing Repairs
                                </span>
                              </p>
                              <span className="avatar avatar-sm mx-2">
                                <img
                                  src="assets/img/user/user-04.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="user"
                                />
                              </span>
                              <span className="fs-12">Adrian</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex">
                          <span className="text-warning fs-10 me-1">
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                          </span>
                          <span className="fs-12">4.9</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-bottom pb-3 mb-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                        <div className="d-flex">
                          <a
                            href="javascript:void(0);"
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <img
                              src="assets/img/profiles/avatar-03.jpg"
                              className="rounded-circle"
                              alt="Img"
                            />
                          </a>
                          <div>
                            <a
                              href="provider-reviews.html"
                              className="fw-medium"
                            >
                              Karl Brown
                            </a>
                            <div className="d-flex align-items-center">
                              <p className="fs-12 mb-0 pe-2 border-end">
                                For{" "}
                                <span className="text-info">
                                  {" "}
                                  Construction Worker
                                </span>
                              </p>
                              <span className="avatar avatar-sm mx-2">
                                <img
                                  src="assets/img/user/user-05.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="user"
                                />
                              </span>
                              <span className="fs-12">Andreson</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex">
                          <span className="text-warning fs-10 me-1">
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                          </span>
                          <span className="fs-12">4.9</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-bottom pb-3 mb-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                        <div className="d-flex">
                          <a
                            href="javascript:void(0);"
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <img
                              src="assets/img/profiles/avatar-03.jpg"
                              className="rounded-circle"
                              alt="Img"
                            />
                          </a>
                          <div>
                            <a
                              href="provider-reviews.html"
                              className="fw-medium"
                            >
                              Jerry Curran
                            </a>
                            <div className="d-flex align-items-center">
                              <p className="fs-12 mb-0 pe-2 border-end">
                                For{" "}
                                <span className="text-info">
                                  {" "}
                                  Makeup Artists
                                </span>
                              </p>
                              <span className="avatar avatar-sm mx-2">
                                <img
                                  src="assets/img/user/user-06.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="user"
                                />
                              </span>
                              <span className="fs-12">Pique</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex">
                          <span className="text-warning fs-10 me-1">
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                          </span>
                          <span className="fs-12">4.9</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-bottom pb-3 mb-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                        <div className="d-flex">
                          <a
                            href="javascript:void(0);"
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <img
                              src="assets/img/profiles/avatar-02.jpg"
                              className="rounded-circle"
                              alt="Img"
                            />
                          </a>
                          <div>
                            <a
                              href="provider-reviews.html"
                              className="fw-medium"
                            >
                              Livengood
                            </a>
                            <div className="d-flex align-items-center">
                              <p className="fs-12 mb-0 pe-2 border-end">
                                For{" "}
                                <span className="text-info">
                                  {" "}
                                  Plumbing Repairs
                                </span>
                              </p>
                              <span className="avatar avatar-sm mx-2">
                                <img
                                  src="assets/img/user/user-04.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="user"
                                />
                              </span>
                              <span className="fs-12">Adrian</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex">
                          <span className="text-warning fs-10 me-1">
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                          </span>
                          <span className="fs-12">4.9</span>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                        <div className="d-flex">
                          <a
                            href="javascript:void(0);"
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <img
                              src="assets/img/profiles/avatar-03.jpg"
                              className="rounded-circle"
                              alt="Img"
                            />
                          </a>
                          <div>
                            <a
                              href="provider-reviews.html"
                              className="fw-medium"
                            >
                              Karl Brown
                            </a>
                            <div className="d-flex align-items-center">
                              <p className="fs-12 mb-0 pe-2 border-end">
                                For{" "}
                                <span className="text-info">
                                  {" "}
                                  Construction Worker
                                </span>
                              </p>
                              <span className="avatar avatar-sm mx-2">
                                <img
                                  src="assets/img/user/user-05.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="user"
                                />
                              </span>
                              <span className="fs-12">Andreson</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex">
                          <span className="text-warning fs-10 me-1">
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                            <i className="ti ti-star-filled filled"></i>
                          </span>
                          <span className="fs-12">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-4">
                      <h6>Highly Rated Staffs</h6>
                      <a
                        href="javascript:void(0);"
                        className="btn border"
                        data-bs-toggle="modal"
                        data-bs-target="#add-staff"
                      >
                        Add New Staff
                      </a>
                    </div>
                    <div className="d-flex justify-content-between align-items-center border-bottom flex-wrap row-gap-2 pb-3 mb-3">
                      <div className="d-flex">
                        <a
                          href="staff-details.html"
                          className="avatar avatar-lg me-2"
                        >
                          <img
                            src="assets/img/profiles/avatar-20.jpg"
                            className="rounded-circle"
                            alt="Img"
                          />
                        </a>
                        <div>
                          <a href="staff-details.html" className="fw-medium">
                            Maude Rossi
                          </a>
                          <div className="fs-12 d-flex align-items-center gap-2">
                            <span className="pe-2 border-end">Plumber</span>
                            <span>
                              <i className="ti ti-star-filled text-warning me-1"></i>
                              4.9
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="badge badge-info">
                        <i className="ti ti-point-filled"></i>
                        300 Bookings
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center border-bottom flex-wrap row-gap-2 pb-3 mb-3">
                      <div className="d-flex">
                        <a
                          href="staff-details.html"
                          className="avatar avatar-lg me-2"
                        >
                          <img
                            src="assets/img/profiles/avatar-21.jpg"
                            className="rounded-circle"
                            alt="Img"
                          />
                        </a>
                        <div>
                          <a href="staff-details.html" className="fw-medium">
                            Floyd Andrian
                          </a>
                          <div className="fs-12 d-flex align-items-center gap-2">
                            <span className="pe-2 border-end">Electrician</span>
                            <span>
                              <i className="ti ti-star-filled text-warning me-1"></i>
                              4.9
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="badge badge-info">
                        <i className="ti ti-point-filled"></i>
                        158 Bookings
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center border-bottom flex-wrap row-gap-2 pb-3 mb-3">
                      <div className="d-flex">
                        <a
                          href="staff-details.html"
                          className="avatar avatar-lg me-2"
                        >
                          <img
                            src="assets/img/profiles/avatar-22.jpg"
                            className="rounded-circle"
                            alt="Img"
                          />
                        </a>
                        <div>
                          <a href="staff-details.html" className="fw-medium">
                            Michael Ruiz
                          </a>
                          <div className="fs-12 d-flex align-items-center gap-2">
                            <span className="pe-2 border-end">Painter</span>
                            <span>
                              <i className="ti ti-star-filled text-warning me-1"></i>
                              4.9
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="badge badge-info">
                        <i className="ti ti-point-filled"></i>
                        157 Bookings
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center border-bottom flex-wrap row-gap-2 pb-3 mb-3">
                      <div className="d-flex">
                        <a
                          href="staff-details.html"
                          className="avatar avatar-lg me-2"
                        >
                          <img
                            src="assets/img/profiles/avatar-23.jpg"
                            className="rounded-circle"
                            alt="Img"
                          />
                        </a>
                        <div>
                          <a href="staff-details.html" className="fw-medium">
                            Glenn Lewis
                          </a>
                          <div className="fs-12 d-flex align-items-center gap-2">
                            <span className="pe-2 border-end">Electrician</span>
                            <span>
                              <i className="ti ti-star-filled text-warning me-1"></i>
                              4.9
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="badge badge-info">
                        <i className="ti ti-point-filled"></i>
                        156 Bookings
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center border-bottom flex-wrap row-gap-2 pb-3 mb-3">
                      <div className="d-flex">
                        <a
                          href="staff-details.html"
                          className="avatar avatar-lg me-2"
                        >
                          <img
                            src="assets/img/profiles/avatar-24.jpg"
                            className="rounded-circle"
                            alt="Img"
                          />
                        </a>
                        <div>
                          <a href="staff-details.html" className="fw-medium">
                            Kimberly Meissner
                          </a>
                          <div className="fs-12 d-flex align-items-center gap-2">
                            <span className="pe-2 border-end">Electrician</span>
                            <span>
                              <i className="ti ti-star-filled text-warning me-1"></i>
                              4.9
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="badge badge-info">
                        <i className="ti ti-point-filled"></i>
                        120 Bookings
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                      <div className="d-flex">
                        <a
                          href="staff-details.html"
                          className="avatar avatar-lg me-2"
                        >
                          <img
                            src="assets/img/profiles/avatar-25.jpg"
                            className="rounded-circle"
                            alt="Img"
                          />
                        </a>
                        <div>
                          <a href="staff-details.html" className="fw-medium">
                            Lisa Jackson
                          </a>
                          <div className="fs-12 d-flex align-items-center gap-2">
                            <span className="pe-2 border-end">Electrician</span>
                            <span>
                              <i className="ti ti-star-filled text-warning me-1"></i>
                              4.9
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="badge badge-info">
                        <i className="ti ti-point-filled"></i>
                        120 Bookings
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade custom-modal" id="add-staff">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content doctor-profile">
              <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                <h5 className="modal-title">Add Staff </h5>
                <a
                  href="javascript:void(0);"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-circle-x-filled fs-20"></i>
                </a>
              </div>
              <div className="modal-body pb-0">
                <form action="">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <div className="d-flex profile-upload align-items-center">
                          <span className="d-flex justify-content-center align-items-center p-4 bg-light rounded me-2">
                            <i className="ti ti-photo"></i>
                          </span>
                          <div>
                            <h6 className="fs-16">Profile</h6>
                            <span className="fs-14">
                              Image size does not exceed 5MB
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control pass-input"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control pass-input"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="number"
                          className="form-control pass-input"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control pass-input"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Country</label>
                        <select className="select">
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">State</label>
                        <select className="select">
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">City</label>
                        <select className="select">
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Zip Code</label>
                        <input
                          type="text"
                          className="form-control pass-input"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" rows="3"></textarea>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Services</label>
                        <select className="select">
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select className="select">
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <div className="d-flex justify-content-end align-items-center">
                  <a
                    href="javascript:void(0);"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </a>
                  <button className="btn btn-dark" type="submit">
                    Submit
                  </button>
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
                  href="javascript:void(0);"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-circle-x-filled fs-20"></i>
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
                        type="password"
                        className="form-control pass-input"
                        placeholder="*************"
                      />
                      <span className="toggle-password feather-eye-off"></span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <a
                    href="javascript:void(0);"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </a>
                  <button type="submit" className="btn btn-dark">
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
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>

      <script
        src="assets/js/jquery.slimscroll.min.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>

      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>

      <script
        src="assets/js/wow.min.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>

      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>

      <script
        src="assets/plugins/owlcarousel/owl.carousel.min.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>

      <script
        src="assets/js/cursor.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>

      <script
        src="assets/js/moment.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>
      <script
        src="assets/js/bootstrap-datetimepicker.min.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>

      <script
        src="assets/plugins/countup/jquery.counterup.min.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>
      <script
        src="assets/plugins/countup/jquery.waypoints.min.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      >
        {" "}
      </script>

      <script
        src="assets/plugins/apexchart/apexcharts.min.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>
      <script
        src="assets/plugins/apexchart/chart-data.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>

      <script
        src="assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>

      <script
        src="assets/plugins/simple-calendar/jquery.simple-calendar.min.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>
      <script
        src="assets/js/calender.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>

      <script
        src="assets/js/script.js"
        type="f0cd06241f610eaf60e08a60-text/javascript"
      ></script>
      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="f0cd06241f610eaf60e08a60-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e4e42e9f38577","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default Provider_dashboard;
