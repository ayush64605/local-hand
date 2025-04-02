import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Provider_header from "./provider-header";
import Provider_sidebar from "./provider-sidebar";
import { db } from "./firebase"; // Adjust the import based on your Firebase setup
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Provider_coupons() {
  const [count, setCount] = useState(0);
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState();
  const [providerId, setprovidereId] = useState();

  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
    couponName: "",
    code: "",
    discount: "",
    limit: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const storedEmail = sessionStorage.getItem("userEmail");

  useEffect(() => {
    const fetchServicesAndCoupons = async () => {
      if (!storedEmail) return;
  
      setLoading(true); // Start loading before fetching data
  
      try {
        // Fetch provider ID
        const providerQuery = query(
          collection(db, "localhand-users"),
          where("email", "==", storedEmail)
        );
        const providerSnapshot = await getDocs(providerQuery);
  
        if (providerSnapshot.empty) {
          console.error("Provider not found.");
          setLoading(false);
          return;
        }
  
        const providerId = providerSnapshot.docs[0].id;
        setprovidereId(providerId);
  
        // Fetch services
        const serviceRef = collection(db, `localhand-users/${providerId}/services`);
        const serviceSnapshot = await getDocs(serviceRef);
        const serviceList = serviceSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setServices(serviceList);
  
        // Fetch coupons for each service
        let allCoupons = [];
        for (const serviceDoc of serviceSnapshot.docs) {
          const serviceId = serviceDoc.id;
          setServiceId(serviceId);
          const serviceName = serviceDoc.data().name;
  
          const couponsQuery = collection(
            db,
            `localhand-users/${providerId}/services/${serviceId}/coupons`
          );
          const couponsSnapshot = await getDocs(couponsQuery);
  
          const serviceCoupons = couponsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            serviceName, // Attach service name
          }));
  
          allCoupons = [...allCoupons, ...serviceCoupons];
        }
  
        setCoupons(allCoupons);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading after fetching both services and coupons
      }
    };
  
    fetchServicesAndCoupons();
  }, [storedEmail]);
  

  const validateForm = () => {
    let newErrors = {};
    if (!formData.service) newErrors.service = "Service is required.";
    if (!formData.couponName) newErrors.couponName = "Coupon name is required.";
    if (!formData.code) newErrors.code = "Code is required.";
    if (!formData.discount) newErrors.discount = "Discount is required.";
    if (!formData.limit) newErrors.limit = "Limit is required.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.endDate) newErrors.endDate = "End date is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

  const handleDeleteClick = (coupon) => {
    setSelectedCoupon(coupon);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Fetch provider ID based on stored email
      const providerQuery = query(
        collection(db, "localhand-users"),
        where("email", "==", storedEmail)
      );
      const providerSnapshot = await getDocs(providerQuery);

      if (providerSnapshot.empty) {
        throw new Error("Provider not found");
      }

      const providerId = providerSnapshot.docs[0].id;

      const selectedService = services.find(
        (s) => s.serviceTitle === formData.service
      );

      if (!selectedService) {
        throw new Error("Invalid service selection.");
      }

      const serviceId = selectedService.id;
      console.log(serviceId);

      // Save coupon data in Firestore
      await addDoc(
        collection(
          db,
          `localhand-users/${providerId}/services/${serviceId}/coupons`
        ),
        {
          service: formData.service,
          couponName: formData.couponName,
          code: formData.code,
          discount: formData.discount,
          limit: formData.limit,
          startDate: formData.startDate,
          endDate: formData.endDate,
          status: formData.status,
          useby: 0,
          createdAt: new Date(),
        }
      );

      // Reset form
      setFormData({
        service: "",
        couponName: "",
        code: "",
        discount: "",
        limit: "",
        startDate: "",
        endDate: "",
        status: "",
      });

      setErrors({});
      toast.success("Coupon added successfully!", { position: "bottom-right", autoClose: 3000 });
      document.getElementById("add-coupons").click(); // Close modal
    } catch (error) {
      console.error("Error adding coupon:", error);
      toast.error("Failed to add coupon.", { position: "bottom-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

const confirmDelete = async () => {
    if (selectedCoupon) {
      try {
        const { id: couponId } = selectedCoupon;
        console.log(providerId);
        await deleteDoc(
          doc(
            db,
            `localhand-users/${providerId}/services/${serviceId}/coupons`,
            couponId
          )
        );

        // Remove deleted coupon from state
        setCoupons(coupons.filter((coupon) => coupon.id !== couponId));

        toast.success("Coupon deleted successfully!", { position: "bottom-right", autoClose: 3000 });
      } catch (error) {
        console.error("Error deleting coupon:", error);
        toast.error("Failed to delete coupon.", { position: "bottom-right", autoClose: 3000 });
      }
      setSelectedCoupon(null);
    }
  };

  return (
    <div className="provider-page">
      <div className="main-wrapper">
        <Provider_header />
        <Provider_sidebar />
        <ToastContainer/>
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="page-wrapper">
            <div className="content container-fluid">
              <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                <h5>Coupons</h5>
                <div className="d-flex align-items-center">
                  <span className="fs-14 me-2">Sort</span>
                  <div className="dropdown me-2">
                    <a
                      href="javascript:void(0);"
                      className="dropdown-toggle bg-light-300 "
                      data-bs-toggle="dropdown"
                    >
                      Newly Added
                    </a>
                    <div className="dropdown-menu">
                      <a
                        href="javascript:void(0);"
                        className="dropdown-item active"
                      >
                        Recently Added
                      </a>
                    </div>
                  </div>
                  <a
                    href="javascript:void(0);"
                    className="tags d-flex justify-content-center align-items-center  rounded me-2"
                  >
                    <i className="ti ti-printer"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    className="tags d-flex justify-content-center align-items-center border rounded me-2"
                    id="filter_search"
                    z
                  >
                    <i className="ti ti-sort-descending"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-dark d-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#add-coupons"
                  >
                    <i className="ti ti-circle-plus me-2"></i>Add Coupon
                  </a>
                </div>
              </div>
              <div id="filter_inputs">
                <div className="row">
                  <div className="col-lg-3 col-md-6 col-xl">
                    <div className="mb-3">
                      <div className="sel-cal Calendar-icon">
                        <span>
                          <i className="ti ti-calendar-month"></i>
                        </span>
                        <input
                          className="form-control datetimepicker"
                          type="text"
                          placeholder="dd-mm-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-xl">
                    <div className="mb-3">
                      <select className="select">
                        <option>Services</option>
                        <option>Computer Repairs</option>
                        <option>Plumbing</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-xl">
                    <div className="mb-3">
                      <select className="select">
                        <option>Name</option>
                        <option>Jacob Kline</option>
                        <option>William Smith</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-xl">
                    <div className="mb-3">
                      <select className="select">
                        <option>Code</option>
                        <option>1</option>
                        <option>2</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-xl">
                    <div className="mb-3">
                      <select className="select">
                        <option>Status</option>
                        <option>Paid</option>
                        <option>Pending</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-xl-12 col-lg-12">
                  <div className="custom-datatable-filter table-responsive">
                    {loading ? (
                      <p>Loading coupons...</p>
                    ) : (
                      <table className="table datatable">
                        <thead className="thead-light">
                          <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Discount</th>
                            <th>Limit</th>
                            <th>Used</th>
                            <th>Valid Date</th>
                            <th>Service Name</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {coupons.length > 0 ? (
                            coupons.map((coupon) => (
                              <tr key={coupon.id}>
                                <td>{coupon.couponName}</td>
                                <td>{coupon.code}</td>
                                <td>{coupon.discount}</td>
                                <td>{coupon.limit}</td>
                                <td>{coupon.useby || 0}</td>
                                <td>
                                  <p className="fs-14 mb-0">
                                    {coupon.startDate} - {coupon.endDate}
                                  </p>
                                </td>
                                <td>{coupon.service}</td>
                                <td>
                                  <span
                                    className={`badge d-inline-flex align-items-center ${
                                      coupon.status === "Active"
                                        ? "badge-soft-danger"
                                        : "badge-soft-success"
                                    }`}
                                  >
                                    <i className="ti ti-circle-filled fs-5 me-1"></i>
                                    {coupon.status}
                                  </span>
                                </td>
                                <td>
                                  <div className="user-icon d-inline-flex">
                                    <a
                                      href="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#del-coupons"
                                      onClick={() => handleDeleteClick(coupon)}
                                    >
                                      <i className="ti ti-trash"></i>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="9" className="text-center">
                                No coupons found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="modal fade custom-modal" id="add-coupons">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center justify-content-between border-0">
                <h5>Add Coupon</h5>
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
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Services</label>
                        <select
                          className="form-select"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          {services.map((service) => (
                            <option
                              key={service.serviceTitle}
                              value={service.serviceTitle}
                            >
                              {service.serviceTitle}
                            </option>
                          ))}
                        </select>
                        {errors.service && (
                          <small className="text-danger">
                            {errors.service}
                          </small>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Coupon Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="couponName"
                              value={formData.couponName}
                              onChange={handleChange}
                            />
                            {errors.couponName && (
                              <small className="text-danger">
                                {errors.couponName}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Code</label>
                            <input
                              type="text"
                              className="form-control"
                              name="code"
                              value={formData.code}
                              onChange={handleChange}
                            />
                            {errors.code && (
                              <small className="text-danger">
                                {errors.code}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Discount</label>
                            <input
                              type="text"
                              className="form-control"
                              name="discount"
                              value={formData.discount}
                              onChange={handleChange}
                            />
                            {errors.discount && (
                              <small className="text-danger">
                                {errors.discount}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Limit</label>
                            <input
                              type="text"
                              className="form-control"
                              name="limit"
                              value={formData.limit}
                              onChange={handleChange}
                            />
                            {errors.limit && (
                              <small className="text-danger">
                                {errors.limit}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Start Date</label>
                            <input
                              type="date"
                              className="form-control"
                              name="startDate"
                              value={formData.startDate}
                              onChange={handleChange}
                            />
                            {errors.startDate && (
                              <small className="text-danger">
                                {errors.startDate}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">End Date</label>
                            <input
                              type="date"
                              className="form-control"
                              name="endDate"
                              value={formData.endDate}
                              onChange={handleChange}
                            />
                            {errors.endDate && (
                              <small className="text-danger">
                                {errors.endDate}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="d-flex flex-column">
                            <label className="form-label">Status</label>
                            <div className="d-flex">
                              <div className="form-check me-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="status"
                                  value="active"
                                  checked={formData.status === "active"}
                                  onChange={handleChange}
                                />
                                <label className="form-check-label">
                                  Active
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="status"
                                  value="inactive"
                                  checked={formData.status === "inactive"}
                                  onChange={handleChange}
                                />
                                <label className="form-check-label">
                                  Inactive
                                </label>
                              </div>
                            </div>
                            {errors.status && (
                              <small className="text-danger">
                                {errors.status}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                      {Object.keys(errors).length > 0 && (
                        <p className="text-danger text-end mt-2">
                          Please fill in all required fields.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </form>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn bg-gray"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-dark"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade custom-modal" id="del-coupons">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                <h5 className="modal-title">Delete Coupon</h5>
                <a href="#" data-bs-dismiss="modal" aria-label="Close">
                  <i className="ti ti-circle-x-filled fs-20"></i>
                </a>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this coupon?</p>
                <div className="modal-submit text-end">
                  <a
                    href="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </a>
                  <button
                    type="button"
                    className="btn btn-dark"
                    data-bs-dismiss="modal"
                    onClick={confirmDelete}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade custom-modal" id="del-account">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                <h5 className="modal-title">Delete Account</h5>
                <a
                  href="javascript:void(0);"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-circle-x-filled fs-20"></i>
                </a>
              </div>
              <form action="#">
                <div className="modal-body">
                  <p className="mb-3">
                    Are you sure you want to delete This Account? To delete your
                    account, Type your password.
                  </p>
                  <div className="mb-0">
                    <label className="form-label">Password</label>
                    <div className="pass-group">
                      <input
                        type="password"
                        className="form-control pass-input"
                        placeholder="*"
                      />
                      <span className="toggle-password feather-eye-off"></span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <a
                    href="javascript:void(0);"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </a>
                  <button type="submit" className="btn btn-dark">
                    Delete Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="264e7b04d22510c513400daa-text/javascript"
      ></script>

      <script
        src="assets/js/jquery.slimscroll.min.js"
        type="264e7b04d22510c513400daa-text/javascript"
      ></script>

      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="264e7b04d22510c513400daa-text/javascript"
      ></script>

      <script
        src="assets/js/wow.min.js"
        type="264e7b04d22510c513400daa-text/javascript"
      ></script>

      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="264e7b04d22510c513400daa-text/javascript"
      ></script>

      <script
        src="assets/js/cursor.js"
        type="264e7b04d22510c513400daa-text/javascript"
      ></script>

      <script
        src="assets/plugins/countup/jquery.counterup.min.js"
        type="264e7b04d22510c513400daa-text/javascript"
      ></script>
      <script
        src="assets/plugins/countup/jquery.waypoints.min.js"
        type="264e7b04d22510c513400daa-text/javascript"
      >
        {" "}
      </script>

      <script
        src="assets/js/moment.js"
        type="264e7b04d22510c513400daa-text/javascript"
      ></script>
      <script
        src="assets/js/bootstrap-datetimepicker.min.js"
        type="264e7b04d22510c513400daa-text/javascript"
      ></script>

      <script
        src="assets/js/script.js"
        type="264e7b04d22510c513400daa-text/javascript"
      ></script>
      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="264e7b04d22510c513400daa-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e4e56ed138577","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default Provider_coupons;
