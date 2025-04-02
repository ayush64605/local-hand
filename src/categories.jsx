import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './footer'
import Header from './header'

function Categories() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Header/>
    <div className="breadcrumb-bar text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-12">
            <h2 className="breadcrumb-title mb-2">Categories</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item">
                  <a href="index.html">
                    <i className="ti ti-home-2" />
                  </a>
                </li>
                <li aria-current="page" className="breadcrumb-item active">
                  Categories
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="breadcrumb-bg">
          <img
            alt="Img"
            className="breadcrumb-bg-1"
            src="assets/img/bg/breadcrumb-bg-01.png"
          />
          <img
            alt="Img"
            className="breadcrumb-bg-2"
            src="assets/img/bg/breadcrumb-bg-02.png"
          />
        </div>
      </div>
    </div>
    <div className="page-wrapper">
      <div className="content content-two">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-01.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">
                    <a href="services-list.html">Construction</a>
                  </h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-26.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-02.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">
                    <a href="services-list.html">Removal</a>
                  </h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-28.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-05.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">
                    <a href="services-list.html">Electrical</a>
                  </h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-29.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-03.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">
                    <a href="services-list.html">Furniture Assembly</a>
                  </h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-30.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-08.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">
                    <a href="services-list.html">Mobile Barbers</a>
                  </h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-31.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-07.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">
                    <a href="services-list.html">Deliveries</a>
                  </h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-01.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-14.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">
                    <a href="services-list.html">Cleaning</a>
                  </h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-33.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-06.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">
                    <a href="services-list.html">Man and Van</a>
                  </h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-34.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-11.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">
                    <a href="services-list.html">Nail Technicians</a>
                  </h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-35.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-13.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">
                    <a href="services-list.html">Shop & Deliver</a>
                  </h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-32.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-15.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">
                    <a href="services-list.html">Car Transport</a>
                  </h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-37.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-12.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">
                    <a href="services-list.html">Hairdressers</a>
                  </h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-38.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-04.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">
                    <a href="services-list.html">Computer Service</a>
                  </h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-39.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-10.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">Plumbing</h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-40.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-16.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">Carpentry</h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-41.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-09.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">Interior</h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-42.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="category card wow fadeInUp" data-wow-delay="0.3s">
                <div className="card-body">
                  <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                    <span className="rounded-pill d-flex justify-content-center align-items-center p-3">
                      <img
                        alt="logo"
                        className="img-fluid"
                        src="assets/img/icons/category-17.svg"
                      />
                    </span>
                  </div>
                  <h5 className="text-center">Car Wash</h5>
                  <div className="overlay">
                    <img
                      alt="img"
                      className="img-fluid"
                      src="assets/img/services/service-43.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    <script
      src="assets/js/jquery-3.7.1.min.js"
      type="b86c826d463c0c2a3a60225b-text/javascript"
    />
    <script
      src="assets/js/bootstrap.bundle.min.js"
      type="b86c826d463c0c2a3a60225b-text/javascript"
    />
    <script
      src="assets/js/wow.min.js"
      type="b86c826d463c0c2a3a60225b-text/javascript"
    />
    <script
      src="assets/plugins/select2/js/select2.min.js"
      type="b86c826d463c0c2a3a60225b-text/javascript"
    />
    <script
      src="assets/plugins/owlcarousel/owl.carousel.min.js"
      type="b86c826d463c0c2a3a60225b-text/javascript"
    />
    <script
      src="assets/js/cursor.js"
      type="b86c826d463c0c2a3a60225b-text/javascript"
    />
    <script
      src="assets/js/script.js"
      type="b86c826d463c0c2a3a60225b-text/javascript"
    />
    <script
      data-cf-settings="b86c826d463c0c2a3a60225b-|49"
      defer
      src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
    />
    <script
      crossOrigin="anonymous"
      data-cf-beacon='{"rayId":"908e4e307fa78577","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
      defer
      integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
      src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
    />
  </div>
  
  )
}

export default Categories
