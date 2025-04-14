import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./header";
import Siderbar from "./sidebar";
import { db } from "./firebase"; // Adjust the path
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Testimonials() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Replaced jobTitle with email
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(true);
  const [testimonial, setTestimonial] = useState([]);
  const [selectedtestimonial, setSelectedtestimonial] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchTestimonial = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonial"));
        const testimonialList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestimonial(testimonialList);
      } catch (error) {
        console.error("Error fetching Testimonial: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !content) {
      toast.error("Please fill in all fields.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      await addDoc(collection(db, "testimonial"), {
        name,
        email, // Saving email instead of jobTitle
        rating,
        content,
        status,
        createdAt: serverTimestamp(),
      });

      toast.success("Testimonial added successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });

      // Reset fields
      setName("");
      setEmail(""); // Reset email
      setRating(0);
      setContent("");
      setStatus(true);
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast.error("Failed to add testimonial.", {
        position: "bottom-right",
        autoClose: 3000,
      });

    }
  };

  const handleDeleteClick = (category) => {
    setSelectedtestimonial(category);
  };

  const confirmDelete = async () => {
    if (selectedtestimonial) {
      try {
        const { id: testimonialId } = selectedtestimonial;
        await deleteDoc(doc(db, `testimonial`, testimonialId));

        // Remove deleted category from state
        setTestimonial(
          testimonial.filter((testimonial) => testimonial.id !== testimonialId)
        );
        toast.success("Testimonial deleted successfully!", {
          position: "bottom-right",
          autoClose: 3000,
        });
  
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete testimonial.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
      setSelectedtestimonial(null);
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
              <div className="content-page-header content-page-headersplit">
                <h5>Testimonials</h5>
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
                                <option>A - Z</option>
                                <option>Z - A</option>
                              </select>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <button
                        className="btn btn-primary"
                        data-bs-target="#add-testimonial"
                        data-bs-toggle="modal"
                        type="button"
                      >
                        <i className="fa fa-plus me-2" />
                        Add Testimonial
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-12 ">
                  <div className="table-resposnive">
                    <table className="table ">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>User Name</th>
                          <th>Rating</th>
                          <th>Content</th>
                          <th>Create at</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testimonial.map((testimonial, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="table-namesplit">
                              <a
                                className="table-profileimage"
                                href="javascript:void(0);"
                              ></a>
                              <a
                                className="table-name"
                                href="javascript:void(0);"
                              >
                                <span>{testimonial.name}</span>
                                <p>
                                  <span
                                    className="__cf_email__"
                                    data-cfemail="69030601071a04001d01290c11080419050c470a0604"
                                  >
                                    {testimonial.email}
                                  </span>
                                </p>
                              </a>
                            </td>
                            <td>
                              {[...Array(testimonial.rating)].map(
                                (_, index) => (
                                  <span key={index}>
                                    <i
                                      className="fas fa-star filled"
                                      style={{ color: "#FFCC08" }}
                                    />
                                  </span>
                                )
                              )}
                            </td>
                            <td>{testimonial.content}</td>
                            <td>
                              {testimonial.createdAt
                                ? new Date(
                                    testimonial.createdAt.seconds * 1000
                                  ).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td>
                              <div className="table-actions d-flex">
                                <button
                                  className="btn delete-table"
                                  data-bs-target="#delete-testimonial"
                                  data-bs-toggle="modal"
                                  type="button"
                                  onClick={() => handleDeleteClick(testimonial)}
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

      <div className="modal fade" id="add-testimonial">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Testimonial</h5>
              <button
                aria-label="Close"
                className="btn-close close-modal"
                data-bs-dismiss="modal"
                type="button"
              >
                <i className="fe fe-x" />
              </button>
            </div>
            <div className="modal-body pt-0">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>{" "}
                  {/* Updated Label */}
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rate your Review</label>
                  <div className="rating-select mb-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        className={`fas fa-star ${
                          star <= rating ? "text-warning" : "text-secondary"
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="form-groupheads d-flex justify-content-between mb-4">
                  <h2>Status</h2>
                  <div className="active-switch">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={status}
                        onChange={() => setStatus(!status)}
                      />
                      <span className="sliders round" />
                    </label>
                  </div>
                </div>
                <div className="text-end">
                  <button
                    className="btn btn-secondary me-2"
                    data-bs-dismiss="modal"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="delete-testimonial">
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
                  <h4>Delete Testimonial?</h4>
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
                  onClick={confirmDelete}
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
        type="24cf2ec2367c965de9e5a0ac-text/javascript"
      />
      <script
        src="assets/js/select2.min.js"
        type="24cf2ec2367c965de9e5a0ac-text/javascript"
      />
      <script
        src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"
        type="24cf2ec2367c965de9e5a0ac-text/javascript"
      />
      <script
        src="assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
        type="24cf2ec2367c965de9e5a0ac-text/javascript"
      />
      <script
        src="assets/js/feather.min.js"
        type="24cf2ec2367c965de9e5a0ac-text/javascript"
      />
      <script
        src="assets/js/jquery.dataTables.min.js"
        type="24cf2ec2367c965de9e5a0ac-text/javascript"
      />
      <script
        src="assets/plugins/slimscroll/jquery.slimscroll.min.js"
        type="24cf2ec2367c965de9e5a0ac-text/javascript"
      />
      <script
        src="assets/plugins/sweetalert/sweetalert2.all.min.js"
        type="24cf2ec2367c965de9e5a0ac-text/javascript"
      />
      <script
        src="assets/plugins/sweetalert/sweetalerts.min.js"
        type="24cf2ec2367c965de9e5a0ac-text/javascript"
      />
      <script
        src="assets/js/admin.js"
        type="24cf2ec2367c965de9e5a0ac-text/javascript"
      />
      <script
        data-cf-settings="24cf2ec2367c965de9e5a0ac-|49"
        defer
        src="../../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
      />
      <script
        crossOrigin="anonymous"
        data-cf-beacon='{"rayId":"908e59a6fd8647d6","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        defer
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
      />
    </div>
  );
}

export default Testimonials;
