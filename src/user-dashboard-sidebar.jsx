import {useState, useEffect} from "react";
import { db } from "./firebase"; // Adjust the import path based on your setup
import { collection, query, where, getDocs } from "firebase/firestore";

function User_dashboard_sidebar() {
  const [user, setUser] = useState(null);
  const storedEmail = sessionStorage.getItem("userEmail");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!storedEmail) return;

      const usersRef = collection(db, "localhand-users");
      const q = query(usersRef, where("email", "==", storedEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUser(userData);
      }
    };

    fetchUserDetails();
  }, [storedEmail]);

  return (
    <div className="card user-sidebar mb-4 mb-lg-0">
      <div className="card-header user-sidebar-header mb-4">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <span className="user rounded-circle avatar avatar-xxl mb-2">
            <img
              src={user?.profileImage || "User Name"}
              className="img-fluid rounded-circle"
              alt="Img"
            />
          </span>
          <h6 className="mb-2">{user?.name || "User Name"}</h6>
          <p className="fs-14">{user?.phone || "phone no. not found"}</p>
        </div>
      </div>
      <div className="card-body user-sidebar-body p-0">
        <ul>
            
          <li className="mb-4">
            <a className={`d-flex align-items-center ${location.pathname === "/user-dashboard" ? "active" : ""}`} href="/user-dashboard">
              {" "}
              <i className="ti ti-layout-grid me-2"></i>
              Dashboard
            </a>
          </li>

          <li
            className="mb-4"
          >
            <a className={`d-flex align-items-center ${location.pathname === "/user-booking-list" ? "active" : ""}`} href="/user-booking-list">
              {" "}
              <i className="ti ti-device-mobile me-2"></i>
              Bookings
            </a>
          </li>

          <li
            className="mb-4"
          >
            <a className={`d-flex align-items-center ${location.pathname === "/user-favourites" ? "active" : ""}`} href="/user-favourites">
              {" "}
              <i className="ti ti-heart me-2"></i>
              Favorites
            </a>
          </li>

          <li
            className="mb-4"
          >
            <a className={`d-flex align-items-center ${location.pathname === "/user-wallet" ? "active" : ""}`} href="/user-wallet">
              {" "}
              <i className="ti ti-wallet me-2"></i>
              Wallet
            </a>
          </li>

          <li
            className="mb-4"
          >
            <a className={`d-flex align-items-center ${location.pathname === "/user-reviews" ? "active" : ""}`} href="/user-reviews">
              {" "}
              <i className="ti ti-star me-2"></i>
              Reviews
            </a>
          </li>

          <li
            className="mb-4"
          >
            <a
              className={`d-flex align-items-center ${location.pathname === "/user-account-setting" ? "active" : ""}`}
              href="/user-account-setting"
            >
              {" "}
              <i className="ti ti-settings me-2"></i>Settings
            </a>
          </li>

          <li
            className={`mb-4 ${location.pathname === "/" ? "active" : ""}`}
          >
            <a className="d-flex align-items-center" href="/" onClick={() => {
                        sessionStorage.clear();
                        
                      }}>
              {" "}
              <i className="ti ti-logout me-2"></i>
              Logout{" "}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default User_dashboard_sidebar;
