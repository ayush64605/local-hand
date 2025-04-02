import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import User_dashboard_sidebar from "./user-dashboard-sidebar";
import Header from "./header";
import { Link } from "react-router-dom";
import Footer from "./footer";
import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";

function Favorite() {
  const [count, setCount] = useState(0);
  const [favoriteServices, setFavoriteServices] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const storedEmail = sessionStorage.getItem("userEmail");
  const [loading, setLoading] = useState(true); // Add loading state

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

    const fetchFavoriteServices = async () => {
      setLoading(true);

      if (!userId) return;
      try {
        const favRef = collection(db, `localhand-users/${userId}/favorites`);
        const favSnapshot = await getDocs(favRef);
        let servicesArray = [];

        for (const favDoc of favSnapshot.docs) {
          const serviceId = favDoc.id;
          const providerDocsRef = collection(db, "localhand-users");
          const q = query(providerDocsRef, where("role", "==", "provider"));
          const providerSnapshot = await getDocs(q);

          for (const providerDoc of providerSnapshot.docs) {
            const providerId = providerDoc.id;
            const providerData = providerDoc.data(); // Extract the data
            const companyName = providerData.company || "Company Name";
            const serviceRef = doc(
              db,
              `localhand-users/${providerId}/services/${serviceId}`
            );
            const serviceSnap = await getDoc(serviceRef);

            if (serviceSnap.exists()) {
              servicesArray.push({
                id: serviceId,
                ...serviceSnap.data(),
                company: companyName,
              });
              break; // Stop checking other providers once we find the matching service
            }
          }
        }

        setFavoriteServices(servicesArray);
      } catch (error) {
        console.error("Error fetching favorite services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
    fetchFavoriteServices();
  }, [userId]);

  return (
    <>
      <Header />
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Favourites</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home-2"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item">Customer</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Favourites
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
                  <h4>Favorites</h4>
                  <div className="d-flex align-items-center">
                    <span className="text-dark me-2">Sort</span>
                    <div className="dropdown me-2">
                      <a
                        href="javascript:void(0);"
                        className="dropdown-toggle bg-light-300 "
                        data-bs-toggle="dropdown"
                      >
                        Newly Added
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
                    <a
                      href="javascript:void(0);"
                      className="tags d-flex justify-content-center align-items-center border  rounded me-2"
                    >
                      <i className="ti ti-calendar"></i>
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="tags d-flex justify-content-center align-items-center border rounded"
                    >
                      <i className="ti ti-adjustments-alt"></i>
                    </a>
                  </div>
                </div>
                <div className="row justify-content-center align-items-center">
                  <div className="row">
                    <div>
                      {loading ? (
                        <div className="spinner-container">
                          <div className="spinner"></div>
                        </div>
                      ) : (
                        <div>
                          {favoriteServices.length > 0 ? (
                            favoriteServices.map((service) => (
                              <div
                                key={service.id}
                                className="col-xxl-4 col-md-6"
                              >
                                <div className="card p-0">
                                  <div className="card-body p-0">
                                    <div className="img-sec-2 w-100">
                                      <a href="/service-details">
                                        <img
                                          src={
                                            service.images.length > 0
                                              ? service.images[0]
                                              : "default.jpg"
                                          }
                                          className="img-fluid rounded-top w-100"
                                          alt="Service"
                                        />
                                      </a>
                                      <div className="image-tag d-flex justify-content-end align-items-center">
                                        <span className="trend-tag-2">
                                          {service.category || "Service"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="img-content p-3">
                                      <h6 className="fs-16 mb-3 text-truncate">
                                        <a href="/service-details">
                                          {service.serviceTitle ||
                                            "Service Name"}
                                        </a>
                                      </h6>
                                      <div className="d-flex justify-content-between align-items-center mb-3">
                                        <p className="fs-14 mb-0">
                                          <i className="ti ti-user me-2"></i>
                                          {service.company || "Company Name"}
                                        </p>
                                        <span className="rating text-gray fs-14">
                                          <i className="fa fa-star filled me-1"></i>
                                          4.9
                                        </span>
                                      </div>
                                      <div className="d-flex justify-content-between align-items-center">
                                        <h5>
                                          {service.total || "0.00"}{" "}
                                          <span className="fs-13 text-gray">
                                            <del>
                                              {service.amount || "0.00"}/hr
                                            </del>
                                          </span>
                                        </h5>
                                        <a
                                          className="btn bg-primary-transparent"
                                          href="/service-details"
                                          onClick={() =>
                                            sessionStorage.setItem(
                                              "servicesDocId",
                                              service.id
                                            )
                                          }
                                        >
                                          Book Now
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>No favorite services found.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
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
          </div>
        </div>
      </div>

      <Footer />
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
        type="ca9ac2e00d14a4739fcb071b-text/javascript"
      ></script>

      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="ca9ac2e00d14a4739fcb071b-text/javascript"
      ></script>

      <script
        src="assets/js/wow.min.js"
        type="ca9ac2e00d14a4739fcb071b-text/javascript"
      ></script>

      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="ca9ac2e00d14a4739fcb071b-text/javascript"
      ></script>

      <script
        src="assets/plugins/theia-sticky-sidebar/ResizeSensor.js"
        type="ca9ac2e00d14a4739fcb071b-text/javascript"
      ></script>
      <script
        src="assets/plugins/theia-sticky-sidebar/theia-sticky-sidebar.js"
        type="ca9ac2e00d14a4739fcb071b-text/javascript"
      ></script>

      <script
        src="assets/plugins/owlcarousel/owl.carousel.min.js"
        type="ca9ac2e00d14a4739fcb071b-text/javascript"
      ></script>

      <script
        src="assets/js/cursor.js"
        type="ca9ac2e00d14a4739fcb071b-text/javascript"
      ></script>

      <script
        src="assets/js/script.js"
        type="ca9ac2e00d14a4739fcb071b-text/javascript"
      ></script>
      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="ca9ac2e00d14a4739fcb071b-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e4e38fc308577","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>
    </>
  );
}

export default Favorite;
