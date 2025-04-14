import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./header";
import Siderbar from "./sidebar";
import { db } from "./firebase"; // Import Firestore instance
import { collection, query, where, getDocs } from "firebase/firestore";

function Users() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchUsersWithBookings = async () => {
      try {
        // Step 1: Fetch users where role is "user"
        const usersQuery = query(
          collection(db, "localhand-users"),
          where("role", "==", "user")
        );
        const usersSnapshot = await getDocs(usersQuery);
        const usersData = usersSnapshot.docs.map((doc, index) => ({
          id: doc.id,
          index: index + 1,
          ...doc.data(),
        }));

        // Step 2: Fetch bookings for each user and calculate total earnings
        const usersWithBookings = await Promise.all(
          usersData.map(async (user) => {
            const bookingsQuery = query(
              collection(db, "bookings"),
              where("userId", "==", user.id)
            );
            const bookingsSnapshot = await getDocs(bookingsQuery);

            let totalBookings = bookingsSnapshot.size;
            let totalEarnings = 0;

            bookingsSnapshot.forEach((doc) => {
              totalEarnings += doc.data().totalAmount || 0;
            });

            return { ...user, totalBookings, totalEarnings };
          })
        );

        setUsers(usersWithBookings);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsersWithBookings();
  }, []);

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
          <div className="page-wrapper page-settings">
            <div className="content">
              <div className="content-page-header content-page-headersplit">
                <h5>Users</h5>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table datatable">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Mobile</th>
                          <th>Email</th>
                          <th>City</th>
                          <th>State</th>
                          <th>Total Booking</th>
                          <th>Total Spend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length > 0 ? (
                          users.map((user) => (
                            <tr key={user.id}>
                              <td>{user.index}</td>
                              <td className="table-namesplit">
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src={
                                      user.profileImage ||
                                      "assets/img/customer/user-01.jpg"
                                    }
                                  />
                                </a>
                                <a
                                  className="table-name"
                                  href="javascript:void(0);"
                                >
                                  <span>{user.name || "Unknown"}</span>
                                </a>
                              </td>
                              <td>{user.phone || "N/A"}</td>
                              <td>{user.email || "N/A"}</td>
                              <td>{user.city || "N/A"}</td>
                              <td>{user.state || "N/A"}</td>
                              <td>{user.totalBookings || "N/A"}</td>
                              <td>{user.totalEarnings || "N/A"}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No users found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="modal fade" id="add-user">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add User</h5>
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
              <form>
                <div className="profile-upload mb-3">
                  <div className="profile-upload-img">
                    <img
                      alt="img"
                      id="blah"
                      src="assets/img/customer/user-01.jpg"
                    />
                  </div>
                  <div className="profile-upload-content">
                    <div className="profile-upload-btn">
                      <div className="profile-upload-file">
                        <input id="imgInp" type="file" />
                        <a
                          className="btn btn-upload"
                          href="javascript:void(0);"
                        >
                          Upload
                        </a>
                      </div>
                      <a className="btn btn-remove" href="javascript:void(0);">
                        Remove
                      </a>
                    </div>
                    <div className="profile-upload-para">
                      <p>
                        * Recommends a minimum size of 320 x 320 pixels. Allowed
                        files .png and .jpg.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <div className="pass-group">
                    <input
                      className="form-control pass-input"
                      type="password"
                    />
                    <span className="fas toggle-password fa-eye-slash" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <div className="pass-group">
                    <input
                      className="form-control pass-inputs"
                      type="password"
                    />
                    <span className="fas toggle-passwords fa-eye-slash" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select className="select">
                    <option>Admin</option>
                    <option>Super Admin</option>
                  </select>
                </div>
                <div className="form-groupheads d-flex d-flex justify-content-between mb-4">
                  <h2>Status</h2>
                  <div className="active-switch">
                    <label className="switch">
                      <input defaultChecked type="checkbox" />
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
      <div className="modal fade" id="edit-user">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit User</h5>
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
              <form>
                <div className="profile-upload mb-3">
                  <div className="profile-upload-img">
                    <img
                      alt="img"
                      id="blah"
                      src="assets/img/customer/user-01.jpg"
                    />
                  </div>
                  <div className="profile-upload-content">
                    <div className="profile-upload-btn">
                      <div className="profile-upload-file">
                        <input id="imgInp" type="file" />
                        <a
                          className="btn btn-upload"
                          href="javascript:void(0);"
                        >
                          Upload
                        </a>
                      </div>
                      <a className="btn btn-remove" href="javascript:void(0);">
                        Remove
                      </a>
                    </div>
                    <div className="profile-upload-para">
                      <p>
                        * Recommends a minimum size of 320 x 320 pixels. Allowed
                        files .png and .jpg.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    defaultValue="Admin"
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    className="form-control"
                    defaultValue="admin"
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    defaultValue="admin@example.com"
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-control"
                    defaultValue="518-837-9258"
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <div className="pass-group">
                    <input
                      className="form-control pass-input"
                      type="password"
                    />
                    <span className="fas toggle-password fa-eye-slash" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <div className="pass-group">
                    <input
                      className="form-control pass-inputs"
                      type="password"
                    />
                    <span className="fas toggle-passwords fa-eye-slash" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select className="select">
                    <option>Admin</option>
                    <option>Super Admin</option>
                  </select>
                </div>
                <div className="form-groupheads d-flex d-flex justify-content-between mb-4">
                  <h2>Status</h2>
                  <div className="active-switch">
                    <label className="switch">
                      <input defaultChecked type="checkbox" />
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
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="delete-user">
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
                  <h4>Delete User?</h4>
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
                <button className="btn w-sm btn-danger" type="button">
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
    type="4728ba293e4031c731ce9246-text/javascript"
  />
  <script
    src="assets/js/select2.min.js"
    type="4728ba293e4031c731ce9246-text/javascript"
  />
  <script
    src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"
    type="4728ba293e4031c731ce9246-text/javascript"
  />
  <script
    src="assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
    type="4728ba293e4031c731ce9246-text/javascript"
  />
  <script
    src="assets/js/feather.min.js"
    type="4728ba293e4031c731ce9246-text/javascript"
  />
  <script
    src="assets/js/jquery.dataTables.min.js"
    type="4728ba293e4031c731ce9246-text/javascript"
  />
  <script
    src="assets/plugins/slimscroll/jquery.slimscroll.min.js"
    type="4728ba293e4031c731ce9246-text/javascript"
  />
  <script
    src="assets/plugins/sweetalert/sweetalert2.all.min.js"
    type="4728ba293e4031c731ce9246-text/javascript"
  />
  <script
    src="assets/plugins/sweetalert/sweetalerts.min.js"
    type="4728ba293e4031c731ce9246-text/javascript"
  />
  <script
    src="assets/js/admin.js"
    type="4728ba293e4031c731ce9246-text/javascript"
  />
  <script
    data-cf-settings="4728ba293e4031c731ce9246-|49"
    defer
    src="../../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
  />
  <script
    crossOrigin="anonymous"
    data-cf-beacon='{"rayId":"908e597af9a447d6","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
    defer
    integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
    src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
  />
    </div>
  );
}

export default Users;
