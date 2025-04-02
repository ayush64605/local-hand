import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
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

function Blog() {
  const [count, setCount] = useState(0);
  const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    setLoading(true);
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
      }finally{
        setLoading(false)
      }
    };

    fetchBlogs();
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
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Blog Grid</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home-2"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Blog Grid
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="breadcrumb-bg">
            <img
              src="assets/img/bg/breadcrumb-bg-01.png"
              className="breadcrumb-bg-1"
              alt=""
            />
            <img
              src="assets/img/bg/breadcrumb-bg-02.png"
              className="breadcrumb-bg-2"
              alt=""
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
            <div className="row justify-content-center align-items-center">
              {blogs.map((blog) => (
                <div className="col-xl-4 col-md-6" key={blog.id}>
                  <div className="card p-0">
                    <div className="card-body p-0">
                      <div className="img-sec w-100">
                        <a href="/blog-details"
                        onClick={() =>
                          sessionStorage.setItem("blogDocId", blog.id)
                        }>
                          <img
                            src={blog.imageUrl}
                            className="img-fluid rounded-top w-100"
                            alt="img"
                          />
                        </a>
                        <div className="image-tag d-flex justify-content-end align-items-center">
                          <span className="trend-tag">{blog.category}</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="d-flex align-items-center mb-3  ">
                          <div className="d-flex align-items-center border-end pe-2">
                            <span className="avatar avatar-sm me-2">
                              <img
                                src="assets/img/profiles/avatar-43.jpg"
                                className="rounded-circle"
                              />
                            </span>
                            <h6 className="fs-14 text-gray-6">Admin</h6>
                          </div>
                          <div className="d-flex align-items-center ps-2">
                            <span>
                              <i className="ti ti-calendar me-2"></i>
                            </span>
                            <span className="fs-14">
                              {blog.createdAt?.toDate().toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h6 className="fs-16 text-truncate mb-1">
                            <a href="/blog-details"
                        onClick={() =>
                          sessionStorage.setItem("blogDocId", blog.id)
                        }>{blog.title}</a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="table-paginate d-flex justify-content-center align-items-center flex-wrap row-gap-3">
              <div className="d-flex align-items-center justify-content-center">
                <nav aria-label="Page navigation">
                  <ul className="paginations d-flex justify-content-center align-items-center">
                    <li className="page-item me-2">
                      <a
                        className=" d-flex justify-content-center align-items-center"
                        href="#"
                      >
                        <i className="ti ti-arrow-left me-2"></i>Prev
                      </a>
                    </li>
                    <li className="page-item me-2">
                      <a
                        className="page-link-1 active d-flex justify-content-center align-items-center "
                        href="#"
                      >
                        1
                      </a>
                    </li>
                    <li className="page-item me-2">
                      <a
                        className="page-link-1 d-flex justify-content-center align-items-center"
                        href="#"
                      >
                        2
                      </a>
                    </li>
                    <li className="page-item ">
                      <a
                        className="page-link-1 d-flex justify-content-center align-items-center me-2"
                        href="#"
                      >
                        3
                      </a>
                    </li>
                    <li className="page-item ">
                      <a
                        className="page-link-1 d-flex justify-content-center align-items-center me-2"
                        href="#"
                      >
                        4
                      </a>
                    </li>
                    <li className="page-item me-2">
                      <a
                        className="d-flex justify-content-center align-items-center"
                        href="#"
                      >
                        Next <i className="ti ti-arrow-right ms-2"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      

      <Footer />
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

export default Blog;
