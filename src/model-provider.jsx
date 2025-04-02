import { useState } from "react";
import { db, collection, addDoc, query, getDocs, where } from "./firebase";
import "./App.css";

function Providermodel() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    role: "provider",
    profileImage:"/assets/img/user.png",
  });

  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.company) newErrors.company = "Company name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    if (!formData.address) newErrors.address = "address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.country) newErrors.country = "Country is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEmailExists = async (email) => {
    const usersRef = collection(db, "localhand-users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSubmit = async () => {
    setFormMessage({ type: "", message: "" });

    if (!validateForm()) {
      setFormMessage({
        type: "error",
        message: "Please fix the errors before submitting.",
      });
      return;
    }

    setLoading(true); // Start loading

    try {
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setFormMessage({
          type: "error",
          message: "Email already exists. Please use a different email.",
        });
        setLoading(false); // Stop loading
        return;
      }

      const generatedPassword = Math.random().toString(36).slice(-8);
      const usersRef = collection(db, "localhand-users");
      await addDoc(usersRef, {
        ...formData,
        password: generatedPassword,
        createdAt: new Date(),
      });

      await fetch("http://localhost:5000/send-provider-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: generatedPassword,
        }),
      });

      setFormMessage({
        type: "success",
        message:
          "Provider registered successfully. Check your email for the password.",
      });
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        address:"",
        city: "",
        state: "",
        country: "",
        website:"",
        role: "provider",
      });
      setErrors({});
    } catch (error) {
      setFormMessage({
        type: "error",
        message: "Error submitting data. Please try again later.",
      });
      console.error(error);
    }

    setLoading(false); // Stop loading
  };

  return (
    <div className="modal fade" id="provider" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header d-flex align-items-center justify-content-between">
            <h5>Become a Provider</h5>
            <a
              href="javascript:void(0);"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="ti ti-circle-x-filled fs-20"></i>
            </a>
          </div>
          <div className="wizard-fieldset">
            <fieldset className="first-field" id="first-field">
              <div className="modal-body pb-1">
                <h2 className="mb-1">
                  Unlock New Opportunities{" "}
                  <span className="text-linear-primary">
                    Connect with Customers Near You!
                  </span>
                </h2>
              </div>
              <div className="modal-footer text-end">
                <a
                  href="javascript:void(0);"
                  className="btn btn-linear-primary next_btn"
                >
                  Get Started
                </a>
              </div>
            </fieldset>
            <fieldset className="second-field">
              <div className="modal-body pb-1">
                <div className="bg-light-300 p-3 br-10 text-center mb-4">
                  <h4>Some details about you</h4>
                  <p>
                    You’re just a few steps away from viewing our House Cleaning
                    leads
                  </p>
                </div>
                <div className="row">
                  {/* Form Fields */}
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Your Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <div className="text-danger">{errors.name}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Company Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                      />
                      {errors.company && (
                        <div className="text-danger">{errors.company}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && (
                        <div className="text-danger">{errors.phone}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                      {errors.address && (
                        <div className="text-danger">{errors.address}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                      {errors.city && (
                        <div className="text-danger">{errors.city}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                      />
                      {errors.state && (
                        <div className="text-danger">{errors.state}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                      />
                      {errors.country && (
                        <div className="text-danger">{errors.country}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">website</label>
                      <input
                        type="text"
                        className="form-control"
                        id="website"
                        value={formData.website}
                        onChange={handleChange}
                      />
                      {errors.website && (
                        <div className="text-danger">{errors.website}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-end">
                {formMessage.message && (
                  <div
                    className={`ms-3 text-${
                      formMessage.type === "success" ? "success" : "danger"
                    }`}
                  >
                    {formMessage.message}
                  </div>
                )}
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-lg btn-linear-primary w-100"
                    disabled={loading}
                    onClick={handleSubmit}
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
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Providermodel;
