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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Provider_review() {
  const [providerDocId, setProviderDocId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const storedEmail = sessionStorage.getItem("userEmail");
  const [loading, setLoading] = useState(true);

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
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false); // Stop loading if provider not found
    }
  };

  // Fetch Reviews
  const fetchReviews = async () => {
    if (!providerDocId) return; // Ensure providerDocId is set

    try {
      setLoading(true); // Start loading
      const reviewsRef = collection(db, "reviews");
      const q = query(reviewsRef, where("providerDocId", "==", providerDocId));
      const querySnapshot = await getDocs(q);

      const reviewsData = await Promise.all(
        querySnapshot.docs.map(async (reviewDoc) => {
          const review = reviewDoc.data();
          const reviewId = reviewDoc.id;

          // Fetch user details
          const userRef = doc(db, `localhand-users/${review.userDocId}`);
          const userSnap = await getDoc(userRef);
          const userName = userSnap.exists()
            ? userSnap.data().name
            : "Unknown User";

          // Fetch service details
          const serviceRef = doc(
            db,
            `localhand-users/${review.providerDocId}/services/${review.servicesDocId}`
          );
          const serviceSnap = await getDoc(serviceRef);
          const serviceName = serviceSnap.exists()
            ? serviceSnap.data().serviceTitle
            : "Unknown Service";
          const serviceimg = serviceSnap.exists()
            ? serviceSnap.data().images[0]
            : "";

          return {
            id: reviewId,
            ...review,
            userName,
            serviceName,
            serviceimg,
          };
        })
      );

      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false); // Stop loading after fetching reviews
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
      toast.success("Review deleted successfully!", { position: "bottom-right", autoClose: 3000 });
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review.", { position: "bottom-right", autoClose: 3000 });
    }
  };
  // Fetch Provider Data when email is available
  useEffect(() => {
    if (storedEmail) {
      fetchProviderData(storedEmail);
    }
  }, [storedEmail]);

  // Fetch Reviews when providerDocId is set
  useEffect(() => {
    if (providerDocId) {
      fetchReviews();
    }
  }, [providerDocId]);

  return (
    <div className="provider-page">
      <div>
        <div className="main-wrapper">
          <Provider_header />
          <Provider_sidebar />
          <ToastContainer/>
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="page-wrapper">
              <div className="content container-fluid">
                <div className="row">
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
                    <h4>Reviews</h4>
                    <div className="d-flex align-items-center">
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
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                          >
                            Oldest
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row ">
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
                                onClick={() => setSelectedReviewId(review.id)}
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
                <div className="d-flex justify-content-between align-items-center">
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
          )}

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
        </div>
        <script
          src="assets/js/jquery-3.7.1.min.js"
          type="c843938d17d20f71126f7778-text/javascript"
        />
        <script
          src="assets/js/bootstrap.bundle.min.js"
          type="c843938d17d20f71126f7778-text/javascript"
        />
        <script
          src="assets/js/wow.min.js"
          type="c843938d17d20f71126f7778-text/javascript"
        />
        <script
          src="assets/js/jquery.slimscroll.min.js"
          type="c843938d17d20f71126f7778-text/javascript"
        />
        <script
          src="assets/plugins/select2/js/select2.min.js"
          type="c843938d17d20f71126f7778-text/javascript"
        />
        <script
          src="assets/plugins/moment/moment.html"
          type="c843938d17d20f71126f7778-text/javascript"
        />
        <script
          src="assets/js/bootstrap-datetimepicker.min.js"
          type="c843938d17d20f71126f7778-text/javascript"
        />
        <script
          src="assets/plugins/datatables/jquery.dataTables.min.js"
          type="c843938d17d20f71126f7778-text/javascript"
        />
        <script
          src="assets/plugins/datatables/datatables.min.js"
          type="c843938d17d20f71126f7778-text/javascript"
        />
        <script
          src="assets/plugins/fullcalendar/main.min.js"
          type="c843938d17d20f71126f7778-text/javascript"
        />
        <script
          src="assets/js/script.js"
          type="c843938d17d20f71126f7778-text/javascript"
        />
        <script
          data-cf-settings="c843938d17d20f71126f7778-|49"
          defer
          src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        />
        <script
          crossOrigin="anonymous"
          data-cf-beacon='{"rayId":"908e4e5a0e818577","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
          defer
          integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
          src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        />
      </div>
      ;
    </div>
  );
}

export default Provider_review;
