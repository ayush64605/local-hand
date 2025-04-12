import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./header";
import Siderbar from "./sidebar";
import { db, storage } from "./firebase"; // Ensure the correct path
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categorySlug: "",
    categoryIcon: null,
    categoryImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [Buttonloading, setButtonLoading] = useState(false);

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "category"));
        const categoryList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.files[0] });
  };

  const uploadFile = async (iconFile, imageFile) => {
    const uploadFile = async (file, path) => {
      if (!file) return null;
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      return getDownloadURL(snapshot.ref);
    };

    // Upload both files concurrently
    const [iconURL, imageURL] = await Promise.all([
      uploadFile(iconFile, `category-icons/${iconFile.name}`),
      uploadFile(imageFile, `category-images/${imageFile.name}`),
    ]);

    return { iconURL, imageURL };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    try {
      // Upload images
      const { iconURL, imageURL } = await uploadFile(
        categoryData.categoryIcon,
        categoryData.categoryImage
      );

      // Save category data in Firestore
      await addDoc(collection(db, "category"), {
        categoryName: categoryData.categoryName,
        categorySlug: categoryData.categorySlug,
        categoryIcon: iconURL,
        categoryImage: imageURL,
        createdAt: new Date(),
      });

      toast.success("Category added successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setCategoryData({
        categoryName: "",
        categorySlug: "",
        categoryIcon: null,
        categoryImage: null,
      });
    } catch (error) {
      console.error("Error adding category: ", error);
      toast.error("Failed to add category!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }finally{
      setButtonLoading(false);
    }
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
  };

  const confirmDelete = async () => {
    if (selectedCategory) {
      try {
        const { id: categoryId } = selectedCategory;
        await deleteDoc(doc(db, `category`, categoryId));

        // Remove deleted category from state
        setCategories(
          categories.filter((category) => category.id !== categoryId)
        );
        toast.success("category deleted successfully!!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
      setSelectedCategory(null);
    }
  };

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
          <ToastContainer />
          <div className="page-wrapper page-settings">
            <div className="content">
              <div className="content-page-header content-page-headersplit mb-0">
                <h5>Categories</h5>
                <div className="list-btn">
                  <ul>
                    <li>
                      <div className="filter-sorting">
                        <ul>
                          <li>
                            <a
                              className="filter-sets"
                              href="javascript:void(0);"
                            >
                              <i className="fe fe-filter me-2" />
                              Filter
                            </a>
                          </li>
                          <li>
                            <span>
                              <img
                                alt="img"
                                className="me-2"
                                src="assets/img/icons/sort.svg"
                              />
                            </span>
                            <div className="review-sort">
                              <select className="select">
                                <option>{`A -> Z`}</option>
                                <option>{`Z -> A`}</option>
                              </select>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <button
                        className="btn btn-primary"
                        data-bs-target="#add-category"
                        data-bs-toggle="modal"
                        type="button"
                      >
                        <i className="fa fa-plus me-2" />
                        Add Category
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="table-resposnive table-div">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Category</th>
                          <th>Category Slug</th>
                          <th>Icon</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category, index) => (
                          <tr key={category.id}>
                            <td>{index + 1}</td>
                            <td>
                              <div className="table-imgname">
                                <a href="view-category.html">
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src={
                                      category.categoryImage ||
                                      "assets/img/default.jpg"
                                    }
                                  />
                                  <span>
                                    {category.categoryName || "category Name"}
                                  </span>
                                </a>
                              </div>
                            </td>
                            <td>{category.categorySlug || "category Name"}</td>
                            <td>
                              <img
                                alt="Category"
                                className="me-2"
                                src={
                                  category.categoryIcon ||
                                  "assets/img/default.jpg"
                                }
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                }}
                              />
                            </td>
                            <td>
                              {category.createdAt
                                ? new Date(
                                    category.createdAt.seconds * 1000
                                  ).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td>
                              <div className="table-actions d-flex">
                                <button
                                  className="btn delete-table"
                                  data-bs-target="#delete-category"
                                  data-bs-toggle="modal"
                                  type="button"
                                  onClick={() => handleDeleteClick(category)}
                                >
                                  <i className="fe fe-trash-2" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="modal fade" id="add-category">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Category</h5>
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
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="categoryName"
                    value={categoryData.categoryName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label me-1">Category Slug</label>
                  <small className="form-text text-muted">(Ex:test-slug)</small>
                  <input
                    className="form-control"
                    type="text"
                    name="categorySlug"
                    value={categoryData.categorySlug}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category Icon</label>
                  <input
                    type="file"
                    name="categoryIcon"
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category Image</label>
                  <input
                    type="file"
                    name="categoryImage"
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg"
                  />
                </div>
                <div className="text-end">
                  <button
                    className="btn btn-secondary me-2"
                    data-bs-dismiss="modal"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={Buttonloading}
                  >
                    {Buttonloading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="delete-category">
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
                  <h4>Delete Category?</h4>
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
                <button
                  className="btn w-sm btn-danger"
                  type="button"
                  onClick={confirmDelete}
                >
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
        type="7e6343d1e8cf54cb572ded49-text/javascript"
      />
      <script
        src="assets/js/select2.min.js"
        type="7e6343d1e8cf54cb572ded49-text/javascript"
      />
      <script
        src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"
        type="7e6343d1e8cf54cb572ded49-text/javascript"
      />
      <script
        src="assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
        type="7e6343d1e8cf54cb572ded49-text/javascript"
      />
      <script
        src="assets/js/feather.min.js"
        type="7e6343d1e8cf54cb572ded49-text/javascript"
      />
      <script
        src="assets/js/jquery.dataTables.min.js"
        type="7e6343d1e8cf54cb572ded49-text/javascript"
      />
      <script
        src="assets/plugins/slimscroll/jquery.slimscroll.min.js"
        type="7e6343d1e8cf54cb572ded49-text/javascript"
      />
      <script
        src="assets/plugins/sweetalert/sweetalert2.all.min.js"
        type="7e6343d1e8cf54cb572ded49-text/javascript"
      />
      <script
        src="assets/plugins/sweetalert/sweetalerts.min.js"
        type="7e6343d1e8cf54cb572ded49-text/javascript"
      />
      <script
        src="assets/js/admin.js"
        type="7e6343d1e8cf54cb572ded49-text/javascript"
      />
      <script
        data-cf-settings="7e6343d1e8cf54cb572ded49-|49"
        defer
        src="../../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
      />
      <script
        crossOrigin="anonymous"
        data-cf-beacon='{"rayId":"908e5979987147d6","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        defer
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
      />
  
    </div>
  );
}

export default Categories;
