import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import User_dashboard_sidebar from "./user-dashboard-sidebar";
import Footer from "./footer";
import Header from "./header";

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
import { toast } from "react-toastify"; // Import toast if not already imported
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function User_reviews() {
  const [count, setCount] = useState(0);
  const [userDocId, setUserId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [user, setUser] = useState(null);
  const storedEmail = sessionStorage.getItem("userEmail");
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch Provider Data

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

// Fetch Reviews
const fetchReviews = async () => {
  setLoading(true);
  if (!userDocId) return; // Ensure userDocId is set

  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("userDocId", "==", userDocId));
    const querySnapshot = await getDocs(q);

    const reviewsData = await Promise.all(
      querySnapshot.docs.map(async (reviewDoc) => {
        const review = reviewDoc.data();
        const reviewId = reviewDoc.id;

        // Fetch user details
        const userRef = doc(db, `localhand-users/${review.providerDocId}`);
        const userSnap = await getDoc(userRef);
        const userName = userSnap.exists() ? userSnap.data().name : "Unknown User";

        // Fetch service details
        const serviceRef = doc(
          db,
          `localhand-users/${review.providerDocId}/services/${review.servicesDocId}`
        );
        const serviceSnap = await getDoc(serviceRef);
        const serviceName = serviceSnap.exists() ? serviceSnap.data().serviceTitle : "Unknown Service";
        const serviceimg = serviceSnap.exists() ? serviceSnap.data().images[0] : "";

        return {
          id: reviewId,
          ...review,
          userName,
          serviceName,
          serviceimg,
        };
      })
    );

    fetchUserDetails();
    setReviews(reviewsData);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    toast.error("Failed to fetch reviews!", { position: "bottom-right", autoClose: 3000 }); // ❌ Error message
  } finally {
    setLoading(false);
  }
};

// Delete Review
const handleDeleteReview = async () => {
  if (!selectedReviewId) return;

  try {
    await deleteDoc(doc(db, "reviews", selectedReviewId));
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== selectedReviewId)
    );
    toast.success("Review deleted successfully!", { position: "bottom-right", autoClose: 3000 }); // ✅ Success message
  } catch (error) {
    console.error("Error deleting review:", error);
    toast.error("Failed to delete review!", { position: "bottom-right", autoClose: 3000 }); // ❌ Error message
  }
};


  // Fetch Provider Data when email is available
  useEffect(() => {
    if (storedEmail) {
      fetchUserDetails(storedEmail);
    }
  }, [storedEmail]);

  // Fetch Reviews when userDocId is set
  useEffect(() => {
    if (userDocId) {
      fetchReviews();
    }
  }, [userDocId]);

  return (
    <>
      <Header />
      <ToastContainer />

      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Reviews</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home-2"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item">Customer</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Reviews
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
                  <h4 className="mb-3">Reviews</h4>
                  <div className="d-flex align-items-center">
                    <p className="text-gray-6 me-2 fs-14 mb-0">Sort</p>
                    <div className="dropdown me-2">
                      <a
                        href="javascript:void(0);"
                        className="dropdown-toggle "
                        data-bs-toggle="dropdown"
                      >
                        Most helful
                      </a>
                      <div className="dropdown-menu">
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item active"
                        >
                          Recently Added
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row ">
                  {" "}
                  <div>
                    {loading ? (
                      <div className="spinner-container">
                        <div className="spinner"></div>
                      </div>
                    ) : (
                      <div>
                        {reviews.map((review, index) => (
                          <div key={index} className="col-xxl-12 col-lg-12">
                            <div className="card shadow-none">
                              <div className="card-body">
                                <div className="d-md-flex align-items-center">
                                  <div className="review-widget d-sm-flex flex-fill">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                      <div className="d-flex">
                                        <span className="review-img me-2">
                                          <img
                                            alt="User Image"
                                            className="rounded img-fluid"
                                            src={review.serviceimg}
                                          />
                                        </span>
                                        <div>
                                          <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="d-flex align-items-center">
                                              <h6 className="fs-14 me-2">
                                                {review.serviceName}
                                              </h6>
                                              {[...Array(review.rating)].map(
                                                (_, index) => (
                                                  <span key={index}>
                                                    <i className="ti ti-star-filled text-warning" />
                                                  </span>
                                                )
                                              )}
                                            </div>
                                          </div>
                                          <div className="d-flex align-items-center">
                                            <span className="avatar avatar-sm me-2">
                                              <img
                                                alt="Img"
                                                className="rounded-circle "
                                                src="assets/img/user/user-10.jpg"
                                              />
                                            </span>
                                            <h6 className="fs-13 me-2">
                                              {review.userName},
                                            </h6>
                                            <span className="fs-12">
                                              {new Date(
                                                review.timestamp?.seconds * 1000
                                              ).toLocaleString("en-US", {
                                                month: "long",
                                                day: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                              })}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="user-icon d-inline-flex">
                                    <a
                                      className=""
                                      data-bs-target="#del-review"
                                      data-bs-toggle="modal"
                                      href="#"
                                      onClick={() =>
                                        setSelectedReviewId(review.id)
                                      }
                                    >
                                      <i className="ti ti-trash" />
                                    </a>
                                  </div>
                                </div>
                                <div>
                                  <p className="fs-14">{review.review}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <p className="mb-0">Show</p>
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

      <div className="modal fade custom-modal" id="del-review">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
              <h5 className="modal-title">Delete Review</h5>
              <a aria-label="Close" data-bs-dismiss="modal" href="#">
                <i className="ti ti-circle-x-filled fs-20" />
              </a>
            </div>
            <div className="modal-body">
              <div className="write-review">
                <p>Are you sure you want to delete this review?</p>
                <div className="modal-submit text-end">
                  <a
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                    href="#"
                  >
                    Cancel
                  </a>
                  <button
                    className="btn btn-dark"
                    type="button"
                    data-bs-dismiss="modal"
                    onClick={handleDeleteReview}
                  >
                    Yes
                  </button>
                </div>
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
            <div className="modal-header d-flex align-items-center justify-content-between  border-0">
              <h5>Add Wallet</h5>
              <a
                href="javascript:void(0);"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-circle-x-filled fs-20"></i>
              </a>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input type="text" className="form-control" id="amount" />
                </div>
              </form>
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

      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="d8387518ee8d3745e230a32c-text/javascript"
      ></script>

      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="d8387518ee8d3745e230a32c-text/javascript"
      ></script>

      <script
        src="assets/js/wow.min.js"
        type="d8387518ee8d3745e230a32c-text/javascript"
      ></script>

      <script
        src="assets/plugins/theia-sticky-sidebar/ResizeSensor.js"
        type="d8387518ee8d3745e230a32c-text/javascript"
      ></script>
      <script
        src="assets/plugins/theia-sticky-sidebar/theia-sticky-sidebar.js"
        type="d8387518ee8d3745e230a32c-text/javascript"
      ></script>

      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="d8387518ee8d3745e230a32c-text/javascript"
      ></script>

      <script
        src="assets/plugins/owlcarousel/owl.carousel.min.js"
        type="d8387518ee8d3745e230a32c-text/javascript"
      ></script>

      <script
        src="assets/js/cursor.js"
        type="d8387518ee8d3745e230a32c-text/javascript"
      ></script>

      <script
        src="assets/js/script.js"
        type="d8387518ee8d3745e230a32c-text/javascript"
      ></script>
      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="d8387518ee8d3745e230a32c-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e4e3e4c6a4019","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>
    </>
  );
}

export default User_reviews;
