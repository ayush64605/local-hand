import React from "react";
import { Link, useLocation } from "react-router-dom";

function Provider_sidebar() {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li
              className={`${
                location.pathname === "/provider-dashboard" ? "active" : ""
              }`}
            >
              <a href="/provider-dashboard">
                <i className="ti ti-layout-grid"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li
              className={`${
                location.pathname === "/provider-services" ? "active" : ""
              }`}
            >
              <a href="/provider-services">
                <i className="ti ti-briefcase"></i>
                <span>My Services</span>
              </a>
            </li>
            <li
              className={`${
                location.pathname === "/provider-booking" ? "active" : ""
              }`}
            >
              <a href="/provider-booking">
                <i className="ti ti-calendar-month"></i>
                <span>Bookings </span>
              </a>
            </li>
            <li
              className={`${
                location.pathname === "/provider-customer-list" ? "active" : ""
              }`}
            >
              <a href="/provider-customer-list">
                <i className="ti ti-user"></i>
                <span>Customers</span>
              </a>
            </li>
            <li
              className={`${
                location.pathname === "/provider-payout" ? "active" : ""
              }`}
            >
              <a href="/provider-payout">
                <i className="ti ti-wallet"></i>
                <span>Payout</span>
              </a>
            </li>
            <li
              className={`${
                location.pathname === "/provider-holiday" ? "active" : ""
              }`}
            >
              <a href="/provider-holiday">
                <i className="feather-calendar"></i>
                <span>Holidays & Leave</span>
              </a>
            </li>
            <li
              className={`${
                location.pathname === "/provider-coupons" ? "active" : ""
              }`}
            >
              <a href="/provider-coupons">
                <i className="ti ti-ticket"></i>
                <span>Coupons</span>
              </a>
            </li>
            <li
              className={`${
                location.pathname === "/provider-offers" ? "active" : ""
              }`}
            >
              <a href="/provider-offers">
                <i className="ti ti-square-percentage"></i>
                <span>Offers</span>
              </a>
            </li>
            <li
              className={`${
                location.pathname === "/provider-review" ? "active" : ""
              }`}
            >
              <a href="/provider-review">
                <i className="ti ti-star"></i>
                <span>Reviews</span>
              </a>
            </li>
            <li
              className={`${
                location.pathname === "/provider-enquiry" ? "active" : ""
              }`}
            >
              <a href="/provider-enquiry">
                <i className="ti ti-mail"></i>
                <span>Enquiries</span>
              </a>
            </li>
            <li
              className={`${
                location.pathname === "/provider-earnings" ? "active" : ""
              }`}
            >
              <a href="/provider-earnings">
                <i className="ti ti-cash-banknote"></i>
                <span>Earnings</span>
              </a>
            </li>

            <li
              className={`submenu ${
                location.pathname === "/provider-account-settings"
                  ? "active"
                  : ""
              }`}
            >
              <a href="javascript:void(0);">
                <i className="ti ti-settings"></i>
                <span>Settings</span>
                <span className="menu-arrow"></span>
              </a>
              <ul>
                <li>
                  <a href="/provider-accounts-settings">
                    <i className="ti ti-chevrons-right me-2"></i>Account
                  </a>
                </li>
                <li>
                  <a href="/provider-social-profile">
                    <i className="ti ti-chevrons-right me-2"></i>Social Profiles
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#del-account"
                  >
                    <i className="ti ti-chevrons-right me-2"></i>Delete Account
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                onClick={() => {
                  sessionStorage.clear();
                  window.location.href = "/"; // Redirect to home page
                }}
              >
                <i className="ti ti-logout-2"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Provider_sidebar;
