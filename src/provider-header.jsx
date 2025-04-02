import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";

function Provider_header() {
  const [count, setCount] = useState(0);
  const [profileImage, setprofileImage] = useState(null);

  useEffect(() => {
    const profileImage = sessionStorage.getItem("profileImage");
    console.log(profileImage);
    setprofileImage(profileImage);
  }, []);

  return (
    <div className="header provider-header">
      <div className="header-left active">
        <a href="index.html" className="logo logo-normal">
          <img src="assets/img/logo.png" alt="Logo" />
        </a>
        <a href="index.html" className="logo-small">
          <img src="assets/img/fav-icon.png" alt="Logo" />
        </a>
        <a id="toggle_btn" href="javascript:void(0);">
          <i className="ti ti-menu-deep"></i>
        </a>
      </div>

      <a id="mobile_btn" className="mobile_btn" href="#sidebar">
        <span className="bar-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </a>

      <div className="header-user">
        <div className="nav user-menu">
          <div className="nav-item nav-search-inputs">
            <div className="top-nav-search">
              <a href="javascript:void(0);" className="responsive-search">
                <i className="fa fa-search"></i>
              </a>
              <form action="#" className="dropdown">
                <div className="searchinputs" id="dropdownMenuClickable">
                  <input type="text" placeholder="Search" />
                  <div className="search-addon">
                    <span>
                      <i className="feather-user"></i>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div className="me-2 site-link">
              <a
                href="javascript:void(0);"
                className="d-flex align-items-center justify-content-center me-2"
              >
                <i className="feather-globe me-1"></i>Visit Website
              </a>
            </div>
            <div className="provider-head-links">
              <div>
                <a
                  href="javascript:void(0);"
                  id="dark-mode-toggle"
                  className="dark-mode-toggle me-2"
                >
                  <i className="fa-regular fa-moon"></i>
                </a>
                <a
                  href="javascript:void(0);"
                  id="light-mode-toggle"
                  className="dark-mode-toggle me-2"
                >
                  <i className="ti ti-sun-filled"></i>
                </a>
              </div>
            </div>
            <div className="provider-head-links">
              <a
                href="javascript:void(0);"
                className="d-flex align-items-center justify-content-center me-2 dropdown-toggle notify-link"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="true"
              >
                <i className="feather-bell"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-end notification-dropdown p-3">
                <div className="d-flex dropdown-body align-items-center justify-content-between border-bottom p-0 pb-3 mb-3">
                  <h6 className="notification-title">
                    Notifications <span className="fs-16 text-gray"> (2)</span>
                  </h6>
                  <div className="d-flex align-items-center">
                    <a href="#" className="text-primary fs-15 me-3 lh-1">
                      Mark all as read
                    </a>
                    <div className="dropdown">
                      <a
                        href="javascript:void(0);"
                        className="bg-white dropdown-toggle"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                      >
                        <i className="ti ti-calendar-due me-1"></i>Today
                      </a>
                      <ul className="dropdown-menu mt-2 p-3">
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item rounded-1"
                          >
                            This Week
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item rounded-1"
                          >
                            Last Week
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item rounded-1"
                          >
                            Last Week
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="noti-content">
                  <div className="d-flex flex-column">
                    <div className="border-bottom mb-3 pb-3">
                      <a href="notification.html">
                        <div className="d-flex">
                          <span className="avatar avatar-lg me-2 flex-shrink-0">
                            <img
                              src="assets/img/profiles/avatar-52.jpg"
                              alt="Profile"
                              className="rounded-circle"
                            />
                          </span>
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center">
                              <p className="mb-1 w-100">
                                <span className="text-dark fw-semibold">
                                  Stephan Peralt
                                </span>{" "}
                                rescheduled the service to 14/01/2024.{" "}
                              </p>
                              <span className="d-flex justify-content-end ">
                                {" "}
                                <i className="ti ti-point-filled text-primary"></i>
                              </span>
                            </div>
                            <span>Just Now</span>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="border-bottom mb-3 pb-3">
                      <a href="notification.html" className="pb-0">
                        <div className="d-flex">
                          <span className="avatar avatar-lg me-2 flex-shrink-0">
                            <img
                              src="assets/img/profiles/avatar-36.jpg"
                              alt="Profile"
                              className="rounded-circle"
                            />
                          </span>
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center">
                              <p className="mb-1 w-100">
                                <span className="text-dark fw-semibold">
                                  Harvey Smith
                                </span>{" "}
                                has requested your service.
                              </p>
                              <span className="d-flex justify-content-end ">
                                {" "}
                                <i className="ti ti-point-filled text-primary"></i>
                              </span>
                            </div>
                            <span>5 mins ago</span>
                            <div className="d-flex justify-content-start align-items-center mt-2">
                              <span className="btn btn-light btn-sm me-2">
                                Deny
                              </span>
                              <span className="btn btn-dark btn-sm">
                                Accept
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="border-bottom mb-3 pb-3">
                      <a href="notification.html">
                        <div className="d-flex">
                          <span className="avatar avatar-lg me-2 flex-shrink-0">
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="rounded-circle"
                            />
                          </span>
                          <div className="flex-grow-1">
                            <p className="mb-1">
                              <span className="text-dark fw-semibold">
                                {" "}
                                Anthony Lewis
                              </span>{" "}
                              has left feedback for your recent service{" "}
                            </p>
                            <span>10 mins ago</span>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="border-0 mb-3 pb-0">
                      <a href="notification.html">
                        <div className="d-flex">
                          <span className="avatar avatar-lg me-2 flex-shrink-0">
                            <img
                              src="assets/img/profiles/avatar-22.jpg"
                              alt="Profile"
                              className="rounded-circle"
                            />
                          </span>
                          <div className="flex-grow-1">
                            <p className="mb-1">
                              <span className="text-dark fw-semibold">
                                Brian Villaloboshas{" "}
                              </span>{" "}
                              cancelled the service scheduled for 14/01/2024.
                            </p>
                            <span>15 mins ago</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="d-flex p-0 notification-footer-btn">
                  <a href="#" className="btn btn-light rounded  me-2">
                    Cancel
                  </a>
                  <a href="#" className="btn btn-dark rounded ">
                    View All
                  </a>
                </div>
              </div>
            </div>
            <div className="provider-head-links">
              <a
                href="javascript:void(0);"
                className="d-flex align-items-center justify-content-center me-2"
              >
                <i className="feather-maximize"></i>
              </a>
            </div>
            <div className="dropdown">
              <a href="javascript:void(0);" data-bs-toggle="dropdown">
                <div className="booking-user d-flex align-items-center">
                  <span className="user-img">
                    <img src={profileImage} alt="user" />
                  </span>
                </div>
              </a>
              <ul className="dropdown-menu p-2">
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    onClick={() => {
                      sessionStorage.clear();
                      window.location.href = "/"; // Redirect to home page
                    }}
                  >
                    <i className="ti ti-logout me-1"></i>Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="dropdown mobile-user-menu">
        <a
          href="javascript:void(0);"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-end">
          <a className="dropdown-item" href="profile.html">
            My Profile
          </a>
          <a className="dropdown-item" href="profile-settings.html">
            Settings
          </a>
          <a className="dropdown-item" href="login.html">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}

export default Provider_header;
