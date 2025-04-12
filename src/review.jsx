import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./header";
import Siderbar from "./sidebar";
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

function Review() {
  const [count, setCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    setLoading(true); // Set loading to true before fetching starts
  
    try {
      const reviewsRef = collection(db, "reviews");
      const q = query(reviewsRef);
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        setReviews([]); // Set empty state if no reviews found
        setLoading(false);
        return;
      }
  
      const reviewsData = await Promise.all(
        querySnapshot.docs.map(async (reviewDoc) => {
          const review = reviewDoc.data();
          const reviewId = reviewDoc.id;
  
          try {
            // Fetch user details
            const userRef = doc(db, `localhand-users/${review.userDocId}`);
            const userSnap = await getDoc(userRef);
            const userName = userSnap.exists() ? userSnap.data().name : "Unknown User";
  
            // Fetch provider details
            const providerRef = doc(db, `localhand-users/${review.providerDocId}`);
            const providerSnap = await getDoc(providerRef);
            const providerName = providerSnap.exists() ? providerSnap.data().name : "Unknown Provider";
            const providerimage = providerSnap.exists() ? providerSnap.data().profileImage : "Unknown Provider";

            // Fetch service details
            const serviceRef = doc(db, `localhand-users/${review.providerDocId}/services/${review.servicesDocId}`);
            const serviceSnap = await getDoc(serviceRef);
            const serviceName = serviceSnap.exists() ? serviceSnap.data().serviceTitle : "Unknown Service";
            const serviceimg = serviceSnap.exists() ? serviceSnap.data().images?.[0] || "" : "";
            const userimage = providerSnap.exists() ? providerSnap.data().profileImage : "Unknown Provider";

            return {
              id: reviewId,
              ...review,
              userName,
              providerName,
              serviceName,
              serviceimg,
              providerimage,
              userimage
            };
          } catch (err) {
            console.error("Error fetching additional details:", err);
            return {
              id: reviewId,
              ...review,
              userName: "Unknown User",
              providerName: "Unknown Provider",
              serviceName: "Unknown Service",
              serviceimg: "",
            };
          }
        })
      );
  
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false); // Set loading to false only after all data is loaded
    }
  };
  
  useEffect(() => {
    fetchReviews();
  }, []); // Use empty dependency array to fetch only once when the component mounts
  
  // Delete Review
  const handleDeleteReview = async () => {
    if (!selectedReviewId) return;

    try {
      await deleteDoc(doc(db, "reviews", selectedReviewId));
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== selectedReviewId)
      );
      toast.success("Review deleted successfully!!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Error deleting review!!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

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
          <ToastContainer/>
          <div className="page-wrapper page-settings">
            <div className="content">
              <div className="content-page-header content-page-headersplit mb-0">
                <h5>Reviews </h5>
                <div className="list-btn">
                  <ul>
                    <li>
                      <div className="filter-sorting">
                        <ul>
                          <li>
                            <a
                              className="filter-sets"
                              href="javascript:void(0);"
                            >
                              <i className="fe fe-filter me-2" />
                              Filter
                            </a>
                          </li>
                          <li>
                            <span>
                              <img
                                alt="img"
                                className="me-2"
                                src="assets/img/icons/sort.svg"
                              />
                            </span>
                            <div className="review-sort">
                              <select className="select">
                                <option>{`A -> Z`}</option>
                                <option>{`Z -> A`}</option>
                              </select>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-12 ">
                  <div className="table-resposnive table-div">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Provider </th>
                          <th>User</th>
                          <th>Service</th>
                          <th>Ratings</th>
                          <th>Comments</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews.map((review, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
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
                            </td>
                            <td>
                              <a
                                className="table-profileimage"
                                href="javascript:void(0);"
                              >
                                <img
                                  alt="img"
                                  className="me-2"
                                  src={review.providerimage}
                                />
                                <span>{review.providerName}</span>
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
                                  src={review.providerimage}
                                />
                                <span>{review.userName}</span>
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
                                  src={review.serviceimg}
                                />
                                <span>{review.serviceName}</span>
                              </a>
                            </td>
                            <td>
                              <td>
                                {[...Array(review.rating)].map((_, index) => (
                                  <span key={index}>
                                    <i
                                      className="fas fa-star filled"
                                      style={{ color: "#FFCC08" }}
                                    />
                                  </span>
                                ))}
                              </td>
                            </td>
                            <td>{review.review}</td>
                            <td>
                              <div className="table-actions d-flex">
                                <button
                                  className="btn delete-table"
                                  data-bs-target="#delete-review"
                                  data-bs-toggle="modal"
                                  type="button"
                                  onClick={() => setSelectedReviewId(review.id)}
                                >
                                  <i className="fe fe-trash-2" />
                                </button>
                              </div>
                            </td>
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

      <div className="modal fade" id="delete-review">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                aria-label="Close"
                className="btn-close"
                data-bs-dismiss="modal"
                type="button"
              />
            </div>
            <div className="modal-body pt-0">
              <div className="text-center">
                <i className="fe fe-trash-2 text-danger fs-1" />
                <div className="mt-4">
                  <h4>Delete Category?</h4>
                  <p className="text-muted mb-0">
                    Are you sure want to delete this?
                  </p>
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center mt-4">
                <button
                  className="btn w-sm btn-secondary"
                  data-bs-dismiss="modal"
                  type="button"
                >
                  Close
                </button>
                <button
                  className="btn w-sm btn-danger"
                  type="button"
                  onClick={handleDeleteReview}
                >
                  Yes, Delete It!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        data-cfasync="false"
        src="../../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
      />
      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="978fcf567b38754c2270064e-text/javascript"
      />
      <script
        src="assets/js/select2.min.js"
        type="978fcf567b38754c2270064e-text/javascript"
      />
      <script
        src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"
        type="978fcf567b38754c2270064e-text/javascript"
      />
      <script
        src="assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
        type="978fcf567b38754c2270064e-text/javascript"
      />
      <script
        src="assets/js/feather.min.js"
        type="978fcf567b38754c2270064e-text/javascript"
      />
      <script
        src="assets/js/jquery.dataTables.min.js"
        type="978fcf567b38754c2270064e-text/javascript"
      />
      <script
        src="assets/plugins/slimscroll/jquery.slimscroll.min.js"
        type="978fcf567b38754c2270064e-text/javascript"
      />
      <script
        src="assets/plugins/sweetalert/sweetalert2.all.min.js"
        type="978fcf567b38754c2270064e-text/javascript"
      />
      <script
        src="assets/plugins/sweetalert/sweetalerts.min.js"
        type="978fcf567b38754c2270064e-text/javascript"
      />
      <script
        src="assets/js/admin.js"
        type="978fcf567b38754c2270064e-text/javascript"
      />
      <script
        data-cf-settings="978fcf567b38754c2270064e-|49"
        defer
        src="../../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
      />
      <script
        crossOrigin="anonymous"
        data-cf-beacon='{"rayId":"908e597e8c6547d6","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        defer
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
      />
    </div>
  );
}

export default Review;
