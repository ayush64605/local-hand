import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './header'
import Siderbar from './sidebar'

function Banktransferlist() {
  const [count, setCount] = useState(0)

  return (
    <div>
  <div className="main-wrapper">
    <Header/>
    <Siderbar/>
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit">
          <h5>Bank Transfer</h5>
          <div className="list-btn">
            <ul>
              <li>
                <div className="filter-sorting">
                  <ul>
                    <li>
                      <a className="filter-sets" href="javascript:void(0);">
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
                          <option>A - Z</option>
                          <option>Z - A</option>
                        </select>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="tab-sets">
              <div className="tab-contents-sets">
                <ul>
                  <li>
                    <a className="active" href="banktransferlist.html">
                      All List
                    </a>
                  </li>
                  <li>
                    <a href="approved-transferlist.html">Approved </a>
                  </li>
                  <li>
                    <a href="pending-transferlist.html">Pending </a>
                  </li>
                  <li>
                    <a href="successful-transferlist.html">Successful </a>
                  </li>
                  <li>
                    <a href="rejected-transferlist.html">Rejected lists</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 ">
            <div className="table-resposnive table-div">
              <table className="table datatable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Service</th>
                    <th>Customer</th>
                    <th>Receipt</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-03.jpg"
                        />
                        <span>Computer Repair</span>
                      </a>
                    </td>
                    <td>
                      <a
                        className="table-profileimage"
                        href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/customer/user-01.jpg"
                        />
                        <span>John Smith</span>
                      </a>
                    </td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/invoice.jpg"
                        />
                        <span>#123456</span>
                      </a>
                    </td>
                    <td>Lorem ipsum dolor sit </td>
                    <td>28 Sep 2023</td>
                    <td>
                      <h6 className="badge-pending">Pending</h6>
                    </td>
                    <td className="text-center">
                      <a
                        aria-expanded="true"
                        className="delete-table"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);">
                        <i aria-hidden="true" className="fa fa-ellipsis-v" />
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer View
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer Edit
                          </a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-02.jpg"
                        />
                        <span>Car Repair Services</span>
                      </a>
                    </td>
                    <td>
                      <a
                        className="table-profileimage"
                        href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/customer/user-04.jpg"
                        />
                        <span>Johnny</span>
                      </a>
                    </td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/invoice.jpg"
                        />
                        <span>#123456</span>
                      </a>
                    </td>
                    <td>Lorem ipsum dolor sit </td>
                    <td>23 Sep 2023</td>
                    <td>
                      <h6 className="badge-active">Successful</h6>
                    </td>
                    <td className="text-center">
                      <a
                        aria-expanded="true"
                        className="delete-table"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);">
                        <i aria-hidden="true" className="fa fa-ellipsis-v" />
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer View
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer Edit
                          </a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-04.jpg"
                        />
                        <span>Steam Car Wash</span>
                      </a>
                    </td>
                    <td>
                      <a
                        className="table-profileimage"
                        href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/customer/user-02.jpg"
                        />
                        <span>Amanda</span>
                      </a>
                    </td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/invoice.jpg"
                        />
                        <span>#123456</span>
                      </a>
                    </td>
                    <td>Lorem ipsum dolor sit</td>
                    <td>13 Sep 2023</td>
                    <td>
                      <h6 className="badge-inactive">Approved</h6>
                    </td>
                    <td className="text-center">
                      <a
                        aria-expanded="true"
                        className="delete-table"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);">
                        <i aria-hidden="true" className="fa fa-ellipsis-v" />
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer View
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer Edit
                          </a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-09.jpg"
                        />
                        <span>House Cleaning </span>
                      </a>
                    </td>
                    <td>
                      <a
                        className="table-profileimage"
                        href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/customer/user-01.jpg"
                        />
                        <span>James</span>
                      </a>
                    </td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/invoice.jpg"
                        />
                        <span>#123456</span>
                      </a>
                    </td>
                    <td>Lorem ipsum dolor sit</td>
                    <td>10 Sep 2023</td>
                    <td>
                      <h6 className="badge-delete">Rejected</h6>
                    </td>
                    <td className="text-center">
                      <a
                        aria-expanded="true"
                        className="delete-table"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);">
                        <i aria-hidden="true" className="fa fa-ellipsis-v" />
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer View
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer Edit
                          </a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-03.jpg"
                        />
                        <span>Computer Repair</span>
                      </a>
                    </td>
                    <td>
                      <a
                        className="table-profileimage"
                        href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/customer/user-01.jpg"
                        />
                        <span>John Smith</span>
                      </a>
                    </td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/invoice.jpg"
                        />
                        <span>#123456</span>
                      </a>
                    </td>
                    <td>Lorem ipsum dolor sit </td>
                    <td>28 Sep 2023</td>
                    <td>
                      <h6 className="badge-pending">Pending</h6>
                    </td>
                    <td className="text-center">
                      <a
                        aria-expanded="true"
                        className="delete-table"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);">
                        <i aria-hidden="true" className="fa fa-ellipsis-v" />
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer View
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer Edit
                          </a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-02.jpg"
                        />
                        <span>Car Repair Services</span>
                      </a>
                    </td>
                    <td>
                      <a
                        className="table-profileimage"
                        href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/customer/user-04.jpg"
                        />
                        <span>Johnny</span>
                      </a>
                    </td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/invoice.jpg"
                        />
                        <span>#123456</span>
                      </a>
                    </td>
                    <td>Lorem ipsum dolor sit </td>
                    <td>23 Sep 2023</td>
                    <td>
                      <h6 className="badge-active">Successful</h6>
                    </td>
                    <td className="text-center">
                      <a
                        aria-expanded="true"
                        className="delete-table"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);">
                        <i aria-hidden="true" className="fa fa-ellipsis-v" />
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer View
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer Edit
                          </a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-04.jpg"
                        />
                        <span>Steam Car Wash</span>
                      </a>
                    </td>
                    <td>
                      <a
                        className="table-profileimage"
                        href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/customer/user-02.jpg"
                        />
                        <span>Amanda</span>
                      </a>
                    </td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/invoice.jpg"
                        />
                        <span>#123456</span>
                      </a>
                    </td>
                    <td>Lorem ipsum dolor sit</td>
                    <td>13 Sep 2023</td>
                    <td>
                      <h6 className="badge-inactive">Approved</h6>
                    </td>
                    <td className="text-center">
                      <a
                        aria-expanded="true"
                        className="delete-table"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);">
                        <i aria-hidden="true" className="fa fa-ellipsis-v" />
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer View
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer Edit
                          </a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/services/service-09.jpg"
                        />
                        <span>House Cleaning </span>
                      </a>
                    </td>
                    <td>
                      <a
                        className="table-profileimage"
                        href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/customer/user-01.jpg"
                        />
                        <span>James</span>
                      </a>
                    </td>
                    <td>
                      <a className="table-imgname" href="javascript:void(0);">
                        <img
                          alt="img"
                          className="me-2"
                          src="assets/img/invoice.jpg"
                        />
                        <span>#123456</span>
                      </a>
                    </td>
                    <td>Lorem ipsum dolor sit</td>
                    <td>10 Sep 2023</td>
                    <td>
                      <h6 className="badge-delete">Rejected</h6>
                    </td>
                    <td className="text-center">
                      <a
                        aria-expanded="true"
                        className="delete-table"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);">
                        <i aria-hidden="true" className="fa fa-ellipsis-v" />
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer View
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);">
                            Transfer Edit
                          </a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
    type="cc65f5ea541b7aa1294f32ac-text/javascript"
  />
  <script
    src="assets/js/select2.min.js"
    type="cc65f5ea541b7aa1294f32ac-text/javascript"
  />
  <script
    src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"
    type="cc65f5ea541b7aa1294f32ac-text/javascript"
  />
  <script
    src="assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
    type="cc65f5ea541b7aa1294f32ac-text/javascript"
  />
  <script
    src="assets/js/feather.min.js"
    type="cc65f5ea541b7aa1294f32ac-text/javascript"
  />
  <script
    src="assets/js/jquery.dataTables.min.js"
    type="cc65f5ea541b7aa1294f32ac-text/javascript"
  />
  <script
    src="assets/plugins/slimscroll/jquery.slimscroll.min.js"
    type="cc65f5ea541b7aa1294f32ac-text/javascript"
  />
  <script
    src="assets/plugins/sweetalert/sweetalert2.all.min.js"
    type="cc65f5ea541b7aa1294f32ac-text/javascript"
  />
  <script
    src="assets/plugins/sweetalert/sweetalerts.min.js"
    type="cc65f5ea541b7aa1294f32ac-text/javascript"
  />
  <script
    src="assets/js/admin.js"
    type="cc65f5ea541b7aa1294f32ac-text/javascript"
  />
  <script
    data-cf-settings="cc65f5ea541b7aa1294f32ac-|49"
    defer
    src="../../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
  />
  <script
    crossOrigin="anonymous"
    data-cf-beacon='{"rayId":"908e59812eb047d6","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
    defer
    integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
    src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
  />
</div>

  )
}

export default Banktransferlist
