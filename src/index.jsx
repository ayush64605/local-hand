import { useEffect, useState } from "react";
import "./App.css";
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
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Import Firestore instance

function Home() {
  const [topServices, setTopServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, "category");
        const snapshot = await getDocs(categoriesRef);

        if (!snapshot.empty) {
          const categoriesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCategories(categoriesData);
        } else {
          console.log("No categories found!");
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchTopServices = async () => {
      try {
        const bookingsRef = collection(db, "bookings");
        const bookingsSnapshot = await getDocs(bookingsRef);

        const serviceCountMap = new Map();
        bookingsSnapshot.docs.forEach((doc) => {
          const { serviceId, providerId } = doc.data();
          if (serviceId && providerId) {
            const key = `${providerId}_${serviceId}`;
            serviceCountMap.set(key, (serviceCountMap.get(key) || 0) + 1);
          }
        });

        const sortedServices = [...serviceCountMap.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8);

        const serviceDetails = await Promise.all(
          sortedServices.map(async ([key, count]) => {
            const [providerId, serviceId] = key.split("_");

            const serviceRef = doc(
              db,
              `localhand-users/${providerId}/services/${serviceId}`
            );
            const serviceSnap = await getDoc(serviceRef);

            if (!serviceSnap.exists()) return null;

            const providerRef = doc(db, `localhand-users/${providerId}`);
            const providerSnap = await getDoc(providerRef);

            return {
              id: serviceId,
              providerId,
              bookings: count,
              ...serviceSnap.data(),
              provider: providerSnap.exists() ? providerSnap.data() : null,
            };
          })
        );

        setTopServices(serviceDetails.filter((s) => s !== null));
      } catch (error) {
        console.error("Error fetching top booked services:", error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const blogsRef = collection(db, "blog");
        const snapshot = await getDocs(blogsRef);

        if (!snapshot.empty) {
          const blogsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBlogs(blogsData);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const testimonialsRef = collection(db, "testimonial"); // Adjust Firestore collection name
        const testimonialsSnapshot = await getDocs(testimonialsRef);

        const testimonialsArray = testimonialsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTestimonials(testimonialsArray);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchCategories(),
        fetchTopServices(),
        fetchBlogs(),
        fetchTestimonials(),
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

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

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div></div>
      )}
      <section className="hero-section" id="home">
        <div className="hero-content position-relative overflow-hidden">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div
                  className="wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".25s"
                >
                  <h1 className="mb-2">
                    Connect with Nearby Top-rated Proessional{" "}
                    <span className="typed" data-type-text="Carpenters"></span>
                  </h1>

                  <p className="mb-3 sub-title">
                    We can connect you to the right Service, first time and
                    every time.
                  </p>
                  <div className="banner-form bg-white border mb-3">
                    <form action="#">
                      <div className="d-md-flex align-items-center">
                        <div className="input-group mb-2">
                          <span className="input-group-text px-1">
                            <i className="ti ti-search"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search for Service"
                          />
                        </div>
                        <div className="input-group mb-2">
                          <span className="input-group-text px-1">
                            <i className="ti ti-map-pin"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Location"
                          />
                        </div>
                        <div className="mb-2">
                          <a
                            className="btn btn-linear-primary d-inline-flex align-items-center w-100"
                            href="/service"
                          >
                            <i className="feather-search me-2"></i>Search
                          </a>
                        </div>
                      </div>
                    </form>
                    <img
                      src="assets/img/bg/bg-06.svg"
                      alt="img"
                      className="shape-06 round-animate"
                    />
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    <h6 className="mb-2 me-2 fw-medium">Popular Searches</h6>
                    <a
                      className="badge badge-dark-transparent fs-14 fw-normal mb-2 me-2"
                      href="/service"
                    >
                      Plumber
                    </a>
                    <a
                      className="badge badge-dark-transparent fs-14 fw-normal mb-2 me-2"
                      href="/service"
                    >
                      Plumber
                    </a>
                    <a
                      className="badge badge-dark-transparent fs-14 fw-normal mb-2 me-2"
                      href="/service"
                    >
                      Plumber
                    </a>
                  </div>
                  <div className="d-flex align-items-center flex-wrap banner-info">
                    <div className="d-flex align-items-center me-4 mt-4">
                      <img src="assets/img/icons/success-01.svg" alt="icon" />
                      <div className="ms-2">
                        <h6>215,292 +</h6>
                        <p>Verified Providers</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center me-4 mt-4">
                      <img src="assets/img/icons/success-02.svg" alt="icon" />
                      <div className="ms-2">
                        <h6>90,000+</h6>
                        <p>Services Completed</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center me-4 mt-4">
                      <img src="assets/img/icons/success-03.svg" alt="icon" />
                      <div className="ms-2">
                        <h6>2,390,968 </h6>
                        <p>Reviews Globally</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="banner-img wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".25s"
              >
                <img
                  src="assets/img/banner.png"
                  alt="img"
                  className="img-fluid animation-float"
                />
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="d-inline-flex bg-white p-2 rounded align-items-center shape-01 floating-x">
              <span className="avatar avatar-md bg-warning rounded-circle me-2">
                <i className="ti ti-star-filled"></i>
              </span>
              <span>
                4.9 / 5<small className="d-block">(255 reviews)</small>
              </span>
              <i className="border-edge"></i>
            </div>
            <div className="d-inline-flex bg-white p-2 rounded align-items-center shape-02 floating-x">
              <span className="me-2">
                <img src="assets/img/icons/tick-banner.svg" alt="" />
              </span>
              <p className="fs-12 text-dark mb-0">300 Booking Completed</p>
              <i className="border-edge"></i>
            </div>
            <img src="assets/img/bg/bg-03.svg" alt="img" className="shape-03" />
            <img src="assets/img/bg/bg-04.svg" alt="img" className="shape-04" />
            <img src="assets/img/bg/bg-05.svg" alt="img" className="shape-05" />
          </div>
        </div>
      </section>

      <section className="section category-section">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-lg-6 text-center wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="section-header text-center">
                <h2 className="mb-1">
                  Explore our{" "}
                  <span className="text-linear-primary">Categories</span>
                </h2>
                <p className="sub-title">
                  Service categories help organize and structure the offerings
                  on a marketplace, making it easier for users to find what they
                  need.
                </p>
              </div>
            </div>
          </div>
          <div className="row g-4 row-cols-xxl-6 row-cols-xl-6 row-cols-md-4 row-cols-sm-2 row-cols-1 justify-content-center">
            {categories.map((category) => (
              <div className="col d-flex" key={category.id}>
                <div
                  className="category-item text-center flex-fill wow fadeInUp"
                  data-wow-delay="0.2s"
                  onClick={() => {
                    sessionStorage.setItem(
                      "selectedCategoryName",
                      category.categoryName
                    );
                    console.log("Category ID stored:", category.categoryName);
                    window.location.href = "/service";
                  }}
                  style={{ cursor: "pointer" }} // Add pointer cursor for better UX
                >
                  <div className="mx-auto mb-3">
                    <img
                      src={category.categoryIcon}
                      className="img-fluid"
                      alt="img"
                    />
                  </div>
                  <h6 className="fs-14 mb-1">{category.categoryName}</h6>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-md-12">
              <div
                className="text-center view-all wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <a
                  className="link-primary text-decoration-underline fs-14"
                  href="/categories"
                >
                  View All
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section service-section">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-lg-6 text-center wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="section-header text-center">
                <h2 className="mb-1">
                  Our Featured{" "}
                  <span className="text-linear-primary">Services</span>
                </h2>
                <p className="sub-title">
                  Each listing is designed to be clear and concise, providing
                  customers
                </p>
              </div>
            </div>
          </div>
          <div className="service-slider owl-carousel nav-center">
            {topServices.map((service) => (
              <div key={service.id} className="col-xl-4 col-md-6">
                <div className="card p-0">
                  <div className="card-body p-0">
                    <div className="img-sec w-100">
                      <a
                        href="/service-details"
                        onClick={() =>
                          sessionStorage.setItem("servicesDocId", service.id)
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
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h5 className="mb-2">
                        <a
                          href="/service-details"
                          onClick={() =>
                            sessionStorage.setItem("servicesDocId", service.id)
                          }
                        >
                          {service.serviceTitle || "Service Name"}
                        </a>
                      </h5>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="fs-14 mb-0">
                          <i className="ti ti-user me-2"></i>
                          {service.provider.company || "Company Name"}
                        </p>
                        <span className="rating text-gray fs-14">
                          <i className="fa fa-star filled me-1"></i>4.9
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5>
                          ${service.total || "0.00"}{" "}
                          <span className="fs-13 text-gray">
                            <del>${service.amount || "0.00"}/hr</del>
                          </span>
                        </h5>
                        <a
                          className="btn bg-primary-transparent"
                          href="/service-details"
                          onClick={() =>
                            sessionStorage.setItem("servicesDocId", service.id)
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
          <div className="row">
            <div className="col-md-12">
              <div className="text-center wow fadeInUp" data-wow-delay="0.2s">
                <a href="search.html" className="btn btn-dark">
                  View All<i className="ti ti-arrow-right ms-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-50">
        <div className="container">
          <div className="work-section bg-black m-0">
            <div className="row align-items-center bg-01">
              <div className="col-md-12 wow fadeInUp" data-wow-delay="0.2s">
                <div className="section-header text-center">
                  <h2 className="text-white">
                    How LocalHand{" "}
                    <span className="text-linear-primary">Works</span>
                  </h2>
                  <p className="text-light">
                    Each listing is designed to be clear and concise, providing
                    customers
                  </p>
                </div>
              </div>
            </div>
            <div className="row gx-0 gy-4">
              <div className="col-lg-4 d-flex">
                <div className="work-item text-center flex-fill">
                  <div className="mb-3">
                    <img src="assets/img/icons/work-01.svg" alt="img" />
                  </div>
                  <h6 className="text-white mb-2">1. Post a Service</h6>
                  <p>
                    After you post a job, our matching system identifies and
                    alerts relevant Provider, who can then express interest in
                    your job.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 d-flex">
                <div className="work-item text-center flex-fill">
                  <div className="mb-3">
                    <img src="assets/img/icons/work-01.svg" alt="img" />
                  </div>
                  <h6 className="text-white mb-2">
                    2. Getting Booked & Job done
                  </h6>
                  <p>
                    After you post a job, our matching system identifies and
                    alerts relevant Provider, who can then express interest in
                    your job.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 d-flex">
                <div className="work-item work-03 text-center flex-fill">
                  <div className="mb-3">
                    <img src="assets/img/icons/work-03.svg" alt="img" />
                  </div>
                  <h6 className="text-white mb-2">
                    3. Get Reviewd & Get Leads
                  </h6>
                  <p>
                    After you post a job, our matching system identifies and
                    alerts relevant Provider, who can then express interest in
                    your job.
                  </p>
                </div>
              </div>
            </div>
            <div className="work-bg1">
              <img
                src="assets/img/bg/work-bg-01.svg"
                className="img-fluid"
                alt="img"
              />
            </div>
            <div className="work-bg2">
              <img
                src="assets/img/bg/work-bg-02.svg"
                className="img-fluid"
                alt="img"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <div className="provider-sec">
            <div className="row justify-content-center">
              <div
                className="col-lg-12 text-center wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="section-header text-center">
                  <h2 className="mb-1">
                    Popular{" "}
                    <span className="text-linear-primary">Providers</span>
                  </h2>
                  <p className="sub-title">
                    Each listing is designed to be clear and concise, providing
                    customers
                  </p>
                </div>
              </div>
            </div>
            <div className="row gx-0">
              {topServices.map((service) => (
                <div
                  className="col-xl-3 col-lg-4 col-md-6 d-flex"
                  key={service.id}
                >
                  <div className="provider-item flex-fill">
                    <div className="d-flex align-items-center">
                      <a
                        href="provider-details.html"
                        className="avatar avatar-xl me-2"
                      >
                        <img
                          src={service.provider.profileImage}
                          alt="img"
                          className="rounded-circle"
                        />
                      </a>
                      <div>
                        <h6>
                          <a href="provider-details.html">
                            {service.provider.name}
                          </a>
                        </h6>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-star-filled text-warning me-1"></i>
                          4.4 (123 Reviews)
                        </p>
                        <p className="mb-0">
                          46 Services, From{" "}
                          <span className="text-gray-9">$60</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="text-center view-all wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <a href="providers.html" className="btn btn-dark">
                View All<i className="ti ti-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Slider */}
      <section className="section testimonial-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="section-header text-center">
                <h2 className="mb-1">
                  Genuine reviews from{" "}
                  <span className="text-linear-primary">Customers</span>
                </h2>
                <p className="sub-title">
                  Each listing is designed to be clear and concise, providing
                  customers
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="row">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="col-lg-3 col-md-6 col-sm-12 mb-4"
              >
                <div className="testimonial-item p-3 border rounded shadow-sm">
                  <div className="d-flex align-items-center mb-3">
                    {[...Array(5)].map((_, index) => (
                      <i
                        key={index}
                        className={`fa-solid fa-star ${
                          index < testimonial.rating
                            ? "text-warning"
                            : "text-muted"
                        } me-1`}
                      ></i>
                    ))}
                  </div>
                  <p className="mb-4">{testimonial.content}</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center overflow-hidden">
                      <span className="avatar avatar-lg flex-shrink-0">
                        <img
                          src="assets/img/fav-icon.png"
                          className="img-fluid rounded-circle"
                          alt="User"
                        />
                      </span>
                      <h6 className="text-truncate ms-2">{testimonial.name}</h6>
                    </div>
                    <p>{testimonial.createdAt.toDate().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Overall Rating */}
      <div className="text-center wow fadeInUp" data-wow-delay="0.2s">
        <h6 className="mb-2">
          Each listing is designed to be clear and concise, providing customers
        </h6>
        <p>
          <span className="text-dark fw-medium">Excellent</span>
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              src="assets/img/icons/star-01.svg"
              className="img-fluid"
              alt="img"
            />
          ))}
          <span className="fs-14">Based on {testimonials.length} reviews</span>
        </p>
      </div>

      <section className="section provide-section bg-black">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 wow fadeInUp" data-wow-delay="0.2s">
              <div className="section-header mb-md-0 mb-3">
                <p className="sub-title fw-medium text-light mb-1">
                  Become a Provider
                </p>
                <h2 className="text-white">
                  Post your service{" "}
                  <span className="text-linear-primary">in a minute</span>
                </h2>
              </div>
            </div>
            <div
              className="col-md-6 text-md-end wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <a href="javascript:void(0);" className="btn btn-linear-primary">
                <i className="ti ti-user-filled me-2"></i>Join Us
              </a>
            </div>
          </div>
        </div>
        <div className="provider-bg1">
          <img
            src="assets/img/bg/provide-bg-01.svg"
            className="img-fluid"
            alt="img"
          />
        </div>
        <div className="provider-bg2">
          <img
            src="assets/img/bg/provide-bg-02.svg"
            className="img-fluid"
            alt="img"
          />
        </div>
      </section>

      <section className="section blog-section">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-lg-6 text-center wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="section-header text-center">
                <h2 className="mb-1">
                  Checkout our Recent{" "}
                  <span className="text-linear-primary">Blogs</span>
                </h2>
                <p className="sub-title">
                  Each listing is designed to be clear and concise, providing
                  customers
                </p>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="row">
            {blogs.slice(0, 3).map((blog) => (
              <div
                key={blog.id}
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="blog-item">
                  <div className="blog-img">
                    <a href={`blog-details`}>
                      <img
                        src={blog.imageUrl}
                        className="img-fluid"
                        alt="blog"
                      />
                    </a>
                  </div>
                  <div className="blog-content">
                    <p className="fs-14 fw-medium text-gray-9 d-inline-flex align-items-center mb-2">
                      Admin <i className="ti ti-circle-filled fs-6 mx-1"></i>{" "}
                      {blog.createdAt?.toDate().toLocaleDateString()}
                    </p>
                    <h6 className="text-truncate mb-2">
                      <a
                        href="/blog-details"
                        onClick={() =>
                          sessionStorage.setItem("blogDocId", blog.id)
                        }
                      >
                        {blog.title}
                      </a>
                    </h6>
                    <p className="two-line-ellipsis mb-3">{blog.description}</p>
                    <div className="d-flex align-items-center flex-wrap">
                      <span className="badge badge-info-transparent me-2">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center wow fadeInUp" data-wow-delay="0.2s">
            <a href="blog.html" className="btn btn-dark">
              View All <i className="ti ti-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </section>

      <section className="section business-section bg-black">
        <div className="container">
          <div className="row align-items-center bg-01">
            <div className="col-md-6 wow fadeInUp" data-wow-delay="0.2s">
              <div className="section-header mb-md-0 mb-4">
                <h2 className="text-white display-4">
                  Add Services & Grow your{" "}
                  <span className="text-linear-primary">business with us</span>
                </h2>
                <p className="text-light">
                  A versatile platform that connects you with local
                  professionals across various categories, from home services
                  like plumbing and electrical work to personal services like
                  photography and tutoring.
                </p>
                <a
                  href="javascript:void(0);"
                  className="btn btn-linear-primary"
                >
                  <i className="ti ti-user-filled me-2"></i>Join Us
                </a>
              </div>
            </div>
            <div
              className="col-md-6 text-md-end wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="business-img">
                <img
                  src="assets/img/business.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <div className="back-to-top">
        <a
          className="back-to-top-icon align-items-center justify-content-center d-flex"
          href="#top"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </a>
      </div>

      <div className="xb-cursor tx-js-cursor">
        <div className="xb-cursor-wrapper">
          <div className="xb-cursor--follower xb-js-follower"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
