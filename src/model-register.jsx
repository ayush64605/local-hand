import React, { useState } from "react";
import { db, collection, addDoc, getDocs, query, where } from "./firebase"; // Import Firebase Firestore functions
import "./App.css";

function Registrationmodel() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    profileImage:"/assets/img/user.png",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Check if the email already exists in Firestore
      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", formData.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError("Email is already registered. Please use a different email.");
        setLoading(false);
        return;
      }

      // Add user data to Firestore 'users' collection
      await addDoc(usersRef, formData);
      setSuccessMessage("Registration successful!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
        address:"",
        city:"",
        state:"",
        postalcode:""
      }); // Reset form
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Failed to register. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      className="modal fade"
      id="register-modal"
      tabIndex="-1"
      data-bs-backdrop="static"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header d-flex align-items-center justify-content-end pb-0 border-0">
            <a
              href="javascript:void(0);"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="ti ti-circle-x-filled fs-20"></i>
            </a>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-3">
                <h3 className="mb-2">Registration</h3>
                <p>Enter your credentials to access your account</p>
              </div>

              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
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
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <label className="form-label">Password</label>
                  <p className="text-gray-6 fw-medium mb-1">
                    Must be at least 8 characters
                  </p>
                </div>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-lg btn-linear-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <div
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></div>
                      Signing Up...
                    </div>
                  ) : "Sign Up"}
                </button>
              </div>

              {error && <p className="text-danger text-center">{error}</p>}

              {/* Success Message */}
              {successMessage && (
                <p className="text-success text-center">{successMessage}</p>
              )}

              <div className="login-or mb-3">
                <span className="span-or">Or sign up with</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <button type="button" className="btn btn-light flex-fill me-3">
                  <img
                    src="assets/img/icons/google-icon.svg"
                    className="me-2"
                    alt="Google"
                  />
                  Google
                </button>
                <button type="button" className="btn btn-light flex-fill">
                  <img
                    src="assets/img/icons/fb-icon.svg"
                    className="me-2"
                    alt="Facebook"
                  />
                  Facebook
                </button>
              </div>
              <div className="d-flex justify-content-center">
                <p>
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="text-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#login-modal"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registrationmodel;
