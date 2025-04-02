import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import Forgotpasswordmodel from "./model-forgot-password";
import Providermodel from "./model-provider";
import Loginmodel from "./model-login";
import Forgotsuccessfully from "./model-forgot-successfully";
import Registersuccessfullmodel from "./model-register-succesfull";
import Verificationmodel from "./model-verification";
import Registrationmodel from "./model-register";
import Footer from "./footer";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const servicesDocId = sessionStorage.getItem("servicesDocId");
let providerDocId = null; // To be populated dynamically
let userDocId = null; // To be populated dynamically
const storedEmail = sessionStorage.getItem("userEmail");

const fetchUserData = async (storedEmail) => {
  try {
    const usersRef = collection(db, "localhand-users");
    const q = query(usersRef, where("email", "==", storedEmail));
    const userSnapshot = await getDocs(q);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      userDocId = userDoc.id;
      return userDocId;
    } else {
      console.error("User not found in Firestore!");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const fetchproviderDocId = async () => {
  const usersSnapshot = await getDocs(collection(db, "localhand-users"));
  for (const userDoc of usersSnapshot.docs) {
    const serviceQuery = query(
      collection(userDoc.ref, "services"),
      where("__name__", "==", servicesDocId)
    );
    const serviceSnapshot = await getDocs(serviceQuery);
    if (!serviceSnapshot.empty) {
      providerDocId = userDoc.id;
      return providerDocId;
    }
  }
  return null;
};

const fetchServiceDocument = async (setServiceData) => {
  try {
    if (!servicesDocId) {
      setServiceData({ error: "No Service Selected" });
      return;
    }

    await fetchproviderDocId();
    if (!providerDocId) {
      setServiceData({ error: "Service Not Found" });
      return;
    }

    const serviceRef = doc(
      db,
      `localhand-users/${providerDocId}/services/${servicesDocId}`
    );
    const serviceSnap = await getDoc(serviceRef);

    if (serviceSnap.exists()) {
      setServiceData(serviceSnap.data());
    } else {
      setServiceData({ error: "Service Not Found" });
    }
  } catch (error) {
    console.error("Error fetching service document:", error);
    setServiceData({ error: "Error loading service" });
  }
};

const fetchProviderDetails = async (setProvider, setTiming) => {
  try {
    await fetchproviderDocId();
    if (!providerDocId) return;

    const userDocRef = doc(db, "localhand-users", providerDocId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) setProvider(userDocSnap.data());

    const timingDocRef = doc(
      db,
      "localhand-users",
      providerDocId,
      "timing",
      "schedule"
    );
    const timingDocSnap = await getDoc(timingDocRef);
    if (timingDocSnap.exists()) setTiming(timingDocSnap.data());
  } catch (error) {
    console.error("Error fetching provider details:", error);
  }
};

const submitReview = async (formData, setSubmitError) => {
  try {
    if (!userDocId) {
      toast.error("You must be logged in to submit a review.", { position: "bottom-right", autoClose: 3000 });
      return;
    }
    if (!providerDocId || !servicesDocId) {
      setSubmitError("Invalid service or provider.");
      toast.error("Invalid service or provider.", { position: "bottom-right", autoClose: 3000 });
      return;
    }
    const reviewData = {
      ...formData,
      providerDocId,
      servicesDocId,
      userDocId,
      timestamp: new Date(),
    };

    // Store review in service-specific path
    const serviceReviewRef = collection(
      db,
      `localhand-users/${providerDocId}/services/${servicesDocId}/reviews`
    );
    await addDoc(serviceReviewRef, reviewData);

    // Store review in general reviews collection
    const generalReviewRef = collection(db, "reviews");
    await addDoc(generalReviewRef, reviewData);

    setSubmitError(null);
    toast.success("Review submitted successfully!", { position: "bottom-right", autoClose: 3000 });
  } catch (error) {
    console.error("Error submitting review:", error);
    setSubmitError("Failed to submit review. Please try again.");
    toast.error("Failed to submit review. Please try again.", { position: "bottom-right", autoClose: 3000 });
  }
};


function Service_details() {
  const [serviceData, setServiceData] = useState(null);
  const [provider, setProvider] = useState(null);
  const [timing, setTiming] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    email: "",
    review: "",
  });

  useEffect(() => {
    if (!providerDocId || !servicesDocId) return;

    const fetchReviews = async () => {
      try {
        const reviewsRef = collection(
          db,
          `localhand-users/${providerDocId}/services/${servicesDocId}/reviews`
        );
        const q = query(reviewsRef);
        const querySnapshot = await getDocs(q);

        

        const reviewsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReviews(reviewsList);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [providerDocId, servicesDocId]);

  const [enquriesData, setenquriesFormData] = useState({
    providerDocId: providerDocId,
    servicesDocId: servicesDocId,
    userDocId: userDocId,
    name: "",
    email: "",
    phone: "",
    message: "",
    timestamp: new Date(),
  });
  console.log();

  const handleChange = (e) => {
    setenquriesFormData({ ...enquriesData, [e.target.name]: e.target.value });
  };

  const handleenquriesSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "enquires"), enquriesData);
      toast.success("Enquiry submitted successfully!", { position: "bottom-right", autoClose: 3000 });
      setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      toast.error("Failed to submit enquiry.", { position: "bottom-right", autoClose: 3000 });
    }
  };

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchUserData(storedEmail).then((id) => {
      if (id) userDocId = id;
    });
    fetchProviderDetails(setProvider, setTiming);
    fetchServiceDocument(setServiceData);

    // Fetch providerDocId and update enquriesData state
    fetchproviderDocId().then((id) => {
      if (id) {
        providerDocId = id;
        setenquriesFormData((prev) => ({
          ...prev,
          providerDocId: id,
          servicesDocId: servicesDocId,
          userDocId: userDocId,
        }));
      }
    });
    setLoading(false);
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (formData.rating === 0) newErrors.rating = "Please provide a rating.";
    if (!formData.title.trim()) newErrors.title = "Review title is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.review.trim()) newErrors.review = "Review cannot be empty.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await submitReview(formData, setSubmitError);
  };

  return (
    <div className="main-wrapper">
      <Header />
      <Providermodel />
      <Loginmodel />
      <Forgotpasswordmodel />
      <Forgotsuccessfully />
      <Registersuccessfullmodel />
      <Verificationmodel />
      <Registrationmodel />
      <ToastContainer/>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Service Details</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home-2"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item">Service</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Service Details
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

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="page-wrapper">
          <div className="content">
            <div className="container">
              <div className="row">
                <div className="col-xl-8">
                  <div className="card border-0">
                    <div className="card-body">
                      <div className="service-head mb-2">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <h3 className="mb-2">
                            {serviceData
                              ? serviceData.serviceTitle || "Service Not Found"
                              : ""}
                          </h3>
                          <span className="badge badge-purple-transparent mb-2">
                            <i className="ti ti-calendar-check me-1"></i>6000+
                            Bookings
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                          <div className="d-flex align-items-center flex-wrap">
                            <p className="mb-2">
                              <i className="ti ti-star-filled text-warning me-2"></i>
                              <span className="text-gray-9">4.9</span>(255
                              reviews)
                            </p>
                            <p className="mb-2">
                              <span className="text-gray-9">Duration:</span>
                              {serviceData
                                ? serviceData.duration || "Service Not Found"
                                : ""}
                            </p>
                          </div>

                          <div className="d-flex align-items-center flex-wrap">
                            <a href="javscript:void(0);" className="me-3 mb-2">
                              <i className="ti ti-eye me-2"></i>3050 Views
                            </a>
                            <a href="javscript:void(0);" className="me-3 mb-2">
                              <i className="ti ti-heart me-2"></i>Add to
                              Wishlist
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="service-wrap mb-4">
                        <div className="slider-wrap">
                          <div
                            className="owl-carousel service-carousel nav-center mb-3"
                            id="large-img"
                          >
                            <div className="service-img">
                              <img
                                src={
                                  serviceData
                                    ? serviceData.images[0] ||
                                      "Service Not Found"
                                    : ""
                                }
                                className="img-fluid"
                                alt="Slider Img"
                              />
                            </div>
                            <div className="service-img">
                              <img
                                src={
                                  serviceData
                                    ? serviceData.images[1] ||
                                      "Service Not Found"
                                    : ""
                                }
                                className="img-fluid"
                                alt="Slider Img"
                              />
                            </div>
                            <div className="service-img">
                              <img
                                src={
                                  serviceData
                                    ? serviceData.images[2] ||
                                      "Service Not Found"
                                    : ""
                                }
                                className="img-fluid"
                                alt="Slider Img"
                              />
                            </div>
                            <div className="service-img">
                              <img
                                src={
                                  serviceData
                                    ? serviceData.images[3] ||
                                      "Service Not Found"
                                    : ""
                                }
                                className="img-fluid"
                                alt="Slider Img"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-carousel slider-nav-thumbnails nav-center"
                          id="small-img"
                        >
                          <div>
                            <img
                              src={
                                serviceData
                                  ? serviceData.images[0] || "Service Not Found"
                                  : ""
                              }
                              className="img-fluid"
                              alt="Slider Img"
                            />
                          </div>
                          <div>
                            <img
                              src={
                                serviceData
                                  ? serviceData.images[1] || "Service Not Found"
                                  : ""
                              }
                              className="img-fluid"
                              alt="Slider Img"
                            />
                          </div>
                          <div>
                            <img
                              src={
                                serviceData
                                  ? serviceData.images[2] || "Service Not Found"
                                  : ""
                              }
                              className="img-fluid"
                              alt="Slider Img"
                            />
                          </div>
                          <div>
                            <img
                              src={
                                serviceData
                                  ? serviceData.images[3] || "Service Not Found"
                                  : ""
                              }
                              className="img-fluid"
                              alt="Slider Img"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="accordion service-accordion">
                        <div className="accordion-item mb-4">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button p-0"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#overview"
                              aria-expanded="false"
                            >
                              Service Overview
                            </button>
                          </h2>
                          <div
                            id="overview"
                            className="accordion-collapse collapse show"
                          >
                            <div className="accordion-body border-0 p-0 pt-3">
                              <div className="more-text">
                                <p>
                                  {serviceData
                                    ? serviceData.serviceOverview ||
                                      "Service Not Found"
                                    : ""}
                                </p>
                              </div>
                              <a
                                href="javascript:void(0);"
                                className="link-primary text-decoration-underline more-btn mb-4"
                              >
                                Read More
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item mb-4">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button p-0"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#include"
                              aria-expanded="false"
                            >
                              Includes
                            </button>
                          </h2>
                          <div
                            id="include"
                            className="accordion-collapse collapse show"
                          >
                            <div className="accordion-body border-0 p-0 pt-3">
                              <div className="bg-light-200 p-3 pb-2 br-10">
                                {serviceData
                                  ? serviceData.include.map((item, index) => (
                                      <p
                                        key={index}
                                        className="d-inline-flex align-items-center mb-2 me-4"
                                      >
                                        <i className="feather-check-circle text-success me-2"></i>
                                        {item}
                                      </p>
                                    )) || "Service Not Found"
                                  : ""}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item mb-0">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button p-0"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#faq"
                              aria-expanded="false"
                            >
                              FAQ’s
                            </button>
                          </h2>
                          <div
                            id="faq"
                            className="accordion-collapse collapse show"
                          >
                            <div className="accordion-body border-0 p-0 pt-3">
                              <div
                                className="accordion accordion-customicon1 faq-accordion"
                                id="accordionfaq"
                              >
                                {serviceData
                                  ? serviceData.question.map(
                                      (question, index) => (
                                        <div
                                          key={index}
                                          className="accordion-item bg-light-200 mb-3"
                                        >
                                          <h2 className="accordion-header">
                                            <button
                                              className="accordion-button bg-light-200 br-10 fs-16 fw-medium collapsed"
                                              type="button"
                                              data-bs-toggle="collapse"
                                              data-bs-target={`#faq${index}`}
                                              aria-expanded="false"
                                            >
                                              {serviceData.question[index] ||
                                                  "No answer available"}
                                            </button>
                                          </h2>
                                          <div
                                            id={`faq${index}`}
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionfaq"
                                          >
                                            <div className="accordion-body border-0 pt-0">
                                              <p>
                                                {serviceData.answer[index] ||
                                                  "No answer available"}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    ) || "Service Not Found"
                                  : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card border-0 mb-xl-0 mb-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <h4 className="mb-3">Reviews ({reviews.length})</h4>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#add-review"
                          className="btn btn-dark btn-sm mb-3"
                        >
                          Write a Review
                        </button>
                      </div>

                      {reviews.map((review) => (
                        <div key={review.id} className="card review-item mb-3">
                          <div className="card-body p-3">
                            <div className="review-info">
                              <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <div className="d-flex align-items-center mb-2">
                                  <span className="avatar avatar-lg me-2 flex-shrink-0">
                                    <img
                                      src=
                                        "assets/img/fav-icon.png"
                                      
                                      className="rounded-circle"
                                      alt="avatar"
                                    />
                                  </span>
                                  <div>
                                    <h6 className="fs-16 fw-medium">
                                      ayush
                                    </h6>
                                    <div className="d-flex align-items-center flex-wrap date-info">
                                      <p className="fs-14 mb-0">
                                        {review.timestamp.toDate().toLocaleDateString() || "Unknown date"}
                                      </p>
                                      <p className="fs-14 mb-0">
                                        {review.title}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <span className="badge bg-success d-inline-flex align-items-center mb-2">
                                  <i className="ti ti-star-filled me-1"></i>
                                  {review.rating}
                                </span>
                              </div>
                              <p className="mb-2">{review.review}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 theiaStickySidebar">
                  <div className="card border-0">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between border-bottom mb-3">
                        <div className="d-flex align-items-center">
                          <div className="mb-3">
                            <p className="fs-14 mb-0">Starts From</p>
                            <h4>
                              <span className="display-6 fw-bold">
                                {serviceData
                                  ? serviceData.total || "Service Not Found"
                                  : ""}
                              </span>
                              <span className="text-decoration-line-through text-default">
                                {" "}
                                {serviceData
                                  ? serviceData.amount || "Service Not Found"
                                  : ""}
                              </span>
                            </h4>
                          </div>
                        </div>
                        {serviceData &&
                        serviceData.amount &&
                        serviceData.total ? (
                          <span className="badge bg-success mb-3 d-inline-flex align-items-center fw-medium">
                            <i className="ti ti-circle-percentage me-1"></i>
                            {(
                              (1 - serviceData.total / serviceData.amount) *
                              100
                            ).toFixed(2)}
                            % Offer
                          </span>
                        ) : (
                          <span className="badge bg-secondary mb-3 d-inline-flex align-items-center fw-medium">
                            No Discount
                          </span>
                        )}
                      </div>

                      <a
                        className="btn btn-lg btn-primary w-100 d-flex align-items-center justify-content-center mb-3"
                        href="/user-booking"
                      >
                        <i className="ti ti-calendar me-2"></i>Book Service
                      </a>
                      <a
                        href="javascript:void(0);"
                        data-bs-toggle="modal"
                        data-bs-target="#add-enquiry"
                        className="btn btn-lg btn-outline-light d-flex align-items-center justify-content-center w-100"
                      >
                        <i className="ti ti-mail me-2"></i>Send Enquiry
                      </a>
                    </div>
                  </div>
                  <div className="card border-0">
                    <div className="card-body">
                      <h4 className="mb-3">Service Provider</h4>
                      <div className="provider-info text-center bg-light-500 p-3 mb-3">
                        <div className="avatar avatar-xl mb-3">
                          <img
                            src={provider ? provider.profileImage : ""}
                            alt="img"
                            className="img-fluid rounded-circle"
                          />
                          <span className="service-active-dot">
                            <i className="ti ti-check"></i>
                          </span>
                        </div>
                        <h5>{provider ? provider.name : ""}</h5>
                        <p className="fs-14">
                          <i className="ti ti-star-filled text-warning me-2"></i>
                          <span className="text-gray-9 fw-semibold">4.9</span>{" "}
                          (255 reviews)
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">
                          <i className="ti ti-user text-default me-2"></i>Member
                          Since
                        </h6>
                        <p>
                          {provider
                            ? new Date(
                                provider.createdAt.toDate()
                              ).toLocaleDateString()
                            : ""}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">
                          <i className="ti ti-map-pin me-1"></i>Address
                        </h6>
                        <p>
                          {provider ? provider.city : ""},{" "}
                          {provider ? provider.state : ""}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">
                          <i className="ti ti-mail me-1"></i>Email
                        </h6>
                        <p>
                          <a href="#" className="__cf_email__">
                            {provider ? provider.email : ""}
                          </a>
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">
                          <i className="ti ti-phone me-1"></i>Phone
                        </h6>
                        <p>{provider ? provider.phone : ""}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium">Social Profiles</h6>
                        <div className="d-flex align-items-center">
                          <div className="social-icon">
                            <a href="javascript:void(0);" className="me-2">
                              <img
                                src="assets/img/icons/fb.svg"
                                className="img"
                                alt="icon"
                              />
                            </a>
                            <a href="javascript:void(0);" className="me-2">
                              <img
                                src="assets/img/icons/instagram.svg"
                                className="img"
                                alt="icon"
                              />
                            </a>
                            <a href="javascript:void(0);" className="me-2">
                              <img
                                src="assets/img/icons/twitter.svg"
                                className="img"
                                alt="icon"
                              />
                            </a>
                            <a href="javascript:void(0);" className="me-2">
                              <img
                                src="assets/img/icons/whatsapp.svg"
                                className="img"
                                alt="icon"
                              />
                            </a>
                            <a href="javascript:void(0);" className="me-2">
                              <img
                                src="assets/img/icons/youtube.svg"
                                className="img"
                                alt="icon"
                              />
                            </a>
                            <a href="javascript:void(0);">
                              <img
                                src="assets/img/icons/linkedin.svg"
                                className="img"
                                alt="icon"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="row border-top pt-3 g-2">
                        <div className="col-sm-6">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="modal"
                            data-bs-target="#add-contact"
                            className="btn btn-dark btn-lg fs-14 px-1 w-100"
                          >
                            <i className="ti ti-user me-2"></i>Contact Provider
                          </a>
                        </div>
                        <div className="col-sm-6">
                          <a
                            href="provider-chat.html"
                            className="btn btn-light btn-lg fs-14 px-1 w-100"
                          >
                            <i className="ti ti-user me-2"></i>Chat Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card border-0">
                    <div className="card-body">
                      <h4 className="mb-3">Business Hours</h4>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">Monday</h6>
                        <p>
                          {timing
                            ? timing.MondayHoliday
                              ? "Holiday"
                              : `${timing.MondayStart} - ${timing.MondayEnd}`
                            : ""}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">Tuesday</h6>
                        <p>
                          {timing
                            ? timing.TuesdayHoliday
                              ? "Holiday"
                              : `${timing.TuesdayStart} - ${timing.TuesdayEnd}`
                            : ""}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">Wednesday</h6>
                        <p>
                          {timing
                            ? timing.WednesdayHoliday
                              ? "Holiday"
                              : `${timing.WednesdayStart} - ${timing.WednesdayEnd}`
                            : ""}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">Thursday</h6>
                        <p>
                          {timing
                            ? timing.ThursdayHoliday
                              ? "Holiday"
                              : `${timing.ThursdayStart} - ${timing.ThursdayEnd}`
                            : ""}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">Friday</h6>
                        <p>
                          {timing
                            ? timing.FridayHoliday
                              ? "Holiday"
                              : `${timing.FridayStart} - ${timing.FridayEnd}`
                            : ""}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fs-16 fw-medium mb-0">Saturday</h6>
                        <p>
                          {timing
                            ? timing.SaturdayHoliday
                              ? "Holiday"
                              : `${timing.SaturdayStart} - ${timing.SaturdayEnd}`
                            : ""}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-0">
                        <h6 className="fs-16 fw-medium mb-0">Sunday</h6>
                        <p className="text-danger">
                          {timing
                            ? timing.SundayHoliday
                              ? "Holiday"
                              : `${timing.SundayStart} - ${timing.SundayEnd}`
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card border-0">
                    <div className="card-body">
                      <h4 className="mb-3">Location</h4>
                      <div className="map-wrap">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6509170.989457427!2d-123.80081967108484!3d37.192957227641294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1669181581381!5m2!1sen!2sin"
                          allowfullscreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="contact-map"
                        ></iframe>
                        <div className="map-location bg-white d-flex align-items-center">
                          <div className="d-flex align-items-center me-2">
                            <span className="avatar avatar-lg flex-shrink-0">
                              <img
                                src="assets/img/services/service-thumb-01.jpg"
                                alt="img"
                                className="br-10"
                              />
                            </span>
                            <div className="ms-2 overflow-hidden">
                              <p className="two-line-ellipsis">
                                12301 Lake Underhill Rd, Suite 126, Orlando,
                                32828
                              </p>
                            </div>
                          </div>
                          <span>
                            <i className="feather-send fs-16"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a href="#" className="text-danger fs-14">
                    <i className="ti ti-pennant-filled me-2"></i>Report Provider
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <div
        className="modal fade"
        id="add-review"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between">
              <h5>Add Review</h5>
              <a
                href="javascript:void(0);"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-circle-x-filled fs-20"></i>
              </a>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Rate your Review</label>
                  <div className="rating-select mb-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        className={`fas fa-star ${
                          formData.rating >= star
                            ? "text-warning"
                            : "text-muted"
                        }`}
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Review Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-0">
                  <label className="form-label">Write Your Review</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={formData.review}
                    onChange={(e) =>
                      setFormData({ ...formData, review: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-end">
                <button
                  type="button"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="add-enquiry"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between">
              <h5>Enquiry</h5>
              <a
                href="javascript:void(0);"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-circle-x-filled fs-20"></i>
              </a>
            </div>
            <form onSubmit={handleenquriesSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={enquriesData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={enquriesData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={enquriesData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-0">
                  <label className="form-label">Write us a Message</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="message"
                    value={enquriesData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-end">
                <a
                  href="javascript:void(0);"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </a>
                <button type="submit" className="btn btn-primary">
                  Submit
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
    </div>
  );
}

export default Service_details;
