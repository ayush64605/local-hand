import { useState, useEffect } from "react";
import Header from "./header";
import Forgotpasswordmodel from "./model-forgot-password";
import Providermodel from "./model-provider";
import Loginmodel from "./model-login";
import Forgotsuccessfully from "./model-forgot-successfully";
import Registersuccessfullmodel from "./model-register-succesfull";
import Verificationmodel from "./model-verification";
import Registrationmodel from "./model-register";
import Footer from "./footer";
import { Link } from "react-router-dom";
import { db } from "./firebase"; // Adjust import based on your setup
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { id } from "date-fns/locale";

function Service() {
  const [services, setServices] = useState([]);
  const [liked, setLiked] = useState(false);
  const [userId, setUserId] = useState(null);
  const [serviceId, setserviceId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const [user, setUser] = useState(null);
  const storedEmail = sessionStorage.getItem("userEmail");

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

    const fetchServices = async () => {
      setLoading(true);
      try {
        const selectedCategory = sessionStorage.getItem("selectedCategoryName");
        console.log(selectedCategory);
        const usersRef = collection(db, "localhand-users");
        const q = query(usersRef, where("role", "==", "provider"));
        const usersSnapshot = await getDocs(q);

        let servicesArray = [];

        for (const userDoc of usersSnapshot.docs) {
          const userData = userDoc.data();
          const companyName = userData.company || "Company Name";
          const servicesRef = collection(userDoc.ref, "services");

          let servicesQuery;
          if (selectedCategory) {
            // Fetch services matching the selected category
            servicesQuery = query(
              servicesRef,
              where("category", "==", selectedCategory)
            );
          } else {
            // Fetch all services
            servicesQuery = query(servicesRef);
          }

          const servicesSnapshot = await getDocs(servicesQuery);

          servicesSnapshot.forEach((serviceDoc) => {
            servicesArray.push({
              id: serviceDoc.id,
              ...serviceDoc.data(),
              company: companyName,
            });
          });
        }

        setServices(servicesArray);

        // Set the first service ID if available
        if (servicesArray.length > 0) {
          setserviceId(servicesArray[0].id);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    fetchServices();

    fetchServices();
    fetchUserDetails();
  }, []);

  const handleLikeClick = async () => {
    if (!userId || !serviceId) return;

    try {
      await setDoc(doc(db, `localhand-users/${userId}/favorites`, serviceId), {
        details: serviceId,
      });
      setLiked((prev) => ({
        ...prev,
        [serviceId]: !prev[serviceId], // Toggle like status
      }));
    } catch (error) {
      console.error("Error adding service to favorites:", error);
    }
  };

  return (
    <div>
      <Header />
      <Providermodel />
      <Loginmodel />
      <Forgotpasswordmodel />
      <Forgotsuccessfully />
      <Registersuccessfullmodel />
      <Verificationmodel />
      <Registrationmodel />
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Services</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home-2"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Services
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
            <div className="row">
              <div className="col-xl-3 col-lg-4 theiaStickySidebar">
                <div className="card mb-4 mb-lg-0">
                  <div className="card-body">
                    <form action="">
                      <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                        <h5>
                          <i className="ti ti-filter-check me-2"></i>Filters
                        </h5>
                        <a href="javascript:void(0);">Reset Filter</a>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <label className="form-label">Search By Keyword</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="What are you looking for?"
                        />
                      </div>
                      <div className="accordion border-bottom mb-3">
                        <div className="accordion-item mb-3">
                          <div
                            className="accordion-header"
                            id="accordion-headingThree"
                          >
                            <div
                              className="accordion-button p-0 mb-3"
                              data-bs-toggle="collapse"
                              data-bs-target="#accordion-collapseThree"
                              aria-expanded="true"
                              aria-controls="accordion-collapseThree"
                              role="button"
                            >
                              Categories
                            </div>
                          </div>
                          <div
                            id="accordion-collapseThree"
                            className="accordion-collapse collapse show"
                            aria-labelledby="accordion-headingThree"
                          >
                            <div className="content-list mb-3" id="fill-more">
                              <div className="form-check mb-2">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked
                                  />
                                  All Categories
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  Construction
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  Car Wash
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  Electrical
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  Cleaning
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  Plumbing
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  Designing
                                </label>
                              </div>
                            </div>
                            <a
                              href="javascript:void(0);"
                              id="more"
                              className="more-view text-primary fs-14"
                            >
                              View more{" "}
                              <i className="ti ti-chevron-down ms-1"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="accordion border-bottom mb-3">
                        <div
                          className="accordion-header"
                          id="accordion-headingFour"
                        >
                          <div
                            className="accordion-button p-0 mb-3"
                            data-bs-toggle="collapse"
                            data-bs-target="#accordion-collapseFour"
                            aria-expanded="true"
                            aria-controls="accordion-collapseFour"
                            role="button"
                          >
                            Sub Category
                          </div>
                        </div>
                        <div
                          id="accordion-collapseFour"
                          className="accordion-collapse collapse show"
                          aria-labelledby="accordion-headingFour"
                        >
                          <div className="mb-3">
                            <select className="select">
                              <option selected>Select Sub Category</option>
                              <option>Car Wash</option>
                              <option>Construction</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="accordion border-bottom mb-3">
                        <div
                          className="accordion-header"
                          id="accordion-headingFive"
                        >
                          <div
                            className="accordion-button p-0 mb-3"
                            data-bs-toggle="collapse"
                            data-bs-target="#accordion-collapseFive"
                            aria-expanded="true"
                            aria-controls="accordion-collapseFive"
                            role="button"
                          >
                            Location
                          </div>
                        </div>
                        <div
                          id="accordion-collapseFive"
                          className="accordion-collapse collapse show"
                          aria-labelledby="accordion-headingFive"
                        >
                          <div className="mb-3">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Select Location"
                              />
                              <span className="icon-addon">
                                <i className="ti ti-map-pin"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="accordion border-bottom mb-3">
                        <div
                          className="accordion-header"
                          id="accordion-headingSix"
                        >
                          <div
                            className="accordion-button p-0 mb-3"
                            data-bs-toggle="collapse"
                            data-bs-target="#accordion-collapseSix"
                            aria-expanded="true"
                            aria-controls="accordion-collapseSix"
                            role="button"
                          >
                            Price Range
                          </div>
                        </div>
                        <div
                          id="accordion-collapseSix"
                          className="accordion-collapse collapse show"
                          aria-labelledby="accordion-headingSix"
                        >
                          <div className="filter-range">
                            <input type="text" id="range_03" />
                          </div>
                          <div className="filter-range-amount mb-3">
                            <p className="fs-14">
                              Price: <span>$5 - $210</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion">
                        <div className="accordion-item mb-3">
                          <div
                            className="accordion-header"
                            id="accordion-headingTwo"
                          >
                            <div
                              className="accordion-button fs-18 p-0 mb-3"
                              data-bs-toggle="collapse"
                              data-bs-target="#accordion-collapseTwo"
                              aria-expanded="true"
                              aria-controls="accordion-collapseTwo"
                              role="button"
                            >
                              Ratings
                            </div>
                          </div>
                          <div
                            id="accordion-collapseTwo"
                            className="accordion-collapse collapse show"
                            aria-labelledby="accordion-headingTwo"
                          >
                            <div className="mb-3">
                              <div className="form-check mb-2">
                                <label className="form-check-label d-block">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked
                                  />
                                  <span className="rating">
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <span className="float-end">(55)</span>
                                  </span>
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label d-block">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  <span className="rating">
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fa-regular fa-star filled"></i>
                                    <span className="float-end">(48)</span>
                                  </span>
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label d-block">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  <span className="rating">
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fa-regular fa-star filled"></i>
                                    <i className="fa-regular fa-star filled"></i>
                                    <span className="float-end">(13)</span>
                                  </span>
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label d-block">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  <span className="rating">
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fa-regular fa-star filled"></i>
                                    <i className="fa-regular fa-star filled"></i>
                                    <i className="fa-regular fa-star filled"></i>
                                    <span className="float-end">(05)</span>
                                  </span>
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <label className="form-check-label d-block">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  <span className="rating">
                                    <i className="fas fa-star filled"></i>
                                    <i className="fa-regular fa-star filled"></i>
                                    <i className="fa-regular fa-star filled"></i>
                                    <i className="fa-regular fa-star filled"></i>
                                    <i className="fa-regular fa-star filled"></i>
                                    <span className="float-end">(00)</span>
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-dark w-100">
                        Search
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8">
                <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                  <h4>
                    Found <span className="text-primary">11 Services</span>
                  </h4>
                  <div className="d-flex align-items-center">
                    <div className="dropdown me-2">
                      {sessionStorage.getItem("selectedCategoryName") && (
                        <button
                          onClick={() => {
                            sessionStorage.removeItem("selectedCategoryName");
                            window.location.reload(); // Refresh the page
                          }}
                          className="btn bg-primary-transparent"
                        >
                          Show All Services
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="spinner-container">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  <div className="row">
                    {services.map((service) => (
                      <div key={service.id} className="col-xl-4 col-md-6">
                        <div className="card p-0">
                          <div className="card-body p-0">
                            <div className="img-sec w-100">
                              <a
                                href="/service-details"
                                onClick={() =>
                                  sessionStorage.setItem(
                                    "servicesDocId",
                                    service.id
                                  )
                                }
                              >
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
                                <span className="trend-tag">
                                  {service.category || "Service"}
                                </span>
                                <div className="image-tag d-flex justify-content-end align-items-center">
                                  <span className="trend-tag">
                                    {service.category || "Service"}
                                  </span>
                                  <a
                                    href="javascript:void(0);"
                                    className="fav-icon like-icon"
                                    onClick={handleLikeClick}
                                  >
                                    <i
                                      className={
                                        liked[service.id]
                                          ? "ti ti-heart-filled filled"
                                          : "ti ti-heart"
                                      }
                                      style={{
                                        color: liked[service.id]
                                          ? "#FF008A"
                                          : "inherit",
                                      }}
                                    ></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="p-3">
                              <h5 className="mb-2">
                                <a
                                  href="/service-details"
                                  onClick={() =>
                                    sessionStorage.setItem(
                                      "servicesDocId",
                                      service.id
                                    )
                                  }
                                >
                                  {service.serviceTitle || "Service Name"}
                                </a>
                              </h5>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="fs-14 mb-0">
                                  <i className="ti ti-user me-2"></i>
                                  {service.company || "Company Name"}
                                </p>
                                <span className="rating text-gray fs-14">
                                  <i className="fa fa-star filled me-1"></i>4.9
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <h5>
                                  {service.total || "0.00"}{" "}
                                  <span className="fs-13 text-gray">
                                    <del>{service.amount || "0.00"}/hr</del>
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
                    ))}
                  </div>
                )}

                <nav aria-label="Page navigation">
                  <ul className="paginations d-flex justify-content-center align-items-center">
                    <li className="page-item me-3">
                      <a className="page-link">
                        <i className="ti ti-arrow-left me-2"></i>Prev
                      </a>
                    </li>
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
                    <li className="page-item me-3">
                      <a
                        className="page-link-1 d-flex justify-content-center align-items-center "
                        href="javascript:void(0);"
                      >
                        3
                      </a>
                    </li>
                    <li className="page-item ">
                      <a className="page-link" href="javascript:void(0);">
                        Next<i className="ti ti-arrow-right ms-2"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div className="xb-cursor tx-js-cursor">
        <div className="xb-cursor-wrapper">
          <div className="xb-cursor--follower xb-js-follower"></div>
        </div>
      </div>

      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="93495de327eb31774cac2c65-text/javascript"
      ></script>

      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="93495de327eb31774cac2c65-text/javascript"
      ></script>

      <script
        src="assets/js/wow.min.js"
        type="93495de327eb31774cac2c65-text/javascript"
      ></script>

      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="93495de327eb31774cac2c65-text/javascript"
      ></script>

      <script
        src="assets/plugins/ckeditor/ckeditor.js"
        type="93495de327eb31774cac2c65-text/javascript"
      ></script>

      <script
        src="assets/plugins/theia-sticky-sidebar/ResizeSensor.js"
        type="93495de327eb31774cac2c65-text/javascript"
      ></script>
      <script
        src="assets/plugins/theia-sticky-sidebar/theia-sticky-sidebar.js"
        type="93495de327eb31774cac2c65-text/javascript"
      ></script>

      <script
        src="assets/plugins/ion-rangeslider/js/ion.rangeSlider.js"
        type="93495de327eb31774cac2c65-text/javascript"
      ></script>
      <script
        src="assets/plugins/ion-rangeslider/js/custom-rangeslider.js"
        type="93495de327eb31774cac2c65-text/javascript"
      ></script>
      <script
        src="assets/plugins/ion-rangeslider/js/ion.rangeSlider.min.js"
        type="93495de327eb31774cac2c65-text/javascript"
      ></script>

      <script
        src="assets/plugins/owlcarousel/owl.carousel.min.js"
        type="93495de327eb31774cac2c65-text/javascript"
      ></script>

      <script
        src="assets/js/cursor.js"
        type="93495de327eb31774cac2c65-text/javascript"
      ></script>

      <script
        src="assets/js/script.js"
        type="93495de327eb31774cac2c65-text/javascript"
      ></script>
      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="93495de327eb31774cac2c65-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e4e1e3e288577","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default Service;
