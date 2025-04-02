import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./header";
import Home from './index.jsx'
import About from './about.jsx'
import Account_settings from './user-account-settings.jsx'
import Blog_details from './blog-details.jsx'
import Blog from './blog.jsx'
import Booking_payment from './booking-payment.jsx'
import Booking_success from './booking-success.jsx'
import Categories from './categories.jsx'
import Contactus from './contactus.jsx'
import Create_services from './create-service.jsx'
import Provider_customer_list from './provider-customer-list.jsx'
import Favorite from './user-favourites.jsx'
import Login from './login.jsx'
import Otp from './otp.jsx'
import Provider_accounts_settings from './provider-accounts-settings.jsx'
import Provider_booking from './provider-booking.jsx'
import Provider_coupons from './provider-coupons.jsx'
import Provider_dashboard from './provider-dashboard.jsx'
import Provider_earnings from './provider-earnings.jsx'
import Provider_holiday from './provider-holiday.jsx'
import Provider_offers from './provider-offers.jsx'
import Provider_payout from './provider-payout.jsx'
import Provider_review from './provider-review.jsx'
import Provider_security_setting from './provider-security-settings.jsx'
import Provider_services from './provider-services.jsx'
import Provider_social_profile from './provider-social-profile.jsx'
import Provuder_enquiry from './provider-enquiry.jsx'
import Provider from './providers.jsx'
import Register from './register.jsx'
import Reset_password from './reset-password.jsx'
import Service_details from './service-details.jsx'
import Service from './service.jsx'
import Provider_staff_list from './provider-staff-list.jsx'
import User_booking from './user-booking.jsx'
import User_booking_list from './user-booking-list.jsx'
import User_dashboard from './user-dashboard.jsx'
import User_reviews from './user-reviews.jsx'
import User_wallet from './user-wallet.jsx'
import User_invoice from "./user-invoice.jsx";
import User_booking_details from "./user-booking-details.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/provider-dashboard" element={<Provider_dashboard/>} />
        <Route path="/" element={<Home/>} />

        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/service-details"element={<Service_details/>}/>
        <Route path="/service-details"element={<Service_details/>}/>
        <Route path="/user-booking"element={<User_booking/>}/>
        <Route path="/booking-payment"element={<Booking_payment/>}/>
        <Route path="/booking-success"element={<Booking_success/>}/>
        <Route path="/blog-details"element={<Blog_details/>}/>
        <Route path="/user-booking-list" element={<User_booking_list />} />
        <Route path="/user-dashboard" element={<User_dashboard />} />
        <Route path="/user-reviews" element={<User_reviews />} />
        <Route path="/user-wallet" element={<User_wallet />} />
        <Route path="/user-account-setting" element={<Account_settings />} />
        <Route path="/user-favourites" element={<Favorite/>} />
        <Route path="/user-booking-details" element={<User_booking_details/>} />
        <Route path="/user-invoice" element={<User_invoice/>} />
        <Route path="/provider-accounts-settings" element={<Provider_accounts_settings />} />
        <Route path="/provider-booking" element={<Provider_booking />} />
        <Route path="/provider-coupons" element={<Provider_coupons />} />
        <Route path="/provider-dashboard" element={<Provider_dashboard />} />
        <Route path="/provider-earnings" element={<Provider_earnings />} />
        <Route path="/provider-holiday" element={<Provider_holiday />} />
        <Route path="/provider-offers" element={<Provider_offers />} />
        <Route path="/provider-payout" element={<Provider_payout />} />
        <Route path="/provider-review" element={<Provider_review />} />
        <Route path="/provider-security-settings" element={<Provider_security_setting />} />
        <Route path="/provider-services" element={<Provider_services />} />
        <Route path="/provider-social-profile" element={<Provider_social_profile />} />
        <Route path="/provider-enquiry" element={<Provuder_enquiry />} />
        <Route path="/provider-staff-list" element={<Provider_staff_list />} />
        <Route path="/provider-customer-list" element={<Provider_customer_list />} />
        <Route path="/create-services" element={<Create_services />} />


      </Routes>
    </>
  );
};

export default App;
