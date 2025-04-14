import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Offers() {
  const [count, setCount] = useState(0)

  return (
    <div>
  <div className="main-wrapper">
    <div className="header">
      <div className="header-left">
        <a className="logo" href="index.html">
          <img alt="Logo" height="30" src="assets/img/logo.svg" width="30" />
        </a>
        <a className=" logo-small" href="index.html">
          <img
            alt="Logo"
            height="30"
            src="assets/img/logo-small.svg"
            width="30"
          />
        </a>
      </div>
      <a className="mobile_btn" href="javascript:void(0);" id="mobile_btn">
        <i className="fas fa-align-left" />
      </a>
      <div className="header-split">
        <div className="page-headers">
          <div className="search-bar">
            <span>
              <i className="fe fe-search" />
            </span>
            <input className="form-control" placeholder="Search" type="text" />
          </div>
        </div>
        <ul className="nav user-menu">
          <li className="nav-item">
            <a className="viewsite" href="../index.html">
              <i className="fe fe-globe me-2" />
              View Site
            </a>
          </li>
          <li className="nav-item dropdown has-arrow dropdown-heads flag-nav">
            <a
              className="nav-link"
              data-bs-toggle="dropdown"
              href="javascript:void(0);"
              role="button">
              <img alt="Flag" height="20" src="assets/img/flags/us1.png" />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" href="javascript:void(0);">
                <img
                  alt="Flag"
                  className="me-2"
                  height="16"
                  src="assets/img/flags/us.png"
                />{" "}
                English
              </a>
              <a className="dropdown-item" href="javascript:void(0);">
                <img
                  alt="Flag"
                  className="me-2"
                  height="16"
                  src="assets/img/flags/fr.png"
                />{" "}
                French
              </a>
              <a className="dropdown-item" href="javascript:void(0);">
                <img
                  alt="Flag"
                  className="me-2"
                  height="16"
                  src="assets/img/flags/es.png"
                />{" "}
                Spanish
              </a>
              <a className="dropdown-item" href="javascript:void(0);">
                <img
                  alt="Flag"
                  className="me-2"
                  height="16"
                  src="assets/img/flags/de.png"
                />{" "}
                German
              </a>
            </div>
          </li>
          <li className="nav-item  has-arrow dropdown-heads ">
            <a className="toggle-switch" href="javascript:void(0);">
              <i className="fe fe-moon" />
            </a>
          </li>
          <li className="nav-item dropdown has-arrow dropdown-heads ">
            <a data-bs-toggle="dropdown" href="javascript:void(0);">
              <i className="fe fe-bell" />
            </a>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <a className="clear-noti" href="javascript:void(0)">
                  {" "}
                  Clear All{" "}
                </a>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <a href="notifications.html">
                      <div className="media d-flex">
                        <span className="avatar avatar-sm flex-shrink-0">
                          <img
                            alt="user"
                            className="avatar-img rounded-circle"
                            src="assets/img/provider/provider-01.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">
                              Thomas Herzberg have been subscribed
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              15 Sep 2020 10:20 PM
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="notifications.html">
                      <div className="media d-flex">
                        <span className="avatar avatar-sm flex-shrink-0">
                          <img
                            alt="user"
                            className="avatar-img rounded-circle"
                            src="assets/img/provider/provider-02.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">
                              Matthew Garcia have been subscribed
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              13 Sep 2020 03:56 AM
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="notifications.html">
                      <div className="media d-flex">
                        <span className="avatar avatar-sm flex-shrink-0">
                          <img
                            alt="user"
                            className="avatar-img rounded-circle"
                            src="assets/img/provider/provider-03.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">
                              Yolanda Potter have been subscribed
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              12 Sep 2020 09:25 PM
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="notifications.html">
                      <div className="media d-flex">
                        <span className="avatar avatar-sm flex-shrink-0">
                          <img
                            alt="User Image"
                            className="avatar-img rounded-circle"
                            src="assets/img/provider/provider-04.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">
                              Ricardo Flemings have been subscribed
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              11 Sep 2020 06:36 PM
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="notifications.html">
                      <div className="media d-flex">
                        <span className="avatar avatar-sm flex-shrink-0">
                          <img
                            alt="User Image"
                            className="avatar-img rounded-circle"
                            src="assets/img/provider/provider-05.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">
                              Maritza Wasson have been subscribed
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              10 Sep 2020 08:42 AM
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="notifications.html">
                      <div className="media d-flex">
                        <span className="avatar avatar-sm flex-shrink-0">
                          <img
                            alt="User Image"
                            className="avatar-img rounded-circle"
                            src="assets/img/provider/provider-06.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">
                              Marya Ruiz have been subscribed
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              9 Sep 2020 11:01 AM
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="notifications.html">
                      <div className="media d-flex">
                        <span className="avatar avatar-sm flex-shrink-0">
                          <img
                            alt="User Image"
                            className="avatar-img rounded-circle"
                            src="assets/img/provider/provider-07.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">
                              Richard Hughes have been subscribed
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              8 Sep 2020 06:23 AM
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <a href="notifications.html">View all Notifications</a>
              </div>
            </div>
          </li>
          <li className="nav-item  has-arrow dropdown-heads ">
            <a className="win-maximize" href="javascript:void(0);">
              <i className="fe fe-maximize" />
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="user-link  nav-link"
              data-bs-toggle="dropdown"
              href="javascript:void(0)">
              <span className="user-img">
                <img
                  alt="Admin"
                  className="rounded-circle"
                  src="assets/img/user.jpg"
                  width="40"
                />
                <span className="animate-circle" />
              </span>
              <span className="user-content">
                <span className="user-name">John Smith</span>
                <span className="user-details">Demo User</span>
              </span>
            </a>
            <div className="dropdown-menu menu-drop-user">
              <div className="profilemenu ">
                <div className="user-detials">
                  <a href="account.html">
                    <span className="profile-image">
                      <img
                        alt="img"
                        className="profilesidebar"
                        src="assets/img/user.jpg"
                      />
                    </span>
                    <span className="profile-content">
                      <span>John Smith</span>
                      <span>
                        <span
                          className="_cf_email_"
                          data-cfemail="d69cb9beb896b3aeb7bba6bab3f8b5b9bb">
                          [email protected]
                        </span>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="subscription-menu">
                  <ul>
                    <li>
                      <a href="account-settings.html">Profile</a>
                    </li>
                    <li>
                      <a href="localization.html">Settings</a>
                    </li>
                  </ul>
                </div>
                <div className="subscription-logout">
                  <a href="signin.html">Log Out</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <a href="index.html">
            <img
              alt="Logo"
              className="img-fluid logo"
              src="assets/img/logo.svg"
            />
          </a>
          <a href="index.html">
            <img
              alt="Logo"
              className="img-fluid logo-small"
              src="assets/img/logo-small.svg"
            />
          </a>
        </div>
        <div className="siderbar-toggle">
          <label className="switch" id="toggle_btn">
            <input type="checkbox" />
            <span className="slider round" />
          </label>
        </div>
      </div>
      <div className="sidebar-inner slimscroll">
        <div className="sidebar-menu" id="sidebar-menu">
          <ul>
            <li className="menu-title m-0">
              <h6>Home</h6>
            </li>
            <li>
              <a href="index.html">
                <i className="fe fe-grid" /> <span>Dashboard</span>
              </a>
            </li>
            <li className="menu-title">
              <h6>Services</h6>
            </li>
            <li>
              <a href="javascript:void(0);">
                <i className="fe fe-briefcase" />
                <span>Services</span>
                <span className="menu-arrow">
                  <i className="fe fe-chevron-right" />
                </span>
              </a>
              <ul>
                <li>
                  <a href="add-service.html">Add Service</a>
                </li>
                <li>
                  <a href="services.html">Services</a>
                </li>
                <li>
                  <a href="service-settings.html">Service Settings</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="categories.html">
                <i className="fe fe-file-text" />
                <span>Categories</span>
              </a>
            </li>
            <li>
              <a href="sub-categories.html">
                <i className="fe fe-clipboard" /> <span>Sub Categories</span>
              </a>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <i className="fe fe-star" />
                <span>Review</span>
                <span className="menu-arrow">
                  <i className="fe fe-chevron-right" />
                </span>
              </a>
              <ul>
                <li>
                  <a href="review-type.html">Review Type</a>
                </li>
                <li>
                  <a href="review.html">Review</a>
                </li>
              </ul>
            </li>
            <li className="menu-title">
              <h6>Booking</h6>
            </li>
            <li>
              <a href="booking.html">
                <i className="fe fe-smartphone" /> <span> Bookings</span>
              </a>
            </li>
            <li className="menu-title">
              <h6>Finance & Accounts</h6>
            </li>
            <li>
              <a href="banktransferlist.html">
                <i className="fe fe-file" />
                <span>Bank Transfer</span>
              </a>
            </li>
            <li>
              <a href="wallet.html">
                <i className="fe fe-credit-card" />
                <span>Wallet</span>
              </a>
            </li>
            <li>
              <a href="refund-request.html">
                <i className="fe fe-git-pull-request" />{" "}
                <span>Refund Request</span>
              </a>
            </li>
            <li>
              <a href="cash-on-delivery.html">
                <i className="fe fe-dollar-sign" />{" "}
                <span>Cash on Delivery</span>
              </a>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <i className="fe fe-credit-card" />
                <span>Payouts</span>
                <span className="menu-arrow">
                  <i className="fe fe-chevron-right" />
                </span>
              </a>
              <ul>
                <li>
                  <a href="payout-request.html">Payout Requests</a>
                </li>
                <li>
                  <a href="payout-settings.html">Payout Settings</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="sales-transactions.html">
                <i className="fe fe-bar-chart" />{" "}
                <span>Sales Transactions</span>
              </a>
            </li>
            <li className="menu-title">
              <h6>Others</h6>
            </li>
            <li>
              <a href="chat.html">
                <i className="fe fe-message-square" /> <span>Chat</span>
              </a>
            </li>
            <li className="menu-title">
              <h6>Content</h6>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <i className="fe fe-file" />
                <span>Pages</span>
                <span className="menu-arrow">
                  <i className="fe fe-chevron-right" />
                </span>
              </a>
              <ul>
                <li>
                  <a href="add-page.html">Add Page</a>
                </li>
                <li>
                  <a href="pages-list.html">Pages</a>
                </li>
                <li>
                  <a href="page-list.html">Pages List</a>
                </li>
              </ul>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <i className="fe fe-file-text" />
                <span>Blog</span>
                <span className="menu-arrow">
                  <i className="fe fe-chevron-right" />
                </span>
              </a>
              <ul>
                <li>
                  <a href="all-blog.html">All Blog</a>
                </li>
                <li>
                  <a href="add-blog.html">Add Blog</a>
                </li>
                <li>
                  <a href="blogs-categories.html">Categories</a>
                </li>
                <li>
                  <a href="blogs-comments.html">Blog Comments</a>
                </li>
              </ul>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <i className="fe fe-map-pin" />
                <span>Location</span>
                <span className="menu-arrow">
                  <i className="fe fe-chevron-right" />
                </span>
              </a>
              <ul>
                <li>
                  <a href="countries.html">Countries</a>
                </li>
                <li>
                  <a href="states.html">States</a>
                </li>
                <li>
                  <a href="cities.html">Cities</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="testimonials.html">
                <i className="fe fe-star" /> <span>Testimonials</span>
              </a>
            </li>
            <li>
              <a href="faq.html">
                <i className="fe fe-help-circle" /> <span>FAQ</span>
              </a>
            </li>
            <li className="menu-title">
              <h6>Membership</h6>
            </li>
            <li>
              <a href="membership.html">
                <i className="fe fe-user" /> <span>Membership</span>
              </a>
            </li>
            <li>
              <a href="membership-addons.html">
                <i className="fe fe-user-plus" /> <span>Membership Addons</span>
              </a>
            </li>
            <li className="menu-title">
              <h6>Reports</h6>
            </li>
            <li>
              <a href="admin-earnings.html">
                <i className="fe fe-user" />
                <span>Admin Earnings</span>
              </a>
            </li>
            <li>
              <a href="provider-earnings.html">
                <i className="fe fe-dollar-sign" />
                <span>Provider Earnings</span>
              </a>
            </li>
            <li>
              <a href="provider-sales.html">
                <i className="fe fe-dollar-sign" />
                <span>Provider Sales</span>
              </a>
            </li>
            <li>
              <a href="provider-wallet.html">
                <i className="fe fe-credit-card" />
                <span>Provider Wallet</span>
              </a>
            </li>
            <li>
              <a href="customer-wallet.html">
                <i className="fe fe-user" />
                <span>Customer Wallet</span>
              </a>
            </li>
            <li>
              <a href="membership-transaction.html">
                <i className="fe fe-tv" />
                <span>Membership Transaction</span>
              </a>
            </li>
            <li>
              <a href="refund-report.html">
                <i className="fe fe-file-text" />
                <span>Refund Report</span>
              </a>
            </li>
            <li>
              <a href="register-report.html">
                <i className="fe fe-git-pull-request" />
                <span>Register Report</span>
              </a>
            </li>
            <li>
              <a href="service-sales.html">
                <i className="fe fe-bar-chart" />
                <span>Sales Report</span>
              </a>
            </li>
            <li className="menu-title">
              <h6>User Management</h6>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <i className="fe fe-user" />
                <span> Users</span>
                <span className="menu-arrow">
                  <i className="fe fe-chevron-right" />
                </span>
              </a>
              <ul>
                <li>
                  <a href="users.html">Users</a>
                </li>
                <li>
                  <a href="customers.html">Customers</a>
                </li>
                <li>
                  <a href="providers.html">Providers </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="roles.html">
                <i className="fe fe-file" /> <span>Roles & Permissions</span>
              </a>
            </li>
            <li>
              <a href="delete-account-requests.html">
                <i className="fe fe-trash-2" />{" "}
                <span>Delete Account Requests</span>
              </a>
            </li>
            <li>
              <a href="verification-request.html">
                <i className="fe fe-dollar-sign" />
                <span>Verification Requests</span>
              </a>
            </li>
            <li className="menu-title">
              <h6>Marketing</h6>
            </li>
            <li>
              <a href="coupons.html">
                {" "}
                <i className="fe fe-bookmark" /> <span>Coupons</span>
              </a>
            </li>
            <li>
              <a className="active" href="offers.html">
                <i className="fe fe-briefcase" /> <span>Service Offers</span>
              </a>
            </li>
            <li>
              <a href="featured-services.html">
                <i className="fe fe-briefcase" /> <span>Featured Services</span>
              </a>
            </li>
            <li>
              <a href="email-newsletter.html">
                <i className="fe fe-mail" /> <span>Email Newsletter</span>
              </a>
            </li>
            <li className="menu-title">
              <h6>Management</h6>
            </li>
            <li>
              <a href="cachesystem.html">
                <i className="fe fe-user" />
                <span>Cache System</span>
              </a>
            </li>
            <li>
              <a href="email-templates.html">
                <i className="fe fe-mail" /> <span>Email Templates</span>
              </a>
            </li>
            <li>
              <a href="sms-templates.html">
                <i className="fe fe-message-square" />{" "}
                <span>SMS Templates</span>
              </a>
            </li>
            <li>
              <a href="menu-management.html">
                <i className="fe fe-file-text" /> <span>Menu Management</span>
              </a>
            </li>
            <li>
              <a href="website-settings.html">
                <i className="fe fe-credit-card" /> <span>Widgets</span>
              </a>
            </li>
            <li>
              <a href="create-menu.html">
                <i className="fe fe-list" /> <span>Create Menu</span>
              </a>
            </li>
            <li>
              <a href="plugins-manager.html">
                <i className="fe fe-tv" />
                <span>Plugin Managers</span>{" "}
              </a>
            </li>
            <li className="menu-title">
              <h6>Support</h6>
            </li>
            <li>
              <a href="contact-messages.html">
                <i className="fe fe-message-square" />{" "}
                <span>Contact Messages</span>
              </a>
            </li>
            <li>
              <a href="abuse-reports.html">
                <i className="fe fe-file-text" /> <span>Abuse Reports</span>
              </a>
            </li>
            <li>
              <a href="announcements.html">
                <i className="fe fe-volume-2" /> <span>Announcements</span>
              </a>
            </li>
            <li className="menu-title">
              <h6>Settings</h6>
            </li>
            <li>
              <a href="localization.html">
                <i className="fe fe-settings" /> <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="signin.html">
                <i className="fe fe-log-out" /> <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit">
          <h5>Offers</h5>
          <div className="list-btn">
            <ul>
              <li>
                <div className="filter-sorting">
                  <ul>
                    <li>
                      <a className="filter-sets" href="javascript:void(0);">
                        <i className="fe fe-filter me-2" />
                        Filter
                      </a>
                    </li>
                    <li>
                      <span>
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/icons/sort.svg"
                        />
                      </span>
                      <div className="review-sort">
                        <select className="select">
                          <option>A - Z</option>
                          <option>Z - A</option>
                        </select>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12 ">
            <div className="table-resposnive">
              <table className="table datatable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Service</th>
                    <th>User Name</th>
                    <th>Amount</th>
                    <th>Offer</th>
                    <th>Offer Price</th>
                    <th>Date</th>
                    <th>End Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-03.jpg"
                        />
                        <span>Computer Repair</span>
                      </a>
                    </td>
                    <td>
                      <div className="table-namesplit">
                        <a
                          className="table-profileimage"
                          href="javascript:void(0);">
                          <img
                            alt="img"
                            className="me-2"
                            src="assets/img/customer/user-01.jpg"
                          />
                        </a>
                        <a className="table-name" href="javascript:void(0);">
                          <span>John Smith</span>
                          <p>
                            <span
                              className="_cf_email_"
                              data-cfemail="741e1b1c1a07191d001c34110c15190418115a171b19">
                              [email protected]
                            </span>
                          </p>
                        </a>
                      </div>
                    </td>
                    <td>$80</td>
                    <td>25%</td>
                    <td>$20</td>
                    <td>28 Sep 2023</td>
                    <td>28 Sep 2023</td>
                    <td>
                      <div className="table-actions d-flex">
                        <button
                          className="btn delete-table me-2"
                          data-bs-target="#edit-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-edit" />
                        </button>
                        <button
                          className="btn delete-table"
                          data-bs-target="#delete-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-trash-2" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-02.jpg"
                        />
                        <span>Car Repair Services</span>
                      </a>
                    </td>
                    <td>
                      <div className="table-namesplit">
                        <a
                          className="table-profileimage"
                          href="javascript:void(0);">
                          <img
                            alt="img"
                            className="me-2"
                            src="assets/img/customer/user-04.jpg"
                          />
                        </a>
                        <a className="table-name" href="javascript:void(0);">
                          <span>Johnny</span>
                          <p>
                            <span
                              className="_cf_email_"
                              data-cfemail="f59f9a9d9b9b8cb5908d9498859990db969a98">
                              [email protected]
                            </span>
                          </p>
                        </a>
                      </div>
                    </td>
                    <td>$50</td>
                    <td>10%</td>
                    <td>$5</td>
                    <td>17 Sep 2023</td>
                    <td>17 Sep 2023</td>
                    <td>
                      <div className="table-actions d-flex">
                        <button
                          className="btn delete-table me-2"
                          data-bs-target="#edit-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-edit" />
                        </button>
                        <button
                          className="btn delete-table"
                          data-bs-target="#delete-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-trash-2" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-04.jpg"
                        />
                        <span>Steam Car Wash</span>
                      </a>
                    </td>
                    <td>
                      <div className="table-namesplit">
                        <a
                          className="table-profileimage"
                          href="javascript:void(0);">
                          <img
                            alt="img"
                            className="me-2"
                            src="assets/img/customer/user-06.jpg"
                          />
                        </a>
                        <a className="table-name" href="javascript:void(0);">
                          <span>Robert</span>
                          <p>
                            <span
                              className="_cf_email_"
                              data-cfemail="b4c6dbd6d1c6c0f4d1ccd5d9c4d8d19ad7dbd9">
                              [email protected]
                            </span>
                          </p>
                        </a>
                      </div>
                    </td>
                    <td>$50</td>
                    <td>10%</td>
                    <td>$5</td>
                    <td>17 Sep 2023</td>
                    <td>17 Sep 2023</td>
                    <td>
                      <div className="table-actions d-flex">
                        <button
                          className="btn delete-table me-2"
                          data-bs-target="#edit-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-edit" />
                        </button>
                        <button
                          className="btn delete-table"
                          data-bs-target="#delete-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-trash-2" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-09.jpg"
                        />
                        <span>House Cleaning </span>
                      </a>
                    </td>
                    <td>
                      <div className="table-namesplit">
                        <a
                          className="table-profileimage"
                          href="javascript:void(0);">
                          <img
                            alt="img"
                            className="me-2"
                            src="assets/img/customer/user-09.jpg"
                          />
                        </a>
                        <a className="table-name" href="javascript:void(0);">
                          <span>Sharonda</span>
                          <p>
                            <span
                              className="_cf_email_"
                              data-cfemail="dba8b3baa9b4b5bfba9bbea3bab6abb7bef5b8b4b6">
                              [email protected]
                            </span>
                          </p>
                        </a>
                      </div>
                    </td>
                    <td>$150</td>
                    <td>20%</td>
                    <td>$15</td>
                    <td>23 Sep 2023</td>
                    <td>23 Sep 2023</td>
                    <td>
                      <div className="table-actions d-flex">
                        <button
                          className="btn delete-table me-2"
                          data-bs-target="#edit-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-edit" />
                        </button>
                        <button
                          className="btn delete-table"
                          data-bs-target="#delete-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-trash-2" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-03.jpg"
                        />
                        <span>Computer Repair</span>
                      </a>
                    </td>
                    <td>
                      <div className="table-namesplit">
                        <a
                          className="table-profileimage"
                          href="javascript:void(0);">
                          <img
                            alt="img"
                            className="me-2"
                            src="assets/img/customer/user-01.jpg"
                          />
                        </a>
                        <a className="table-name" href="javascript:void(0);">
                          <span>John Smith</span>
                          <p>
                            <span
                              className="_cf_email_"
                              data-cfemail="0e646166607d63677a664e6b766f637e626b206d6163">
                              [email protected]
                            </span>
                          </p>
                        </a>
                      </div>
                    </td>
                    <td>$250</td>
                    <td>50%</td>
                    <td>$15</td>
                    <td>03 Sep 2023</td>
                    <td>03 Sep 2023</td>
                    <td>
                      <div className="table-actions d-flex">
                        <button
                          className="btn delete-table me-2"
                          data-bs-target="#edit-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-edit" />
                        </button>
                        <button
                          className="btn delete-table"
                          data-bs-target="#delete-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-trash-2" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-02.jpg"
                        />
                        <span>Car Repair Services</span>
                      </a>
                    </td>
                    <td>
                      <div className="table-namesplit">
                        <a
                          className="table-profileimage"
                          href="javascript:void(0);">
                          <img
                            alt="img"
                            className="me-2"
                            src="assets/img/customer/user-04.jpg"
                          />
                        </a>
                        <a className="table-name" href="javascript:void(0);">
                          <span>Johnny</span>
                          <p>
                            <span
                              className="_cf_email_"
                              data-cfemail="214b4e494f4f58614459404c514d440f424e4c">
                              [email protected]
                            </span>
                          </p>
                        </a>
                      </div>
                    </td>
                    <td>$50</td>
                    <td>10%</td>
                    <td>$5</td>
                    <td>17 Sep 2023</td>
                    <td>17 Sep 2023</td>
                    <td>
                      <div className="table-actions d-flex">
                        <button
                          className="btn delete-table me-2"
                          data-bs-target="#edit-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-edit" />
                        </button>
                        <button
                          className="btn delete-table"
                          data-bs-target="#delete-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-trash-2" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-04.jpg"
                        />
                        <span>Steam Car Wash</span>
                      </a>
                    </td>
                    <td>
                      <div className="table-namesplit">
                        <a
                          className="table-profileimage"
                          href="javascript:void(0);">
                          <img
                            alt="img"
                            className="me-2"
                            src="assets/img/customer/user-06.jpg"
                          />
                        </a>
                        <a className="table-name" href="javascript:void(0);">
                          <span>Robert</span>
                          <p>
                            <span
                              className="_cf_email_"
                              data-cfemail="dba9b4b9bea9af9bbea3bab6abb7bef5b8b4b6">
                              [email protected]
                            </span>
                          </p>
                        </a>
                      </div>
                    </td>
                    <td>$50</td>
                    <td>10%</td>
                    <td>$5</td>
                    <td>17 Sep 2023</td>
                    <td>17 Sep 2023</td>
                    <td>
                      <div className="table-actions d-flex">
                        <button
                          className="btn delete-table me-2"
                          data-bs-target="#edit-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-edit" />
                        </button>
                        <button
                          className="btn delete-table"
                          data-bs-target="#delete-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-trash-2" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-09.jpg"
                        />
                        <span>House Cleaning </span>
                      </a>
                    </td>
                    <td>
                      <div className="table-namesplit">
                        <a
                          className="table-profileimage"
                          href="javascript:void(0);">
                          <img
                            alt="img"
                            className="me-2"
                            src="assets/img/customer/user-09.jpg"
                          />
                        </a>
                        <a className="table-name" href="javascript:void(0);">
                          <span>Sharonda</span>
                          <p>
                            <span
                              className="_cf_email_"
                              data-cfemail="55263d34273a3b313415302d34382539307b363a38">
                              [email protected]
                            </span>
                          </p>
                        </a>
                      </div>
                    </td>
                    <td>$150</td>
                    <td>20%</td>
                    <td>$15</td>
                    <td>23 Sep 2023</td>
                    <td>23 Sep 2023</td>
                    <td>
                      <div className="table-actions d-flex">
                        <button
                          className="btn delete-table me-2"
                          data-bs-target="#edit-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-edit" />
                        </button>
                        <button
                          className="btn delete-table"
                          data-bs-target="#delete-offer"
                          data-bs-toggle="modal"
                          type="button">
                          <i className="fe fe-trash-2" />
                        </button>
                      </div>
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
  <div className="modal fade" id="edit-offer">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Offer</h5>
          <button
            aria-label="Close"
            className="btn-close close-modal"
            data-bs-dismiss="modal"
            type="button">
            <i className="fe fe-x" />
          </button>
        </div>
        <div className="modal-body pt-0">
          <form>
            <div className="mb-3">
              <label className="form-label">Service</label>
              <select className="form-control select">
                <option>Computer Repair</option>
                <option>House Cleaning</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <select className="form-control select">
                <option>John Smith</option>
                <option>Johnny</option>
              </select>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    className="form-control"
                    defaultValue="$80"
                    type="text"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Offer</label>
                  <input
                    className="form-control"
                    defaultValue="25%  "
                    type="text"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Offer Price</label>
                  <input
                    className="form-control"
                    defaultValue="20%"
                    type="text"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-4">
                  <label className="form-label">Valid Date</label>
                  <input className="form-control" type="date" />
                </div>
              </div>
            </div>
            <div className="text-end">
              <button
                className="btn btn-secondary me-2"
                data-bs-dismiss="modal"
                type="button">
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div className="modal fade" id="delete-offer">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body pt-0">
          <div className="text-center">
            <i className="fe fe-trash-2 text-danger fs-1" />
            <div className="mt-4">
              <h4>Delete Offer?</h4>
              <p className="text-muted mb-0">
                Are you sure want to delete this?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4">
            <button
              className="btn w-sm btn-secondary"
              data-bs-dismiss="modal"
              type="button">
              Close
            </button>
            <button className="btn w-sm btn-danger" type="button">
              Yes, Delete It!
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script
    data-cfasync="false"
    src="../../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
  />
  <script
    src="assets/js/jquery-3.7.1.min.js"
    type="f00d07b9854df8f3462f0133-text/javascript"
  />
  <script
    src="assets/js/select2.min.js"
    type="f00d07b9854df8f3462f0133-text/javascript"
  />
  <script
    src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"
    type="f00d07b9854df8f3462f0133-text/javascript"
  />
  <script
    src="assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
    type="f00d07b9854df8f3462f0133-text/javascript"
  />
  <script
    src="assets/js/feather.min.js"
    type="f00d07b9854df8f3462f0133-text/javascript"
  />
  <script
    src="assets/js/jquery.dataTables.min.js"
    type="f00d07b9854df8f3462f0133-text/javascript"
  />
  <script
    src="assets/plugins/slimscroll/jquery.slimscroll.min.js"
    type="f00d07b9854df8f3462f0133-text/javascript"
  />
  <script
    src="assets/plugins/sweetalert/sweetalert2.all.min.js"
    type="f00d07b9854df8f3462f0133-text/javascript"
  />
  <script
    src="assets/plugins/sweetalert/sweetalerts.min.js"
    type="f00d07b9854df8f3462f0133-text/javascript"
  />
  <script
    src="assets/js/admin.js"
    type="f00d07b9854df8f3462f0133-text/javascript"
  />
  <script
    data-cf-settings="f00d07b9854df8f3462f0133-|49"
    defer
    src="../../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
  />
  <script
    crossOrigin="anonymous"
    data-cf-beacon='{"rayId":"908e59c45ec547d6","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
    defer
    integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
    src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
  />
</div>

  )
}

export default Offers