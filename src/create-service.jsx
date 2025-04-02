import { useState, useEffect } from "react";
import { db, storage } from "./firebase"; // Import your Firebase config
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Provider_sidebar from "./provider-sidebar";
import Provider_header from "./provider-header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const MultiStepForm = () => {
  const storedEmail = sessionStorage.getItem("userEmail"); // Get email from sessionStorage
  const [status, setStatus] = useState("Active"); // Default status

  const [userId, setUserId] = useState(null);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch the user's document ID based on their email
  useEffect(() => {
    const fetchUserId = async () => {
      if (!storedEmail) return;

      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", storedEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setUserId(userDoc.id);
      } else {
        console.error("User not found in Firestore.");
      }
    };

    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "category"));
        const categoriesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          categoryName: doc.data().categoryName, // Assuming "name" field stores category name
        }));
        setCategories(categoriesList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    fetchUserId();
  }, [storedEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatus(event.target.id === "status_active" ? "Active" : "Inactive");

    setServiceData((prevData) => {
      let updatedData = { ...prevData, [name]: value };
      console.log("y");

      // Ensure "offer" is not greater than "amount"
      if (name === "offer") {
        const maxOffer = parseFloat(prevData.amount) || 0;
        if (parseFloat(value) > maxOffer) {
          updatedData.offer = "0"; // Reset to 0 if offer > amount
        }
      }

      // Calculate total dynamically (amount - offer)
      if (updatedData.amount && updatedData.offer) {
        updatedData.total =
          parseFloat(updatedData.amount) - parseFloat(updatedData.offer) || 0;
      }

      return updatedData;
    });
  };

  const [serviceData, setServiceData] = useState({
    serviceTitle: "",
    slug: "",
    category: "",
    duration: "",
    amount: "",
    offer: "",
    total: "",
    include: "",
    serviceOverview: "",
    status: status,
    question: "",
    answer: "",
  });

  useEffect(() => {
    console.log("Category:", serviceData.category);
    console.log("duration:", serviceData.duration);
  }, [serviceData.category, serviceData.duration]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previewImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...previewImages]);
  };

  const uploadImages = async () => {
    const storage = getStorage();
    const uploadPromises = images.map(async (image) => {
      const storageRef = ref(storage, `service-images/${image.file.name}`);
      const snapshot = await uploadBytes(storageRef, image.file);
      return getDownloadURL(snapshot.ref);
    });
    return Promise.all(uploadPromises);
  };

  // Validation Function
  const validateForm = () => {
    let newErrors = [];

    if (!serviceData.serviceTitle.trim())
      newErrors.push("Service Title is required.");
    if (!serviceData.slug.trim()) newErrors.push("Slug is required.");
    if (serviceData.category.trim() === "")
      newErrors.push("Category is required.");
    if (!serviceData.amount.trim() || isNaN(serviceData.amount))
      newErrors.push("Valid Amount is required.");
    if (!serviceData.offer.trim() || isNaN(serviceData.offer))
      newErrors.push("Valid Offer Price is required.");
    if (!serviceData.include.trim())
      newErrors.push("Include field is required.");
    if (!serviceData.serviceOverview.trim())
      newErrors.push("Service Overview is required.");
    if (!serviceData.status) newErrors.push("Service Status is required.");
    if (!images.length) newErrors.push("At least one image is required.");
    if (!serviceData.question.trim())
      newErrors.push("Question field is required.");
    if (!serviceData.answer.trim()) newErrors.push("Answer field is required.");
    setErrors(newErrors);
    return newErrors.length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Reset errors
    setSuccessMessage(""); // Reset success message

    if (!userId) {
      setErrors(["User not found. Please log in again."]);
      toast.error("User not found. Please log in again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    if (!validateForm()) {
      toast.warning("Please fill in all required fields correctly.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return; // Stop submission if validation fails
    }

    try {
      setLoading(true); // Start loading
      toast.info("Uploading images, please wait...", {
        position: "bottom-right",
        autoClose: 3000,
      });
      const imageUrls = await uploadImages();

      const processedServiceData = {
        ...serviceData,
        include: serviceData.include
          .split(",,")
          .map((item) => item.trim())
          .filter((item) => item.length > 0),
        question: serviceData.question
          .split(",,")
          .map((item) => item.trim())
          .filter((item) => item.length > 0),
        answer: serviceData.answer
          .split(",,")
          .map((item) => item.trim())
          .filter((item) => item.length > 0),
        images: imageUrls,
      };

      await addDoc(
        collection(db, "localhand-users", userId, "services"),
        processedServiceData
      );

      toast.success("Service added successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setSuccessMessage("Service added successfully!");

      setImages([]); // Reset images
      setServiceData({
        serviceTitle: "",
        slug: "",
        category: "",
        subCategory: "",
        duration: "",
        amount: "",
        offer: "",
        total: "",
        include: "",
        serviceOverview: "",
        status: "active",
        question: "",
        answer: "",
      });
    } catch (error) {
      console.error("Error adding service: ", error);
      setErrors(["Failed to add service."]);
      toast.error("Failed to add service. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <div>
      <ToastContainer />
      <Provider_header />
      <Provider_sidebar />
      <div className="page-wrapper">
        <div
          className="content container-fluid"
          style={{ width: "80%", marginRight: "50px" }}
        >
          <div className="content content-two">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <div className="service-inform-fieldset">
                    <fieldset id="first-field">
                      <h4 className="mb-3">Service Information</h4>
                      <form action="" onSubmit={handleSubmit}>
                        <div className="card">
                          <div className="card-body">
                            <div
                              className="accordion"
                              id="accordionPanelsStayOpenExample"
                            >
                              <div className="accordion-item mb-3">
                                <h5>Basic Information</h5>
                                <div aria-labelledby="accordion-headingOne" className="accordion-collapse collapse show" id="accordion-collapseOne"
                                >
                                  <div className="accordion-body p-0 mt-3 pb-1">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label className="form-label">
                                            Service Title{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <input className="form-control" type="text" name="serviceTitle" value={serviceData.serviceTitle} onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label className="form-label">
                                            Slug{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <input className="form-control" type="text" name="slug" value={serviceData.slug} onChange={handleChange}
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label className="form-label">
                                            Category{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <br />
                                          <select className="select1" name="category" value={serviceData.category} onChange={handleChange}
                                          >
                                            <option value="">Select</option>
                                            {categories.map((category) => (
                                              <option key={category.id} value={category.categoryName}
                                              >
                                                {category.categoryName}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label className="form-label">
                                            Duration{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <select className="select1" name="duration" value={serviceData.duration} onChange={handleChange}
                                          >
                                            <option value="">Select</option>
                                            <option value="15 min">
                                              15 min
                                            </option>
                                            <option value="30 min">
                                              30 min
                                            </option>
                                            <option value="45 min">
                                              45 min
                                            </option>
                                            <option value="1 hour">
                                              1 hour
                                            </option>
                                            <option value="1:30 hour">
                                              1:30 hour
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item mb-3">
                                <div className="accordion-header" id="accordion-headingTwo"
                                >
                                  <h5>Pricing</h5>
                                </div>
                                <div aria-labelledby="accordion-headingTwo" className="accordion-collapse collapse show" id="accordion-collapseTwo"
                                >
                                  <div className="accordion-body p-0 mt-3 pb-1">
                                    <div className="row">
                                      <div className="col-xl-3 col-md-6">
                                        <div className="mb-3">
                                          <label className="form-label">
                                            Enter Amount{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <input className="form-control" type="text" name="amount" value={serviceData.amount} onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-xl-3 col-md-6">
                                        <div className="mb-3">
                                          <label className="form-label">
                                            Offer Price{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <input className="form-control" type="text" name="offer" value={serviceData.offer} onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-xl-3 col-md-6">
                                        <div className="mb-3">
                                          <label className="form-label">
                                            Total
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <input className="form-control" type="text" name="total" value={serviceData.total} onChange={handleChange} readOnly
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="accordion-item mb-3">
                                <h5>Include</h5>
                                <div aria-labelledby="accordion-headingFour" className="accordion-collapse collapse show" id="accordion-collapseFour"
                                >
                                  <div className="accordion-body p-0 mt-3 pb-1">
                                    <div className="addtitle-info">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="mb-3">
                                            <label className="form-label">
                                              Title{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <br />
                                            <span className="text-danger">
                                              Note: If you want to add multiple
                                              then enter double comma(,,)
                                              seprated.
                                            </span>
                                            <div className="d-flex align-items-center">
                                              <input className="form-control" type="text" name="include" value={serviceData.include} onChange={handleChange}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="accordion-item mb-3">
                                <h5>Service Overview</h5>
                                <div aria-labelledby="accordion-headingSix" className="accordion-collapse collapse show" id="accordion-collapseSix"
                                >
                                  <div className="accordion-body p-0 mt-3 pb-1">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="mb-3">
                                          <label className="form-label">
                                            Overview{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <textarea className="form-control ck-editor" name="serviceOverview" value={serviceData.serviceOverview} onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-12">
                                        <div className="mb-3">
                                          <label className="form-label">
                                            Service Status{" "}
                                            <span className="text-danger">
                                              {" "}
                                              *
                                            </span>
                                          </label>
                                          <div className="d-flex align-items-center mb-3">
                                            <div className="form-check me-3">
                                              <input className="form-check-input" defaultChecked id="status_active" name="status" type="radio" onChange={handleChange}
                                              />
                                              <label className="form-check-label" htmlFor="status_active"
                                              >
                                                Active
                                              </label>
                                            </div>
                                            <div className="form-check">
                                              <input className="form-check-input" id="status_inactive" name="status" type="radio" onChange={handleChange}
                                              />
                                              <label className="form-check-label" htmlFor="status_inactive"
                                              >
                                                Inactive
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="accordion-item mb-3">
                                <h5>FAQ</h5>
                                <div aria-labelledby="accordion-headingSix" className="accordion-collapse collapse show" id="accordion-collapseSix"
                                >
                                  <div className="accordion-body p-0 mt-3 pb-1">
                                    <div className="add-faq-info">
                                      <div className="row">
                                        <span className="text-danger">
                                          Note: If you want to add multiple then
                                          enter double comma(,,) seprated.
                                        </span>
                                        <div className="col-md-6">
                                          <div className="mb-3">
                                            <label className="form-label">
                                              Question{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>

                                            <input className="form-control" type="text" name="question" value={serviceData.question} onChange={handleChange}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="mb-3">
                                            <label className="form-label">
                                              Answer{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>

                                            <input className="form-control" type="text" name="answer" value={serviceData.answer} onChange={handleChange}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="accordion-item mb-3">
                                <h5>Gallery</h5>
                                <div className="accordion-body p-0 mt-3 pb-1">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="mb-3">
                                        <label className="form-label">
                                          Add Service Images{" "}
                                          <span className="text-danger">
                                            {" "}
                                            *
                                          </span>
                                        </label>
                                        <div className="d-flex align-items-center flex-wrap row-gap-3">
                                          {images.map((image, index) => (
                                            <div className="avatar avatar-gallery me-3" key={index}
                                            >
                                              <img alt="Img" src={image.preview}
                                              />
                                              <a
                                                className="trash-top d-flex align-items-center justify-content-center"
                                                href="javascript:void(0);"
                                                onClick={() =>
                                                  setImages(
                                                    images.filter(
                                                      (_, i) => i !== index
                                                    )
                                                  )
                                                }
                                              >
                                                <i className="ti ti-trash" />
                                              </a>
                                            </div>
                                          ))}

                                          <div className="file-upload d-flex align-items-center justify-content-center flex-column">
                                            <i className="ti ti-photo mb-2" />
                                            <p className="mb-0">Add Images</p>
                                            <input type="file" accept="image/*" multiple onChange={handleFileChange}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-end border-top pt-3">
                                    <button className="btn btn-dark" type="submit" disabled={loading}
                                    >
                                      {loading ? (
                                        <>
                                          <span className="spinner-border spinner-border-sm me-2"></span>
                                          Saving...
                                        </>
                                      ) : (
                                        "Save & Continue"
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </fieldset>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div>
                    <div className="text-end mb-4"></div>
                    <h4 className="mb-4">Quick Preview</h4>
                  </div>
                  {images?.length > 0 && serviceData?.category && serviceData?.serviceTitle && serviceData?.total ? (
                    <div className="service-item">
                      <div className="service-img">
                        <div className="slide-images">
                          <a href="#">
                            <div>
                              <img
                                alt="Img"
                                className="img-fluid"
                                src={images[0].preview}
                              />
                            </div>
                          </a>
                        </div>
                        <span className="trend-tag">
                          {serviceData.category}
                        </span>
                      </div>
                      <div className="service-content">
                        <h6 className="text-truncate mb-1">
                          <a href="#">{serviceData.serviceTitle}</a>
                        </h6>
                        <p className="service-price">
                          {serviceData.total}
                          {serviceData.total !== serviceData.amount &&
                            serviceData.amount && (
                              <span className="text-decoration-line-through">
                                {" "}
                                {serviceData.amount}{" "}
                              </span>
                            )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="no-preview">
                      Preview is displayed here after fill out all field.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="back-to-top">
        <a
          className="back-to-top-icon align-items-center justify-content-center d-flex"
          href="#top"
        >
          <i className="fa-solid fa-arrow-up" />
        </a>
      </div>
      <div className="xb-cursor tx-js-cursor">
        <div className="xb-cursor-wrapper">
          <div className="xb-cursor--follower xb-js-follower" />
        </div>
      </div>
      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="fa6b2b2cc883337d999e01db-text/javascript"
      />
      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="fa6b2b2cc883337d999e01db-text/javascript"
      />
      <script
        src="assets/plugins/select2/js/select2.min.js"
        type="fa6b2b2cc883337d999e01db-text/javascript"
      />
      <script
        src="assets/plugins/ckeditor/ckeditor.js"
        type="fa6b2b2cc883337d999e01db-text/javascript"
      />
      <script
        src="assets/plugins/owlcarousel/owl.carousel.min.js"
        type="fa6b2b2cc883337d999e01db-text/javascript"
      />
      <script
        src="assets/js/script.js"
        type="fa6b2b2cc883337d999e01db-text/javascript"
      />
      <script
        data-cf-settings="fa6b2b2cc883337d999e01db-|49"
        defer
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
      />
      <script
        crossOrigin="anonymous"
        data-cf-beacon='{"rayId":"908e4e33ac434019","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        defer
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
      />
    </div>
  );
};

export default MultiStepForm;
