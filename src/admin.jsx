import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./header";
import Siderbar from "./sidebar";

function Index() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="main-wrapper">
        <Header />
        <Siderbar />
        <div className="page-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-lg-3 col-sm-6 col-12 d-flex widget-path widget-service">
                <div className="card">
                  <div className="card-body">
                    <div className="home-user">
                      <div className="home-userhead">
                        <div className="home-usercount">
                          <span>
                            <img alt="img" src="assets/img/icons/user.svg" />
                          </span>
                          <h6>User</h6>
                        </div>
                        <div className="home-useraction">
                          <a
                            aria-expanded="true"
                            className="delete-table bg-white"
                            data-bs-toggle="dropdown"
                            href="javascript:void(0);"
                          >
                            <i
                              aria-hidden="true"
                              className="fa fa-ellipsis-v"
                            />
                          </a>
                          <ul
                            className="dropdown-menu"
                            data-popper-placement="bottom-end"
                          >
                            <li>
                              <a
                                className="dropdown-item"
                                href="user-list.html"
                              >
                                {" "}
                                View
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="edit-user.html"
                              >
                                {" "}
                                Edit
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="home-usercontent">
                        <div className="home-usercontents">
                          <div className="home-usercontentcount">
                            <img
                              alt="img"
                              className="me-2"
                              src="assets/img/icons/arrow-up.svg"
                            />
                            <span className="counters" data-count="30">
                              30
                            </span>
                          </div>
                          <h5> Current Month</h5>
                        </div>
                        <div className="homegraph">
                          <img alt="img" src="assets/img/graph/graph1.png" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12 d-flex widget-path widget-service">
                <div className="card">
                  <div className="card-body">
                    <div className="home-user home-provider">
                      <div className="home-userhead">
                        <div className="home-usercount">
                          <span>
                            <img
                              alt="img"
                              src="assets/img/icons/user-circle.svg"
                            />
                          </span>
                          <h6>Providers</h6>
                        </div>
                        <div className="home-useraction">
                          <a
                            aria-expanded="true"
                            className="delete-table bg-white"
                            data-bs-toggle="dropdown"
                            href="javascript:void(0);"
                          >
                            <i
                              aria-hidden="true"
                              className="fa fa-ellipsis-v"
                            />
                          </a>
                          <ul
                            className="dropdown-menu"
                            data-popper-placement="bottom-end"
                          >
                            <li>
                              <a
                                className="dropdown-item"
                                href="providers.html"
                              >
                                {" "}
                                View
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="edit-provider.html"
                              >
                                {" "}
                                Edit
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="home-usercontent">
                        <div className="home-usercontents">
                          <div className="home-usercontentcount">
                            <img
                              alt="img"
                              className="me-2"
                              src="assets/img/icons/arrow-up.svg"
                            />
                            <span className="counters" data-count="25">
                              25
                            </span>
                          </div>
                          <h5> Current Month</h5>
                        </div>
                        <div className="homegraph">
                          <img alt="img" src="assets/img/graph/graph2.png" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12 d-flex widget-path widget-service">
                <div className="card">
                  <div className="card-body">
                    <div className="home-user home-service">
                      <div className="home-userhead">
                        <div className="home-usercount">
                          <span>
                            <img alt="img" src="assets/img/icons/service.svg" />
                          </span>
                          <h6>Service</h6>
                        </div>
                        <div className="home-useraction">
                          <a
                            aria-expanded="true"
                            className="delete-table bg-white"
                            data-bs-toggle="dropdown"
                            href="javascript:void(0);"
                          >
                            <i
                              aria-hidden="true"
                              className="fa fa-ellipsis-v"
                            />
                          </a>
                          <ul
                            className="dropdown-menu"
                            data-popper-placement="bottom-end"
                          >
                            <li>
                              <a className="dropdown-item" href="services.html">
                                {" "}
                                View
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="edit-service.html"
                              >
                                {" "}
                                Edit
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="home-usercontent">
                        <div className="home-usercontents">
                          <div className="home-usercontentcount">
                            <img
                              alt="img"
                              className="me-2"
                              src="assets/img/icons/arrow-up.svg"
                            />
                            <span className="counters" data-count="18">
                              18
                            </span>
                          </div>
                          <h5> Current Month</h5>
                        </div>
                        <div className="homegraph">
                          <img alt="img" src="assets/img/graph/graph3.png" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12 d-flex widget-path widget-service">
                <div className="card">
                  <div className="card-body">
                    <div className="home-user home-subscription">
                      <div className="home-userhead">
                        <div className="home-usercount">
                          <span>
                            <img alt="img" src="assets/img/icons/money.svg" />
                          </span>
                          <h6>Subscription</h6>
                        </div>
                        <div className="home-useraction">
                          <a
                            aria-expanded="true"
                            className="delete-table bg-white"
                            data-bs-toggle="dropdown"
                            href="javascript:void(0);"
                          >
                            <i
                              aria-hidden="true"
                              className="fa fa-ellipsis-v"
                            />
                          </a>
                          <ul
                            className="dropdown-menu"
                            data-popper-placement="bottom-end"
                          >
                            <li>
                              <a
                                className="dropdown-item"
                                href="membership.html"
                              >
                                {" "}
                                View
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                              >
                                {" "}
                                Edit
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="home-usercontent">
                        <div className="home-usercontents">
                          <div className="home-usercontentcount">
                            <img
                              alt="img"
                              className="me-2"
                              src="assets/img/icons/arrow-up.svg"
                            />
                            <span className="counters" data-count="650">
                              650
                            </span>
                          </div>
                          <h5> Current Month</h5>
                        </div>
                        <div className="homegraph">
                          <img alt="img" src="assets/img/graph/graph4.png" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-6 col-12 d-flex  widget-path">
                <div className="card">
                  <div className="card-body">
                    <div className="home-user">
                      <div className="home-head-user">
                        <h2>Revenue</h2>
                        <div className="home-select">
                          <div className="dropdown">
                            <button
                              aria-expanded="false"
                              className="btn btn-action btn-sm dropdown-toggle"
                              data-bs-toggle="dropdown"
                              type="button"
                            >
                              Monthly
                            </button>
                            <ul
                              className="dropdown-menu"
                              data-popper-placement="bottom-end"
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Weekly
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Monthly
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Yearly
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="dropdown">
                            <a
                              aria-expanded="true"
                              className="delete-table bg-white"
                              data-bs-toggle="dropdown"
                              href="javascript:void(0);"
                            >
                              <i
                                aria-hidden="true"
                                className="fa fa-ellipsis-v"
                              />
                            </a>
                            <ul
                              className="dropdown-menu"
                              data-popper-placement="bottom-end"
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  {" "}
                                  View
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  {" "}
                                  Edit
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="chartgraph">
                        <div id="chart-view" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6 col-12 d-flex  widget-path">
                <div className="card">
                  <div className="card-body">
                    <div className="home-user">
                      <div className="home-head-user">
                        <h2>Booking Summary</h2>
                        <div className="home-select">
                          <div className="dropdown">
                            <button
                              aria-expanded="false"
                              className="btn btn-action btn-sm dropdown-toggle"
                              data-bs-toggle="dropdown"
                              type="button"
                            >
                              Monthly
                            </button>
                            <ul
                              className="dropdown-menu"
                              data-popper-placement="bottom-end"
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Weekly
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Monthly
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Yearly
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="dropdown">
                            <a
                              aria-expanded="true"
                              className="delete-table bg-white"
                              data-bs-toggle="dropdown"
                              href="javascript:void(0);"
                            >
                              <i
                                aria-hidden="true"
                                className="fa fa-ellipsis-v"
                              />
                            </a>
                            <ul
                              className="dropdown-menu"
                              data-popper-placement="bottom-end"
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  {" "}
                                  View
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  {" "}
                                  Edit
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="chartgraph">
                        <div id="chart-booking" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12 d-flex widget-path">
                <div className="card">
                  <div className="card-body">
                    <div className="home-user">
                      <div className="home-head-user home-graph-header">
                        <h2>Top Services</h2>
                        <a className="btn btn-viewall" href="services.html">
                          View All
                          <img
                            alt="img"
                            className="ms-2"
                            src="assets/img/icons/arrow-right.svg"
                          />
                        </a>
                      </div>
                      <div className="table-responsive datatable-nofooter">
                        <table className="table datatable">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Service</th>
                              <th>Category</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                <a
                                  className="table-imgname"
                                  href="view-service.html"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/services/service-03.jpg"
                                  />
                                  <span>Computer Repair</span>
                                </a>
                              </td>
                              <td>Computer</td>
                              <td>80</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>
                                <a
                                  className="table-imgname"
                                  href="view-service.html"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/services/service-02.jpg"
                                  />
                                  <span>Car Repair Services</span>
                                </a>
                              </td>
                              <td>Automobile</td>
                              <td>50</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>
                                <a
                                  className="table-imgname"
                                  href="view-service.html"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/services/service-04.jpg"
                                  />
                                  <span>Car Wash</span>
                                </a>
                              </td>
                              <td>Automobile</td>
                              <td>14</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>
                                <a
                                  className="table-imgname"
                                  href="view-service.html"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/services/service-09.jpg"
                                  />
                                  <span>House Cleaning </span>
                                </a>
                              </td>
                              <td>Cleaning</td>
                              <td>100</td>
                            </tr>
                            <tr>
                              <td>5</td>
                              <td>
                                <a
                                  className="table-imgname"
                                  href="view-service.html"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/services/service-10.jpg"
                                  />
                                  <span>Interior </span>
                                </a>
                              </td>
                              <td>Cleaning</td>
                              <td>50</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12 d-flex widget-path">
                <div className="card">
                  <div className="card-body">
                    <div className="home-user">
                      <div className="home-head-user home-graph-header">
                        <h2>Top Providers</h2>
                        <a className="btn btn-viewall" href="providers.html">
                          View All
                          <img
                            alt="img"
                            className="ms-2"
                            src="assets/img/icons/arrow-right.svg"
                          />
                        </a>
                      </div>
                      <div className="table-responsive datatable-nofooter">
                        <table className="table datatable ">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Provider Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-06.jpg"
                                  />
                                  <span>Robert</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="__cf_email__"
                                  data-cfemail="dfadb0bdbaadab9fbaa7beb2afb3baf1bcb0b2"
                                  href="
                              "
                                ></a>
                              </td>
                              <td>+1 347-679-8275</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-09.jpg"
                                  />
                                  <span>Sharonda</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="__cf_email__"
                                  data-cfemail="ff8c979e8d90919b9ebf9a879e928f939ad19c9092"
                                  href="
                              "
                                ></a>
                              </td>
                              <td>+1 570-621-248</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-01.jpg"
                                  />
                                  <span>John Smith</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="__cf_email__"
                                  data-cfemail="204a4f484e534d495448604558414d504c450e434f4d"
                                  href="
                              "
                                ></a>
                              </td>
                              <td>+1 646-957-0004</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-05.jpg"
                                  />
                                  <span>Pricilla</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="__cf_email__"
                                  data-cfemail="2151534842484d4d40614459404c514d440f424e4c"
                                  href="
                              "
                                ></a>
                              </td>
                              <td>+1 614-915-8101</td>
                            </tr>
                            <tr>
                              <td>5</td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-09.jpg"
                                  />
                                  <span>James</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="__cf_email__"
                                  data-cfemail="d1bbb0bcb4a291b4a9b0bca1bdb4ffb2bebc"
                                  href="
                              "
                                ></a>
                              </td>
                              <td>+1 918-543-3702</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 col-sm-12 d-flex widget-path">
                <div className="card">
                  <div className="card-body">
                    <div className="home-user">
                      <div className="home-head-user home-graph-header">
                        <h2>Top Countries</h2>
                        <div className="home-select">
                          <div className="dropdown">
                            <button
                              aria-expanded="false"
                              className="btn btn-action btn-sm dropdown-toggle"
                              data-bs-toggle="dropdown"
                              type="button"
                            >
                              Monthly
                            </button>
                            <ul
                              className="dropdown-menu"
                              data-popper-placement="bottom-end"
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Weekly
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Monthly
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Yearly
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="dropdown">
                            <a
                              aria-expanded="true"
                              className="delete-table bg-white"
                              data-bs-toggle="dropdown"
                              href="javascript:void(0);"
                            >
                              <i
                                aria-hidden="true"
                                className="fa fa-ellipsis-v"
                              />
                            </a>
                            <ul
                              className="dropdown-menu"
                              data-popper-placement="bottom-end"
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  {" "}
                                  View
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  {" "}
                                  Edit
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="chartgraph">
                        <div className="row align-items-center">
                          <div className="col-lg-7">
                            <div
                              id="world_map"
                              style={{
                                height: "150px",
                              }}
                            />
                          </div>
                          <div className="col-lg-5">
                            <div className="bookingmap">
                              <ul>
                                <li>
                                  <span>
                                    <img
                                      alt="img"
                                      className="me-2"
                                      src="assets/img/flags/us.png"
                                    />
                                    United State
                                  </span>
                                  <h6>60%</h6>
                                </li>
                                <li>
                                  <span>
                                    <img
                                      alt="img"
                                      className="me-2"
                                      src="assets/img/flags/in.png"
                                    />
                                    India
                                  </span>
                                  <h6>80%</h6>
                                </li>
                                <li>
                                  <span>
                                    <img
                                      alt="img"
                                      className="me-2"
                                      src="assets/img/flags/ca.png"
                                    />
                                    Canada
                                  </span>
                                  <h6>50%</h6>
                                </li>
                                <li>
                                  <span>
                                    <img
                                      alt="img"
                                      className="me-2"
                                      src="assets/img/flags/au.png"
                                    />
                                    Australia
                                  </span>
                                  <h6>75%</h6>
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
              <div className="col-lg-4 col-sm-12 d-flex widget-path">
                <div className="card">
                  <div className="card-body">
                    <div className="home-user">
                      <div className="home-head-user home-graph-header">
                        <h2>Booking Statistics</h2>
                        <a className="btn btn-viewall" href="booking.html">
                          View All
                          <img
                            alt="img"
                            className="ms-2"
                            src="assets/img/icons/arrow-right.svg"
                          />
                        </a>
                      </div>
                      <div className="chartgraph">
                        <div className="row align-items-center">
                          <div className="col-lg-7 col-sm-6">
                            <div id="chart-bar" />
                          </div>
                          <div className="col-lg-5 col-sm-6">
                            <div className="bookingstatus">
                              <ul>
                                <li>
                                  <span />
                                  <h6>Completed</h6>
                                </li>
                                <li className="process-status">
                                  <span />
                                  <h6>Process</h6>
                                </li>
                                <li className="process-pending">
                                  <span />
                                  <h6>Pending</h6>
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
            <div className="row">
              <div className="col-lg-12 widget-path">
                <div className="card mb-0">
                  <div className="card-body">
                    <div className="home-user">
                      <div className="home-head-user home-graph-header">
                        <h2>Recent Booking</h2>
                        <a className="btn btn-viewall" href="booking.html">
                          View All
                          <img
                            alt="img"
                            className="ms-2"
                            src="assets/img/icons/arrow-right.svg"
                          />
                        </a>
                      </div>
                      <div className="table-responsive datatable-nofooter">
                        <table className="table datatable">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Date</th>
                              <th>Booking Time</th>
                              <th>Provider</th>
                              <th>User</th>
                              <th>Service</th>
                              <th>Amount</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>28 Sep 2023</td>
                              <td>10:00:00 - 11:00:00</td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-01.jpg"
                                  />
                                  <span>John Smith</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-03.jpg"
                                  />
                                  <span>Sharon</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="table-imgname"
                                  href="view-service.html"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/services/service-03.jpg"
                                  />
                                  <span>Computer Repair</span>
                                </a>
                              </td>
                              <td>80</td>
                              <td>
                                <h6 className="badge-pending">Pending</h6>
                              </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>10 Sep 2023</td>
                              <td>18:00:00 - 19:00:00</td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-04.jpg"
                                  />
                                  <span>Johnny</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-05.jpg"
                                  />
                                  <span>Pricilla</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="table-imgname"
                                  href="view-service.html"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/services/service-02.jpg"
                                  />
                                  <span>Car Repair Services</span>
                                </a>
                              </td>
                              <td>50</td>
                              <td>
                                <h6 className="badge-active">Completed</h6>
                              </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>25 Sep 2023</td>
                              <td>12:00:00 - 13:00:00</td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-06.jpg"
                                  />
                                  <span>Robert</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-02.jpg"
                                  />
                                  <span>Amanda</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="table-imgname"
                                  href="view-service.html"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/services/service-04.jpg"
                                  />
                                  <span>Steam Car Wash</span>
                                </a>
                              </td>
                              <td>50</td>
                              <td>
                                <h6 className="badge-inactive">Inprogress</h6>
                              </td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>08 Sep 2023</td>
                              <td>07 Oct 2023 11:22:51</td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-09.jpg"
                                  />
                                  <span>Sharonda</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-01.jpg"
                                  />
                                  <span>James</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="table-imgname"
                                  href="view-service.html"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/services/service-09.jpg"
                                  />
                                  <span>House Cleaning </span>
                                </a>
                              </td>
                              <td>50</td>
                              <td>
                                <h6 className="badge-delete">Cancelled</h6>
                              </td>
                            </tr>
                            <tr>
                              <td>5</td>
                              <td>28 Sep 2023</td>
                              <td>10:00:00 - 11:00:00</td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-01.jpg"
                                  />
                                  <span>John Smith</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/customer/user-03.jpg"
                                  />
                                  <span>Sharon</span>
                                </a>
                              </td>
                              <td>
                                <a
                                  className="table-imgname"
                                  href="view-service.html"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src="assets/img/services/service-03.jpg"
                                  />
                                  <span>Computer Repair</span>
                                </a>
                              </td>
                              <td>80</td>
                              <td>
                                <h6 className="badge-pending">Pending</h6>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
  );
}

export default Index;
