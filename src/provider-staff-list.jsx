import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Provider_sidebar from './provider-sidebar'
import Provider_header from './provider-header'

function Provider_staff_list() {
  const [count, setCount] = useState(0)

  return (
    <div className='provider-page'>
    <div className="main-wrapper">
        <Provider_header/>
        <Provider_sidebar/>
        <div className="page-wrapper">
            <div className="content">
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
                    <h4>Staffs</h4>
                    <div className="d-flex align-items-center flex-wrap row-gap-3">
                        <span className="fs-14 me-2">Sort</span>
                        <div className="dropdown me-2">
                            <a href="javascript:void(0);" className="dropdown-toggle" data-bs-toggle="dropdown">
                                Newly Added
                            </a>
                            <div className="dropdown-menu">
                                <a href="javascript:void(0);" className="dropdown-item active">Newly Added</a>
                                <a href="javascript:void(0);" className="dropdown-item">Oldest</a>
                            </div>
                        </div>
                        <div className="dropdown me-2">
                            <a href="javascript:void(0);" className="dropdown-toggle" data-bs-toggle="dropdown">
                                Export
                            </a>
                            <div className="dropdown-menu">
                                <a href="javascript:void(0);" className="dropdown-item active">Export</a>
                                <a href="javascript:void(0);" className="dropdown-item">Import</a>
                            </div>
                        </div>
                        <a href="javascript:void(0);" className="tags d-flex justify-content-center align-items-center border rounded me-2"><i
                                className="ti ti-printer"></i></a>
                        <a href="javascript:void(0);"
                            className="tags d-flex justify-content-center align-items-center border rounded me-2"
                            id="filter_search"><i className="ti ti-sort-descending"></i></a>
                        <a href="staff-grid.html"
                            className="tags d-flex justify-content-center align-items-center border rounded me-2"><i
                                className="ti ti-layout-grid"></i></a>
                        <a href="staff-list.html"
                            className="tags active d-flex justify-content-center align-items-center border rounded me-2"><i
                                className="ti ti-list"></i></a>
                        <a href="javascript:void(0);" className="btn btn-dark d-flex align-items-center" data-bs-toggle="modal"
                            data-bs-target="#add-staff"><i className="ti ti-circle-plus me-2"></i>Add Staffs</a>
                    </div>
                </div>
                <div id="filter_inputs">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-xl">
                            <div className="mb-3">
                                <div className="sel-cal Calendar-icon">
                                    <span><i className="ti ti-calendar-month"></i></span>
                                    <input className="form-control datetimepicker" type="text" placeholder="dd-mm-yyyy"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xl">
                            <div className="mb-3">
                                <select className="select">
                                    <option>Staff ID</option>
                                    <option>ST5246</option>
                                    <option>ST1269</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xl">
                            <div className="mb-3">
                                <select className="select">
                                    <option>Staff</option>
                                    <option>Brian Villalobos</option>
                                    <option>Stephan Peralt</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xl">
                            <div className="mb-3">
                                <select className="select">
                                    <option>Status</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="provide-table manage-table ">
                        <div className="table-responsive">
                            <table className="table  datatable">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Staff ID</th>
                                        <th>Staffs Name</th>
                                        <th>Created On</th>
                                        <th>No of Services</th>
                                        <th>Total Bookings</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ST0263</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <a href="staff-details.html" className="avatar avatar-lg me-2">
                                                    <img src="assets/img/profiles/avatar-02.jpg" className="rounded-circle"
                                                        alt="user"/>
                                                </a>
                                                <div>
                                                    <h6 className="fs-14 fw-medium"><a href="staff-details.html">Anthony
                                                            Lewis</a></h6>
                                                    <span className="fs-12"><a href="" className="cf_email" data-cfemail="670609130f08091e27021f060a170b024904080a">[email&#160;protected]</a></span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>14/01/2024</td>
                                        <td>2</td>
                                        <td>0</td>
                                        <td>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span className="badge badge-success-100 d-flex align-items-center">
                                                    <i className="ti ti-point-filled"></i>
                                                    Active
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-icon d-inline-flex">
                                                <a href="javascript:void(0);" className="me-2" data-bs-toggle="modal"
                                                    data-bs-target="#edit-staff"><i className="ti ti-edit"></i></a>
                                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#del-staff"><i
                                                        className="ti ti-trash"></i></a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ST5246</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <a href="staff-details.html" className="avatar avatar-lg me-2">
                                                    <img src="assets/img/profiles/avatar-35.jpg" className="rounded-circle"
                                                        alt="user"/>
                                                </a>
                                                <div>
                                                    <h6 className="fs-14 fw-medium"><a href="staff-details.html">Brian
                                                            Villalobos</a></h6>
                                                    <span className="fs-12"><a href="" className="cf_email" data-cfemail="95f7e7fcf4fbd5f0edf4f8e5f9f0bbf6faf8">[email&#160;protected]</a></span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>21/01/2024</td>
                                        <td>3</td>
                                        <td>4 </td>
                                        <td>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span className="badge badge-success-100 d-flex align-items-center">
                                                    <i className="ti ti-point-filled"></i>
                                                    Active
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-icon d-inline-flex">
                                                <a href="javascript:void(0);" className="me-2" data-bs-toggle="modal"
                                                    data-bs-target="#edit-staff"><i className="ti ti-edit"></i></a>
                                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#del-staff"><i
                                                        className="ti ti-trash"></i></a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ST7645</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <a href="staff-details.html" className="avatar avatar-lg me-2">
                                                    <img src="assets/img/profiles/avatar-36.jpg" className="rounded-circle"
                                                        alt="user"/>
                                                </a>
                                                <div>
                                                    <h6 className="fs-14 fw-medium"><a href="staff-details.html">Harvey
                                                            Smith</a></h6>
                                                    <span className="fs-12"><a href="" className="cf_email" data-cfemail="b8d0d9caceddc1f8ddc0d9d5c8d4dd96dbd7d5">[email&#160;protected]</a></span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>20/02/2024</td>
                                        <td>2</td>
                                        <td>6</td>
                                        <td>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span className="badge badge-success-100 d-flex align-items-center">
                                                    <i className="ti ti-point-filled"></i>
                                                    Active
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-icon d-inline-flex">
                                                <a href="javascript:void(0);" className="me-2" data-bs-toggle="modal"
                                                    data-bs-target="#edit-staff"><i className="ti ti-edit"></i></a>
                                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#del-staff"><i
                                                        className="ti ti-trash"></i></a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ST1269</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <a href="staff-details.html" className="avatar avatar-lg me-2">
                                                    <img src="assets/img/profiles/avatar-11.jpg" className="rounded-circle"
                                                        alt="user"/>
                                                </a>
                                                <div>
                                                    <h6 className="fs-14 fw-medium"><a href="staff-details.html">Stephan
                                                            Peralt</a></h6>
                                                    <span className="fs-12"><a href="" className="cf_email" data-cfemail="bacadfc8dbd6fadfc2dbd7cad6df94d9d5d7">[email&#160;protected]</a></span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>15/03/2024</td>
                                        <td>6</td>
                                        <td>10</td>
                                        <td>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span className="badge badge-success-100 d-flex align-items-center">
                                                    <i className="ti ti-point-filled"></i>
                                                    Active
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-icon d-inline-flex">
                                                <a href="javascript:void(0);" className="me-2" data-bs-toggle="modal"
                                                    data-bs-target="#edit-staff"><i className="ti ti-edit"></i></a>
                                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#del-staff"><i
                                                        className="ti ti-trash"></i></a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ST7436</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <a href="staff-details.html" className="avatar avatar-lg me-2">
                                                    <img src="assets/img/profiles/avatar-15.jpg" className="rounded-circle"
                                                        alt="user"/>
                                                </a>
                                                <div>
                                                    <h6 className="fs-14 fw-medium"><a href="staff-details.html">Doglas
                                                            Martini</a></h6>
                                                    <span className="fs-12"><a href="" className="cf_email" data-cfemail="80ede1f2f4eee9f7f2c0e5f8e1edf0ece5aee3efed">[email&#160;protected]</a></span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>12/04/2024</td>
                                        <td>2</td>
                                        <td>15</td>
                                        <td>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span className="badge badge-danger-transparent d-flex align-items-center">
                                                    <i className="ti ti-point-filled"></i>
                                                    Inactive
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-icon d-inline-flex">
                                                <a href="javascript:void(0);" className="me-2" data-bs-toggle="modal"
                                                    data-bs-target="#edit-staff"><i className="ti ti-edit"></i></a>
                                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#del-staff"><i
                                                        className="ti ti-trash"></i></a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ST3695</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <a href="staff-details.html" className="avatar avatar-lg me-2">
                                                    <img src="assets/img/profiles/avatar-20.jpg" className="rounded-circle"
                                                        alt="user"/>
                                                </a>
                                                <div>
                                                    <h6 className="fs-14 fw-medium"><a href="staff-details.html">Linda
                                                            Ray</a></h6>
                                                    <span className="fs-12"><a href="" className="cf_email" data-cfemail="3e4c5f470a0b087e5b465f534e525b105d5153">[email&#160;protected]</a></span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>20/05/2024</td>
                                        <td>1</td>
                                        <td>12</td>
                                        <td>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span className="badge badge-danger-transparent d-flex align-items-center">
                                                    <i className="ti ti-point-filled"></i>
                                                    Inactive
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-icon d-inline-flex">
                                                <a href="javascript:void(0);" className="me-2" data-bs-toggle="modal"
                                                    data-bs-target="#edit-staff"><i className="ti ti-edit"></i></a>
                                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#del-staff"><i
                                                        className="ti ti-trash"></i></a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ST5348</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <a href="staff-details.html" className="avatar avatar-lg me-2">
                                                    <img src="assets/img/user/user-01.jpg" className="rounded-circle"
                                                        alt="user"/>
                                                </a>
                                                <div>
                                                    <h6 className="fs-14 fw-medium"><a href="staff-details.html">Elliot
                                                            Murray</a></h6>
                                                    <span className="fs-12"><a href="" className="cf_email" data-cfemail="ea879f98988b93aa8f928b879a868fc4898587">[email&#160;protected]</a></span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>06/07/2024</td>
                                        <td>1</td>
                                        <td>4</td>
                                        <td>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span className="badge badge-danger-transparent d-flex align-items-center">
                                                    <i className="ti ti-point-filled"></i>
                                                    Inactive
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-icon d-inline-flex">
                                                <a href="javascript:void(0);" className="me-2" data-bs-toggle="modal"
                                                    data-bs-target="#edit-staff"><i className="ti ti-edit"></i></a>
                                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#del-staff"><i
                                                        className="ti ti-trash"></i></a>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="table-paginate d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                        <div className="value d-flex align-items-center">
                            <span>Show</span>
                            <select>
                                <option>7</option>
                            </select>
                            <span>entries</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <span className="me-2 text-gray-9">1 - 07 of 10</span>
                            <nav aria-label="Page navigation">
                                <ul className="paginations d-flex justify-content-center align-items-center">
                                    <li className="page-item me-2"><a className="page-link-1 active d-flex justify-content-center align-items-center " href="javascript:void(0);">1</a></li>
                                    <li className="page-item me-2"><a className="page-link-1 d-flex justify-content-center align-items-center" href="javascript:void(0);">2</a></li>
                                    <li className="page-item "><a className="page-link-1 d-flex justify-content-center align-items-center" href="javascript:void(0);">3</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade custom-modal" id="add-staff">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content doctor-profile">
                    <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                        <h5 className="modal-title">Add Staff </h5>
                        <a href="javascript:void(0);" data-bs-dismiss="modal" aria-label="Close"><i
                                className="ti ti-circle-x-filled fs-20"></i></a>
                    </div>
                    <div className="modal-body pb-0">
                        <form action="">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <div className="d-flex profile-upload align-items-center">
                                            <span
                                                className="d-flex justify-content-center align-items-center p-4 bg-light rounded me-2"><i
                                                    className="ti ti-photo"></i></span>
                                            <div>
                                                <h6 className="fs-16">Profile</h6>
                                                <span className="fs-14">Image size does not exceed 5MB</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-control pass-input"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control pass-input"/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input type="number" className="form-control pass-input"/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control pass-input"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Country</label>
                                        <select className="select">
                                            <option>Select</option>
                                            <option>Brazil</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">State</label>
                                        <select className="select">
                                            <option>Select</option>
                                            <option>Myanmar</option>
                                            <option>Cyprus</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">City</label>
                                        <select className="select">
                                            <option>Select</option>
                                            <option>London</option>
                                            <option>Paris</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Zip Code</label>
                                        <input type="text" className="form-control pass-input"/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea className="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Services</label>
                                        <select className="select">
                                            <option>Select</option>
                                            <option>Computer Repair</option>
                                            <option>Plumbing</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select className="select">
                                            <option>Select</option>
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className="d-flex justify-content-end align-items-center">
                            <a href="javascript:void(0);" className="btn btn-light me-2" data-bs-dismiss="modal">Cancel</a>
                            <button className="btn btn-dark" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade custom-modal" id="edit-staff">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content doctor-profile">
                    <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                        <h5 className="modal-title">Edit Staff </h5>
                        <a href="javascript:void(0);" data-bs-dismiss="modal" aria-label="Close"><i
                                className="ti ti-circle-x-filled fs-20"></i></a>
                    </div>
                    <div className="modal-body pb-0">
                        <form action="">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <div className="d-flex profile-upload align-items-center">
                                            <span
                                                className="d-flex justify-content-center align-items-center p-4 bg-light rounded me-2"><i
                                                    className="ti ti-photo"></i></span>
                                            <div>
                                                <h6 className="fs-16">Profile</h6>
                                                <span className="fs-14">Image size does not exceed 5MB</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-control pass-input" value="Jeff Fitch"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control pass-input" value="jeff@example.com"/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input type="number" className="form-control pass-input" value="1748116543"/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control pass-input"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Country</label>
                                        <select className="select">
                                            <option>Select</option>
                                            <option selected>Brazil</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">State</label>
                                        <select className="select">
                                            <option>Select</option>
                                            <option selected>Myanmar</option>
                                            <option>Cyprus</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">City</label>
                                        <select className="select">
                                            <option>Select</option>
                                            <option selected>London</option>
                                            <option>Paris</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Zip Code</label>
                                        <input type="text" className="form-control pass-input"/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea className="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Services</label>
                                        <select className="select">
                                            <option>Select</option>
                                            <option selected>Computer Repair</option>
                                            <option>Plumbing</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select className="select">
                                            <option>Select</option>
                                            <option selected>Active</option>
                                            <option>Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className="d-flex justify-content-end align-items-center">
                            <a href="javascript:void(0);" className="btn btn-light me-2" data-bs-dismiss="modal">Cancel</a>
                            <button className="btn btn-dark" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade custom-modal" id="del-staff">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                        <h5 className="modal-title">Delete Staff</h5>
                        <a href="javascript:void(0);" data-bs-dismiss="modal" aria-label="Close"><i
                                className="ti ti-circle-x-filled fs-20"></i></a>
                    </div>
                    <div className="modal-body">
                        <div className="write-review">
                            <form action="">
                                <p>Are you sure want to delete this Staff?</p>
                                <div className="modal-submit text-end">
                                    <a href="javascript:void(0);" className="btn btn-light me-2" data-bs-dismiss="modal">Cancel</a>
                                    <button type="submit" className="btn btn-dark">Yes</button>
                                </div>
                            </form>
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
                        <a href="javascript:void(0);" data-bs-dismiss="modal" aria-label="Close"><i
                                className="ti ti-circle-x-filled fs-20"></i></a>
                    </div>
                    <form action="#">
                        <div className="modal-body">
                            <p className="mb-3">Are you sure you want to delete This Account? To delete your account, Type
                                your password.</p>
                            <div className="mb-0">
                                <label className="form-label">Password</label>
                                <div className="pass-group">
                                    <input type="password" className="form-control pass-input" placeholder="*"/>
                                    <span className="toggle-password feather-eye-off"></span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a href="javascript:void(0);" className="btn btn-light me-2" data-bs-dismiss="modal">Cancel</a>
                            <button type="submit" className="btn btn-dark">Delete Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>



    <script data-cfasync="false" src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script src="assets/js/jquery-3.7.1.min.js" type="d32afe0eec4e905c76568c68-text/javascript"></script>

    <script src="assets/js/bootstrap.bundle.min.js" type="d32afe0eec4e905c76568c68-text/javascript"></script>

    <script src="assets/js/wow.min.js" type="d32afe0eec4e905c76568c68-text/javascript"></script>

    <script src="assets/js/jquery.slimscroll.min.js" type="d32afe0eec4e905c76568c68-text/javascript"></script>

    <script src="assets/plugins/select2/js/select2.min.js" type="d32afe0eec4e905c76568c68-text/javascript"></script>

    <script src="assets/js/moment.js" type="d32afe0eec4e905c76568c68-text/javascript"></script>
    <script src="assets/js/bootstrap-datetimepicker.min.js" type="d32afe0eec4e905c76568c68-text/javascript"></script>

    <script src="assets/plugins/datatables/jquery.dataTables.min.js" type="d32afe0eec4e905c76568c68-text/javascript"></script>
    <script src="assets/plugins/datatables/datatables.min.js" type="d32afe0eec4e905c76568c68-text/javascript"></script>

    <script src="assets/js/script.js" type="d32afe0eec4e905c76568c68-text/javascript"></script>
<script src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js" data-cf-settings="d32afe0eec4e905c76568c68-|49" defer></script><script defer src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015" integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==" data-cf-beacon='{"rayId":"908e5806ad928602","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}' crossOrigin="anonymous"></script>
    </div>
  )
}

export default Provider_staff_list