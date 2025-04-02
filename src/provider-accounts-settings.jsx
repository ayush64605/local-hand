import { useState, useEffect } from "react";
import { db } from "./firebase"; // Firestore imports
import Provider_header from "./provider-header";
import Provider_sidebar from "./provider-sidebar";
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Ensure correct path to firebase.js

function Provider_accounts_settings() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });
  const [docId, setDocId] = useState(null); // Store the document ID

  useEffect(() => {
    const fetchUserData = async () => {
      const storedEmail = sessionStorage.getItem("userEmail");
      if (!storedEmail) return;

      try {
        const usersRef = collection(db, "localhand-users");
        const q = query(usersRef, where("email", "==", storedEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setUserData(doc.data());
            setDocId(doc.id); // Store document ID for updating
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!docId) return;

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `profileImages/${docId}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      const userDocRef = doc(db, "localhand-users", docId);
      await updateDoc(userDocRef, { profileImage: imageUrl });

      await updateDoc(userDocRef, userData);
      toast.success("Account information updated successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to update.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
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

  const handleRemove = () => {
    setSelectedImage("assets/img/profiles/avatar-02.jpg"); // Reset to default avatar
  };
  return (
    <div className="provider-page">
      <div>
        <div className="main-wrapper">
          <Provider_header />
          <Provider_sidebar />
          <ToastContainer />
          <div className="page-wrapper">
            <div className="content container-fluid">
              <div className="row">
                <div className="col-md-10 mx-auto">
                  <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                    <h5>Account Settings</h5>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10 mx-auto">
                  <div className="card mb-0">
                    <div className="card-body">
                      <h6 className="user-title">Profile Picture</h6>
                      <div className="pro-picture">
                        <div className="pro-img avatar avatar-xl">
                          <img
                            alt="user"
                            className="img-fluid rounded-circle"
                            src={selectedImage || userData.profileImage} // Show selected image if available, otherwise fetch from Firestore
                            style={{
                              width: "100px",
                              height: "70px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
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
                            * Image size should be at least 320px big, and less
                            than 500KB. Allowed files: .png, .jpg.
                          </p>
                        </div>
                      </div>
                      <h6 className="user-title">General Information</h6>
                      <div className="general-info">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Name</label>
                              <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Email</label>
                              <input
                                className="form-control"
                                type="email"
                                name="email"
                                value={userData.email}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Mobile Number
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="phone"
                                value={userData.phone}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Company Website
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="website"
                                value={userData.website}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <h6 className="user-title">Address</h6>
                      <div className="row address-info">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input
                              className="form-control"
                              type="text"
                              name="address"
                              value={userData.address}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Country</label>
                            <input
                              className="form-control"
                              type="text"
                              name="country"
                              value={userData.country}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">State</label>
                            <input
                              className="form-control"
                              type="text"
                              name="state"
                              value={userData.state}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">City</label>
                            <input
                              className="form-control"
                              type="text"
                              name="city"
                              value={userData.city}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="acc-submit d-flex justify-content-end">
                        <button
                          className="btn btn-light me-3"
                          onClick={() => window.location.reload()}
                        >
                          Cancel
                        </button>
                        <button className="btn btn-dark" onClick={handleSave}>
                          Save Changes
                        </button>
                      </div>
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
                    aria-label="Close"
                    data-bs-dismiss="modal"
                    href="javascript:void(0);"
                  >
                    <i className="ti ti-circle-x-filled fs-20" />
                  </a>
                </div>
                <form action="javascript:void(0);">
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
      </div>
    </div>
  );
}

export default Provider_accounts_settings;
