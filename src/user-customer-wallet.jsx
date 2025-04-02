import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User_dashboard_sidebar from './user-dashboard-sidebar'
import Footer from './footer'

function Customer_wallet() {
  const [count, setCount] = useState(0)

  return (
    <>
    <header className="header header-one">
		<div className="container">
			<nav className="navbar navbar-expand-lg header-nav">
				<div className="navbar-header">
					<a id="mobile_btn" href="javascript:void(0);">
						<span className="bar-icon">
							<span></span>
							<span></span>
							<span></span>
						</span>
					</a>
					<a href="index.html" className="navbar-brand logo">
						<img src="assets/img/logo.svg" className="img-fluid" alt="Logo"/>
					</a>
					<a href="index.html" className="navbar-brand logo-small">
						<img src="assets/img/logo-small.svg" className="img-fluid" alt="Logo"/>
					</a>
				</div>
				<div className="main-menu-wrapper">
					<div className="menu-header">
						<a href="index.html" className="menu-logo">
							<img src="assets/img/logo.svg" className="img-fluid" alt="Logo"/>
						</a>
						<a id="menu_close" className="menu-close" href="javascript:void(0);"> <i className="fas fa-times"></i></a>
					</div>
					<ul className="main-nav">
						<li className="nav-item">
							<a className="nav-link" href="index.html">Home</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="about-us.html">About Us</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="services-grid.html">Services</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="blog-grid.html">Blog</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="contact-us.html">Contact Us</a>
						</li>
					</ul>
				</div>
				<div className="header-btn d-flex align-items-center">
					<div className="provider-head-links">
						<a href="javascript:void(0);" className="d-flex align-items-center justify-content-center me-2 notify-link" data-bs-toggle="dropdown"><i className="feather-bell"></i></a>
						<div className="dropdown-menu dropdown-menu-end notification-dropdown p-4">
							<div className="d-flex dropdown-body align-items-center justify-content-between border-bottom p-0 pb-3 mb-3">
								<h6 className="notification-title">Notifications <span className="fs-18 text-gray"> (2)</span></h6>
								<div className="d-flex align-items-center">
									<a href="#" className="text-primary fs-15 me-3 lh-1">Mark all as read</a>
									<div className="dropdown">
										<a href="javascript:void(0);" className="bg-white dropdown-toggle"
											data-bs-toggle="dropdown" data-bs-auto-close="outside"><i className="ti ti-calendar-due me-1"></i>Today
										</a>
										<ul className="dropdown-menu mt-2 p-3">
											<li>
												<a href="javascript:void(0);" className="dropdown-item rounded-1">
													This Week
												</a>
											</li>
											<li>
												<a href="javascript:void(0);" className="dropdown-item rounded-1">
													Last Week
												</a>
											</li>
											<li>
												<a href="javascript:void(0);" className="dropdown-item rounded-1">
													Last Week
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="noti-content">
								<div className="d-flex flex-column">
									<div className="border-bottom mb-3 pb-3">
										<a href="notification.html">
											<div className="d-flex">
												<span className="avatar avatar-lg me-2 flex-shrink-0">
													<img src="assets/img/profiles/avatar-52.jpg" alt="Profile" className="rounded-circle"/>
												</span>
												<div className="flex-grow-1">
													<div className="d-flex align-items-center">
													<p className="mb-1 w-100"><span className="text-dark fw-semibold">Stephan Peralt</span> rescheduled the service to 14/01/2024. </p>
													<span className="d-flex justify-content-end "> <i className="ti ti-point-filled text-primary"></i></span>
													</div> 
													<span>Just Now</span>
												</div>
											</div>
										</a>
									</div>
									<div className="border-bottom mb-3 pb-3">
										<a href="notification.html" className="pb-0">
											<div className="d-flex">
												<span className="avatar avatar-lg me-2 flex-shrink-0">
													<img src="assets/img/profiles/avatar-36.jpg" alt="Profile" className="rounded-circle"/>
												</span>
												<div className="flex-grow-1">
													<div className="d-flex align-items-center">
														<p className="mb-1 w-100"><span className="text-dark fw-semibold">Harvey Smith</span> has requested your service.</p>
														<span className="d-flex justify-content-end "> <i className="ti ti-point-filled text-primary"></i></span>
													</div>
													<span>5 mins ago</span>
													<div className="d-flex justify-content-start align-items-center mt-2">
														<span className="btn btn-light btn-sm me-2">Deny</span>
														<span className="btn btn-dark btn-sm">Accept</span>
													</div>
												</div>
											</div>
										</a>					
									</div>
									<div className="border-bottom mb-3 pb-3">
										<a href="notification.html">
											<div className="d-flex">
												<span className="avatar avatar-lg me-2 flex-shrink-0">
													<img src="assets/img/profiles/avatar-02.jpg" alt="Profile" className="rounded-circle"/>
												</span>
												<div className="flex-grow-1">
													<p className="mb-1"><span className="text-dark fw-semibold"> Anthony Lewis</span> has left feedback for your recent service </p>
													<span>10 mins ago</span>
												</div>
											</div>
										</a>
									</div>
									<div className="border-0 mb-3 pb-0">
										<a href="notification.html">
											<div className="d-flex">
												<span className="avatar avatar-lg me-2 flex-shrink-0">
													<img src="assets/img/profiles/avatar-22.jpg" alt="Profile" className="rounded-circle"/>
												</span>
												<div className="flex-grow-1">
													<p className="mb-1"><span className="text-dark fw-semibold">Brian Villaloboshas </span> cancelled the service scheduled for 14/01/2024.
													</p>
													<span>15 mins ago</span>
												</div>
											</div>
										</a>
									</div>
								</div>
							</div>
							<div className="d-flex p-0 notification-footer-btn">
								<a href="#" className="btn btn-light rounded  me-2">Cancel</a>
								<a href="#" className="btn btn-dark rounded ">View All</a>
							</div>
						</div>
					</div>
					<div className="provider-head-links">
						<a href="user-chat.html" className="d-flex align-items-center justify-content-center me-2"><i className="feather-mail"></i></a>
					</div>
					<div className="dropdown">
						<a href="javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="false" className="">
							<div className="booking-user d-flex align-items-center">
								<span className="user-img">
									<img src="assets/img/profiles/avatar-02.jpg" alt="user"/>
								</span>
							</div>
						</a>
						<ul className="dropdown-menu p-2">
							<li><a className="dropdown-item d-flex align-items-center" href="login.html"><i className="ti ti-logout me-1"></i>Logout</a></li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	</header>
	
	<div className="breadcrumb-bar text-center">
		<div className="container">
			<div className="row">
				<div className="col-md-12 col-12">
					<h2 className="breadcrumb-title mb-2">Wallet</h2>
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb justify-content-center mb-0">
							<li className="breadcrumb-item"><a href="index.html"><i className="ti ti-home-2"></i></a></li>
							<li className="breadcrumb-item">Customer</li>
							<li className="breadcrumb-item active" aria-current="page">Wallet</li>
						</ol>
					</nav>
				</div>
			</div>
			<div className="breadcrumb-bg">
				<img src="assets/img/bg/breadcrumb-bg-01.png" className="breadcrumb-bg-1" alt="Img"/>
				<img src="assets/img/bg/breadcrumb-bg-02.png" className="breadcrumb-bg-2" alt="Img"/>
			</div>
		</div>
	</div>

	<div className="page-wrapper">
		<div className="content">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-xl-3 col-lg-4 theiaStickySidebar">
						<User_dashboard_sidebar/>
					</div>
					<div className="col-xl-9 col-lg-8">
						<div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
							<h4>Wallet</h4>
							<div>
								<a href="javascript:void(0);" className="btn btn-dark btn-sm d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#add-wallet"><i className="ti ti-square-rounded-plus me-1"></i>Add Wallet</a>
							</div>
						</div>
						<div className="row">
							<div className="col-lg col-md-3">
								<div className="card p-3">
									<div className="d-flex align-items-center">
										<div className="me-3">
											<span className="wallet-icon bg-gray rounded-circle d-flex align-items-center justify-content-center"><i className="ti ti-wallet"></i></span>
										</div>
										<div>
											<span className="fs-13 text-gray text-truncate">Wallet Balance</span>
											<h6 className="fs-18">$351.4</h6>
										</div>
									</div>
								</div>
							</div>	
							<div className="col-lg col-md-3 ">
								<div className="card p-3 ">
									<div className="d-flex align-items-center">
										<div className="me-3">
											<span className="wallet-icon bg-gray rounded-circle d-flex align-items-center justify-content-center"><i className="ti ti-wallet"></i></span>
										</div>
										<div>
											<span className="fs-13 text-gray">Total Credit</span>
											<h6 className="fs-18">$590.40</h6>
										</div>
									</div>
								</div>
							</div>	
							<div className="col-lg col-md-3 ">
								<div className="card p-3 ">
									<div className="d-flex align-items-center">
										<div className="me-3">
											<span className="wallet-icon bg-gray rounded-circle d-flex align-items-center justify-content-center"><i className="ti ti-wallet"></i></span>
										</div>
										<div>
											<span className="fs-13 text-gray">Total Debit</span>
											<h6 className="fs-18">$2,288.04</h6>
										</div>
									</div>
								</div>
							</div>	
							<div className="col-lg col-md-3 ">
								<div className="card p-3">
									<div className="d-flex align-items-center">
										<div className="me-3">
											<span className="wallet-icon bg-gray rounded-circle d-flex align-items-center justify-content-center"><i className="ti ti-wallet"></i></span>
										</div>
										<div>
											<span className="fs-13 text-gray mb-0">Taxes</span>
											<h6 className="fs-18">$351.4</h6>
										</div>
									</div>
								</div>
							</div>	
							<div className="col-lg col-md-3 ">
								<div className="card p-3 ">
									<div className="d-flex align-items-center">
										<div className="me-3">
											<span className="wallet-icon bg-gray rounded-circle d-flex align-items-center justify-content-center"><i className="ti ti-wallet"></i></span>
										</div>
										<div>
											<span className="fs-13 text-gray mb-0">Savings</span>
											<h5 className="fs-18">$200.00</h5>
										</div>
									</div>
								</div>
							</div>	
						</div>
						<div className="mb-4">
							<h6>Wallet Transactions</h6>
						</div>
						<div className="row">
							<div className="col-12 ">
								<div className="table-resposnive border">
									<table className="table mb-0">
										<thead className="thead-light">
											<tr>
												<th>Type</th>
												<th>Amount</th>
												<th>Date</th>
												<th>Payment Type</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td><p className="fs-14">Wallet Topup</p></td>
												<td>
													<span className="text-success">+$80</span>
												
												</td>
												<td><p className="text-gray fs-14">07 Oct 2022 11:22:51	 </p></td>
												<td><p className="fs-14">Paypal</p></td>
												<td>
												  <span className="badge badge-success-100">Completed</span>
												</td>
											</tr>
											<tr>
												<td><p className="fs-14">Purchase</p></td>
												<td>
													<span className="text-danger">-$20</span>
												
												</td>
												<td><p className="text-gray fs-14">06 Oct 2022 11:22:51	 </p></td>
												<td><p className="fs-14">Paypal</p></td>
												<td>
												  <span className="badge badge-success-100">Completed</span>
												</td>
											</tr>
											<tr>
												<td><p className="fs-14">Refund</p></td>
												<td>
													<span className="text-success">+$40</span>
												
												</td>
												<td><p className="text-gray fs-14">06 Oct 2022 11:22:51	 </p></td>
												<td><p className="fs-14">Paypal</p></td>
												<td>
												  <span className="badge badge-success-100">Completed</span>
												</td>
											</tr>
											<tr>
												<td><p className="fs-14">Wallet Topup</p></td>
												<td>
													<span className="text-success">+$100</span>
												
												</td>
												<td><p className="text-gray fs-14">28 Sep 2022 11:22:51	 </p></td>
												<td><p className="fs-14">Paypal</p></td>
												<td>
												  <span className="badge badge-success-100">Completed</span>
												</td>
											</tr>
											<tr>
												<td><p className="fs-14">Purchase</p></td>
												<td>
													<span className="text-danger">-$50</span>
												
												</td>
												<td><p className="text-gray fs-14">07 Oct 2022 11:22:51		 </p></td>
												<td><p className="fs-14">Paypal</p></td>
												<td>
												  <span className="badge badge-success-100">Completed</span>
												</td>
											</tr>
											<tr>
												<td><p className="fs-14">Refund</p></td>
												<td>
													<span className="text-danger">+$60</span>
												
												</td>
												<td><p className="text-gray fs-14">07 Oct 2022 11:22:51			 </p></td>
												<td><p className="fs-14">Paypal</p></td>
												<td>
												  <span className="badge badge-success-100">Completed</span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className="d-flex justify-content-between align-items-center">
							<div className="d-flex">
								<p>Show</p>
								<div className="dropdown mx-2">
									<a href="javascript:void(0);" className="dropdown-toggle bg-light-600 " data-bs-toggle="dropdown">07</a>
									<ul className="dropdown-menu">
										
										<li><a href="javascript:void(0);" className="dropdown-item">1</a></li>
									</ul>
								</div>
								<p>entries</p>
							</div>
							<nav aria-label="Page navigation">
								
								<ul className="paginations d-flex justify-content-center align-items-center"> 
								  <li className="me-3">1 - 07 of 10</li> 
								  <li className="page-item me-2"><a className="page-link-1 active d-flex justify-content-center align-items-center " href="javascript:void(0);">1</a></li>
								  <li className="page-item me-2"><a className="page-link-1 d-flex justify-content-center align-items-center " href="javascript:void(0);">2</a></li>
								  <li className="page-item "><a className="page-link-1 d-flex justify-content-center align-items-center " href="javascript:void(0);">3</a></li>
								</ul>
							  </nav>
							  
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<Footer/>


 	<div className="modal fade wallet-modal" id="add-wallet" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"  aria-hidden="true">
	<div className="modal-dialog modal-dialog-centered">
	  <div className="modal-content">
		<div className="modal-header d-flex align-items-center justify-content-between  border-0">
			<h5>Add Wallet</h5>
			<a href="javascript:void(0);" data-bs-dismiss="modal" aria-label="Close"><i className="ti ti-circle-x-filled fs-20"></i></a>
		</div>
		<div className="modal-body pb-0">
			<form>
				<div className="mb-0">
				  <label htmlFor="amount" className="form-label">Amount</label>
				  <input type="text" className="form-control" id="amount"/>
				</div>
			  </form>
			  <div className="row">
				<div className="col-md-4">
					<div className="bank-selection">
						<input type="radio" value="attach_link" id="rolelink" name="attachment" checked=""/>
						<label htmlFor="rolelink">
							<img src="assets/img/icons/paypal.svg" alt="Paypal"/>
							<span className="role-check"><i className="fa-solid fa-circle-check"></i></span>
						</label>
					</div>
				</div>
				<div className="col-md-4">
					<div className="bank-selection">
						<input type="radio" value="attach_link" id="rolelink1" name="attachment"/>
						<label htmlFor="rolelink1">
							<img src="assets/img/icons/stripe.svg" alt="Stripe"/>
							<span className="role-check"><i className="fa-solid fa-circle-check"></i></span>
						</label>
					</div>
				</div>
				<div className="col-md-4">
					<div className="bank-selection">
						<input type="radio" value="attach_link" id="rolelink2" name="attachment"/>
						<label htmlFor="rolelink2">
							<img src="assets/img/icons/bank-transfer.svg" alt="image"/>
							<span className="role-check"><i className="fa-solid fa-circle-check"></i></span>
						</label>
					</div>
				</div>
			</div>
		</div>
		<div className="modal-footer">
		  <button type="button" className="btn bg-gray" data-bs-dismiss="modal">Cancel</button>
		  <button type="button" className="btn btn-dark">Submit</button>
		</div>
	  </div>
	</div>
  </div>

	<div className="modal fade custom-modal" id="del-account">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
                    <h5 className="modal-title">Delete Account</h5>
                    <a href="javascript:void(0);" data-bs-dismiss="modal" aria-label="Close"><i className="ti ti-circle-x-filled fs-20"></i></a>
                </div>
				<form action="#">
					<div className="modal-body">
						<p className="mb-3">Are you sure you want to delete This Account? To delete your account, Type your password.</p>
						<div className="mb-0">
							<label className="form-label">Password</label>
							<div className="pass-group">
								<input type="password" className="form-control pass-input" placeholder="*************"/>
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

	<script src="assets/js/jquery-3.7.1.min.js" type="39f1ea1bf868d23608ea5292-text/javascript"></script>

	<script src="assets/js/bootstrap.bundle.min.js" type="39f1ea1bf868d23608ea5292-text/javascript"></script>

	<script src="assets/plugins/theia-sticky-sidebar/ResizeSensor.js" type="39f1ea1bf868d23608ea5292-text/javascript"></script>
	<script src="assets/plugins/theia-sticky-sidebar/theia-sticky-sidebar.js" type="39f1ea1bf868d23608ea5292-text/javascript"></script>

	<script src="assets/js/wow.min.js" type="39f1ea1bf868d23608ea5292-text/javascript"></script>

	<script src="assets/plugins/select2/js/select2.min.js" type="39f1ea1bf868d23608ea5292-text/javascript"></script>

	<script src="assets/plugins/owlcarousel/owl.carousel.min.js" type="39f1ea1bf868d23608ea5292-text/javascript"></script>

	<script src="assets/js/cursor.js" type="39f1ea1bf868d23608ea5292-text/javascript"></script>

	<script src="assets/js/script.js" type="39f1ea1bf868d23608ea5292-text/javascript"></script>
<script src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js" data-cf-settings="39f1ea1bf868d23608ea5292-|49" defer></script><script defer src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015" integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==" data-cf-beacon='{"rayId":"908e4e3b9de88577","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}' crossOrigin="anonymous"></script>
    </>
  )
}

export default Customer_wallet
