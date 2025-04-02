import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import User_dashboard_sidebar from "./user-dashboard-sidebar";
import Footer from "./footer";
import Header from "./header";
import { db } from "./firebase"; // Import Firestore config
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function User_wallet() {
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState("");
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState(null);
  const [walletPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Passwordloading, setPasswordloading] = useState();
  const [userId, setUserId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedEmail = sessionStorage.getItem("userEmail");

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle Password Update
  const handlePasswordUpdate = async () => {
    setPasswordloading(true);
    if (!storedEmail) {
      toast.error("User email not found. Please log in again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    if (walletPassword !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", storedEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("User not found in Firestore.", {
          position: "bottom-right",
          autoClose: 3000,
        });
        return;
      }

      let userDocId;
      querySnapshot.forEach((doc) => (userDocId = doc.id));

      if (!userDocId) {
        toast.error("User document not found.", {
          position: "bottom-right",
          autoClose: 3000,
        });
        return;
      }

      const userRef = doc(db, "localhand-users", userDocId);
      await updateDoc(userRef, { walletPassword });

      // Close modal if exists
      const modalElement = document.querySelector('[data-bs-dismiss="modal"]');
      if (modalElement) modalElement.click();

      toast.success("Password updated successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setPasswordloading(false);
    }
  };

  // Handle Payment
  const handlePayment = async () => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (!storedEmail) {
      toast.error("User email not found. Please log in again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    const res = await loadRazorpay();
    if (!res) {
      toast.error(
        "Razorpay SDK failed to load. Check your internet connection.",
        {
          position: "bottom-right",
          autoClose: 3000,
        }
      );
      return;
    }

    try {
      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", storedEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("User not found in Firestore.", {
          position: "bottom-right",
          autoClose: 3000,
        });
        return;
      }

      let userDocId;
      querySnapshot.forEach((doc) => (userDocId = doc.id));

      if (!userDocId) {
        toast.error("User document not found.", {
          position: "bottom-right",
          autoClose: 3000,
        });
        return;
      }

      const options = {
        key: "",
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "LocalHand",
        description: "Wallet Top-up",
        handler: async (response) => {
          try {
            const userDocRef = doc(db, "localhand-users", userDocId);
            await updateDoc(userDocRef, {
              walletBalance: increment(Number(amount)),
            });

            // Close modal if exists
            const modalElement = document.querySelector(
              '[data-bs-dismiss="modal"]'
            );
            if (modalElement) modalElement.click();

            toast.success("Payment successful! Wallet updated.", {
              position: "bottom-right",
              autoClose: 3000,
            });
          } catch (error) {
            console.error("Error updating wallet balance:", error);
            toast.error("Failed to update wallet balance.", {
              position: "bottom-right",
              autoClose: 3000,
            });
          }
        },
        prefill: {
          name: "User Name",
          email: storedEmail,
          contact: "9999999999",
        },
        theme: {
          color: "#0A67F2",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("An error occurred. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {

    const fetchUserDetails = async () => {
      if (!storedEmail) return;

      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", storedEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Get the first matching document
        setUserId(userDoc.id); // Store document ID separately
      }
    };

    const fetchBookings = async () => {
      try {
        const bookingsQuery = query(
          collection(db, "bookings"),
          where("userId", "==", userId)
        );
        const bookingsSnapshot = await getDocs(bookingsQuery);

        const bookingsData = await Promise.all(
          bookingsSnapshot.docs.map(async (bookingDoc) => {
            const booking = bookingDoc.data();
            let providerData = null;
            let serviceName = "N/A";

            // Fetch provider details using providerId
            if (booking.providerId) {
              const providerRef = doc(db, "localhand-users", booking.providerId);
              const providerSnap = await getDoc(providerRef);

              if (providerSnap.exists()) {
                providerData = providerSnap.data();
              }
            }

            // Fetch service details using serviceId and providerId
            if (booking.providerId && booking.serviceId) {
              const serviceRef = doc(db, `localhand-users/${booking.providerId}/services`, booking.serviceId);
              const serviceSnap = await getDoc(serviceRef);

              if (serviceSnap.exists()) {
                serviceName = serviceSnap.data().serviceTitle || "N/A";
              }
            }

            return {
              ...booking,
              provider: providerData,
              serviceName: serviceName,
            };
          })
        );

        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails()
    fetchBookings();
  }, [userId]);

  return (
    <>
      <Header />
      <ToastContainer />

      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Wallet</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home-2"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item">Customer</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Wallet
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
                <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                  <h4>Wallet</h4>

                  <div>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-dark btn-sm d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#create-password"
                    >
                      <i className="ti ti-square-rounded-plus me-1"></i>Create
                      Password
                    </a>
                  </div>
                  <div>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-dark btn-sm d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#add-wallet"
                    >
                      <i className="ti ti-square-rounded-plus me-1"></i>Add
                      Wallet
                    </a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg col-md-3">
                    <div className="card p-3">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <span className="wallet-icon bg-gray rounded-circle d-flex align-items-center justify-content-center">
                            <i className="ti ti-wallet"></i>
                          </span>
                        </div>
                        <div>
                          <span className="fs-13 text-gray text-truncate">
                            Wallet Balance
                          </span>
                          <h6 className="fs-18">7200</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h6>Wallet Transactions</h6>
                </div>
                <div className="row">
                  <div className="col-12 ">
                    <div className="table-resposnive border">
                      <table className="table mb-0">
                        <thead className="thead-light">
                          <tr>
                            <th>Service Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Provider Name</th>
                            <th>Provider Number</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.length > 0 ? (
                            bookings.map((booking, index) => (
                              <tr key={index}>
                                 <td>{booking.serviceName}</td>
                                <td>{booking.totalAmount || "N/A"}</td>
                                <td>{booking.appointmentDate || "N/A"}</td>
                                <td>{booking.provider?.name || "N/A"}</td>
                                <td>{booking.provider?.phone || "N/A"}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center">
                                No bookings found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <p>Show</p>
                    <div className="dropdown mx-2">
                      <a
                        href="javascript:void(0);"
                        className="dropdown-toggle bg-light-600 "
                        data-bs-toggle="dropdown"
                      >
                        07
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            1
                          </a>
                        </li>
                      </ul>
                    </div>
                    <p>entries</p>
                  </div>
                  <nav aria-label="Page navigation">
                    <ul className="paginations d-flex justify-content-center align-items-center">
                      <li className="me-3">1 - 07 of 10</li>
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
                          className="page-link-1 d-flex justify-content-center align-items-center "
                          href="javascript:void(0);"
                        >
                          2
                        </a>
                      </li>
                      <li className="page-item ">
                        <a
                          className="page-link-1 d-flex justify-content-center align-items-center "
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
      </div>

      <Footer />

      <div
        className="modal fade wallet-modal"
        id="add-wallet"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between border-0">
              <h5>Add Wallet</h5>
              {message && (
                <div
                  className={`alert ${
                    messageType === "success" ? "alert-success" : "alert-danger"
                  } mb-0 py-2 px-3`}
                  role="alert"
                >
                  {message}
                </div>
              )}
              <a href="#" data-bs-dismiss="modal" aria-label="Close">
                <i className="ti ti-circle-x-filled fs-20"></i>
              </a>
            </div>
            <div className="modal-body pb-0">
              <form>
                <div className="mb-0">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn bg-gray"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={handlePayment}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade wallet-modal"
        id="create-password"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between border-0">
              <h5>Create Password</h5>

              <a href="#" data-bs-dismiss="modal" aria-label="Close">
                <i className="ti ti-circle-x-filled fs-20"></i>
              </a>
            </div>
            <div className="modal-body pb-0">
              <form>
                <div className="mb-0">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={walletPassword}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-0">
                  <label htmlFor="confirmpassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmpassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn bg-gray"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={handlePasswordUpdate}
                disabled={Passwordloading}
                data-bs-dismiss="modal"
              >
                {Passwordloading ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <div
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></div>
                    Submitting...
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
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

      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="39f1ea1bf868d23608ea5292-text/javascript"
      ></script>

      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="39f1ea1bf868d23608ea5292-text/javascript"
      ></script>

      <script
        src="assets/plugins/theia-sticky-sidebar/ResizeSensor.js"
        type="39f1ea1bf868d23608ea5292-text/javascript"
      ></script>
      <script
        src="assets/plugins/theia-sticky-sidebar/theia-sticky-sidebar.js"
        type="39f1ea1bf868d23608ea5292-text/javascript"
      ></script>

      <script
        src="assets/js/wow.min.js"
        type="39f1ea1bf868d23608ea5292-text/javascript"
      ></script>

      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="39f1ea1bf868d23608ea5292-text/javascript"
      ></script>

      <script
        src="assets/plugins/owlcarousel/owl.carousel.min.js"
        type="39f1ea1bf868d23608ea5292-text/javascript"
      ></script>

      <script
        src="assets/js/cursor.js"
        type="39f1ea1bf868d23608ea5292-text/javascript"
      ></script>

      <script
        src="assets/js/script.js"
        type="39f1ea1bf868d23608ea5292-text/javascript"
      ></script>
      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="39f1ea1bf868d23608ea5292-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e4e3b9de88577","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>
    </>
  );
}

export default User_wallet;
