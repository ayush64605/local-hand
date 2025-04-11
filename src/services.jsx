import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./header";
import Siderbar from "./sidebar";
import { db } from "./firebase"; // Adjust import based on your setup
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

function Services() {
  const [count, setCount] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const usersRef = collection(db, "localhand-users");
        const q = query(usersRef, where("role", "==", "provider"));
        const usersSnapshot = await getDocs(q);

        let servicesArray = [];

        for (const userDoc of usersSnapshot.docs) {
          const userData = userDoc.data();
          const companyName = userData.name || "Company Name";
          const servicesRef = collection(userDoc.ref, "services");
          const servicesSnapshot = await getDocs(servicesRef);

          servicesSnapshot.forEach((serviceDoc) => {
            servicesArray.push({
              id: serviceDoc.id,
              ...serviceDoc.data(),
              company: companyName,
            });
          });
        }

        setServices(servicesArray);

        // Set the first service ID if available
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
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
                <h5>All Services</h5>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="table-resposnive table-div">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Service</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Duration</th>
                          <th>Status</th>
                          <th>Created By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((service, index) => (
                          <tr key={service.id}>
                            <td>{index + 1}</td>
                            <td>
                              <div className="table-imgname">
                                <a href="view-service.html">
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src={
                                      service.images.length > 0
                                        ? service.images[0]
                                        : "default.jpg"
                                    }
                                  />
                                  <span>
                                    {service.serviceTitle || "Service Name"}
                                  </span>
                                </a>
                              </div>
                            </td>
                            <td>{service.category || "Service Name"}</td>
                            <td>{service.total || "Service Name"}</td>
                            <td>{service.duration || "Service Name"}</td>
                            <td>
                              <h6 className="badge-pending">
                                {service.status || "Service Name"}
                              </h6>
                            </td>
                            <td>
                              <a
                                className="table-profileimage"
                                href="javascript:void(0);"
                              >
                                <img
                                  alt="img"
                                  className="me-2"
                                  src="assets/img/customer/user-01.jpg"
                                />
                                <span>{service.company || "Service Name"}</span>
                              </a>
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

      <script
        data-cfasync="false"
        src="../../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
      />
      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="57b1bb0b93362e0cddf86155-text/javascript"
      />
      <script
        src="assets/js/select2.min.js"
        type="57b1bb0b93362e0cddf86155-text/javascript"
      />
      <script
        src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"
        type="57b1bb0b93362e0cddf86155-text/javascript"
      />
      <script
        src="assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
        type="57b1bb0b93362e0cddf86155-text/javascript"
      />
      <script
        src="assets/js/feather.min.js"
        type="57b1bb0b93362e0cddf86155-text/javascript"
      />
      <script
        src="assets/js/jquery.dataTables.min.js"
        type="57b1bb0b93362e0cddf86155-text/javascript"
      />
      <script
        src="assets/plugins/slimscroll/jquery.slimscroll.min.js"
        type="57b1bb0b93362e0cddf86155-text/javascript"
      />
      <script
        src="assets/plugins/sweetalert/sweetalert2.all.min.js"
        type="57b1bb0b93362e0cddf86155-text/javascript"
      />
      <script
        src="assets/plugins/sweetalert/sweetalerts.min.js"
        type="57b1bb0b93362e0cddf86155-text/javascript"
      />
      <script
        src="assets/js/admin.js"
        type="57b1bb0b93362e0cddf86155-text/javascript"
      />
      <script
        data-cf-settings="57b1bb0b93362e0cddf86155-|49"
        defer
        src="../../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
      />
      <script
        crossOrigin="anonymous"
        data-cf-beacon='{"rayId":"908e5976eb308602","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        defer
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
      />
    </div>
  );
}

export default Services;
