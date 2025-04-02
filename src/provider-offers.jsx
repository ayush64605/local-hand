import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
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
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Provider_offers() {
  const [count, setCount] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [updatedOffer, setUpdatedOffer] = useState("");
  const [userDocId, setUserDocId] = useState(null);
  const [error, setError] = useState("");

  const storedEmail = sessionStorage.getItem("userEmail");

  useEffect(() => {
    if (storedEmail) {
      fetchUserData(storedEmail);
    }
  }, [storedEmail]);

  // Fetch User Document ID and Services
  const fetchUserData = async (email) => {
    try {
      setLoading(true); // Start loading before fetching

      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", email));
      const userSnapshot = await getDocs(q);

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userDocId = userDoc.id;
        setUserDocId(userDocId); // Store userDocId in state

        // Fetch services after getting the userDocId
        await fetchUserServices(userDocId);
      } else {
        console.error("User not found in Firestore!");
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false); // Ensure loading is turned off at the end
    }
  };

  // Fetch Services for the User
  const fetchUserServices = async (userDocId) => {
    try {
      const servicesRef = collection(
        db,
        `localhand-users/${userDocId}/services`
      );
      const servicesSnapshot = await getDocs(servicesRef);

      const fetchedServices = servicesSnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().serviceTitle || "Untitled Service",
        offer: doc.data().offer || "",
        price: doc.data().total || "N/A",
        originalPrice: doc.data().amount || null,
        status: doc.data().status || "Inactive",
        images: doc.data().images || [],
      }));

      setServices(fetchedServices);
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    }
  };

  // Calculate Discount Percentage
  const calculatePercentage = (originalPrice, price) => {
    if (!originalPrice || !price || originalPrice <= 0) return "N/A";
    const discount = ((originalPrice - price) / originalPrice) * 100;
    return `${discount.toFixed(2)}%`;
  };

  // Handle Edit Button Click
  const handleEditClick = (service) => {
    setSelectedService(service);
    setUpdatedOffer(service.offer || ""); // Set default if empty
  };

  // Handle Offer Update in Firestore
  const handleUpdateOffer = async () => {
    if (!selectedService || !userDocId || updatedOffer === "") return;

    console.log(selectedService.originalPrice);
    console.log(updatedOffer);

    const newTotal = selectedService.originalPrice - updatedOffer; // New total calculation

    console.log(newTotal);
    try {
      const serviceRef = doc(
        db,
        `localhand-users/${userDocId}/services`,
        selectedService.id
      );
      await updateDoc(serviceRef, {
        offer: updatedOffer,
        total: newTotal,
      });

      toast.success("Offer updated successfully!", { position: "bottom-right", autoClose: 3000 });
      fetchUserServices(userDocId); // Refresh services after update
    } catch (error) {
      console.error("Error updating offer and total:", error);
      toast.error("Failed to update offer.", { position: "bottom-right", autoClose: 3000 });
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
              <div className="row">
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
                  <h4>Offers</h4>
                  <div className="d-flex align-items-center flex-wrap row-gap-3">
                    <span className="fs-14 me-2">Sort</span>
                    <div className="dropdown me-2">
                      <a
                        href="javascript:void(0);"
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        Newly Added
                      </a>
                      <div className="dropdown-menu">
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item active"
                        >
                          Ascending
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          Descending
                        </a>
                      </div>
                    </div>
                    <div className="dropdown me-2">
                      <a
                        href="javascript:void(0);"
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        Export
                      </a>
                      <div className="dropdown-menu">
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item active"
                        >
                          Export as PDF
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          Export as Excel
                        </a>
                      </div>
                    </div>
                    <a
                      href="javascript:void(0);"
                      className="tags d-flex justify-content-center align-items-center border rounded me-2"
                    >
                      <i className="ti ti-printer"></i>
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="tags active d-flex justify-content-center align-items-center border rounded me-2"
                      id="filter_search"
                    >
                      <i className="ti ti-sort-descending"></i>
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-dark d-flex justify-content-center align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#add-offer"
                    >
                      <i className="ti ti-circle-plus me-2"></i>Add Offer
                    </a>
                  </div>
                </div>
                <div id="filter_inputs">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-xl">
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
                    <div className="col-lg-4 col-md-6 col-xl">
                      <div className="mb-3">
                        <select className="select">
                          <option>Services</option>
                          <option>Computer Repairs</option>
                          <option>Plumbing</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-xl">
                      <div className="mb-3">
                        <select className="select">
                          <option>Offer Percentage</option>
                          <option>25%</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="provide-table manage-table">
                  <div className="table-responsive">
                    <table className="table  datatable">
                      <thead className="thead-light">
                        <tr>
                          <th>Service</th>
                          <th>Amount</th>
                          <th>Offer</th>
                          <th>Offer(%)</th>
                          <th>Total Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="7">Loading services...</td>
                          </tr>
                        ) : services.length > 0 ? (
                          services.map((service) => (
                            <tr key={service.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <a
                                    href="service-details.html"
                                    className="avatar avatar-lg me-2"
                                  >
                                    <img
                                      src={
                                        service.images.length > 0
                                          ? service.images[0]
                                          : "default.jpg"
                                      }
                                      className="rounded"
                                      alt="user"
                                    />
                                  </a>
                                  <h6 className="fs-14">
                                    <a href="#">{service.title}</a>
                                  </h6>
                                </div>
                              </td>
                              <td>{service.originalPrice}</td>
                              <td>{service.offer}</td>
                              <td>
                                {calculatePercentage(
                                  service.originalPrice,
                                  service.price
                                )}
                              </td>
                              <td>{service.price}</td>

                              <td>
                                <div className="user-icon d-inline-flex">
                                  <a
                                    href="#"
                                    className="me-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit-offer"
                                    onClick={() => handleEditClick(service)}
                                  >
                                    <i className="ti ti-edit"></i>
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7">No services found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="table-paginate d-flex justify-content-between align-items-center flex-wrap row-gap-3">
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
                            className="page-link-1 d-flex justify-content-center align-items-center"
                            href="javascript:void(0);"
                          >
                            2
                          </a>
                        </li>
                        <li className="page-item ">
                          <a
                            className="page-link-1 d-flex justify-content-center align-items-center"
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

        <div
          className="modal fade wallet-modal"
          id="add-offer"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center justify-content-between  border-0">
                <h5>Add Offer</h5>
                <a
                  href="javascript:void(0);"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-circle-x-filled fs-20"></i>
                </a>
              </div>
              <form action="">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Offer Price</label>
                        <input type="text" className="form-control" />
                      </div>
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
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade wallet-modal"
          id="edit-offer"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center justify-content-between  border-0">
                <h5>Edit Offer</h5>
                <a href="#" data-bs-dismiss="modal" aria-label="Close">
                  <i className="ti ti-circle-x-filled fs-20"></i>
                </a>
              </div>
              <form action="">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Offer Price</label>
                        <input
                          type="text"
                          className="form-control"
                          value={updatedOffer}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (
                              value === "" ||
                              (selectedService &&
                                Number(value) <= selectedService.originalPrice)
                            ) {
                              setUpdatedOffer(value);
                              setError(""); // Clear error if valid
                            } else {
                              setError(
                                "Offer price cannot be greater than the original price!"
                              );
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="modal-footer d-flex align-items-center">
                {error && <span className="text-danger me-2">{error}</span>}
                <button
                  type="button"
                  className="btn bg-gray"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleUpdateOffer}
                  data-bs-dismiss="modal"
                  disabled={!!error} // Disable button if there's an error
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade custom-modal" id="del-offer">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                <h5 className="modal-title">Delete Offer</h5>
                <a href="#" data-bs-dismiss="modal" aria-label="Close">
                  <i className="ti ti-circle-x-filled fs-20"></i>
                </a>
              </div>
              <div className="modal-body">
                <div className="write-review">
                  <form action="">
                    <p>Are you sure want to delete this offer?</p>
                    <div className="modal-submit text-end">
                      <a
                        href="#"
                        className="btn btn-light me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </a>
                      <button type="submit" className="btn btn-dark">
                        Yes
                      </button>
                    </div>
                  </form>
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
              <form action="">
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

      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="9635887eb1a677d697ac7efc-text/javascript"
      ></script>

      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="9635887eb1a677d697ac7efc-text/javascript"
      ></script>

      <script
        src="assets/js/wow.min.js"
        type="9635887eb1a677d697ac7efc-text/javascript"
      ></script>

      <script
        src="assets/js/jquery.slimscroll.min.js"
        type="9635887eb1a677d697ac7efc-text/javascript"
      ></script>

      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="9635887eb1a677d697ac7efc-text/javascript"
      ></script>

      <script
        src="assets/plugins/moment/moment.html"
        type="9635887eb1a677d697ac7efc-text/javascript"
      ></script>
      <script
        src="assets/js/bootstrap-datetimepicker.min.js"
        type="9635887eb1a677d697ac7efc-text/javascript"
      ></script>

      <script
        src="assets/plugins/datatables/jquery.dataTables.min.js"
        type="9635887eb1a677d697ac7efc-text/javascript"
      ></script>
      <script
        src="assets/plugins/datatables/datatables.min.js"
        type="9635887eb1a677d697ac7efc-text/javascript"
      ></script>

      <script
        src="assets/js/script.js"
        type="9635887eb1a677d697ac7efc-text/javascript"
      ></script>
      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="9635887eb1a677d697ac7efc-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e4e5858114019","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default Provider_offers;
