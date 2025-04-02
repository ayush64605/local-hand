import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Provider_header from "./provider-header";
import Provider_sidebar from "./provider-sidebar";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase"; // Your firebase config
import { set } from "mongoose";

function Provider_customer_list() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    setLoading(true);
    const storedEmail = sessionStorage.getItem("userEmail");
    if (!storedEmail) return [];

    try {
      // Step 1: Get providerDocId
      const providerQuery = query(
        collection(db, "localhand-users"),
        where("email", "==", storedEmail)
      );
      const providerSnapshot = await getDocs(providerQuery);

      if (providerSnapshot.empty) {
        console.log("No provider found");
        return [];
      }

      const providerDocId = providerSnapshot.docs[0].id;

      // Step 2: Fetch all bookings for this provider
      const bookingsQuery = query(
        collection(db, "bookings"),
        where("providerId", "==", providerDocId)
      );
      const bookingsSnapshot = await getDocs(bookingsQuery);

      if (bookingsSnapshot.empty) {
        console.log("No bookings found for this provider");
        return [];
      }

      const userBookingsMap = new Map();

      // Step 3: Group bookings by userId
      bookingsSnapshot.docs.forEach((bookingDoc) => {
        const bookingData = bookingDoc.data();
        const userId = bookingData.userId;
        const amount = Number(bookingData.totalAmount) || 0;
        const bookingDate = bookingData.createdAt
          ? bookingData.createdAt.toDate()
          : null;

        if (!userBookingsMap.has(userId)) {
          userBookingsMap.set(userId, {
            totalPayments: amount,
            totalBookings: 1,
            lastBookingDate: bookingDate,
          });
        } else {
          const userData = userBookingsMap.get(userId);
          userData.totalPayments += amount;
          userData.totalBookings += 1;
          if (
            bookingDate &&
            (!userData.lastBookingDate ||
              bookingDate > userData.lastBookingDate)
          ) {
            userData.lastBookingDate = bookingDate;
          }
        }
      });

      const customersData = [];

      // Step 4: Fetch user details and combine with booking stats
      for (const [userId, stats] of userBookingsMap.entries()) {
        const userDocRef = doc(db, "localhand-users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          customersData.push({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            payments: `$${stats.totalPayments.toFixed(2)}`,
            bookingDate: stats.lastBookingDate
              ? stats.lastBookingDate.toLocaleDateString()
              : "-",
            totalBookings: stats.totalBookings,
          });
        }
      }

      return customersData;
    } catch (error) {
      console.error("Error fetching customers:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCustomers = async () => {
      const data = await fetchCustomers();
      setCustomers(data);
    };
    getCustomers();
  }, []);

  return (
    <div className="provider-page">
      <div className="main-wrapper">
        <Provider_header />
        <Provider_sidebar />
        <div className="page-wrapper">
          <div className="content">
            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
              <h4>Customers</h4>
              <div className="d-flex align-items-center flex-wrap row-gap-3">
                <span className="fs-14 me-2">Sort</span>
                <div className="dropdown me-2">
                  <a
                    href="javascript:void(0);"
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Newly Added
                  </a>
                  <div className="dropdown-menu">
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item active"
                    >
                      Ascending
                    </a>
                    <a href="javascript:void(0);" className="dropdown-item">
                      Descending
                    </a>
                  </div>
                </div>
                <div className="dropdown me-2">
                  <a
                    href="javascript:void(0);"
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Export
                  </a>
                  <div className="dropdown-menu">
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item active"
                    >
                      Export as PDF
                    </a>
                    <a href="javascript:void(0);" className="dropdown-item">
                      Export as Excel
                    </a>
                  </div>
                </div>
                <a
                  href="javascript:void(0);"
                  className="tags d-flex justify-content-center align-items-center border rounded me-2"
                >
                  <i className="ti ti-printer"></i>
                </a>
                <a
                  href="javascript:void(0);"
                  className="tags d-flex justify-content-center align-items-center border rounded me-2"
                  id="filter_search"
                >
                  <i className="ti ti-sort-descending"></i>
                </a>
                <a
                  href="customer-grid.html"
                  className="tags d-flex justify-content-center align-items-center border rounded me-2"
                >
                  <i className="ti ti-layout-grid"></i>
                </a>
                <a
                  href="customer-list.html"
                  className="tags active d-flex justify-content-center align-items-center border rounded me-2"
                >
                  <i className="ti ti-list"></i>
                </a>
                <a
                  href="javascript:void(0);"
                  className="btn btn-dark d-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#add-user"
                >
                  <i className="ti ti-circle-plus me-2"></i>Add Customer
                </a>
              </div>
            </div>
            <div id="filter_inputs">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-xl">
                  <div className="mb-3">
                    <div className="sel-cal Calendar-icon">
                      <span>
                        <i className="ti ti-calendar-month"></i>
                      </span>
                      <input
                        className="form-control datetimepicker"
                        type="text"
                        placeholder="dd-mm-yyyy"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-xl">
                  <div className="mb-3">
                    <select className="select">
                      <option>Customer ID</option>
                      <option>CU0263</option>
                      <option>CU3695</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-xl">
                  <div className="mb-3">
                    <select className="select">
                      <option>Customer</option>
                      <option>Anthony Lewis</option>
                      <option>Linda Ray</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-xl">
                  <div className="mb-3">
                    <select className="select">
                      <option>Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="spinner-container">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="row">
                <div className="provide-table manage-table">
                  <div className="table-responsive">
                    <table className="table  datatable">
                      <thead className="thead-light">
                        <tr>
                          <th>Customer Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Payments</th>
                          <th>Total Bookings</th>
                          <th>Last Booking</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((customer, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div>
                                  <h6 className="fs-14">{customer.name}</h6>
                                </div>
                              </div>
                            </td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.payments}</td>
                            <td>{customer.totalBookings}</td>
                            <td>{customer.bookingDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
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
        data-cfasync="false"
        src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
      ></script>
      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="7a46fac6d5ddea093e123dd5-text/javascript"
      ></script>

      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="7a46fac6d5ddea093e123dd5-text/javascript"
      ></script>

      <script
        src="assets/js/wow.min.js"
        type="7a46fac6d5ddea093e123dd5-text/javascript"
      ></script>

      <script
        src="assets/js/jquery.slimscroll.min.js"
        type="7a46fac6d5ddea093e123dd5-text/javascript"
      ></script>

      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="7a46fac6d5ddea093e123dd5-text/javascript"
      ></script>

      <script
        src="assets/plugins/moment/moment.html"
        type="7a46fac6d5ddea093e123dd5-text/javascript"
      ></script>
      <script
        src="assets/js/bootstrap-datetimepicker.min.js"
        type="7a46fac6d5ddea093e123dd5-text/javascript"
      ></script>

      <script
        src="assets/plugins/datatables/jquery.dataTables.min.js"
        type="7a46fac6d5ddea093e123dd5-text/javascript"
      ></script>
      <script
        src="assets/plugins/datatables/datatables.min.js"
        type="7a46fac6d5ddea093e123dd5-text/javascript"
      ></script>

      <script
        src="assets/plugins/fullcalendar/main.min.js"
        type="7a46fac6d5ddea093e123dd5-text/javascript"
      ></script>

      <script
        src="assets/js/script.js"
        type="7a46fac6d5ddea093e123dd5-text/javascript"
      ></script>
      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="7a46fac6d5ddea093e123dd5-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e58081e928602","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default Provider_customer_list;
