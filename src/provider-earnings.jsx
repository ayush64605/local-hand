import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Provider_header from "./provider-header";
import Provider_sidebar from "./provider-sidebar";
import { db } from "./firebase"; // Ensure you have initialized Firebase
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

function Provider_earnings() {
  const [count, setCount] = useState(0);
  const [services, setServices] = useState([]);
  const storedEmail = sessionStorage.getItem("userEmail");
  const [providerDocId, setProviderDocId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (storedEmail) {
      fetchProviderData(storedEmail);
    }
  }, [storedEmail]);

  useEffect(() => {
    if (providerDocId) {
      fetchAllData();
    }
  }, [providerDocId]);

  // Fetch Provider Data
  const fetchProviderData = async (email) => {
    try {
      setLoading(true); // Start loading
      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", email));
      const userSnapshot = await getDocs(q);

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        setProviderDocId(userDoc.id);
      } else {
        console.error("User not found in Firestore!");
      }
    } catch (error) {
      console.error("Error fetching provider data:", error);
    } finally {
      setLoading(false); // Stop loading if provider not found
    }
  };

  // Fetch Services and Bookings
  const fetchAllData = async () => {
    try {
      setLoading(true); // Start loading

      const [servicesSnap, bookingsSnap] = await Promise.all([
        getDocs(collection(db, `localhand-users/${providerDocId}/services`)),
        getDocs(collection(db, "bookings")),
      ]);

      // Fetch Services
      const servicesData = servicesSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(servicesData);

      // Fetch Bookings
      const bookingsData = bookingsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

  // Get Service Stats
  const getServiceStats = (serviceId) => {
    const filteredBookings = bookings.filter(
      (booking) => booking.serviceId === serviceId
    );

    const totalAmount = filteredBookings.reduce(
      (sum, booking) => sum + (booking.totalAmount || 0),
      0
    );

    return { totalAmount, totalBookings: filteredBookings.length };
  };

  return (
    <div className="provider-page">
      <div>
        <div className="main-wrapper">
          <Provider_header />
          <Provider_sidebar />
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="page-wrapper">
              <div className="content container-fluid">
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
                  <h4>Earnings</h4>
                  <div className="d-flex align-items-center flex-wrap row-gap-3">
                    <span className="fs-14 me-2">Sort</span>
                    <div className="dropdown me-2">
                      <a
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);"
                      >
                        Newly Added
                      </a>
                      <div className="dropdown-menu">
                        <a
                          className="dropdown-item active"
                          href="javascript:void(0);"
                        >
                          Newly Added
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          Oldest
                        </a>
                      </div>
                    </div>
                    <div className="dropdown me-2">
                      <a
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);"
                      >
                        Export
                      </a>
                      <div className="dropdown-menu">
                        <a
                          className="dropdown-item active"
                          href="javascript:void(0);"
                        >
                          Export
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          Import
                        </a>
                      </div>
                    </div>
                    <a
                      className="tags d-flex justify-content-center align-items-center border rounded me-2"
                      href="javascript:void(0);"
                    >
                      <i className="ti ti-printer" />
                    </a>
                    <a
                      className="tags d-flex justify-content-center align-items-center border rounded"
                      href="javascript:void(0);"
                      id="filter_search"
                    >
                      <i className="ti ti-sort-descending" />
                    </a>
                  </div>
                </div>
                <div id="filter_inputs">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 col-xl">
                      <div className="mb-3">
                        <div className="sel-cal Calendar-icon">
                          <span>
                            <i className="ti ti-calendar-month" />
                          </span>
                          <input
                            className="form-control datetimepicker"
                            placeholder="dd-mm-yyyy"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-xl">
                      <div className="mb-3">
                        <select className="select">
                          <option>Services</option>
                          <option>Computer Repairs</option>
                          <option>Plumbing</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-xl">
                      <div className="mb-3">
                        <select className="select">
                          <option>Name</option>
                          <option>Jacob Kline</option>
                          <option>William Smith</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-xl">
                      <div className="mb-3">
                        <select className="select">
                          <option>Code</option>
                          <option>1</option>
                          <option>2</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-xl">
                      <div className="mb-3">
                        <select className="select">
                          <option>Status</option>
                          <option>Paid</option>
                          <option>Pending</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="provide-table manage-table">
                    <div className="table-responsive">
                      <table className="table  datatable">
                        <thead className="thead-light">
                          <tr>
                            <th>Service</th>
                            <th>Earned Amount</th>
                            <th>Total Booking</th>
                          </tr>
                        </thead>
                        <tbody>
                          {services.map((service, index) => {
                            const { totalAmount, totalBookings } =
                              getServiceStats(service.id);
                            return (
                              <tr key={index}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <span className="avatar avatar-lg me-2">
                                      <img
                                        alt="user"
                                        className="rounded"
                                        src={
                                          service.images.length > 0
                                            ? service.images[0]
                                            : "default.jpg"
                                        }
                                      />
                                    </span>
                                    <h6 className="fs-14">
                                      {service.serviceTitle}
                                    </h6>
                                  </div>
                                </td>
                                <td>{totalAmount.toFixed(2)}</td>
                                <td>{totalBookings}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="table-paginate d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                    <div className="value d-flex align-items-center">
                      <span>Show</span>
                      <select>
                        <option>7</option>
                      </select>
                      <span>entries</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="me-2 text-gray-9">1 - 07 of 10</span>
                      <nav aria-label="Page navigation">
                        <ul className="paginations d-flex justify-content-center align-items-center">
                          <li className="page-item me-2">
                            <a
                              className="page-link-1 active d-flex justify-content-center align-items-center "
                              href="javascript:void(0);"
                            >
                              1
                            </a>
                          </li>
                          <li className="page-item me-2">
                            <a
                              className="page-link-1 d-flex justify-content-center align-items-center"
                              href="javascript:void(0);"
                            >
                              2
                            </a>
                          </li>
                          <li className="page-item ">
                            <a
                              className="page-link-1 d-flex justify-content-center align-items-center"
                              href="javascript:void(0);"
                            >
                              3
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <script
          src="assets/js/jquery-3.7.1.min.js"
          type="70376cc5ce4760baa6c5654a-text/javascript"
        />
        <script
          src="assets/js/bootstrap.bundle.min.js"
          type="70376cc5ce4760baa6c5654a-text/javascript"
        />
        <script
          src="assets/js/jquery.slimscroll.min.js"
          type="70376cc5ce4760baa6c5654a-text/javascript"
        />
        <script
          src="assets/js/wow.min.js"
          type="70376cc5ce4760baa6c5654a-text/javascript"
        />
        <script
          src="assets/plugins/select2/js/select2.min.js"
          type="70376cc5ce4760baa6c5654a-text/javascript"
        />
        <script
          src="assets/js/moment.js"
          type="70376cc5ce4760baa6c5654a-text/javascript"
        />
        <script
          src="assets/js/bootstrap-datetimepicker.min.js"
          type="70376cc5ce4760baa6c5654a-text/javascript"
        />
        <script
          src="assets/plugins/datatables/jquery.dataTables.min.js"
          type="70376cc5ce4760baa6c5654a-text/javascript"
        />
        <script
          src="assets/plugins/datatables/datatables.min.js"
          type="70376cc5ce4760baa6c5654a-text/javascript"
        />
        <script
          src="assets/js/script.js"
          type="70376cc5ce4760baa6c5654a-text/javascript"
        />
        <script
          data-cf-settings="70376cc5ce4760baa6c5654a-|49"
          defer
          src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        />
        <script
          crossOrigin="anonymous"
          data-cf-beacon='{"rayId":"908e4e5b5a364019","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
          defer
          integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
          src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        />
      </div>
      ;
    </div>
  );
}

export default Provider_earnings;
