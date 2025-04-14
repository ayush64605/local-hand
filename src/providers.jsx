import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./header";
import Siderbar from "./sidebar";
import { db } from "./firebase"; // Import Firestore instance
import { collection, query, where, getDocs } from "firebase/firestore";

function Providers() {
  const [count, setCount] = useState(0);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchProvidersWithServices = async () => {
      try {
        // Step 1: Fetch providers where role is "provider"
        const providersQuery = query(
          collection(db, "localhand-users"),
          where("role", "==", "provider")
        );
        const providersSnapshot = await getDocs(providersQuery);
        const providersData = providersSnapshot.docs.map((doc, index) => ({
          id: doc.id,
          index: index + 1,
          ...doc.data(),
        }));

        // Step 2: Fetch total services for each provider
        const providersWithServices = await Promise.all(
          providersData.map(async (provider) => {
            const servicesQuery = collection(
              db,
              `localhand-users/${provider.id}/services`
            );
            const servicesSnapshot = await getDocs(servicesQuery);

            return { ...provider, totalServices: servicesSnapshot.size };
          })
        );

        setProviders(providersWithServices);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvidersWithServices();
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
                <h5>Providers</h5>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Provider Name</th>
                          <th>Mobile</th>
                          <th>Email</th>
                          <th>Reg Date</th>
                          <th>Company Name</th>
                          <th>Total Services</th>
                        </tr>
                      </thead>
                      <tbody>
                        {providers.length > 0 ? (
                          providers.map((provider) => (
                            <tr key={provider.id}>
                              <td>{provider.index}</td>
                              <td className="table-namesplit">
                                <a
                                  className="table-profileimage"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    alt="img"
                                    className="me-2"
                                    src={
                                      provider.profileImage ||
                                      "assets/img/customer/user-01.jpg"
                                    }
                                  />
                                </a>
                                <a
                                  className="table-name"
                                  href="javascript:void(0);"
                                >
                                  <span>{provider.name || "Unknown"}</span>
                                </a>
                              </td>
                              <td>{provider.phone || "N/A"}</td>
                              <td>{provider.email || "N/A"}</td>
                              <td>
                                {provider.createdAt
                                  ? new Date(
                                      provider.createdAt.seconds * 1000
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </td>
                              <td>{provider.company || "N/A"}</td>
                              <td>{provider.totalServices || 0}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No providers found
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

      <script
        data-cfasync="false"
        src="../../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
      />
      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="d9d61965079f89bf1320b023-text/javascript"
      />
      <script
        src="assets/js/select2.min.js"
        type="d9d61965079f89bf1320b023-text/javascript"
      />
      <script
        src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"
        type="d9d61965079f89bf1320b023-text/javascript"
      />
      <script
        src="assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
        type="d9d61965079f89bf1320b023-text/javascript"
      />
      <script
        src="assets/js/feather.min.js"
        type="d9d61965079f89bf1320b023-text/javascript"
      />
      <script
        src="assets/js/jquery.dataTables.min.js"
        type="d9d61965079f89bf1320b023-text/javascript"
      />
      <script
        src="assets/plugins/slimscroll/jquery.slimscroll.min.js"
        type="d9d61965079f89bf1320b023-text/javascript"
      />
      <script
        src="assets/plugins/sweetalert/sweetalert2.all.min.js"
        type="d9d61965079f89bf1320b023-text/javascript"
      />
      <script
        src="assets/plugins/sweetalert/sweetalerts.min.js"
        type="d9d61965079f89bf1320b023-text/javascript"
      />
      <script
        src="assets/js/admin.js"
        type="d9d61965079f89bf1320b023-text/javascript"
      />
      <script
        data-cf-settings="d9d61965079f89bf1320b023-|49"
        defer
        src="../../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
      />
      <script
        crossOrigin="anonymous"
        data-cf-beacon='{"rayId":"908e59bde90c8602","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        defer
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
      />
    </div>
  );
}

export default Providers;
