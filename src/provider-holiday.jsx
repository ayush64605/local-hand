import { useState, useEffect } from "react";
import Provider_header from "./provider-header";
import Provider_sidebar from "./provider-sidebar";
import { format } from "date-fns";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase"; // Ensure correct Firebase import
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Provider_holiday() {
  const storedEmail = sessionStorage.getItem("userEmail");
  const [userDocId, setUserDocId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [leaveData, setLeaveData] = useState([]);
  const [Leaveloading, setLeaveLoading] = useState(true);
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);

  const [serviceData, setServiceData] = useState({
    MondayStart: "",
    MondayEnd: "",
    MondayHoliday: false,
    TuesdayStart: "",
    TuesdayEnd: "",
    TuesdayHoliday: false,
    WednesdayStart: "",
    WednesdayEnd: "",
    WednesdayHoliday: false,
    ThursdayStart: "",
    ThursdayEnd: "",
    ThursdayHoliday: false,
    FridayStart: "",
    FridayEnd: "",
    FridayHoliday: false,
    SaturdayStart: "",
    SaturdayEnd: "",
    SaturdayHoliday: false,
    SundayStart: "",
    SundayEnd: "",
    SundayHoliday: false,
  });

  const formatTime = (time) => {
    if (!time) return ""; // Handle cases where time is missing
    const [hour, minute] = time.split(":"); // Assuming Firestore stores time as "HH:mm"
    const date = new Date();
    date.setHours(hour, minute);
    return format(date, "hh.mm a"); // Formats to "10.00 AM"
  };

  useEffect(() => {
    const fetchUserDocId = async () => {
      if (!storedEmail) return;
  
      setLoading(true); // Start loading before fetching data
  
      try {
        const usersRef = collection(db, "localhand-users");
        const q = query(usersRef, where("email", "==", storedEmail));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const docId = querySnapshot.docs[0].id;
          setUserDocId(docId);
  
          // Fetch both service data and leaves in parallel
          await Promise.all([fetchServiceData(docId), fetchLeaves(docId)]);
        }
      } catch (error) {
        console.error("Error fetching userDocId:", error);
      } finally {
        setLoading(false); // Stop loading only after both requests complete
      }
    };
  
    const fetchServiceData = async (docId) => {
      try {
        const timingRef = doc(db, `localhand-users/${docId}/timing`, "schedule");
        const docSnap = await getDoc(timingRef);
        if (docSnap.exists()) {
          setServiceData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };
  
    const fetchLeaves = async (docId) => {
      try {
        const leaveRef = collection(db, `localhand-users/${docId}/timing`);
        const snapshot = await getDocs(leaveRef);
  
        const leaves = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              from: data.from,
              to: data.to,
              time:
                data.isFullDay === true
                  ? "Full Day"
                  : `${formatTime(data.fromTime)} - ${formatTime(data.toTime)}`,
              reason: data.reason,
            };
          })
          .filter((leave) => leave.from && leave.to); // Filter out empty documents
  
        setLeaveData(leaves);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };
  
    fetchUserDocId();
  }, [storedEmail]);
  
  

  const validateFields = () => {
    let tempErrors = {};
    [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ].forEach((day) => {
      if (!serviceData[`${day}Holiday`]) {
        if (!serviceData[`${day}Start`]) {
          tempErrors[`${day}Start`] = "Start time is required";
        }
        if (!serviceData[`${day}End`]) {
          tempErrors[`${day}End`] = "End time is required";
        }
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveTiming = async () => {
    if (!validateFields()) return;
    if (userDocId) {
      setLoading(true);
      const timingRef = doc(
        db,
        `localhand-users/${userDocId}/timing`,
        "schedule"
      );
      await setDoc(timingRef, serviceData, { merge: true });
      setLoading(false);
      setErrors("Timing saved successfully!");
      toast.success("Timing saved successfully!", { position: "bottom-right", autoClose: 3000 });
    } else {
      alert("User not found!");
      toast.error("User not found!", { position: "bottom-right", autoClose: 3000 });
    }
  };
  const handleDeleteLeave = async () => {
    if (!selectedLeaveId) return;

    try {
      setLoading(true);
      await deleteDoc(
        doc(db, `localhand-users/${userDocId}/timing`, selectedLeaveId)
      );
      const modalElement = document.querySelector('[data-bs-dismiss="modal"]');
      if (modalElement) {
        modalElement.click();
      }
      setLoading(false);

      // Remove deleted leave from state
      setLeaveData((prevLeaves) =>
        prevLeaves.filter((leave) => leave.id !== selectedLeaveId)
      );

      setSelectedLeaveId(null); // Clear selection
      toast.success("Leave deleted successfully!", { position: "bottom-right", autoClose: 3000 });

    } catch (error) {
      console.error("Error deleting leave:", error);
      toast.error("Failed to delete leave. Try again.", { position: "bottom-right", autoClose: 3000 });
    }
  };

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    fromTime: "",
    toTime: "",
    isFullDay: false,
    reason: "",
  });

  const [message, setMessage] = useState(null);
  const validate = () => {
    let newErrors = {};
    if (!formData.from) newErrors.from = "From date is required";
    if (!formData.to) newErrors.to = "To date is required";
    if (!formData.reason) newErrors.reason = "Reason is required";
    if (!formData.isFullDay && (!formData.fromTime || !formData.toTime)) {
      newErrors.time = "Time range is required if not full day";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleHolidayChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!validate()) return;
    setLoading(true);

    try {
      const leaveRef = collection(db, `localhand-users/${userDocId}/timing`);
      const docRef = await addDoc(leaveRef, formData);

      // Update the state directly to reflect the new entry in the table
      setLeaveData((prevLeaves) => [
        ...prevLeaves,
        {
          id: docRef.id, // Assign the new document ID
          ...formData, // Keep other data
          time: formData.isFullDay
            ? "Full Day"
            : `${formatTime(formData.fromTime)} - ${formatTime(
                formData.toTime
              )}`,
        },
      ]);

      setMessage({ type: "success", text: "Leave added successfully!" });

      // Reset form fields
      setFormData({
        from: "",
        to: "",
        fromTime: "",
        toTime: "",
        isFullDay: false,
        reason: "",
      });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to add leave. Try again." });
    }

    setLoading(false);
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
                <h5>Timing</h5>
                <div className="d-flex align-items-center">
                  <a
                    href="javascript:void(0);"
                    className="btn btn-dark add-set"
                    data-bs-toggle="modal"
                    data-bs-target="#add-leave"
                  >
                    <i className="feather-plus"></i> Add Leave
                  </a>
                </div>
              </div>

              <div className="accordion-item mb-3">
                <h5>Service Availability</h5>
                <div
                  aria-labelledby="accordion-headingTwo"
                  className="accordion-collapse collapse show"
                  id="accordion-collapseTwo"
                >
                  <div className="accordion-body p-0 mt-3 pb-1">
                    <div className="row">
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <div className="col-md-6" key={day}>
                          <div className="mb-3">
                            <label className="form-label">
                              {day} <span className="text-danger">*</span>
                            </label>
                            <div className="d-flex">
                              <input
                                className="form-control me-2"
                                type="time"
                                name={`${day}Start`}
                                value={serviceData[`${day}Start`]}
                                onChange={handleChange}
                                disabled={serviceData[`${day}Holiday`]}
                              />
                              <span className="align-self-center"> - </span>
                              <input
                                className="form-control ms-2"
                                type="time"
                                name={`${day}End`}
                                value={serviceData[`${day}End`]}
                                onChange={handleChange}
                                disabled={serviceData[`${day}Holiday`]}
                              />
                            </div>
                            {errors[`${day}Start`] && (
                              <div className="text-danger">
                                {errors[`${day}Start`]}
                              </div>
                            )}
                            {errors[`${day}End`] && (
                              <div className="text-danger">
                                {errors[`${day}End`]}
                              </div>
                            )}
                            <div className="form-check mt-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name={`${day}Holiday`}
                                checked={serviceData[`${day}Holiday`]}
                                onChange={handleChange}
                              />
                              <label className="form-check-label ms-2">
                                Holiday
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="d-flex align-items-center justify-content-end pt-3">
                      <button
                        className="btn btn-dark"
                        type="submit"
                        disabled={loading}
                        onClick={handleSaveTiming}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Saving...
                          </>
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="content">
              <h5>All Leave</h5>
              <br />
              <div className="row">
                <div className="provide-table manage-table">
                  <div className="table-responsive">
                    {loading ? (
                      <p>Loading leaves...</p>
                    ) : (
                      <table className="table datatable">
                        <thead className="thead-light">
                          <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Time</th>
                            <th>Reason</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaveData.length > 0 ? (
                            leaveData.map((leave) => (
                              <tr key={leave.id}>
                                <td>{leave.from}</td>
                                <td>{leave.to}</td>

                                <td>{leave.time}</td>

                                <td>{leave.reason}</td>
                                <td>
                                  <div className="user-icon d-inline-flex">
                                    <a
                                      href="javascript:void(0);"
                                      data-bs-toggle="modal"
                                      data-bs-target="#del-leave"
                                      onClick={() =>
                                        setSelectedLeaveId(leave.id)
                                      }
                                    >
                                      <i className="ti ti-trash"></i>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center">
                                No leave records found.
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

        <div className="modal fade custom-modal" id="del-leave">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                <h5 className="modal-title">Delete Staff</h5>
                <a
                  href="javascript:void(0);"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-circle-x-filled fs-20"></i>
                </a>
              </div>
              <div className="modal-body">
                <div className="write-review">
                  <form action="">
                    <p>Are you sure want to delete this leave?</p>
                    <div className="modal-submit text-end">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-light me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </a>
                      <button
                        className="btn btn-dark"
                        type="button" // Change "submit" to "button"
                        disabled={loading}
                        onClick={handleDeleteLeave}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Deleting...
                          </>
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade custom-modal" id="add-leave">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content doctor-profile">
              <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                <h5 className="modal-title">Add Leave</h5>
                <a href="#" data-bs-dismiss="modal" aria-label="Close">
                  <i className="ti ti-circle-x-filled fs-20"></i>
                </a>
              </div>
              <div className="modal-body pt-0">
                {message && (
                  <div className={`alert alert-${message.type}`}>
                    {message.text}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="wallet-add">
                    <div className="form-group">
                      <label>From</label>
                      <input
                        type="date"
                        name="from"
                        className="form-control"
                        value={formData.from}
                        onChange={handleHolidayChange}
                      />
                      {errors.from && (
                        <span className="text-danger">{errors.from}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>To</label>
                      <input
                        type="date"
                        name="to"
                        className="form-control"
                        value={formData.to}
                        onChange={handleHolidayChange}
                      />
                      {errors.to && (
                        <span className="text-danger">{errors.to}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Time</label>
                      <div className="d-flex align-items-center">
                        <input
                          type="time"
                          name="fromTime"
                          className="form-control me-2"
                          value={formData.fromTime}
                          onChange={handleHolidayChange}
                          disabled={formData.isFullDay}
                        />
                        <span className="align-self-center"> - </span>
                        <input
                          type="time"
                          name="toTime"
                          className="form-control ms-2"
                          value={formData.toTime}
                          onChange={handleHolidayChange}
                          disabled={formData.isFullDay}
                        />
                      </div>
                      {errors.time && (
                        <span className="text-danger">{errors.time}</span>
                      )}
                      <div className="form-check mt-2">
                        <input
                          type="checkbox"
                          name="isFullDay"
                          className="form-check-input"
                          checked={formData.isFullDay}
                          onChange={handleHolidayChange}
                        />
                        <label className="form-check-label ms-1">
                          Full Day
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Reason</label>
                      <textarea
                        name="reason"
                        className="form-control"
                        rows="3"
                        value={formData.reason}
                        onChange={handleHolidayChange}
                      ></textarea>
                      {errors.reason && (
                        <span className="text-danger">{errors.reason}</span>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-dark"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Saving...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
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
                        placeholder="*************"
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
      <div className="toggle-sidebar">
        <div className="sidebar-layout">
          <div className="sidebar-header pb-3 mb-3">
            <h5>Booking Details</h5>
            <a href="javascript:void(0);" className="sidebar-close">
              <i className="ti ti-x"></i>
            </a>
          </div>
          <div className="sidebar-body">
            <div className="book-confirm bk-wrap">
              <div className="d-flex justify-content-between">
                <h6>
                  Services
                  <span className="badge badge-soft-success">Confirmed</span>
                </h6>
                <a href="javascript:void(0);" className="edit-book">
                  <i className="feather-edit"></i>
                </a>
              </div>
              <ul>
                <li>
                  <span className="bk-date">
                    <i className="feather-calendar"></i> Date & Time{" "}
                  </span>{" "}
                  : Oct 28, 2023 - 10AM to 12 AM
                </li>
                <li>
                  <span className="bk-date">
                    <i className="feather-map-pin"></i> Location{" "}
                  </span>{" "}
                  : New York
                </li>
                <li>
                  <span className="bk-date">
                    <i className="feather-user"></i> User Name{" "}
                  </span>{" "}
                  : John Smith
                </li>
              </ul>
              <div className="d-flex align-items-center mb-3">
                <a
                  href="javascript:void(0);"
                  className="btn btn-dark btn-sm me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#reschedule"
                >
                  <i className="feather-user me-1"></i> Reschedule
                </a>
                <a
                  href="javascript:void(0);"
                  className="btn btn-light btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_appointment"
                >
                  <i className="feather-x-circle me-1"></i> Cancel
                </a>
              </div>
            </div>
            <div className="book-customer bk-wrap pt-3">
              <h5>Provider Details</h5>
              <div className="d-flex align-items-center flex-wrap justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <span className="avatar avatar-md me-2">
                    <img
                      src="assets/img/profiles/avatar-02.jpg"
                      className="rounded-circle"
                      alt="User"
                    />
                  </span>
                  <div>
                    <h6 className="fs-14 fw-medium">John Doe</h6>
                    <p className="mb-0">Montana, USA</p>
                  </div>
                </div>
                <div>
                  <a href="user-chat.html" className="btn btn-dark btn-sm">
                    <i className="ti ti-message me-1"></i>Chat
                  </a>
                </div>
              </div>
            </div>
            <div className="bk-wrap py-3">
              <h5>Appointment Message</h5>
              <p className="mb-0">Thanks for your interest in our services</p>
            </div>
            <div className="bk-wrap bk-service py-3">
              <div>
                <h5>House Cleaning Services</h5>
                <p className="mb-0">quick and quality service</p>
              </div>
              <p className="bk-price">$100.00</p>
            </div>
            <div className="bk-wrap bk-history pt-3">
              <h4>Booking History</h4>
              <ul>
                <li>
                  <span>
                    <i className="feather-calendar"></i>
                  </span>
                  <div className="book-crete">
                    <h6>Booking created</h6>
                    <p>Oct 28 2023 1:28 PM</p>
                  </div>
                </li>
                <li>
                  <span>
                    <i className="feather-user"></i>
                  </span>
                  <div className="book-crete">
                    <h6>Assigned to John Smith</h6>
                    <p>Oct 28 2023 1:28 PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="01c055c6c637f48fe7d43451-text/javascript"
      ></script>
      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="01c055c6c637f48fe7d43451-text/javascript"
      ></script>
      <script
        src="assets/js/jquery.slimscroll.min.js"
        type="01c055c6c637f48fe7d43451-text/javascript"
      ></script>
      <script
        src="assets/js/wow.min.js"
        type="01c055c6c637f48fe7d43451-text/javascript"
      ></script>
      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="01c055c6c637f48fe7d43451-text/javascript"
      ></script>
      <script
        src="assets/js/moment.js"
        type="01c055c6c637f48fe7d43451-text/javascript"
      ></script>
      <script
        src="assets/js/bootstrap-datetimepicker.min.js"
        type="01c055c6c637f48fe7d43451-text/javascript"
      ></script>
      <script
        src="assets/plugins/fullcalendar/main.min.js"
        type="01c055c6c637f48fe7d43451-text/javascript"
      ></script>
      <script
        src="assets/plugins/datatables/jquery.dataTables.min.js"
        type="01c055c6c637f48fe7d43451-text/javascript"
      ></script>
      <script
        src="assets/plugins/datatables/datatables.min.js"
        type="01c055c6c637f48fe7d43451-text/javascript"
      ></script>
      <script
        src="assets/js/script.js"
        type="01c055c6c637f48fe7d43451-text/javascript"
      ></script>
      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="01c055c6c637f48fe7d43451-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e4e54fd854019","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>{" "}
    </div>
  );
}

export default Provider_holiday;
