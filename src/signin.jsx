import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Import Firestore instance
import { useNavigate } from "react-router-dom";



function Signin() {
  const [count, setCount] = useState(0)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const docRef = doc(db, "admin", "login");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const adminData = docSnap.data();
        if (adminData.email === email && adminData.password === password) {
          alert("Login Successful!");
          navigate("/index");
        } else {
          alert("Invalid email or password!");
        }
      } else {
        alert("Admin data not found!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong!");
    }
  };


  return (
    <div>
  <div className="main-wrapper">
      <div className="login-pages">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="login-logo">
                <img alt="img" src="assets/img/logo.png" style={{width:"10%"}}/>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login-images">
                <img alt="img" src="assets/img/login-banner.png" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login-content">
                <div className="login-contenthead">
                  <h5>Login</h5>
                  <h6>We'll send a confirmation code to your email.</h6>
                </div>
                <div className="login-input">
                  <div className="form-group">
                    <label>E-mail</label>
                    <input
                      className="form-control"
                      placeholder="example@email.com"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <div className="d-flex justify-content-between">
                      <label>Password</label>
                    </div>
                    <div className="pass-group">
                      <input
                        className="form-control pass-input"
                        placeholder="********"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="fas toggle-password fa-eye-slash" />
                    </div>
                  </div>
                </div>
                <div className="login-button">
                  <button className="btn btn-login" onClick={handleLogin}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <script
    src="assets/js/jquery-3.7.1.min.js"
    type="f3b937d40b28096780b81eea-text/javascript"
  />
  <script
    src="assets/js/select2.min.js"
    type="f3b937d40b28096780b81eea-text/javascript"
  />
  <script
    src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"
    type="f3b937d40b28096780b81eea-text/javascript"
  />
  <script
    src="assets/plugins/sweetalert/sweetalert2.all.min.js"
    type="f3b937d40b28096780b81eea-text/javascript"
  />
  <script
    src="assets/plugins/sweetalert/sweetalerts.min.js"
    type="f3b937d40b28096780b81eea-text/javascript"
  />
  <script
    src="assets/js/admin.js"
    type="f3b937d40b28096780b81eea-text/javascript"
  />
  <script
    data-cf-settings="f3b937d40b28096780b81eea-|49"
    defer
    src="../../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
  />
  <script
    crossOrigin="anonymous"
    data-cf-beacon='{"rayId":"908e597449548602","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
    defer
    integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
    src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
  />
</div>

  )
}

export default Signin
