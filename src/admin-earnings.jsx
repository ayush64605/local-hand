import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./header";
import Siderbar from "./sidebar";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase"; // Ensure the correct path

function Admin_earnings() {
  const [bookings, setBookings] = useState([]);
  const [commission, setCommission] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchBookings = async () => {
      try {
        // Step 2: Fetch bookings for provider
        const bookingQuery = query(collection(db, "bookings"));
        const bookingSnapshot = await getDocs(bookingQuery);

        const bookingsList = await Promise.all(
          bookingSnapshot.docs.map(async (docSnap) => {
            const bookingData = docSnap.data();

            // Step 3: Fetch service details
            const serviceRef = doc(
              db,
              "localhand-users",
              bookingData.providerId,
              "services",
              bookingData.serviceId
            );
            console.log(bookingData.serviceId);

            const serviceSnap = await getDoc(serviceRef);

            if (serviceSnap.exists()) {
              console.log(
                "Service Details for Booking:",
                bookingData,
                serviceSnap.data()
              );
            } else {
              console.log(
                "No service found for Booking:",
                bookingData.serviceId
              );
            }

            // Fetch user details
            const userRef = doc(db, "localhand-users", bookingData.userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              console.log("user Details:", userSnap.data());
            } else {
              console.log("No user found with ID:", bookingData.userId);
            }

            const userData = userSnap.exists()
              ? { ...userSnap.data(), id: userSnap.id } // Ensure user.id is included
              : null;

            // Fetch provider (user) details
            const providerRef = doc(
              db,
              "localhand-users",
              bookingData.providerId
            );
            const providerSnap = await getDoc(providerRef);

            if (providerSnap.exists()) {
              console.log("provider Details:", providerSnap.data());
            } else {
              console.log("No provider found with ID:", bookingData.providerId);
            }

            const providerData = providerSnap.exists()
              ? { ...providerSnap.data(), id: providerSnap.id } // Ensure provider.id is included
              : null;

            return {
              id: docSnap.id,
              ...bookingData,
              service: serviceSnap.exists() ? serviceSnap.data() : null,
              user: userData,
              provider: providerData,
            };
          })
        );

        setBookings(bookingsList);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCommission = async () => {
      try {
        const docRef = doc(db, "admin", "commission");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCommission(docSnap.data().value || "");
        } else {
          console.log("No commission data found.");
        }
      } catch (error) {
        console.error("Error fetching commission:", error);
      }
    };

    fetchCommission();
    fetchBookings();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="main-wrapper">
          <Header />
          <Siderbar />
          <div className="page-wrapper page-settings">
            <div className="content">
              <div className="content-page-header content-page-headersplit">
                <h5>Booking List</h5>
              </div>
              <div className="row">
                <div className="col-12 ">
                  <div className="table-resposnive table-div">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Booking Time</th>
                          <th>Provider</th>
                          <th>User</th>
                          <th>Service</th>
                          <th>Amount</th>
                          <th>Commission</th>
                          <th>City</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {new Date(
                                booking.appointmentDate
                              ).toLocaleDateString()}
                            </td>
                            <td>{booking.appointmentTime}</td>
                            <td>
                              <a
                                className="table-profileimage"
                                href="javascript:void(0);"
                              >
                                <img
                                  alt="img"
                                  className="me-2"
                                  src={booking.provider?.profileImage || "User Name"}
                                />
                                <span>
                                  {booking.provider?.name || "User Name"}
                                </span>
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
                                  src={booking.user?.profileImage || "User Name"}
                                />
                                <span>{booking.user?.name || "User Name"}</span>
                              </a>
                            </td>
                            <td>
                              <a
                                className="table-imgname"
                                href="javascript:void(0);"
                              >
                                <img
                                  alt="img"
                                  className="me-2"
                                  src={
                                    booking.service.images.length > 0
                                      ? booking.service.images[0]
                                      : "default.jpg"
                                  }
                                />
                                <span>
                                  {booking.service?.serviceTitle ||
                                    "Service Name"}
                                </span>
                              </a>
                            </td>
                            <td>{booking.totalAmount || "0.00"}</td>
                            <td>
                              {(booking.totalAmount || 0) * (commission / 100)}
                            </td>
                            <td>{booking.city}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <script
        data-cfasync="false"
        src="../../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
      />
      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="4b777e77490beb91cb5c48ba-text/javascript"
      />
      <script
        src="assets/js/select2.min.js"
        type="4b777e77490beb91cb5c48ba-text/javascript"
      />
      <script
        src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"
        type="4b777e77490beb91cb5c48ba-text/javascript"
      />
      <script
        src="assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
        type="4b777e77490beb91cb5c48ba-text/javascript"
      />
      <script
        src="assets/js/feather.min.js"
        type="4b777e77490beb91cb5c48ba-text/javascript"
      />
      <script
        src="assets/js/jquery.dataTables.min.js"
        type="4b777e77490beb91cb5c48ba-text/javascript"
      />
      <script
        src="assets/plugins/slimscroll/jquery.slimscroll.min.js"
        type="4b777e77490beb91cb5c48ba-text/javascript"
      />
      <script
        src="assets/plugins/moment/moment.html"
        type="4b777e77490beb91cb5c48ba-text/javascript"
      />
      <script
        src="assets/js/bootstrap-datetimepicker.min.js"
        type="4b777e77490beb91cb5c48ba-text/javascript"
      />
      <script
        src="assets/plugins/sweetalert/sweetalert2.all.min.js"
        type="4b777e77490beb91cb5c48ba-text/javascript"
      />
      <script
        src="assets/plugins/sweetalert/sweetalerts.min.js"
        type="4b777e77490beb91cb5c48ba-text/javascript"
      />
      <script
        src="assets/plugins/apexchart/apexcharts.min.js"
        type="4b777e77490beb91cb5c48ba-text/javascript"
      />
      <script
        src="assets/plugins/apexchart/chart-data.js"
        type="4b777e77490beb91cb5c48ba-text/javascript"
      />
      <script
        src="assets/js/admin.js"
        type="4b777e77490beb91cb5c48ba-text/javascript"
      />
      <script
        data-cf-settings="4b777e77490beb91cb5c48ba-|49"
        defer
        src="../../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
      />
      <script
        crossOrigin="anonymous"
        data-cf-beacon='{"rayId":"908e59ad8b6e47d6","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        defer
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
      />
    </div>
  );
}

export default Admin_earnings;
