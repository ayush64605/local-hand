import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Booking_success from "./booking-success";
import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
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
import { db } from "./firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Booking_payment() {
  const [serviceData, setServiceData] = useState(null);
  const [provider, setProvider] = useState(null);
  const [walletPassword, setWalletPassword] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const storedEmail = sessionStorage.getItem("userEmail");
  const servicesDocId = sessionStorage.getItem("servicesDocId");
  const [couponCode, setCouponCode] = useState(""); // Store entered coupon code
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const bookingData =
    JSON.parse(sessionStorage.getItem("appointmentData")) || {};


    useEffect(() => {
      setLoading(true);
      const fetchServiceAndProvider = async () => {
        if (!servicesDocId) {
          toast.warn("No Service Selected");
          setServiceData({ error: "No Service Selected" });
          setLoading(false);
          return;
        }
    
        try {
          const usersRef = collection(db, "localhand-users");
          const usersSnapshot = await getDocs(usersRef);
    
          for (const userDoc of usersSnapshot.docs) {
            const servicesRef = collection(userDoc.ref, "services");
            const q = query(servicesRef, where("__name__", "==", servicesDocId));
            const serviceSnapshot = await getDocs(q);
    
            if (!serviceSnapshot.empty) {
              setServiceData(serviceSnapshot.docs[0].data());
              setProvider({ id: userDoc.id, ...userDoc.data() });
              return;
            }
          }
          toast.error("Service Not Found", {
            position: "bottom-right",
            autoClose: 3000,
          });
          setServiceData({ error: "Service Not Found" });
        } catch (error) {
          console.error("Error fetching service or provider:", error);
          toast.error("Failed to fetch service details", {
            position: "bottom-right",
            autoClose: 3000,
          });
        } finally {
          setLoading(false);
        }
      };
    
      fetchServiceAndProvider();
    }, [servicesDocId]);
    
    const validateCoupon = async (
      providerDocid,
      enteredCoupon,
      setMessage,
      setAppliedCoupon
    ) => {
      try {
        const couponsRef = collection(
          db,
          `localhand-users/${providerDocid}/services/${servicesDocId}/coupons/`
        );
        const snapshot = await getDocs(couponsRef);
    
        let couponFound = null;
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.code === enteredCoupon) {
            couponFound = { id: doc.id, ...data };
          }
        });
    
        if (!couponFound) {
          toast.error("Invalid coupon code", {
            position: "bottom-right",
            autoClose: 3000,
          });
          setMessage("Invalid coupon code.");
          setAppliedCoupon(null);
          return;
        }
    
        if (couponFound.useby >= couponFound.limit) {
          toast.warning("Coupon usage limit reached");
          setMessage("Coupon usage limit reached.");
          setAppliedCoupon(null);
          return;
        }
    
        toast.success(`Coupon applied! You saved $${couponFound.discount}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        setMessage(`Coupon applied! You saved $${couponFound.discount}`);
        setAppliedCoupon(couponFound);
      } catch (error) {
        console.error("Error validating coupon:", error);
        toast.error("An error occurred. Please try again.", {
          position: "bottom-right",
          autoClose: 3000,
        });
        setMessage("An error occurred. Please try again.");
        setAppliedCoupon(null);
      }
    };
    
    const handleProceedToPay = async () => {
      if (!storedEmail || !serviceData || !serviceData.total) {
        toast.error("Missing data for payment.", {
          position: "bottom-right",
          autoClose: 3000,
        });
        return;
      }
    
      if (!provider || !provider.id) {
        toast.error("Provider details are missing.", {
          position: "bottom-right",
          autoClose: 3000,
        });
        return;
      }
    
      try {
        const userQuery = query(
          collection(db, "localhand-users"),
          where("email", "==", storedEmail)
        );
        const userSnapshot = await getDocs(userQuery);
    
        if (userSnapshot.empty) {
          toast.error("User not found.", {
            position: "bottom-right",
            autoClose: 3000,
          });
          return;
        }
    
        const userDoc = userSnapshot.docs[0];
        const userDocRef = doc(db, "localhand-users", userDoc.id);
        const userData = userDoc.data();
    
        if (!userData.walletPassword || userData.walletPassword !== walletPassword) {
          toast.error("Incorrect wallet password", {
            position: "bottom-right",
            autoClose: 3000,
          });
          return;
        }
    
        let finalTotal = serviceData.total;
        if (appliedCoupon && appliedCoupon.discount) {
          finalTotal = serviceData.total - appliedCoupon.discount;
        }
    
        if (userData.walletBalance < finalTotal) {
          toast.error("Insufficient wallet balance", {
            position: "bottom-right",
            autoClose: 3000,
          });
          return;
        }
    
        const providerDocRef = doc(db, "localhand-users", provider.id);
        const providerDocSnap = await getDoc(providerDocRef);
        if (!providerDocSnap.exists()) {
          toast.error("Provider not found", {
            position: "bottom-right",
            autoClose: 3000,
          });
          return;
        }
    
        // Deduct amount from user wallet
        await updateDoc(userDocRef, {
          walletBalance: userData.walletBalance - finalTotal,
        });
    
        // Add amount to provider wallet
        await updateDoc(providerDocRef, {
          walletBalance: (providerDocSnap.data().walletBalance || 0) + finalTotal,
        });
    
        // Add booking details
        await addDoc(collection(db, "bookings"), {
          userId: userDoc.id,
          providerId: provider.id,
          serviceId: servicesDocId,
          appointmentDate: bookingData.appointmentDate,
          appointmentTime: bookingData.appointmentTime,
          totalAmount: finalTotal,
          status: "Confirmed",
          createdAt: new Date(),
          address: bookingData.address,
          city: bookingData.city,
          state: bookingData.state,
          postalcode: bookingData.code,
        });
    
        // If a coupon is applied, increment its use count
        if (appliedCoupon) {
          const couponDocRef = doc(
            db,
            `localhand-users/${provider.id}/services/${servicesDocId}/coupons`,
            appliedCoupon.id
          );
          await updateDoc(couponDocRef, {
            useby: appliedCoupon.useby + 1,
          });
        }
    
        toast.success("Payment successful! Booking confirmed.", {
          position: "bottom-right",
          autoClose: 3000,
        });
        window.location.href = "/booking-success";
      } catch (error) {
        console.error("Error processing payment:", error);
        toast.error("Something went wrong. Please try again.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    };
    

  return (
    <div>
      <Header />
      <ToastContainer/>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Bookings</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home-2" />
                    </a>
                  </li>
                  <li className="breadcrumb-item">Customer</li>
                  <li aria-current="page" className="breadcrumb-item active">
                    Bookings
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="breadcrumb-bg">
            <img
              alt="Img"
              className="breadcrumb-bg-1"
              src="assets/img/bg/breadcrumb-bg-01.png"
            />
            <img
              alt="Img"
              className="breadcrumb-bg-2"
              src="assets/img/bg/breadcrumb-bg-02.png"
            />
          </div>
        </div>
      </div>
      <div className="page-wrapper">
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <ul className="step-register row">
                  <li className="activate col-md-4">
                    <div className="multi-step-icon">
                      <span>
                        <img
                          alt="img"
                          src="assets/img/icons/calendar-icon.svg"
                        />
                      </span>
                    </div>
                    <div className="multi-step-info">
                      <h6>Appointment</h6>
                      <p>Choose time & date for the service</p>
                    </div>
                  </li>
                  <li className="active col-md-4">
                    <div className="multi-step-icon">
                      <span>
                        <img alt="img" src="assets/img/icons/wallet-icon.svg" />
                      </span>
                    </div>
                    <div className="multi-step-info">
                      <h6>Payment</h6>
                      <p>Select Payment Gateway</p>
                    </div>
                  </li>
                  <li className="col-md-4">
                    <div className="multi-step-icon">
                      <span>
                        <img alt="img" src="assets/img/icons/book-done.svg" />
                      </span>
                    </div>
                    <div className="multi-step-info">
                      <h6>Done </h6>
                      <p>Completion of Booking</p>
                    </div>
                  </li>
                </ul>
                <div className="row">
                  <div className="col-lg-6">
                    <h5 className="pay-title">Wallet Password</h5>
                    <div className="row g-3">
                      <div className="col-lg-12">
                        <div className="payment-list">
                          <div className="row align-items-center">
                            <div className="col-md-12">
                              <div className="mb-3">
                                <input
                                  className="form-control"
                                  placeholder="Wallet Password"
                                  type="text"
                                  value={walletPassword}
                                  onChange={(e) =>
                                    setWalletPassword(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {loading ? (
                    <div className="spinner-container">
                      <div className="spinner"></div>
                    </div>
                  ) : (
                    <div className="col-lg-6">
                      <h5 className="pay-title">Booking Summary</h5>
                      <div className="summary-box">
                        <div className="booking-info">
                          <div className="service-book">
                            <div className="service-book-img">
                              <img
                                alt="img"
                                src="assets/img/services/rated-service-07.jpg"
                              />
                            </div>
                            <div className="serv-profile">
                              <span className="badge badge-soft-primary">
                                {serviceData
                                  ? serviceData.category || "Service Not Found"
                                  : "Loading..."}
                              </span>
                              <h2>
                                {serviceData
                                  ? serviceData.serviceTitle ||
                                    "Service Not Found"
                                  : "Loading..."}
                              </h2>
                              <ul>
                                <li className="serv-pro">
                                  <img
                                    alt="img"
                                    src="assets/img/profiles/avatar-01.jpg"
                                  />
                                </li>
                                <li className="serv-review">
                                  <i className="fa-solid fa-star" />{" "}
                                  <span>4.9 </span>
                                  (255 reviews)
                                </li>
                                <li className="service-map">
                                  <i className="feather-map-pin" /> Alabama, USA
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="booking-summary">
                          <ul className="booking-date">
                            <li>
                              Date{" "}
                              <span>
                                {bookingData
                                  ? bookingData.appointmentDate ||
                                    "Service Not Found"
                                  : "Loading..."}
                              </span>
                            </li>
                            <li>
                              Time{" "}
                              <span>
                                {bookingData
                                  ? bookingData.appointmentTime ||
                                    "Service Not Found"
                                  : "Loading..."}
                              </span>
                            </li>
                            <li>
                              Provider Name{" "}
                              <span>
                                {provider
                                  ? provider.name || "Service Not Found"
                                  : "Loading..."}
                              </span>
                            </li>
                          </ul>
                          <ul className="booking-date">
                            <li>
                              Subtotal{" "}
                              <span>
                                {serviceData
                                  ? serviceData.total || "Service Not Found"
                                  : "Loading..."}
                              </span>
                            </li>
                            <li>
                              Coupoun Discount{" "}
                              <span>
                                {appliedCoupon
                                  ? `${appliedCoupon.discount}`
                                  : "No coupon selected"}
                              </span>
                            </li>
                          </ul>
                          <div className="booking-total">
                            <ul className="booking-total-list">
                              <li>
                                <span>Total</span>
                                <span className="total-cost">
                                  {serviceData
                                    ? appliedCoupon
                                      ? (
                                          serviceData.total -
                                          appliedCoupon.discount
                                        ).toFixed(2)
                                      : serviceData.total.toFixed(2)
                                    : "Loading..."}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="booking-coupon">
                        <div className="form-group w-100">
                          <div className="coupon-icon">
                            <input
                              className="form-control"
                              placeholder="Coupon Code"
                              type="text"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                            />

                            <span>
                              <img
                                alt="image"
                                src="assets/img/icons/coupon-icon.svg"
                              />
                            </span>
                          </div>
                        </div>
                        <div className="form-group">
                          <button
                            className="btn btn-dark"
                            onClick={() =>
                              validateCoupon(
                                provider.id,
                                couponCode,
                                setMessage,
                                setAppliedCoupon
                              )
                            }
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                      <div className="save-offer">
                        <p>
                          <i className="fa-solid fa-circle-check" /> {message}
                        </p>
                      </div>
                      <div className="booking-pay">
                        <button
                          className="btn btn-dark me-3 w-100"
                          onClick={handleProceedToPay}
                        >
                          Proceed to Pay{" "}
                          {serviceData
                            ? appliedCoupon
                              ? (
                                  serviceData.total - appliedCoupon.discount
                                ).toFixed(2)
                              : serviceData.total.toFixed(2)
                            : "Loading..."}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="74f32707fde93726e83b11fd-text/javascript"
      />
      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="74f32707fde93726e83b11fd-text/javascript"
      />
      <script
        src="assets/js/wow.min.js"
        type="74f32707fde93726e83b11fd-text/javascript"
      />
      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="74f32707fde93726e83b11fd-text/javascript"
      />
      <script
        src="assets/js/moment.js"
        type="74f32707fde93726e83b11fd-text/javascript"
      />
      <script
        src="assets/js/bootstrap-datetimepicker.min.js"
        type="74f32707fde93726e83b11fd-text/javascript"
      />
      <script
        src="assets/plugins/owlcarousel/owl.carousel.min.js"
        type="74f32707fde93726e83b11fd-text/javascript"
      />
      <script
        src="assets/js/cursor.js"
        type="74f32707fde93726e83b11fd-text/javascript"
      />
      <script
        src="assets/js/script.js"
        type="74f32707fde93726e83b11fd-text/javascript"
      />
      <script
        data-cf-settings="74f32707fde93726e83b11fd-|49"
        defer
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
      />
      <script
        crossOrigin="anonymous"
        data-cf-beacon='{"rayId":"908e4e7bbaa78577","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        defer
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
      />
    </div>
  );
}

export default Booking_payment;
