import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import User_dashboard_sidebar from "./user-dashboard-sidebar";
import Header from "./header";
import { Link } from "react-router-dom";
import Footer from "./footer";
import { db } from "./firebase"; // Import Firestore instance
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function User_booking_list() {
  const [count, setCount] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(null);
  const storedEmail = sessionStorage.getItem("userEmail");
  const [user, setUser] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userNumber, setUserNumber] = useState(null);
  const [serviceName, setsServiceName] = useState(null);
  const [providerId, setproviderId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [cancleloading, setcancleLoading] = useState(); // Add loading state


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

    console.log(userId);

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("userId", "==", userId));
        const bookingSnapshot = await getDocs(q);

        const bookingData = await Promise.all(
          bookingSnapshot.docs.map(async (docSnap) => {
            const booking = { id: docSnap.id, ...docSnap.data() };

            setproviderId(booking.providerId);
            // Fetch Provider Details
            const providerRef = doc(
              db,
              `localhand-users/${booking.providerId}`
            );
            const providerSnap = await getDoc(providerRef);
            const providerData = providerSnap.exists()
              ? providerSnap.data()
              : null;

            // Fetch Service Details
            const serviceRef = doc(
              db,
              `localhand-users/${booking.providerId}/services/${booking.serviceId}`
            );
            const serviceSnap = await getDoc(serviceRef);
            const serviceData = serviceSnap.exists()
              ? serviceSnap.data()
              : null;

            const userRef = doc(db, `localhand-users/${booking.userId}`);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.exists() ? userSnap.data() : null;

            return {
              ...booking,
              provider: providerData,
              service: serviceData,
              user: userData,
            };
          })
        );

        setBookings(bookingData);
        if (bookingData.length > 0 && bookingData[0].user) {
          setUserName(bookingData[0].user.name);
          setUserNumber(bookingData[0].user.phone);
          setsServiceName(bookingData[0].service.serviceTitle);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();

    if (userId) {
      fetchBookings();
    }
  }, [userId]);



  const handleCancelBooking = async () => {
    if (!selectedBookingId) return;
    setcancleLoading(true);
    try {
      const booking = bookings.find((b) => b.id === selectedBookingId);
      if (!booking) return;
  
      const { totalAmount } = booking;
      if (!totalAmount) return;
  
      const providerRef = doc(db, "localhand-users", providerId);
      const providerSnap = await getDoc(providerRef);
      if (!providerSnap.exists()) return;
  
      const providerData = providerSnap.data();
      let providerWalletBalance = providerData.walletBalance || 0;
  
      if (providerWalletBalance < totalAmount) {
        toast.error("Insufficient funds in provider's wallet", {
          position: "bottom-right",
          autoClose: 3000,
        });
        return;
      }
  
      // Deduct amount from provider wallet
      await updateDoc(providerRef, {
        walletBalance: providerWalletBalance - totalAmount,
      });
  
      // Fetch user's wallet balance
      const userRef = doc(db, "localhand-users", userId);
      const userSnap = await getDoc(userRef);
      let userWalletBalance = userSnap.exists()
        ? userSnap.data().walletBalance || 0
        : 0;
  
      // Add amount to user's wallet
      await updateDoc(userRef, {
        walletBalance: userWalletBalance + totalAmount,
      });
  
      // Update booking status
      const bookingRef = doc(db, "bookings", selectedBookingId);
      await updateDoc(bookingRef, { status: "cancelled" });
  
      // Add refund entry
      const refundsRef = collection(db, `localhand-users/${providerId}/refunds`);
      await addDoc(refundsRef, {
        userName: userName,
        serviceName: serviceName,
        amount: totalAmount,
        userPhone: userNumber,
        timestamp: new Date(),
      });
  
      setBookings((prev) =>
        prev.map((b) =>
          b.id === selectedBookingId ? { ...b, status: "cancelled" } : b
        )
      );
  
      toast.success("Booking cancelled successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
  
      console.log("Booking cancelled successfully");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Error cancelling booking", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setcancleLoading(false);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Bookings</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home-2"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item">Customer</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Bookings
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
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
                  <h4>Booking List</h4>
                  <div className="d-flex align-items-center">
                    <p className="text-dark me-2 mb-0">Sort</p>
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
                          Newly Added
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          Oldest
                        </a>
                      </div>
                    </div>
                    <a
                      href="user-bookings-calendar.html"
                      className="tags d-flex justify-content-center align-items-center border rounded me-2"
                    >
                      <i className="ti ti-calendar-month"></i>
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="tags d-flex justify-content-center align-items-center border rounded"
                    >
                      <i className="ti ti-filter"></i>
                    </a>
                  </div>
                </div>

                <div>
                  {loading ? (
                    <div className="spinner-container">
                      <div className="spinner"></div>
                    </div>
                  ) : (
                    <div>
                      {bookings.length > 0 ? (
                        bookings.map((booking) => (
                          <div
                            className="card shadow-none booking-list"
                            key={booking.id}
                          >
                            <div className="card-body d-md-flex align-items-center">
                              <div className="booking-widget d-sm-flex align-items-center row-gap-3 flex-fill mb-3 mb-md-0">
                                <div className="booking-img me-sm-3 mb-3 mb-sm-0">
                                  <a
                                    href="/user-booking-details"
                                    className="avatar"
                                  >
                                    <img
                                      src={
                                        booking.service.images.length > 0
                                          ? booking.service.images[0]
                                          : "default.jpg"
                                      }
                                      alt="Service Image"
                                    />
                                  </a>
                                </div>
                                <div className="booking-det-info">
                                  <h6 className="mb-3">
                                    <a href="/user-booking-details">
                                      {booking.service?.serviceTitle ||
                                        "Service Name"}
                                    </a>
                                    <span
                                      className={`badge ms-2 ${
                                        booking.status === "confirmed"
                                          ? "badge-soft-success"
                                          : booking.status === "cancelled"
                                          ? "badge-soft-danger"
                                          : booking.status === "in progress"
                                          ? "badge-soft-warning"
                                          : booking.status === "completed"
                                          ? "badge-soft-primary"
                                          : "badge-soft-secondary"
                                      }`}
                                    >
                                      {booking.status}
                                    </span>
                                  </h6>
                                  <ul className="booking-details">
                                    <li className="d-flex align-items-center mb-2">
                                      <span className="book-item">
                                        Booking Date
                                      </span>{" "}
                                      <small className="me-2">: </small>
                                      {new Date(
                                        booking.appointmentDate
                                      ).toLocaleDateString()}
                                    </li>
                                    <li className="d-flex align-items-center mb-2">
                                      <span className="book-item">Amount</span>{" "}
                                      <small className="me-2">: </small>
                                      {booking.totalAmount}
                                    </li>
                                    <li className="d-flex align-items-center mb-2">
                                      <span className="book-item">
                                        Provider Name
                                      </span>{" "}
                                      <small className="me-2">: </small>
                                      {booking.provider?.name ||
                                        "Provider Name"}
                                    </li>
                                    <li className="d-flex align-items-center flex-wrap">
                                      <span className="book-item">
                                        Provider Number
                                      </span>{" "}
                                      <small className="me-2">: </small>
                                      <p>{booking.provider?.phone || "N/A"}</p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div>
                                <button
                                  className="btn btn-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#cancel_appointment"
                                  onClick={() =>
                                    setSelectedBookingId(booking.id)
                                  }
                                  disabled={
                                    booking.status === "in progress" ||
                                    booking.status === "completed" ||
                                    booking.status === "cancelled"
                                  }
                                >
                                  Cancel Booking
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No bookings found.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <div className="modal fade custom-modal" id="cancel_appointment">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
              <h5 className="modal-title">Cancel Appointment</h5>
              <a
                href="javascript:void(0);"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-circle-x-filled fs-20"></i>
              </a>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to cancel this appointment? <br /> If yes
                then amount will automatically refunded to customer.
              </p>
            </div>
            <div className="modal-footer">
              <div className="acc-submit">
                <a
                  href="javascript:void(0);"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Dismiss
                </a>
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={handleCancelBooking}
                >
                  Yes, Cancel
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
            <form action="https://truelysell.dreamstechnologies.com/html/template/user-booking-list.html">
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
    </>
  );
}

export default User_booking_list;
