import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import User_dashboard_sidebar from "./user-dashboard-sidebar";
import Footer from "./footer";
import Header from "./header";
import { db } from "./firebase"; // Ensure you have Firebase initialized
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Ensure correct path to firebase.js
import { toast } from "react-toastify"; // Import toast if not already imported
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Account_settings() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState(null);
  const storedEmail = sessionStorage.getItem("userEmail");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [updateloading, setupdateLoading] = useState(); // Add loading state

  useEffect(() => {
    setLoading(true);
    const fetchUserDetails = async () => {
      if (!storedEmail) return;

      try {
        const usersRef = collection(db, "localhand-users");
        const q = query(usersRef, where("email", "==", storedEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0]; // Get the first matching document
          const userData = userDoc.data(); // Get the document data
          setUserData(userData);
          setUser({ ...userData, id: userDoc.id }); // Add document ID to user state
          setUserId(userDoc.id); // Store document ID separately
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to fetch user details!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [storedEmail]);

  console.log(userData);
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const [selectedImage, setSelectedImage] = useState();
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Store selected file for upload
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!userId) return;
    setLoading(true);
  
    try {
      let imageUrl = userData.profileImage || ""; // Keep existing image if not changed
  
      if (imageFile) {
        // Upload image to Firebase Storage
        const imageRef = ref(storage, `profileImages/${userId}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }
  
      // Prepare user data for update
      const updatedUserData = {
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        city: userData.city || "",
        state: userData.state || "",
        country: userData.country || "",
        postalcode: userData.postalcode || "",
        profileImage: imageUrl,
      };
  
      // Save updated data to Firestore
      const userRef = doc(db, "localhand-users", userId);
      await updateDoc(userRef, updatedUserData);
  
      toast.success("Profile updated successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
  
      setSelectedImage(imageUrl); // Update UI with the uploaded image
      setUserData(updatedUserData); // Reflect changes in UI
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  

  const handleRemove = () => {
    setSelectedImage("assets/img/profiles/avatar-02.jpg"); // Reset to default avatar
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Settings</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home-2"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item">Customer</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Settings
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="breadcrumb-bg">
            <img
              src="assets/img/bg/breadcrumb-bg-01.png"
              className="breadcrumb-bg-1"
              alt="Img"
            />
            <img
              src="assets/img/bg/breadcrumb-bg-02.png"
              className="breadcrumb-bg-2"
              alt="Img"
            />
          </div>
        </div>
      </div>

      <div className="page-wrapper">
        <div className="content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-3 col-lg-4 theiaStickySidebar">
                <User_dashboard_sidebar />
              </div>
              {loading ? (
                <div className="spinner-container">
                  <div className="spinner"></div>
                </div>
              ) : (
                <div className="col-xl-9 col-lg-8">
                  <h4 className="mb-3">Account Settings</h4>
                  <h6 className="mb-4">Profile Picture</h6>
                  <div className="d-flex align-items-center">
                    {/* Avatar */}
                    <span className="avatar avatar-xl me-2">
                    <img
                            alt="user"
                            className="img-fluid rounded-circle"
                            src={selectedImage || userData.profileImage} // Show selected image if available, otherwise fetch from Firestore
                            style={{
                              width: "100px",
                              height: "65px",
                              objectFit: "cover",
                            }}
                          />
                    </span>

                    {/* Upload & Remove Buttons */}
                    <div>
                      <label
                        className="btn btn-dark me-2 mb-2"
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                        <i className="feather-upload-cloud me-1"></i> Upload
                      </label>
                      <button
                        className="btn btn-light mb-2"
                        onClick={handleRemove}
                      >
                        Remove
                      </button>
                      <p>
                        * Image size should be at least 320px big, and less than
                        500KB. Allowed files: .png, .jpg.
                      </p>
                    </div>
                  </div>
                  <h6>General Information</h6>
                  <div className="general-info mb-0">
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={userData.name || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={userData.email || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Mobile Number</label>
                          <input
                            type="text"
                            className="form-control"
                            value={userData.phone || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <h6 className="user-title">Address </h6>
                    <div className="row">
                      <div className="col-md-12">
                        <div className=" mb-3">
                          <label className="form-label">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={userData.address || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className=" mb-3">
                          <label className="form-label">City</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={userData.city || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className=" mb-3">
                          <label className="form-label">State</label>
                          <input
                            type="email"
                            className="form-control"
                            name="state"
                            value={userData.state || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className=" mb-3">
                          <label className="form-label">Country</label>
                          <input
                            type="text"
                            className="form-control"
                            name="contry"
                            value={userData.contry || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className=" mb-3">
                          <label className="form-label">Postal Code</label>
                          <input
                            type="text"
                            className="form-control"
                            name="postalcode"
                            value={userData.postalcode || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="acc-submit d-flex justify-content-end align-items-center">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-light me-2"
                      >
                        Cancel
                      </a>

                      <button
                        href="javascript:void(0);"
                        className="btn btn-dark"
                        onClick={handleSave}
                        disabled={updateloading}
                      >
                        {updateloading ? (
                          <div className="d-flex align-items-center justify-content-center">
                            <div
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></div>
                            Saving...
                          </div>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
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

      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="84904fabe69cb5f1259ed43b-text/javascript"
      ></script>

      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="84904fabe69cb5f1259ed43b-text/javascript"
      ></script>

      <script
        src="assets/js/wow.min.js"
        type="84904fabe69cb5f1259ed43b-text/javascript"
      ></script>

      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="84904fabe69cb5f1259ed43b-text/javascript"
      ></script>

      <script
        src="assets/plugins/theia-sticky-sidebar/ResizeSensor.js"
        type="84904fabe69cb5f1259ed43b-text/javascript"
      ></script>
      <script
        src="assets/plugins/theia-sticky-sidebar/theia-sticky-sidebar.js"
        type="84904fabe69cb5f1259ed43b-text/javascript"
      ></script>

      <script
        src="assets/plugins/moment/moment.html"
        type="84904fabe69cb5f1259ed43b-text/javascript"
      ></script>
      <script
        src="assets/js/bootstrap-datetimepicker.min.js"
        type="84904fabe69cb5f1259ed43b-text/javascript"
      ></script>

      <script
        src="assets/js/cursor.js"
        type="84904fabe69cb5f1259ed43b-text/javascript"
      ></script>

      <script
        src="assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
        type="84904fabe69cb5f1259ed43b-text/javascript"
      ></script>

      <script
        src="assets/js/script.js"
        type="84904fabe69cb5f1259ed43b-text/javascript"
      ></script>
      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="84904fabe69cb5f1259ed43b-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e4e40fe8f4019","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>
    </>
  );
}

export default Account_settings;
