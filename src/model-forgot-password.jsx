import React, { useState } from "react";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase"; // Import your Firebase configuration
import axios from "axios";
import "./App.css";

function Forgotpasswordmodel() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      // Check if the email exists in Firestore
      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMessage("Email not registered. Please check your email and try again.");
        setLoading(false);
        return;
      }

      // Generate a new password
      const newPassword = Math.random().toString(36).slice(-8);
      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(db, "localhand-users", userDoc.id);

      // Update the password in Firestore
      await updateDoc(userDocRef, {
        password: newPassword,
      });

      // Send the new password via email
      await axios.post("http://localhost:5000/send-provider-email", {
        name: userDoc.data().name,
        email: email,
        password: newPassword,
      });

      setSuccessMessage("A new password has been sent to your email.");
      setEmail("");
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div
      className="modal fade"
      id="forgot-modal"
      tabIndex="-1"
      data-bs-backdrop="static"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header d-flex align-items-center justify-content-end pb-0 border-0">
            <a href="javascript:void(0);" data-bs-dismiss="modal" aria-label="Close">
              <i className="ti ti-circle-x-filled fs-20"></i>
            </a>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-3">
                <h3 className="mb-2">Forgot Password?</h3>
                <p>Enter your email, and we will send you a new password.</p>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              {successMessage && <p className="text-success">{successMessage}</p>}
              <div className="mb-3">
                <button type="submit" className="btn btn-lg btn-linear-primary w-100" disabled={loading}>
                  {loading ?(
                    <div className="d-flex align-items-center justify-content-center">
                      <div
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></div>
                      Loading...
                    </div>
                  ) : "Submit"}
                </button>
              </div>
              <div className="d-flex justify-content-center">
                <p>
                  Remember Password?{" "}
                  <a href="#" className="text-primary" data-bs-toggle="modal" data-bs-target="#login-modal">
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

export default Forgotpasswordmodel;
