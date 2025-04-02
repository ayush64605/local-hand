import React from "react";
import Header from "./header";
import { useEffect, useState } from "react";
import { db } from "./firebase"; // Adjust path based on your setup
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
  query,
  getDocs,
} from "firebase/firestore";
import Footer from "./footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


function Blog_details() {
  const [blogdetails, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogDocId, setBlogDocId] = useState(null);
  const [comments, setComments] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
  
    
    if (!blogDocId) {
      toast.error("Blog not found!", { position: "bottom-right", autoClose: 3000 });
      return;
    }
  
    try {
      await addDoc(collection(db, `blog/${blogDocId}/comments`), {
        name,
        email,
        message,
        createdAt: serverTimestamp(), // Store timestamp
      });
  
      toast.success("Comment posted successfully!", { position: "bottom-right", autoClose: 3000 });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment.", { position: "bottom-right", autoClose: 3000 });
    }
  };

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const blogDocId = sessionStorage.getItem("blogDocId");
      setBlogDocId(blogDocId);

      if (!blogDocId) {
        console.error("No blog ID found in sessionStorage");
        return;
      }

      setLoading(true);
      try {
        const docRef = doc(db, "blog", blogDocId); // Firestore document reference
        const docSnap = await getDoc(docRef); // Fetch document
        console.log(docSnap);
        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No blog found with the given ID");
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBlogs = async () => {
      setLoading(true);

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
        setLoading(false);

      }
    };

    const fetchComments = async () => {
      setLoading(true);

      try {
        if (!blogDocId) return;
        const commentsRef = collection(db, `blog/${blogDocId}/comments`);
        const q = query(commentsRef);
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const commentsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setComments(commentsList);
        } else {
          setComments([]); // Ensures empty array instead of null
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]); // Set empty array on error to avoid null errors
      }finally{
        setLoading(false);

      }
    };

    fetchComments();
    fetchBlogs();
    fetchBlogDetails();
  }, []);

  return (
    <div className="main-wrapper">
      <Header />
      <ToastContainer/>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Blog Details</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home-2"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Blog Details
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
                <div className="col-lg-8 col-md-12 blog-details">
                  <div className="blog-head">
                    <div className="blog-category">
                      <ul>
                        <li>
                          <span className="badge badge-light text-dark">
                            {blogdetails?.category || "Title Not Available"}
                          </span>
                        </li>
                        <li>
                          <i className="feather-calendar me-1"></i>
                          {blogdetails?.createdAt
                            .toDate()
                            .toLocaleDateString() || "Title Not Available"}
                        </li>
                        <li>
                          <div className="post-author">
                            <a href="javascript:void(0);">
                              <img
                                src="assets/img/profiles/avatar-02.jpg"
                                alt="Post Author"
                              />
                              <span>Admin</span>
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <h4 className="mb-3">
                      {blogdetails?.title || "Title Not Available"}
                    </h4>
                  </div>

                  <div className="card blog-list shadow-none">
                    <div className="card-body">
                      <div className="blog-image">
                        <a
                          href="/blog-details"
                          onClick={() =>
                            sessionStorage.setItem("blogDocId", blogdetails.id)
                          }
                        >
                          <img
                            className="img-fluid"
                            src={blogdetails?.imageUrl || "Title Not Available"}
                            alt="Post Image"
                          />
                        </a>
                      </div>
                      <div className="blog-content">
                        <p>
                          {blogdetails?.description || "Title Not Available"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="social-widget blog-review">
                    <h4>Tags</h4>
                    <div className="ad-widget">
                      <ul>
                        {blogdetails?.tags && blogdetails.tags.length > 0 ? (
                          blogdetails.tags.map((tag, index) => (
                            <li key={index}>
                              <a href="javascript:void(0);">{tag}</a>
                            </li>
                          ))
                        ) : (
                          <li>No tags available</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="service-wrap blog-review">
                    <h4>Comments</h4>
                    <ul>
                      {comments.map((comment) => (
                        <li key={comment.id}>
                          <div className="review-box">
                            <div className="card shadow-none">
                              <div className="card-body">
                                <div className="d-flex align-items-start justify-content-between mb-3">
                                  <div className="d-flex align-items-center">
                                    <span className="avatar avatar-md flex-shrink-0 me-2">
                                      <img
                                        src="assets/img/fav-icon.png"
                                        className="img-fluid rounded-circle"
                                        alt="img"
                                      />
                                    </span>
                                    <div className="review-name">
                                      <h6 className="fs-16 fw-medium mb-1">
                                        {comment.name}
                                      </h6>
                                      <p className="fs-14">
                                        {" "}
                                        {comment?.createdAt
                                          .toDate()
                                          .toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <p>{comment.message}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="new-comment">
                    <h4>Write a Comment</h4>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Your Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Enter Email Address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">Message</label>
                            <textarea
                              rows="6"
                              className="form-control"
                              placeholder="Enter Your Comment Here...."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div>
                          <button className="btn btn-dark" type="submit">
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="col-lg-4 col-md-12 blog-sidebar theiaStickySidebar">
                  <div className="card post-widget">
                    <div className="card-body">
                      <h4 className="side-title">Latest News</h4>
                      <ul className="latest-posts">
                        {blogs.slice(0, 4).map((blog) => (
                          <li key={blog.id}>
                            <div className="post-thumb">
                              <a
                                href="/blog-details"
                                onClick={() =>
                                  sessionStorage.setItem("blogDocId", blog.id)
                                }
                              >
                                <img
                                  className="img-fluid"
                                  src={blog.imageUrl}
                                  alt="Blog Image"
                                />
                              </a>
                            </div>
                            <div className="post-info">
                              <p>
                                {blog.createdAt?.toDate().toLocaleDateString()}
                              </p>
                              <h4>
                                <a
                                  href="/blog-details"
                                  onClick={() =>
                                    sessionStorage.setItem("blogDocId", blog.id)
                                  }
                                >
                                  {blog.title}
                                </a>
                              </h4>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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

export default Blog_details;
