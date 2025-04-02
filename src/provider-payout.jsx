import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Provider_header from "./provider-header";
import Provider_sidebar from "./provider-sidebar";
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

function Provider_payout() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(null);
  const [walletPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageType, setMessageType] = useState("");
  const [bookings, setBookings] = useState([]);
  const [providerDocId, setProviderDocId] = useState(null);
  const [refunds, setRefunds] = useState([]);
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);

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
          setProviderDocId(providerDocId); // Ensure providerDocId is updated

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
              const serviceSnap = await getDoc(serviceRef);

              // Fetch user details
              const userRef = doc(db, "localhand-users", bookingData.userId);
              const userSnap = await getDoc(userRef);

              return {
                id: docSnap.id,
                ...bookingData,
                service: serviceSnap.exists() ? serviceSnap.data() : null,
                user: userSnap.exists()
                  ? { ...userSnap.data(), id: userSnap.id }
                  : null,
              };
            })
          );

          setBookings(bookingsList); // Ensure bookings are updated
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();

    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);

    if (!providerDocId) return; // Ensure providerDocId is set before fetching

    const fetchRefunds = async () => {
      try {
        const refundsRef = collection(
          db,
          `localhand-users/${providerDocId}/refunds`
        );
        const snapshot = await getDocs(refundsRef);
        const refunds = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRefunds(refunds);
      } catch (error) {
        console.error("Error fetching refunds:", error);
      }
    };

    const fetchBalance = async () => {
      try {
        const providerRef = doc(db, `localhand-users/${providerDocId}`);
        const providerSnap = await getDoc(providerRef);
        if (providerSnap.exists()) {
          setBalance(providerSnap.data().walletBalance || 0);
        } else {
          setBalance(0);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(0);
      }
    };

    fetchRefunds();
    fetchBalance();
    setLoading(false);
  }, [providerDocId]); // Runs only when providerDocId is available

  const handlePasswordUpdate = async () => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (!storedEmail) {
      toast.error("User email not found. Please log in again.", { position: "bottom-right", autoClose: 3000 });
      return;
    }
  
    if (walletPassword !== confirmPassword) {
      toast.warning("Passwords do not match!", { position: "bottom-right", autoClose: 3000 });
      return;
    }
  
    const usersRef = collection(db, "localhand-users");
    const q = query(usersRef, where("email", "==", storedEmail));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      toast.error("User not found in Firestore.", { position: "bottom-right", autoClose: 3000 });
      return;
    }
  
    let userDocId;
    querySnapshot.forEach((doc) => {
      userDocId = doc.id;
    });
  
    try {
      const userRef = doc(db, "localhand-users", userDocId);
      await updateDoc(userRef, { walletPassword });
  
      // Close modal if exists
      const modalElement = document.querySelector('[data-bs-dismiss="modal"]');
      if (modalElement) {
        modalElement.click();
      }
  
      toast.success("Password updated successfully!", { position: "bottom-right", autoClose: 3000 });
    } catch (error) {
      toast.error("Failed to update password.", { position: "bottom-right", autoClose: 3000 });
      console.error("Error updating password:", error);
    }
  };
  

  return (
    <div className="provider-page">
      <div className="main-wrapper">
        <Provider_header />
        <Provider_sidebar />
        <ToastContainer/>
        <div className="page-wrapper">
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="content">
              <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
                <h4>Payout</h4>
              </div>

              <div className="row">
                <div className="col-xl-4 col-md-6 d-flex">
                  <div className="card w-100">
                    <div className="card-body d-flex align-items-center justify-content-between p-3">
                      <div className="d-flex align-items-center">
                        <span className="app-icon d-flex justify-content-center align-items-center bg-light rounded-circle fs-20 me-2">
                          <i className="ti ti-wallet"></i>
                        </span>
                        <div>
                          <span className="fs-14">Available Payout</span>
                          <h5>
                            <span>{balance}</span>
                          </h5>
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <a
                          href="provider-transaction.html"
                          className="btn btn-dark btn-sm mb-2"
                        >
                          Transactions
                        </a>
                        <a
                          href="#"
                          className="btn btn-light btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#withdraw"
                        >
                          Withdraw
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-md-6 d-flex">
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
                </div>
              </div>
              <h4>Transactions</h4>
              <br />
              <div className="row">
                <div className="provide-table manage-table">
                  <div className="table-responsive">
                    <table className="table  datatable">
                      <thead className="thead-light">
                        <tr>
                          <th>Customer Name</th>
                          <th>Service</th>
                          <th>Date</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking.id}>
                            <td>{booking.user.name}</td>
                            <td>
                              {booking.service?.serviceTitle || "Service Name"}
                            </td>
                            <td>
                              {new Date(
                                booking.appointmentDate
                              ).toLocaleDateString()}
                            </td>
                            <td className="text-success">
                              {booking.totalAmount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <br />
              <h4>Refunds</h4>
              <br />
              <div className="row">
                <div className="provide-table manage-table">
                  <div className="table-responsive">
                    <table className="table  datatable">
                      <thead className="thead-light">
                        <tr>
                          <th>Customer Name</th>
                          <th>Customer Number</th>
                          <th>Service</th>
                          <th>Date</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {refunds.map((refund) => (
                          <tr key={refund.id}>
                            <td>{refund.userName}</td>
                            <td>{refund.userPhone}</td>

                            <td>{refund.serviceName || "Service Name"}</td>
                            <td>
                              {refund.timestamp &&
                                refund.timestamp.toDate().toLocaleDateString()}
                            </td>
                            <td className="text-danger">{refund.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                {message && (
                  <div
                    className={`alert ${
                      messageType === "success"
                        ? "alert-success"
                        : "alert-danger"
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
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade wallet-modal"
          id="set-payout"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center justify-content-between  border-0">
                <h5>Set Your Payouts</h5>
                <a
                  href="javascript:void(0);"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-circle-x-filled fs-20"></i>
                </a>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="bank-selection">
                      <input
                        type="radio"
                        value="attach_link"
                        id="rolelink"
                        name="attachment"
                        checked=""
                      />
                      <label htmlFor="rolelink">
                        <img src="assets/img/icons/paypal.svg" alt="Paypal" />
                        <span className="role-check">
                          <i className="fa-solid fa-circle-check"></i>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="bank-selection">
                      <input
                        type="radio"
                        value="attach_link"
                        id="rolelink1"
                        name="attachment"
                      />
                      <label htmlFor="rolelink1">
                        <img src="assets/img/icons/stripe.svg" alt="Stripe" />
                        <span className="role-check">
                          <i className="fa-solid fa-circle-check"></i>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="bank-selection">
                      <input
                        type="radio"
                        value="attach_link"
                        id="rolelink2"
                        name="attachment"
                      />
                      <label htmlFor="rolelink2">
                        <img
                          src="assets/img/icons/bank-transfer.svg"
                          alt="image"
                        />
                        <span className="role-check">
                          <i className="fa-solid fa-circle-check"></i>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <form>
                  <div>
                    <label htmlFor="amount" className="form-label">
                      Card Number
                    </label>
                    <input type="text" id="amount" className="form-control" />
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
                <button type="button" className="btn btn-dark">
                  Submit
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
                        placeholder="*"
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
        <div
          className="modal fade wallet-modal"
          id="withdraw"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center justify-content-between  border-0">
                <h5>Withdraw</h5>
                <a
                  href="javascript:void(0);"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-circle-x-filled fs-20"></i>
                </a>
              </div>
              <div className="modal-body">
                <div className="bg-light border p-3 rounded mb-3">
                  <div className="row g-3">
                    <div className="col-lg-6">
                      <div>
                        <p className="mb-1">Available Balance</p>
                        <span className="text-dark">$180</span>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div>
                        <p className="mb-1">Payment Method</p>
                        <span className="text-dark">Paypal</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="form-label">Enter Amount</label>
                  <input type="text" className="form-control" />
                </div>
                <p className="d-flex align-items-center mt-2">
                  <i className="feather-info me-2"></i>Minimum withdraw amount
                  is $1.00
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn bg-gray"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-dark">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="86ef4b7953d0649a25603e25-text/javascript"
      ></script>

      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="86ef4b7953d0649a25603e25-text/javascript"
      ></script>

      <script
        src="assets/js/wow.min.js"
        type="86ef4b7953d0649a25603e25-text/javascript"
      ></script>

      <script
        src="assets/js/jquery.slimscroll.min.js"
        type="86ef4b7953d0649a25603e25-text/javascript"
      ></script>

      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="86ef4b7953d0649a25603e25-text/javascript"
      ></script>

      <script
        src="assets/plugins/moment/moment.html"
        type="86ef4b7953d0649a25603e25-text/javascript"
      ></script>
      <script
        src="assets/js/bootstrap-datetimepicker.min.js"
        type="86ef4b7953d0649a25603e25-text/javascript"
      ></script>

      <script
        src="assets/plugins/apexchart/apexcharts.min.js"
        type="86ef4b7953d0649a25603e25-text/javascript"
      ></script>
      <script
        src="assets/plugins/apexchart/chart-data.js"
        type="86ef4b7953d0649a25603e25-text/javascript"
      ></script>

      <script
        src="assets/plugins/countup/jquery.counterup.min.js"
        type="86ef4b7953d0649a25603e25-text/javascript"
      ></script>
      <script
        src="assets/plugins/countup/jquery.waypoints.min.js"
        type="86ef4b7953d0649a25603e25-text/javascript"
      >
        {" "}
      </script>

      <script
        src="assets/plugins/datatables/jquery.dataTables.min.js"
        type="86ef4b7953d0649a25603e25-text/javascript"
      ></script>
      <script
        src="assets/plugins/datatables/datatables.min.js"
        type="86ef4b7953d0649a25603e25-text/javascript"
      ></script>

      <script
        src="assets/plugins/fullcalendar/main.min.js"
        type="86ef4b7953d0649a25603e25-text/javascript"
      ></script>

      <script
        src="assets/js/script.js"
        type="86ef4b7953d0649a25603e25-text/javascript"
      ></script>
      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="86ef4b7953d0649a25603e25-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e4e483ba64019","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default Provider_payout;
