import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Provider_header from "./provider-header";
import Provider_sidebar from "./provider-sidebar";
import { db } from "./firebase"; // Ensure you have initialized Firebase
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Provuder_enquiry() {
  const [count, setCount] = useState(0);
  const [providerDocId, setProviderDocId] = useState(null);
  const [enquires, setenquires] = useState([]);
  const [selectedenquiryId, setSelectedenquiryId] = useState(null);

  const storedEmail = sessionStorage.getItem("userEmail");
  const [loading, setLoading] = useState(true);

  // Fetch Provider Data
  const fetchProviderData = async (email) => {
    try {
      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", email));
      const userSnapshot = await getDocs(q);

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        setProviderDocId(userDoc.id);
      } else {
        console.error("User not found in Firestore!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch enquires
  const fetchenquires = async () => {
    if (!providerDocId) return;
    try {
      setLoading(true);
      const enquiresRef = collection(db, "enquires");
      const q = query(enquiresRef, where("providerDocId", "==", providerDocId));
      const querySnapshot = await getDocs(q);

      const enquiresData = await Promise.all(
        querySnapshot.docs.map(async (enquiryDoc) => {
          const enquiry = enquiryDoc.data();
          const enquiryId = enquiryDoc.id;
          console.log(enquiryId);

          // Fetch user details
          const userRef = doc(db, `localhand-users/${enquiry.userDocId}`);
          const userSnap = await getDoc(userRef);
          const userName = userSnap.exists()
            ? userSnap.data().name
            : "Unknown User";

          // Fetch service details
          const serviceRef = doc(
            db,
            `localhand-users/${enquiry.providerDocId}/services/${enquiry.servicesDocId}`
          );
          const serviceSnap = await getDoc(serviceRef);
          const serviceName = serviceSnap.exists()
            ? serviceSnap.data().serviceTitle
            : "Unknown Service";
          const serviceimg = serviceSnap.exists()
            ? serviceSnap.data().images[0]
            : "";

          return {
            id: enquiryId,
            ...enquiry,
            userName,
            serviceName,
            serviceimg,
          };
        })
      );

      setenquires(enquiresData);
    } catch (error) {
      console.error("Error fetching enquires:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete enquiry
  const handleDeleteenquiry = async () => {
    if (!selectedenquiryId) return;

    try {
      await deleteDoc(doc(db, "enquires", selectedenquiryId));
      setenquires((prevenquires) =>
        prevenquires.filter((enquiry) => enquiry.id !== selectedenquiryId)
      );
      toast.success("Enquiry deleted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting enquiry:", error);

      console.error("Error deleting Enquiry:", error);
      toast.error("Failed to delete Enquiry.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  // Fetch Provider Data when email is available
  useEffect(() => {
    if (storedEmail) {
      fetchProviderData(storedEmail);
    }
  }, [storedEmail]);

  // Fetch enquires when providerDocId is set
  useEffect(() => {
    if (providerDocId) {
      fetchenquires();
    }
  }, [providerDocId]);

  return (
    <div className="provider-page">
      <div>
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
                <div className="row">
                  <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                    <h5>Provider Enquiry</h5>
                    <div className="d-flex align-items-center">
                      <span className="fs-14 me-2">Sort</span>
                      <div className="dropdown me-2">
                        <a
                          className="dropdown-toggle bg-light-300 "
                          data-bs-toggle="dropdown"
                          href="javascript:void(0);"
                        >
                          Newly Added
                        </a>
                        <div className="dropdown-menu">
                          <a
                            className="dropdown-item active"
                            href="javascript:void(0);"
                          >
                            Recently Added
                          </a>
                        </div>
                      </div>
                      <a
                        className="tags d-flex justify-content-center align-items-center  rounded me-2"
                        href="javascript:void(0);"
                      >
                        <i className="ti ti-printer" />
                      </a>
                      <a
                        className="tags d-flex justify-content-center align-items-center border rounded me-2"
                        href="javascript:void(0);"
                        id="filter_search"
                      >
                        <i className="ti ti-adjustments" />
                      </a>
                    </div>
                  </div>
                </div>
                <div id="filter_inputs">
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <div className="sel-cal Calendar-icon">
                          <span>
                            <i className="ti ti-calendar-month" />
                          </span>
                          <input
                            className="form-control datetimepicker"
                            placeholder="dd-mm-yyyy"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <select className="select">
                          <option>Services</option>
                          <option>Computer Repairs</option>
                          <option>Plumbing</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <select className="select">
                          <option>Name</option>
                          <option>Jacob Kline</option>
                          <option>William Smith</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-xl-12 col-lg-12">
                    <div className="custom-datatable-filter table-responsive">
                      <table className="table datatable">
                        <thead className="thead-light">
                          <tr>
                            <th>Name</th>
                            <th>Enquired Service</th>
                            <th>Email</th>
                            <th>Phone Number </th>
                            <th>Date</th>
                            <th>Message</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {enquires.map((enquiry, index) => (
                            <tr key={index}>
                              <td>{enquiry.name}</td>
                              <td className="text-dark">
                                {enquiry.serviceName}
                              </td>
                              <td>{enquiry.email}</td>
                              <td>{enquiry.phone}</td>
                              <td>
                                {enquiry.timestamp &&
                                  enquiry.timestamp
                                    .toDate()
                                    .toLocaleDateString()}
                              </td>
                              <td>{enquiry.message}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <a
                                    className=""
                                    data-bs-target="#del-enquiry"
                                    data-bs-toggle="modal"
                                    href="#"
                                    onClick={() =>
                                      setSelectedenquiryId(enquiry.id)
                                    }
                                  >
                                    <i className="ti ti-trash" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="value d-flex align-items-center">
                      <span>Show</span>
                      <select>
                        <option>7</option>
                      </select>
                      <span>entries</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="me-2 text-gray-9">1 - 07 of 10</span>
                      <nav aria-label="Page navigation">
                        <ul className="paginations d-flex justify-content-center align-items-center">
                          <li className="page-item me-2">
                            <a
                              className="page-link-1 active d-flex justify-content-center align-items-center "
                              href="javascript:void(0);"
                            >
                              1
                            </a>
                          </li>
                          <li className="page-item me-2">
                            <a
                              className="page-link-1 d-flex justify-content-center align-items-center "
                              href="javascript:void(0);"
                            >
                              2
                            </a>
                          </li>
                          <li className="page-item ">
                            <a
                              className="page-link-1 d-flex justify-content-center align-items-center "
                              href="javascript:void(0);"
                            >
                              3
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

          <div className="modal fade custom-modal" id="del-account">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                  <h5 className="modal-title">Delete Account</h5>
                  <a
                    aria-label="Close"
                    data-bs-dismiss="modal"
                    href="javascript:void(0);"
                  >
                    <i className="ti ti-circle-x-filled fs-20" />
                  </a>
                </div>
                <form action="#">
                  <div className="modal-body">
                    <p className="mb-3">
                      Are you sure you want to delete This Account? To delete
                      your account, Type your password.
                    </p>
                    <div className="mb-0">
                      <label className="form-label">Password</label>
                      <div className="pass-group">
                        <input
                          className="form-control pass-input"
                          placeholder="*************"
                          type="password"
                        />
                        <span className="toggle-password feather-eye-off" />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <a
                      className="btn btn-light me-2"
                      data-bs-dismiss="modal"
                      href="javascript:void(0);"
                    >
                      Cancel
                    </a>
                    <button className="btn btn-dark" type="submit">
                      Delete Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade custom-modal" id="del-enquiry">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                <h5 className="modal-title">Delete Review</h5>
                <a aria-label="Close" data-bs-dismiss="modal" href="#">
                  <i className="ti ti-circle-x-filled fs-20" />
                </a>
              </div>
              <div className="modal-body">
                <div className="write-review">
                  <p>Are you sure you want to delete this review?</p>
                  <div className="modal-submit text-end">
                    <a
                      className="btn btn-light me-2"
                      data-bs-dismiss="modal"
                      href="#"
                    >
                      Cancel
                    </a>
                    <button
                      className="btn btn-dark"
                      type="button"
                      data-bs-dismiss="modal"
                      onClick={handleDeleteenquiry}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <script
          data-cfasync="false"
          src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
        />
        <script
          src="assets/js/jquery-3.7.1.min.js"
          type="f8ea935a0d3ba4066be4611d-text/javascript"
        />
        <script
          src="assets/js/jquery.slimscroll.min.js"
          type="f8ea935a0d3ba4066be4611d-text/javascript"
        />
        <script
          src="assets/js/bootstrap.bundle.min.js"
          type="f8ea935a0d3ba4066be4611d-text/javascript"
        />
        <script
          src="assets/plugins/select2/js/select2.min.js"
          type="f8ea935a0d3ba4066be4611d-text/javascript"
        />
        <script
          src="assets/js/cursor.js"
          type="f8ea935a0d3ba4066be4611d-text/javascript"
        />
        <script
          src="assets/js/moment.js"
          type="f8ea935a0d3ba4066be4611d-text/javascript"
        />
        <script
          src="assets/js/bootstrap-datetimepicker.min.js"
          type="f8ea935a0d3ba4066be4611d-text/javascript"
        />
        <script
          src="assets/js/script.js"
          type="f8ea935a0d3ba4066be4611d-text/javascript"
        />
        <script
          data-cf-settings="f8ea935a0d3ba4066be4611d-|49"
          defer
          src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        />
        <script
          crossOrigin="anonymous"
          data-cf-beacon='{"rayId":"908e58097988492c","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
          defer
          integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
          src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        />
      </div>
      ;
    </div>
  );
}

export default Provuder_enquiry;
