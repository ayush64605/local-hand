import React, { useState } from "react";
import { db, collection, getDocs, query, where } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Loginmodel() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true); // Start loading

    try {
      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", formData.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMessage("User not found. Please check your email.");
        setLoading(false);
        return;
      }

      let user = null;
      querySnapshot.forEach((doc) => {
        user = { id: doc.id, ...doc.data() };
      });

      if (user.password !== formData.password) {
        setErrorMessage("Invalid password. Please try again.");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("userEmail", user.email);
      sessionStorage.setItem("userRole", user.role);
      sessionStorage.setItem("profileImage", user.profileImage);

      sessionStorage.setItem("isLoggedIn", "true");

      setSuccessMessage("Login successful!");

      setTimeout(() => {
        if (user.role === "user") {
          navigate("/user-dashboard");
        } else if (user.role === "provider") {
          navigate("/provider-dashboard");
        }
        window.location.reload();
      }, 1000);
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div
      className="modal fade"
      id="login-modal"
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
            <form onSubmit={handleLogin}>
              <div className="text-center mb-3">
                <h3 className="mb-2">Welcome</h3>
                <p>Enter your credentials to access your account</p>
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
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <label className="form-label">Password</label>
                  <a
                    href="#"
                    className="text-primary fw-medium text-decoration-underline mb-1 fs-14"
                    data-bs-toggle="modal"
                    data-bs-target="#forgot-modal"
                  >
                    Forgot Password?
                  </a>
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

              {/* Success and Error Messages */}
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

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
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>

              <div className="d-flex justify-content-center">
                <p>
                  Don’t have an account?{" "}
                  <a
                    href="#"
                    className="text-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#register-modal"
                  >
                    Join us Today
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

export default Loginmodel;
