import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function Otp() {
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
					<form action="" className="digit-group">
						<div className="d-flex flex-column justify-content-center">
							<div className="card p-sm-4">
								<div className="card-body">
									<div className="text-center mb-3">
										<h3 className="mb-2">Phone OTP Verification</h3>
										<p>OTP sent to your mobile number ending 9575</p>
									</div>
									<div className="text-center otp-input">
										<div className="d-flex align-items-center mb-3">
											<input type="text" className="rounded w-100 py-sm-3 py-2 text-center fs-26 fw-bold me-3" id="digit-1" name="digit-1" data-next="digit-2" maxLength="1"/>
											<input type="text" className="rounded w-100 py-sm-3 py-2 text-center fs-26 fw-bold me-3" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" maxLength="1"/>
											<input type="text" className="rounded w-100 py-sm-3 py-2 text-center fs-26 fw-bold me-3" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" maxLength="1"/>
											<input type="text" className="rounded w-100 py-sm-3 py-2 text-center fs-26 fw-bold" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" maxLength="1"/>
										</div>
										<div>
											<div className="badge bg-danger-transparent mb-3">
												<p className="d-flex align-items-center "><i className="ti ti-clock me-1"></i>09:59</p>
											</div>
											<div className="mb-3 d-flex justify-content-center">
												<p>Didnt get the OTP? <a href="javascript:void(0);" className="text-primary">Resend OTP</a></p>
											</div>
											<div>
												<button type="submit" className="btn btn-lg btn-linear-primary w-100">Verify & Proceed</button>
											</div>
										</div>
									</div>	
									<div>
										<img src="assets/img/bg/authentication-bg.png" className="bg-left-top" alt="Img"/>
										<img src="assets/img/bg/authentication-bg.png" className="bg-right-bottom" alt="Img"/>
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
		<a className="back-to-top-icon align-items-center justify-content-center d-flex"  href="#top"><i className="fa-solid fa-arrow-up"></i></a>
	</div>	

	<div className="xb-cursor tx-js-cursor">
        <div className="xb-cursor-wrapper">
            <div className="xb-cursor--follower xb-js-follower"></div>
        </div>
    </div>

	<script src="assets/js/jquery-3.7.1.min.js" type="e0f7d4523d0960235edb4c08-text/javascript"></script>

	<script src="assets/js/bootstrap.bundle.min.js" type="e0f7d4523d0960235edb4c08-text/javascript"></script>
	
	<script src="assets/js/script.js" type="e0f7d4523d0960235edb4c08-text/javascript"></script>
	
<script src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js" data-cf-settings="e0f7d4523d0960235edb4c08-|49" defer></script><script defer src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015" integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==" data-cf-beacon='{"rayId":"908e4e745b104019","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}' crossOrigin="anonymous"></script>
</div>
  )
}

export default Otp
