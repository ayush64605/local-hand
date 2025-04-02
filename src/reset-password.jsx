import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function Reset_password() {
  const [count, setCount] = useState(0)

  return (
    <div className="authentication-page">

	<div className="d-flex justify-content-between vh-100 overflow-auto flex-column">

		<div className="authentication-header">
			<div className="container">
				<div className="col-md-12">
					<div className="text-center">
						<img src="assets/img/logo.svg" alt="logo"/>
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
									<div className="card-div">
										<div className="text-center mb-3">
											<h3 className="mb-2">Reset Password</h3>
											<p className="fs-14">Your new password must be different from previous used
												passwords.</p>
										</div>
										<div>
											<div className="input-block mb-3">
												<div className="mb-3">
													<label className="form-label">New Password</label>
													<div className="pass-group" id="passwordInput">
														<input type="password" className="form-control pass-input"/>
													</div>
												</div>
												<div className="password-strength d-flex" id="passwordStrength">
													<span id="poor"></span>
													<span id="weak"></span>
													<span id="strong"></span>
													<span id="heavy"></span>
												</div>
												<div id="passwordInfo" className="mb-2"></div>
												<p className="fs-12">Use 8 or more characters with a mix of letters, numbers
													& symbols.</p>
											</div>
											<div className="mb-3">
												<div
													className="d-flex align-items-center justify-content-between flex-wrap">
													<label className="form-label">Confirm Password</label>
												</div>
												<input type="password" className="form-control"/>
											</div>
											<div>
												<button type="submit" className="btn btn-lg btn-linear-primary w-100">Save
													Change</button>
											</div>
										</div>
										<div>
											<img src="assets/img/bg/authentication-bg.png" className="bg-left-top"
												alt="Img"/>
											<img src="assets/img/bg/authentication-bg.png" className="bg-right-bottom"
												alt="Img"/>
										</div>
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







	<div className="back-to-top">
		<a className="back-to-top-icon align-items-center justify-content-center d-flex" href="#top"><i
				className="fa-solid fa-arrow-up"></i></a>
	</div>

	<div className="xb-cursor tx-js-cursor">
		<div className="xb-cursor-wrapper">
			<div className="xb-cursor--follower xb-js-follower"></div>
		</div>
	</div>

	<script src="assets/js/jquery-3.7.1.min.js" type="e9f034663c13bfc935d2a1eb-text/javascript"></script>

	<script src="assets/js/bootstrap.bundle.min.js" type="e9f034663c13bfc935d2a1eb-text/javascript"></script>

	<script src="assets/js/validation.js" type="e9f034663c13bfc935d2a1eb-text/javascript"></script>

	<script src="assets/js/script.js" type="e9f034663c13bfc935d2a1eb-text/javascript"></script>

<script src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js" data-cf-settings="e9f034663c13bfc935d2a1eb-|49" defer></script><script defer src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015" integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==" data-cf-beacon='{"rayId":"908e4e72ed258577","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}' crossorigin="anonymous"></script>
</div>
  )
}

export default Reset_password
