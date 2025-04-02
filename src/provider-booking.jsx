import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Provider_sidebar from "./provider-sidebar";
import Provider_header from "./provider-header";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Provider_booking() {
  const [count, setCount] = useState(0);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [providerDocId, setProviderDocId] = useState(null);
  const [userDocId, setUserDocId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userNumber, setUserNumber] = useState(null);
  const [serviceName, setsServiceName] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    setLoading(true);
    const fetchBookings = async () => {
      try {
        const storedEmail = sessionStorage.getItem("userEmail");
        if (!storedEmail) return;

        // Step 1: Fetch providerDocId
        const providerQuery = query(
          collection(db, "localhand-users"),
          where("email", "==", storedEmail)
        );
        const providerSnapshot = await getDocs(providerQuery);

        if (!providerSnapshot.empty) {
          const providerDoc = providerSnapshot.docs[0];
          const providerDocId = providerDoc.id;
          setProviderDocId(providerDocId);

          // Step 2: Fetch bookings for provider
          const bookingQuery = query(
            collection(db, "bookings"),
            where("providerId", "==", providerDocId)
          );
          const bookingSnapshot = await getDocs(bookingQuery);

          const bookingsList = await Promise.all(
            bookingSnapshot.docs.map(async (docSnap) => {
              const bookingData = docSnap.data();

              // Step 3: Fetch service details
              const serviceRef = doc(
                db,
                "localhand-users",
                providerDocId,
                "services",
                bookingData.serviceId
              );
              console.log(providerDocId);
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

              // Fetch provider (user) details
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

              return {
                id: docSnap.id,
                ...bookingData,
                service: serviceSnap.exists() ? serviceSnap.data() : null,
                user: userData,
              };
            })
          );

          setBookings(bookingsList);
          if (bookingsList.length > 0 && bookingsList[0].user) {
            setUserDocId(bookingsList[0].user.id);
            setUserName(bookingsList[0].user.name);
            setUserNumber(bookingsList[0].user.phone);
            setsServiceName(bookingsList[0].service.serviceTitle);
          }
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async () => {
    if (!selectedBookingId) {
      toast.warning("No booking selected!", { position: "bottom-right", autoClose: 3000 });
      return;
    }
  
    try {
      const booking = bookings.find((b) => b.id === selectedBookingId);
      if (!booking) {
        toast.error("Booking not found!", { position: "bottom-right", autoClose: 3000 });
        return;
      }
  
      const { user, totalAmount } = booking;
      if (!user || !totalAmount) {
        toast.warning("Invalid booking details!", { position: "bottom-right", autoClose: 3000 });
        return;
      }
  
      try {
        const providerRef = doc(db, "localhand-users", providerDocId);
        const providerSnap = await getDoc(providerRef);
        if (!providerSnap.exists()) {
          toast.error("Provider not found!", { position: "bottom-right", autoClose: 3000 });
          return;
        }
  
        const providerData = providerSnap.data();
        let providerWalletBalance = providerData.walletBalance || 0;
  
        if (providerWalletBalance < totalAmount) {
          toast.error("Insufficient funds in provider's wallet!", { position: "bottom-right", autoClose: 3000 });
          return;
        }
  
        // Deduct amount from provider wallet
        await updateDoc(providerRef, {
          walletBalance: providerWalletBalance - totalAmount,
        });
  
        // Fetch user's wallet balance
        const userRef = doc(db, "localhand-users", userDocId);
        const userSnap = await getDoc(userRef);
        let userWalletBalance = userSnap.exists() ? userSnap.data().walletBalance || 0 : 0;
  
        // Add amount to user's wallet
        await updateDoc(userRef, {
          walletBalance: userWalletBalance + totalAmount,
        });
  
        // Update booking status
        const bookingRef = doc(db, "bookings", selectedBookingId);
        await updateDoc(bookingRef, { status: "cancelled" });
  
        const refundsRef = collection(db, `localhand-users/${providerDocId}/refunds`);
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
  
        toast.success("Booking cancelled successfully!", { position: "bottom-right", autoClose: 3000 });
      } catch (error) {
        console.error("Error cancelling booking:", error);
        toast.error("Error cancelling booking. Try again!", { position: "bottom-right", autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("An unexpected error occurred!", { position: "bottom-right", autoClose: 3000 });
    }
  };
  
  const handleStatusChange = async (bookingId, currentStatus) => {
    let newStatus = "";
  
    if (currentStatus === "confirmed") {
      newStatus = "in progress";
    } else if (currentStatus === "in progress") {
      newStatus = "completed";
    } else {
      toast.info("Booking already completed or cancelled!", { position: "bottom-right", autoClose: 3000 });
      return;
    }
  
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, {
        status: newStatus,
      });
  
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
  
      toast.success(`Booking status updated to ${newStatus}`, { position: "bottom-right", autoClose: 3000 });
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating booking status. Try again!", { position: "bottom-right", autoClose: 3000 });
    }
  };

  return (
    <div className="provider-page">
      <Provider_header />
      <Provider_sidebar />
      <ToastContainer/>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
              <h4>Booking List</h4>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xxl-12 col-lg-12">
              {loading ? (
                <div className="spinner-container">
                  <div className="spinner"></div>
                </div>
              ) : (
                <div>
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="card shadow-none booking-list mb-4"
                    >
                      <div className="card-body d-md-flex align-items-center">
                        <div className="booking-widget d-sm-flex align-items-center row-gap-3 flex-fill mb-3 mb-md-0">
                          <div className="booking-img me-sm-3 mb-3 mb-sm-0">
                            <a href="booking-details.html" className="avatar">
                              <img
                                src={
                                  booking.service.images.length > 0
                                    ? booking.service.images[0]
                                    : "default.jpg"
                                }
                              />
                            </a>
                          </div>
                          <div className="booking-det-info">
                            <h6 className="mb-3">
                              <a href="booking-details.html">
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
                                <span className="book-item">Booking Date</span>{" "}
                                <small className="me-2">: </small>
                                {booking.appointmentDate || "N/A"}
                              </li>
                              <li className="d-flex align-items-center mb-2">
                                <span className="book-item">Amount</span>{" "}
                                <small className="me-2">: </small>
                                {booking.totalAmount || "0.00"}
                              </li>

                              <li className="d-flex align-items-center flex-wrap mb-2">
                                <span className="book-item">Location</span>{" "}
                                <small className="me-2">: </small>
                                <div className="user-book d-flex align-items-center flex-wrap me-2">
                                  {booking.address || "User Name"}
                                </div>
                                <div className="user-book d-flex align-items-center flex-wrap me-2">
                                  <i className="ti ti-point-filled fs-10 text-muted me-2"></i>

                                  {booking.city || "User Name"}
                                </div>
                                <div className="user-book d-flex align-items-center flex-wrap me-2">
                                  <i className="ti ti-point-filled fs-10 text-muted me-2"></i>

                                  {booking.state || "User Name"}
                                </div>
                              </li>
                              <li className="d-flex align-items-center flex-wrap">
                                <span className="book-item">User</span>{" "}
                                <small className="me-2">: </small>
                                <div className="user-book d-flex align-items-center flex-wrap me-2">
                                  {booking.user?.name || "User Name"}
                                </div>
                                <p>
                                  <i className="ti ti-point-filled fs-10 text-muted me-2"></i>
                                  {booking.user?.phone || "+1 888 888 8888"}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div>
                          <button
                            className="btn btn-dark"
                            type="button"
                            onClick={() =>
                              handleStatusChange(booking.id, booking.status)
                            }
                            disabled={
                              booking.status === "cancelled" ||
                              booking.status === "completed"
                            }
                          >
                            {booking.status === "confirmed"
                              ? "Start"
                              : booking.status === "in progress"
                              ? "End"
                              : "Completed"}
                          </button>
                        </div>
                        <div>
                          <button
                            className="btn btn-light"
                            data-bs-toggle="modal"
                            data-bs-target="#cancel_appointment"
                            onClick={() => setSelectedBookingId(booking.id)}
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
                  ))}
                </div>
              )}
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

      <div className="modal fade custom-modal" id="add_booking">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
              <h5 className="modal-title">Add Booking</h5>
              <a
                href="javascript:void(0);"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-circle-x-filled fs-20"></i>
              </a>
            </div>
            <form action="">
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Staff</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Jeff Fitch</option>
                        <option>Donald Gordon</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Service</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Computer Services</option>
                        <option>Car Repair Services</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Customer</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Jeff Fitch</option>
                        <option>Donald Gordon</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
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
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <div className="sel-cal Calendar-icon">
                            <span>
                              <i className="ti ti-clock"></i>
                            </span>
                            <input
                              className="form-control timepicker"
                              type="text"
                              placeholder="dd-mm-yyyy"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <div className="sel-cal Calendar-icon">
                            <span>
                              <i className="ti ti-clock"></i>
                            </span>
                            <input
                              className="form-control timepicker"
                              type="text"
                              placeholder="dd-mm-yyyy"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-0">
                      <label className="form-label">Booking Message</label>
                      <textarea rows="4" className="form-control"></textarea>
                    </div>
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade custom-modal" id="reschedule">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
              <h5 className="modal-title">Cancle Booking</h5>
              <a
                href="javascript:void(0);"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-circle-x-filled fs-20"></i>
              </a>
            </div>
            <div className="modal-body">
              <div className="write-review">
                <p>Are you sure want to cancle this booking?</p>
                <div className="modal-submit text-end">
                  <a
                    href="javascript:void(0);"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </a>
                  <button className="btn btn-dark" data-bs-dismiss="modal">
                    Yes, cancle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  data-bs-dismiss="modal"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade custom-modal" id="add-review">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
              <h5 className="modal-title">Write A Review</h5>
              <a
                href="javascript:void(0);"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-circle-x-filled fs-20"></i>
              </a>
            </div>
            <form action="">
              <div className="modal-body">
                <div className="write-review">
                  <div className="review-add d-flex align-items-center mb-3">
                    <div className="rev-img me-2">
                      <img
                        src="assets/img/services/service-19.jpg"
                        alt="image"
                      />
                    </div>
                    <div>
                      <h6 className="fs-16 fw-medium mb-1">
                        Computer Services
                      </h6>
                      <p className="fs-12">Newyork, USA</p>
                    </div>
                  </div>
                  <div className="form-info d-flex align-items-center justify-content-between mb-3">
                    <p className="fw-medium text-dark mb-0">Rate The Service</p>
                    <div className="rating-select mb-0">
                      <a href="javascript:void(0);">
                        <i className="fas fa-star"></i>
                      </a>
                      <a href="javascript:void(0);">
                        <i className="fas fa-star"></i>
                      </a>
                      <a href="javascript:void(0);">
                        <i className="fas fa-star"></i>
                      </a>
                      <a href="javascript:void(0);">
                        <i className="fas fa-star"></i>
                      </a>
                      <a href="javascript:void(0);">
                        <i className="fas fa-star"></i>
                      </a>
                    </div>
                  </div>
                  <div className="mb-0">
                    <label className="col-form-label">Write your Review</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Please write your review"
                    ></textarea>
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
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <script
        data-cfasync="false"
        src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
      ></script>
      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="04c4e61fa7ce020bd917981d-text/javascript"
      ></script>

      <script
        src="assets/js/jquery.slimscroll.min.js"
        type="04c4e61fa7ce020bd917981d-text/javascript"
      ></script>

      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="04c4e61fa7ce020bd917981d-text/javascript"
      ></script>

      <script
        src="assets/js/wow.min.js"
        type="04c4e61fa7ce020bd917981d-text/javascript"
      ></script>

      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="04c4e61fa7ce020bd917981d-text/javascript"
      ></script>

      <script
        src="assets/js/moment.js"
        type="04c4e61fa7ce020bd917981d-text/javascript"
      ></script>
      <script
        src="assets/js/bootstrap-datetimepicker.min.js"
        type="04c4e61fa7ce020bd917981d-text/javascript"
      ></script>
      <script
        src="assets/js/script.js"
        type="04c4e61fa7ce020bd917981d-text/javascript"
      ></script>
      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="04c4e61fa7ce020bd917981d-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e4e46dc148577","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default Provider_booking;
