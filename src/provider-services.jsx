import React, { useEffect, useState } from "react";
import "./App.css";
import Provider_header from "./provider-header";
import Provider_sidebar from "./provider-sidebar";
import { db } from "./firebase"; // Ensure correct Firebase import
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Provider_services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [newStatus, setNewStatus] = useState(null);
  const storedEmail = sessionStorage.getItem("userEmail");

  useEffect(() => {
    if (storedEmail) {
      fetchUserServices(storedEmail);
    }
  }, [storedEmail]);

  const fetchUserServices = async (email) => {
    setLoading(true)
    try {

      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", email));
      const userSnapshot = await getDocs(q);

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userDocId = userDoc.id;

        const servicesRef = collection(
          db,
          `localhand-users/${userDocId}/services`
        );
        const servicesSnapshot = await getDocs(servicesRef);

        const fetchedServices = servicesSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.serviceTitle || "Untitled Service",
            category: data.category || "No Category",
            rating: data.rating || "N/A",
            location: data.location || "Unknown Location",
            price: data.total || "N/A",
            originalPrice: data.amount || null,
            status: data.status || "Inactive",
            images: data.images || [],
          };
        });

        setServices(fetchedServices);
      } else {
        console.error("User not found in Firestore!");
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to set selected service ID and status for modal
  const handleStatusChange = (serviceId, currentStatus) => {
    setSelectedServiceId(serviceId);
    setNewStatus(currentStatus === "Active" ? "Inactive" : "Active");
  };

  const updateServiceStatus = async () => {
    if (!selectedServiceId || !newStatus || !storedEmail) {
      toast.warning("Missing required information.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }
  
    try {
      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", storedEmail));
      const userSnapshot = await getDocs(q);
  
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userDocId = userDoc.id;
  
        const serviceDocRef = doc(
          db,
          `localhand-users/${userDocId}/services`,
          selectedServiceId
        );
  
        await updateDoc(serviceDocRef, { status: newStatus });
  
        // Update local state
        setServices((prevServices) =>
          prevServices.map((service) =>
            service.id === selectedServiceId
              ? { ...service, status: newStatus }
              : service
          )
        );
  
        toast.success("Service status updated successfully!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        toast.error("User not found. Please refresh the page.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating service status:", error);
      toast.error("Failed to update service status. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };
  
  const handleDeleteClick = (serviceId) => {
    setSelectedServiceId(serviceId);
    toast.info("Click delete again to confirm.", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };
  
  // Function to delete service from Firestore
  const deleteService = async () => {
    if (!selectedServiceId) {
      toast.warning("No service selected.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }
  
    try {
      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", storedEmail));
      const userSnapshot = await getDocs(q);
  
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userDocId = userDoc.id;
  
        const serviceDocRef = doc(
          db,
          `localhand-users/${userDocId}/services`,
          selectedServiceId
        );
  
        await deleteDoc(serviceDocRef);
  
        // Update state immediately to reflect UI changes
        setServices((prevServices) =>
          prevServices.filter((service) => service.id !== selectedServiceId)
        );
  
        toast.success("Service deleted successfully!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        toast.error("User not found. Please refresh the page.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };
  

  return (
    <div className="provider-page">
      <div className="main-wrapper">
        <Provider_header />
        <Provider_sidebar />
        <ToastContainer/>
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="row">
              <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                <h5>My Services</h5>
                <div className="d-flex align-items-center">
                  <a
                    href="/create-services"
                    className="btn btn-dark d-flex align-items-center"
                  >
                    <i className="ti ti-circle-plus me-2"></i>Add Services
                  </a>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-xl-12 col-lg-12">
                <div className="tab-content pt-0">
                  <div className="tab-pane active" id="active-service">
                    <div className="row justify-content-center align-items-center">
                      {loading ? (
                        <div className="spinner-container">
                        <div className="spinner"></div>
                      </div>
                      ) : services.length > 0 ? (
                        services.map((service) => (
                          <div key={service.id} className="col-xl-4 col-md-6">
                            <div className="card p-0">
                              <div className="card-body p-0">
                                <div className="img-sec w-100">
                                  <a href="service-details.html">
                                    <img
                                      src={
                                        service.images.length > 0
                                          ? service.images[0]
                                          : "default.jpg"
                                      }
                                      className="img-fluid rounded-top w-100"
                                      alt={service.title}
                                    />
                                  </a>
                                  <div className="image-tag d-flex justify-content-end align-items-center">
                                    <span className="trend-tag">
                                      {service.category}
                                    </span>
                                    <span className="trend-tag-2 d-flex justify-content-center align-items-center rating text-gray">
                                      <i className="fa fa-star filled me-1"></i>
                                      {service.rating}
                                    </span>
                                  </div>
                                </div>
                                <div className="p-3">
                                  <h5 className="mb-2 text-truncate">
                                    <a href="service-details.html">
                                      {service.title}
                                    </a>
                                  </h5>
                                  <div className="d-flex justify-content-between align-items-center mb-3">
                                    <a
                                      href="#"
                                      data-bs-toggle="modal"
                                      data-bs-target={
                                        service.status === "Active"
                                          ? "#in-active"
                                          : "#active"
                                      }
                                      onClick={() =>
                                        handleStatusChange(
                                          service.id,
                                          service.status
                                        )
                                      }
                                    >
                                      <i className="ti ti-info-circle me-2"></i>
                                      {service.status === "Active"
                                        ? "Active"
                                        : "Inactive"}
                                    </a>
                                    <h5>
                                      {service.price}{" "}
                                      {service.originalPrice && (
                                        <span className="fs-13 text-gray">
                                          <del>{service.originalPrice}/hr</del>
                                        </span>
                                      )}
                                    </h5>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex gap-3">
                                      <a href="javascript:void(0);">
                                        <i className="ti ti-edit me-2"></i>
                                        Edit
                                      </a>
                                    </div>
                                    <div className="d-flex gap-3">
                                      <a
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#del-service"
                                        onClick={() =>
                                          handleDeleteClick(service.id)
                                        }
                                      >
                                        <i className="ti ti-trash me-2"></i>
                                        Delete
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No services found</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade custom-modal" id="in-active">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                  <h5 className="modal-title">Inactive Service</h5>
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
                    <p>Are you sure want to inactive this service?</p>
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
                        onClick={updateServiceStatus}
                        data-bs-dismiss="modal"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade custom-modal" id="active">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                  <h5 className="modal-title">Active Services</h5>
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
                    <p>Are you sure want to active this service?</p>
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
                        onClick={updateServiceStatus}
                        data-bs-dismiss="modal"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade custom-modal" id="del-service">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                <h5 className="modal-title">Delete Service</h5>
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
                  <p>Are you sure want to delete this service?</p>
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
                      onClick={deleteService}
                      data-bs-dismiss="modal"
                    >
                      Yes, Delete
                    </button>
                  </div>
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
                <button
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="20e630a2e29e5c4c61396f0a-text/javascript"
      ></script>

      <script
        src="assets/js/jquery.slimscroll.min.js"
        type="20e630a2e29e5c4c61396f0a-text/javascript"
      ></script>

      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="20e630a2e29e5c4c61396f0a-text/javascript"
      ></script>

      <script
        src="assets/js/wow.min.js"
        type="20e630a2e29e5c4c61396f0a-text/javascript"
      ></script>

      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="20e630a2e29e5c4c61396f0a-text/javascript"
      ></script>

      <script
        src="assets/plugins/owlcarousel/owl.carousel.min.js"
        type="20e630a2e29e5c4c61396f0a-text/javascript"
      ></script>

      <script
        src="assets/js/cursor.js"
        type="20e630a2e29e5c4c61396f0a-text/javascript"
      ></script>

      <script
        src="assets/plugins/apexchart/apexcharts.min.js"
        type="20e630a2e29e5c4c61396f0a-text/javascript"
      ></script>
      <script
        src="assets/plugins/apexchart/chart-data.js"
        type="20e630a2e29e5c4c61396f0a-text/javascript"
      ></script>

      <script
        src="assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
        type="20e630a2e29e5c4c61396f0a-text/javascript"
      ></script>

      <script
        src="assets/plugins/simple-calendar/jquery.simple-calendar.min.js"
        type="20e630a2e29e5c4c61396f0a-text/javascript"
      ></script>
      <script
        src="assets/js/calender.js"
        type="20e630a2e29e5c4c61396f0a-text/javascript"
      ></script>

      <script
        src="assets/js/script.js"
        type="20e630a2e29e5c4c61396f0a-text/javascript"
      ></script>
      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="20e630a2e29e5c4c61396f0a-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e4e44f97d4019","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default Provider_services;
