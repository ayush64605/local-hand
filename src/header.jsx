import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [profileImage, setprofileImage] = useState(null);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const role = sessionStorage.getItem("userRole");
    const profileImage = sessionStorage.getItem("profileImage");
    console.log(profileImage)
    setprofileImage(profileImage)
    setIsLoggedIn(loggedIn);
    setUserRole(role);
  }, []);

  return (
    <header className="header header-new">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="navbar-header">
          <a id="mobile_btn" href="javascript:void(0);">
						<span className="bar-icon">
							<span></span>
							<span></span>
							<span></span>
						</span>
					</a>
            <a href="/" className="navbar-brand logo">
              <img
                src="/assets/img/logo.png"
                className="img-fluid"
                alt="Logo"
              />
            </a>
          </div>
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <a href="/" className="menu-logo">
                <img
                  src="/assets/img/logo.png"
                  className="img-fluid"
                  alt="Logo"
                />
              </a>
              <a id="menu_close" className="menu-close" href="#">
                <i className="fas fa-times"></i>
              </a>
            </div>

            <ul className="main-nav align-items-lg-center">
              <li
                className={`nav-item ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                <a className="nav-link" href="/about">
                  About Us
                </a>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/service" ? "active" : ""
                }`}
              >
                <a className="nav-link" href="/service">
                  Service
                </a>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/blog" ? "active" : ""
                }`}
              >
                <a className="nav-link" href="/blog">
                  Blog
                </a>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/contactus" ? "active" : ""
                }`}
              >
                <a className="nav-link" href="/contactus">
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#provider"
                >
                  Become a Provider
                </a>
              </li>
            </ul>
          </div>
          <ul className="nav header-navbar-rht">
            {isLoggedIn ? (
              <div className="dropdown">
                <a href="#" data-bs-toggle="dropdown">
                  <div className="booking-user d-flex align-items-center">
                    <span className="user-img">
                    <img src={profileImage} alt="user" className="rounded-circle" style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                    </span>
                  </div>
                </a>
                <ul className="dropdown-menu p-2">
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/${userRole}-dashboard`}
                    >
                      <i className="ti ti-layout-grid me-1"></i>Dashboard
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
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
            ) : (
              <ul className="nav header-navbar-rht">
                <li className="nav-item pe-1">
                  <a
                    className="nav-link btn btn-light"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#login-modal"
                  >
                    <i className="ti ti-lock me-2"></i>Sign In
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link btn btn-linear-primary"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#register-modal"
                  >
                    <i className="ti ti-user-filled me-2"></i>Join Us
                  </a>
                </li>
              </ul>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
