import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./header";
import User_dashboard_sidebar from "./user-dashboard-sidebar";
import Footer from "./footer";
import { db } from "./firebase"; // Adjust the import path based on your setup
import { collection, query, where, getDocs } from "firebase/firestore";

function User_dashboard() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userId, setUserId] = useState(null);

  const storedEmail = sessionStorage.getItem("userEmail");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!storedEmail) return;
    
      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", storedEmail));
      const querySnapshot = await getDocs(q);
    
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Get the first matching document
        const userData = userDoc.data(); // Get the document data
        setUser({ ...userData, id: userDoc.id }); // Add document ID to user state
        setUserId(userDoc.id); // Store document ID separately
      }
    };
    

    fetchUserDetails();
  }, [storedEmail]);

  

  useEffect(() => {
    console.log(userId);
    const fetchBookings = async () => {
      try {
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        let bookingCount = 0;
        let amountSum = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          bookingCount++;
          amountSum += data.totalAmount || 0;
        });

        setTotalBookings(bookingCount);
        setTotalAmount(amountSum);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <div>
      <Header />
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Dashboard</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home-2"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item">Customer</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Dashboard
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
        <div className="content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-3 col-lg-4 theiaStickySidebar">
                <User_dashboard_sidebar />
              </div>
              <div className="col-xl-9 col-lg-8">
                <h4 className="mb-3">Dashboard</h4>
                <div className="row mb-4">
                  <div className="col-xxl-4 col-md-6">
                    <div className="card dash-widget">
                      <div className="card-body">
                        <div className="d-flex  justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <span className="dash-icon bg-primary-transparent d-flex justify-content-center align-items-center rounded-circle">
                              <i className="ti ti-shopping-cart"></i>
                            </span>
                            <div className="ms-2">
                              <span className="fs-14">Total Orders</span>
                              <h5>
                                <span>{totalBookings}</span>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-md-6">
                    <div className="card dash-widget">
                      <div className="card-body">
                        <div className="d-flex  justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <span className="dash-icon bg-secondary-transparent d-flex justify-content-center align-items-center rounded-circle">
                              <i className="ti ti-wallet"></i>
                            </span>
                            <div className="ms-2">
                              <span className="fs-14">Total Spend</span>
                              <h5>
                                <span>{totalAmount}</span>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-md-6">
                    <div className="card dash-widget">
                      <div className="card-body">
                        <div className="d-flex  justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <span className="dash-icon bg-success-transparent d-flex justify-content-center align-items-center rounded-circle ">
                              <i className="ti ti-cards"></i>
                            </span>
                            <div className="ms-2">
                              <span className="fs-14">Wallet</span>
                              <h5>
                                <span>{user ? user.walletBalance : 0}</span>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xxl-5 col-lg-5 d-flex">
                    <div className="w-100">
                      <h5 className="mb-3">Recent Transaction</h5>
                      <div className="table-responsive">
                        <table className="table mb-0">
                          <tbody>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                                    <i className="ti ti-devices-2 fs-20 text-dark"></i>
                                  </span>
                                  <div>
                                    <h6 className="fs-14">Service Booking</h6>
                                    <span className="text-gray fs-12">
                                      <i className="feather-calendar"></i>
                                      22 Sep 2023
                                      <span className="ms-2">
                                        <i className="feather-clock"></i>
                                        10:12 AM
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end">
                                <h6>280.00</h6>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                                    <i className="ti ti-refresh fs-20 text-dark"></i>
                                  </span>
                                  <div>
                                    <h6 className="fs-14">Service Refund</h6>
                                    <span className="text-gray fs-12">
                                      <i className="feather-calendar"></i>
                                      15 Oct 2022
                                      <span className="ms-2">
                                        <i className="ti ti-clock me-1"></i>
                                        14:36 PM
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end">
                                <h6>395.00</h6>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                                    <i className="ti ti-wallet fs-20 text-dark"></i>
                                  </span>
                                  <div>
                                    <h6 className="fs-14">Wallet Topup</h6>
                                    <span className="text-gray fs-12">
                                      <i className="feather-calendar"></i>
                                      18 Oct 2022
                                      <span className="ms-2">
                                        <i className="ti ti-clock me-1"></i>
                                        15:19 PM
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end">
                                <h6>1000.00</h6>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                                    <i className="ti ti-devices-2 fs-20 text-dark"></i>
                                  </span>
                                  <div>
                                    <h6 className="fs-14">Service Booking</h6>
                                    <span className="text-gray fs-12">
                                      <i className="feather-calendar"></i>
                                      28 Oct 2022
                                      <span className="ms-2">
                                        <i className="ti ti-clock me-1"></i>
                                        11:17 AM
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end">
                                <h6>598.65</h6>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                                    <i className="ti ti-devices-2 fs-20 text-dark"></i>
                                  </span>
                                  <div>
                                    <h6 className="fs-14">Service Booking</h6>
                                    <span className="text-gray fs-12">
                                      <i className="feather-calendar"></i>
                                      10 Nov 2022
                                      <span className="ms-2">
                                        <i className="ti ti-clock me-1"></i>
                                        09:13 AM
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end">
                                <h6>300.00</h6>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                                    <i className="ti ti-devices-2 fs-20 text-dark"></i>
                                  </span>
                                  <div>
                                    <h6 className="fs-14">Service Booking</h6>
                                    <span className="text-gray fs-12">
                                      <i className="feather-calendar"></i>
                                      10 Nov 2022
                                      <span className="ms-2">
                                        <i className="ti ti-clock me-1"></i>
                                        09:13 AM
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end">
                                <h6>300.00</h6>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-7 col-lg-7 d-flex">
                    <div className="w-100">
                      <h5 className="mb-3">Recent Booking</h5>
                      <div className="table-responsive">
                        <table className="table mb-0">
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href="booking-details.html"
                                  className="d-flex"
                                >
                                  <span className="avatar avatar-lg me-2">
                                    <img
                                      src="assets/img/providers/provider-15.jpg"
                                      className="img-fluid"
                                      alt="img"
                                    />
                                  </span>
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <h6 className="fs-14">Computer Repair</h6>
                                      <span className="text-gray fs-12">
                                        <i className="feather-calendar me-1"></i>
                                        10 Nov 2022
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              </td>
                              <td>
                                <a className="d-flex">
                                  <span className="avatar avatar-lg me-2">
                                    <img
                                      src="assets/img/user/user-01.jpg"
                                      className="rounded-circle img-fluid"
                                      alt="Img"
                                    />
                                  </span>
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <h6 className="fs-14">John Smith</h6>
                                      <span className="text-gray fs-14">
                                        <span
                                          className="__cf_email__"
                                          data-cfemail="aac0c5c2c4eacdc7cbc3c684c9c5c7"
                                        >
                                          [email&#160;protected]
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              </td>
                              <td className="text-end">
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-light btn-sm"
                                >
                                  Cancel
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a
                                  href="booking-details.html"
                                  className="d-flex"
                                >
                                  <span className="avatar avatar-lg me-2">
                                    <img
                                      src="assets/img/providers/provider-13.jpg"
                                      className="img-fluid"
                                      alt="Img"
                                    />
                                  </span>
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <h6 className="fs-14">Car Repair </h6>
                                      <span className="text-gray fs-12 me-1">
                                        <i className="feather-calendar"></i>
                                        15 Oct 2022
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              </td>
                              <td>
                                <a
                                  href="javascript:void(0);"
                                  className="d-flex"
                                >
                                  <span className="avatar avatar-lg me-2">
                                    <img
                                      src="assets/img/user/user-02.jpg"
                                      className="rounded-circle img-fluid"
                                      alt="Img"
                                    />
                                  </span>
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <h6 className="fs-14">Timothy</h6>
                                      <span className="text-gray fs-14">
                                        <span
                                          className="__cf_email__"
                                          data-cfemail="9de9f4f0f2e9f5e4ddfaf0fcf4f1b3fef2f0"
                                        >
                                          [email&#160;protected]
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              </td>
                              <td className="text-end">
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-light btn-sm"
                                >
                                  Cancel
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a
                                  href="booking-details.html"
                                  className="d-flex"
                                >
                                  <span className="avatar avatar-lg me-2">
                                    <img
                                      src="assets/img/providers/provider-16.jpg"
                                      className="img-fluid"
                                      alt="Img"
                                    />
                                  </span>
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <h6 className="fs-14">
                                        Interior Designing{" "}
                                      </h6>
                                      <span className="text-gray fs-12 me-1">
                                        <i className="feather-calendar"></i>
                                        18 Oct 2022
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              </td>
                              <td>
                                <a className="d-flex">
                                  <span className="avatar avatar-lg me-2">
                                    <img
                                      src="assets/img/user/user-03.jpg"
                                      className="rounded-circle img-fluid"
                                      alt="Img"
                                    />
                                  </span>
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <h6 className="fs-14">Jordan</h6>
                                      <span className="text-gray fs-14">
                                        <span
                                          className="__cf_email__"
                                          data-cfemail="701a1f0214111e30171d11191c5e131f1d"
                                        >
                                          [email&#160;protected]
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              </td>
                              <td className="text-end">
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-light btn-sm"
                                >
                                  Cancel
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a
                                  href="booking-details.html"
                                  className="d-flex"
                                >
                                  <span className="avatar avatar-lg me-2">
                                    <img
                                      src="assets/img/providers/provider-17.jpg"
                                      className="img-fluid"
                                      alt="Img"
                                    />
                                  </span>
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <h6 className="fs-14">Steam Car Wash</h6>
                                      <span className="text-gray fs-12 me-1">
                                        <i className="feather-calendar"></i>
                                        28 Oct 2022
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              </td>
                              <td>
                                <a
                                  href="javascript:void(0);"
                                  className="d-flex"
                                >
                                  <span className="avatar avatar-lg me-2">
                                    <img
                                      src="assets/img/user/user-05.jpg"
                                      className="rounded-circle img-fluid"
                                      alt="Img"
                                    />
                                  </span>
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <h6 className="fs-14">Armand</h6>
                                      <span className="text-gray fs-14">
                                        <span
                                          className="__cf_email__"
                                          data-cfemail="2e4f5c434f404a6e49434f4742004d4143"
                                        >
                                          [email&#160;protected]
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              </td>
                              <td className="text-end">
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-light btn-sm"
                                >
                                  Cancel
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a
                                  href="booking-details.html"
                                  className="d-flex"
                                >
                                  <span className="avatar avatar-lg me-2">
                                    <img
                                      src="assets/img/providers/provider-19.jpg"
                                      className="img-fluid"
                                      alt="Img"
                                    />
                                  </span>
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <h6 className="fs-14">House Cleaning</h6>
                                      <span className="text-gray fs-12 me-1">
                                        <i className="feather-calendar"></i>
                                        10 Nov 2022
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              </td>
                              <td>
                                <a
                                  href="javascript:void(0);"
                                  className="d-flex"
                                >
                                  <span className="avatar avatar-lg me-2">
                                    <img
                                      src="assets/img/user/user-04.jpg"
                                      className="rounded-circle img-fluid"
                                      alt="Img"
                                    />
                                  </span>
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <h6 className="fs-14">Joseph</h6>
                                      <span className="text-gray fs-14">
                                        <span
                                          className="__cf_email__"
                                          data-cfemail="81ebeef2e4f1e9c1e6ece0e8edafe2eeec"
                                        >
                                          [email&#160;protected]
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              </td>
                              <td className="text-end">
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-light btn-sm"
                                >
                                  Cancel
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a
                                  href="booking-details.html"
                                  className="d-flex"
                                >
                                  <span className="avatar avatar-lg me-2">
                                    <img
                                      src="assets/img/providers/provider-09.jpg"
                                      className="img-fluid"
                                      alt="Img"
                                    />
                                  </span>
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <h6 className="fs-14">Car Repair</h6>
                                      <span className="text-gray fs-12 me-1">
                                        <i className="feather-calendar"></i>
                                        10 Nov 2022
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              </td>
                              <td>
                                <a
                                  href="javascript:void(0);"
                                  className="d-flex"
                                >
                                  <span className="avatar avatar-lg me-2">
                                    <img
                                      src="assets/img/user/user-06.jpg"
                                      className="rounded-circle img-fluid"
                                      alt="Img"
                                    />
                                  </span>
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <h6 className="fs-14">Adrian</h6>
                                      <span className="text-gray fs-14">
                                        <span
                                          className="__cf_email__"
                                          data-cfemail="b5dfd4d1c7dcd4dbf5d2d8d4dcd99bd6dad8"
                                        >
                                          [email&#160;protected]
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              </td>
                              <td className="text-end">
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-light btn-sm"
                                >
                                  Cancel
                                </a>
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

      <Footer />

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

export default User_dashboard;
