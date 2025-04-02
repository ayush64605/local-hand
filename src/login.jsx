import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";

function Login() {
  const [count, setCount] = useState(0);

  return (
    <div className="authentication-page ">
      <div className="d-flex justify-content-between vh-100 overflow-auto flex-column">
        <div className="authentication-header">
          <div className="container">
            <div className="col-md-12">
              <div className="text-center">
                <img src="assets/img/logo.svg" alt="logo" />
              </div>
            </div>
          </div>
        </div>

        <div className="main-wrapper">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-5 mx-auto">
                <form action="">
                  <div className="d-flex flex-column justify-content-center">
                    <div className="card p-sm-4 my-5">
                      <div className="card-body">
                        <div className="text-center mb-3">
                          <h3 className="mb-2">Welcome</h3>
                          <p>Enter your credentials to access your account</p>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">User Name</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <label className="form-label">Password</label>
                            <a
                              href="forgot-password.html"
                              className="text-primary fw-medium text-decoration-underline mb-1 fs-14"
                            >
                              Forgot Password?
                            </a>
                          </div>
                          <input type="password" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="remember_me"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="remember_me"
                              >
                                Remember Me
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="otp_signin"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="otp_signin"
                              >
                                Sign in with OTP
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <button
                            type="submit"
                            className="btn btn-lg btn-linear-primary w-100"
                          >
                            Sign In
                          </button>
                        </div>
                        <div className="login-or mb-3">
                          <span className="span-or">Or sign in with </span>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-light flex-fill d-flex align-items-center justify-content-center me-3"
                          >
                            <img
                              src="assets/img/icons/google-icon.svg"
                              className="me-2"
                              alt="Img"
                            />
                            Google
                          </a>
                          <a
                            href="javascript:void(0);"
                            className="btn btn-light flex-fill d-flex align-items-center justify-content-center"
                          >
                            <img
                              src="assets/img/icons/fb-icon.svg"
                              className="me-2"
                              alt="Img"
                            />
                            Facebook
                          </a>
                        </div>
                        <div className="d-flex justify-content-center">
                          <p>
                            Don’t have a account?{" "}
                            <a href="register.html" className="text-primary">
                              {" "}
                              Join us Today
                            </a>
                          </p>
                        </div>
                      </div>
                      <div>
                        <img
                          src="assets/img/bg/authentication-bg.png"
                          className="bg-left-top"
                          alt="Img"
                        />
                        <img
                          src="assets/img/bg/authentication-bg.png"
                          className="bg-right-bottom"
                          alt="Img"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copyright  bg-transparent">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p>Copyright &copy; 2024. All Rights Reserved LocalHand</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="xb-cursor tx-js-cursor">
        <div className="xb-cursor-wrapper">
          <div className="xb-cursor--follower xb-js-follower"></div>
        </div>
      </div>

      <script
        src="assets/js/jquery-3.7.1.min.js"
        type="71d0b60a55c3751a2281acce-text/javascript"
      ></script>

      <script
        src="assets/js/bootstrap.bundle.min.js"
        type="71d0b60a55c3751a2281acce-text/javascript"
      ></script>

      <script
        src="assets/js/script.js"
        type="71d0b60a55c3751a2281acce-text/javascript"
      ></script>

      <script
        src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        data-cf-settings="71d0b60a55c3751a2281acce-|49"
        defer
      ></script>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"908e4e6e0f0a4019","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default Login;
