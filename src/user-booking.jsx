import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function User_booking() {
  const [count, setCount] = useState(0);
  const servicesDocId = sessionStorage.getItem("servicesDocId");
  const [serviceData, setServiceData] = useState(null);
  const [provider, setProvider] = useState(null);
  const [timing, setTiming] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // Stores selected date
  const [timeSlots, setTimeSlots] = useState([]);
  const [slotloading, setslotLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState(null);
  const storedEmail = sessionStorage.getItem("userEmail");
  const [user, setUser] = useState(null);
  const [providerId, setProviderId] = useState(null);
  const [duration, setServiceDuration] = useState(null);
  const [bookedSlots, setBookedSlots] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      const fetchUserDetails = async () => {
        if (!storedEmail) return;

        const usersRef = collection(db, "localhand-users");
        const q = query(usersRef, where("email", "==", storedEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0]; // Get the first matching document
          const userData = userDoc.data(); // Get the document data
          setUserData(userData);
          setUser({ ...userData, id: userDoc.id }); // Add document ID to user state
          setUserId(userDoc.id); // Store document ID separately
        }
      };

      const fetchServiceDocument = async () => {
        try {
          if (!servicesDocId) {
            setServiceData({ error: "No Service Selected" });
            return;
          }

          // Query all users to find which one has the service
          const usersRef = collection(db, "localhand-users");
          const usersSnapshot = await getDocs(usersRef);

          for (const userDoc of usersSnapshot.docs) {
            const servicesRef = collection(
              db,
              `localhand-users/${userDoc.id}/services`
            );
            const q = query(
              servicesRef,
              where("__name__", "==", servicesDocId)
            ); // Search by document ID
            const serviceSnapshot = await getDocs(q);

            if (!serviceSnapshot.empty) {
              const serviceDoc = serviceSnapshot.docs[0]; // Get the first matching document
              const serviceData = serviceDoc.data(); // Store the whole document data

              // Extract service duration
              const serviceDuration = serviceData.duration || 30; // Default to 30 minutes if undefined

              setServiceData(serviceData); // Store the full service data
              setServiceDuration(serviceDuration); // Store the duration separately

              return; // Stop searching once we find the service
            }
          }

          setServiceData({ error: "Service Not Found" });
        } catch (error) {
          console.error("Error fetching service document:", error);
          setServiceData({ error: "Error loading service" });
        }
      };

      const fetchProviderDetails = async () => {
        try {
          // Step 1: Find the userDocId that contains the given servicesDocId
          const usersCollectionRef = collection(db, "localhand-users");
          const usersSnapshot = await getDocs(usersCollectionRef);

          let userDocId = null;

          for (const userDoc of usersSnapshot.docs) {
            const servicesCollectionRef = collection(userDoc.ref, "services");
            const serviceQuery = query(
              servicesCollectionRef,
              where("__name__", "==", servicesDocId)
            );
            const serviceSnapshot = await getDocs(serviceQuery);

            if (!serviceSnapshot.empty) {
              userDocId = userDoc.id;
              setProviderId(userDocId);
              break;
            }
          }

          if (!userDocId) {
            console.error("Service document not found in any user collection");
            return;
          }

          // Step 2: Fetch provider name from `localhand-users/{userDocId}`
          const userDocRef = doc(db, "localhand-users", userDocId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setProvider(userDocSnap.data());
          } else {
            console.error("No provider data found");
          }

          // Step 3: Ensure a date is selected before fetching timings
          if (!selectedDate) return;

          const dayOfWeek = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
          }).format(new Date(selectedDate));
          console.log(`Fetching timings for: ${dayOfWeek}`);

          // Step 4: Fetch provider timing for the selected day
          const timingDocRef = doc(
            db,
            "localhand-users",
            userDocId,
            "timing",
            "schedule"
          );
          const timingDocSnap = await getDoc(timingDocRef);

          if (timingDocSnap.exists()) {
            const timings = timingDocSnap.data();
            const start = timings[`${dayOfWeek}Start`]; // e.g., "09:00"
            const end = timings[`${dayOfWeek}End`]; // e.g., "18:00"

            console.log("Start Time:", start);
            console.log("End Time:", end);

            if (start && end) {
              setTiming(timings); // Store the entire timing object
              setTimeSlots(generateTimeSlots(start, end)); // Generate and store time slots
            } else {
              console.error(`No timing found for ${dayOfWeek}`);
              setTimeSlots([]); // Clear time slots if none found
            }
          } else {
            console.error("No timing data found");
            setTimeSlots([]); // Clear time slots if no data exists
          }
        } catch (error) {
          console.error("Error fetching provider details:", error);
        }
      };

      if (userData) {
        setFormData((prevData) => ({
          ...prevData,
          address: userData.address || "",
          city: userData.city || "",
          state: userData.state || "",
          code: userData.postalcode || "",
        }));
      }

      const fetchData = async () => {
        setLoading(true); // Start loading

        try {
          await fetchUserDetails();
          await fetchProviderDetails();
          await fetchServiceDocument();
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // Stop loading after all data is fetched
        }
      };

      fetchData();
    },
    [servicesDocId, selectedDate],
    [userData]
  );

  const fetchBookedSlots = async (date) => {
    if (!date) {
      console.error("Date is null or undefined");
      return [];
    }

    const parsedDate = new Date(date); // Ensure it's a Date object

    if (isNaN(parsedDate)) {
      console.error("Invalid date:", date);
      return [];
    }

    const formattedDate = parsedDate.toISOString().split("T")[0]; // "YYYY-MM-DD"

    console.log("Provider ID:", providerId);
    console.log("Formatted Date:", formattedDate);

    const bookingsRef = collection(db, "bookings");

    const q = query(
      bookingsRef,
      where("appointmentDate", "==", formattedDate),
      where("providerId", "==", providerId)
    );

    try {
      const snapshot = await getDocs(q);
      let bookedTimes = snapshot.docs.map((doc) => doc.data().appointmentTime);
      setBookedSlots(bookedTimes);
      return bookedTimes;
    } catch (error) {
      console.error("Error fetching booked slots:", error);
      return [];
    }
  };

  

  // Function to generate time slots
  const generateTimeSlots = async (start, end) => {
    setslotLoading(true);

    // Fetch booked slots for the selected date
    const bookedSlots = await fetchBookedSlots(selectedDate);

    setTimeout(() => {
      const slots = [];
      let [startHour, startMin] = start.split(":").map(Number);
      let [endHour, endMin] = end.split(":").map(Number);
      let serviceDuration = 15; // Service duration in minutes
      let defaultGap = 30; // Default gap between slots

      while (
        startHour < endHour ||
        (startHour === endHour && startMin < endMin)
      ) {
        const formattedSlot = formatTime(startHour, startMin);

        // Check if this slot is booked
        const isBooked = bookedSlots.includes(formattedSlot);

        // Add slot to list, but disable it if it's booked
        slots.push({ time: formattedSlot, disabled: isBooked });

        // If the slot is booked, move the next available time by service duration
        if (isBooked) {
          startMin += serviceDuration;
        } else {
          startMin += defaultGap;
        }

        if (startMin >= 60) {
          startMin -= 60;
          startHour += 1;
        }
      }

      setTimeSlots(slots);
      setslotLoading(false);
    }, 1000);
  };

  // Function to format time in 12-hour format
  const formatTime = (hour, min) => {
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    const formattedMin = min.toString().padStart(2, "0");
    return `${formattedHour}:${formattedMin} ${ampm}`;
  };

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    code: "",
    appointmentDate: null,
    appointmentTime: "",
  });

  const [errors, setErrors] = useState({});
  console.log(formData);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.code) newErrors.code = "Postal Code is required";
    if (!formData.appointmentDate)
      newErrors.appointmentDate = "Date is required";
    if (!formData.appointmentTime)
      newErrors.appointmentTime = "Time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Converts to "YYYY-MM-DD"
    setSelectedDate(formattedDate);
    setFormData({ ...formData, appointmentDate: formattedDate });
  };

  const handleTimeSelect = (time) => {
    console.log("Selected Time:", time); // Debugging log

    if (!time || typeof time !== "string") {
      console.error("Invalid time format:", time);
      return;
    }

    const timeParts = time.split(":");
    if (timeParts.length !== 2) {
      console.error("Time format incorrect:", time);
      return;
    }

    const selectedHour = parseInt(timeParts[0], 10);
    const selectedMin = parseInt(timeParts[1], 10);

    if (isNaN(selectedHour) || isNaN(selectedMin)) {
      console.error("Invalid hour or minute:", selectedHour, selectedMin);
      return;
    }

    console.log("Parsed Time - Hour:", selectedHour, "Minute:", selectedMin); // Debugging log

    // Extract duration from Firestore and convert to number
    let selectedDuration = parseInt(duration.replace(/\D/g, ""), 10); // Removes non-numeric characters
    if (isNaN(selectedDuration)) {
      console.error("Invalid duration:", duration);
      return;
    }

    console.log("Fetched Duration from Firestore:", selectedDuration);

    // Convert selected time to total minutes
    const selectedStartMinutes = selectedHour * 60 + selectedMin;
    const selectedEndMinutes = selectedStartMinutes + selectedDuration;

    console.log("Selected Start Minutes:", selectedStartMinutes); // Debugging log
    console.log("Selected End Minutes:", selectedEndMinutes); // Debugging log

    let hasConflict = false;

    // Debugging booked slots
    console.log("Booked Slots:", bookedSlots);

    // Check if any booked slot conflicts within the selected duration
    for (const bookedTime of bookedSlots) {
      console.log("Checking against booked time:", bookedTime);

      if (typeof bookedTime !== "string") {
        console.error("Invalid booked time format:", bookedTime);
        continue;
      }

      const bookedParts = bookedTime.split(":");

      if (bookedParts.length !== 2) {
        console.error("Booked time format incorrect:", bookedTime);
        continue;
      }

      const bookedHour = parseInt(bookedParts[0], 10);
      const bookedMin = parseInt(bookedParts[1], 10);

      if (isNaN(bookedHour) || isNaN(bookedMin)) {
        console.error("Invalid booked hour or minute:", bookedHour, bookedMin);
        continue;
      }

      const bookedStartMinutes = bookedHour * 60 + bookedMin;

      console.log("Booked Slot in Minutes:", bookedStartMinutes);
      console.log("selected Slot in Minutes:", selectedStartMinutes);
      console.log("selected Slot in Minutes:", selectedEndMinutes);


      if (
        bookedStartMinutes >= selectedStartMinutes &&
        bookedStartMinutes < selectedEndMinutes
      ) {
        console.log(`Conflict found with booked time: ${bookedTime}`);
        toast.warning("Provider has booked for this time, please choose other slot", {
          position: "bottom-right",
          autoClose: 3000,
        });
        hasConflict = true;
        break; // Exit the loop as a conflict is found
      }
    }

    // If no conflict, update formData
    if (!hasConflict) {
      
      setFormData({
        ...formData,
        appointmentTime: time,
        duration: selectedDuration,
      });
    }
  };

  const handleSubmit = () => {
    if (!storedEmail) {
      toast.warning("Please log in to book an appointment", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    if (validateForm()) {
      sessionStorage.setItem("appointmentData", JSON.stringify(formData));
      toast.success("Appointment successfully booked!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      document.getElementById("bookingLink").click();
    }
  };

  return (
    <>
      <div>
        <Header />
        <ToastContainer/>
        <div className="breadcrumb-bar text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <h2 className="breadcrumb-title mb-2">Bookings</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">
                        <i className="ti ti-home-2" />
                      </a>
                    </li>
                    <li className="breadcrumb-item">Customer</li>
                    <li aria-current="page" className="breadcrumb-item active">
                      Bookings
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
          <div className="content">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <ul className="step-register row">
                    <li className="active col-md-4">
                      <div className="multi-step-icon">
                        <img
                          alt="img"
                          src="assets/img/icons/calendar-icon.svg"
                        />
                      </div>
                      <div className="multi-step-info">
                        <h6>Appointment</h6>
                        <p>Choose time & date for the service</p>
                      </div>
                    </li>
                    <li className="col-md-4">
                      <div className="multi-step-icon">
                        <img alt="img" src="assets/img/icons/wallet-icon.svg" />
                      </div>
                      <div className="multi-step-info">
                        <h6>Payment</h6>
                        <p>Select Payment Gateway</p>
                      </div>
                    </li>
                    <li className="col-md-4">
                      <div className="multi-step-icon">
                        <img alt="img" src="assets/img/icons/book-done.svg" />
                      </div>
                      <div className="multi-step-info">
                        <h6>Done </h6>
                        <p>Completion of Booking</p>
                      </div>
                    </li>
                  </ul>

                  {loading ? (
                    <div className="spinner-container">
                      <div className="spinner"></div>
                    </div>
                  ) : (
                    <div>
                      <div className="booking-service card shadow-none">
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-lg-5">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 service-img me-3">
                                  <img
                                    alt="img"
                                    src={
                                      serviceData?.images?.length > 0
                                        ? serviceData.images[0]
                                        : "default.jpg"
                                    }
                                  />
                                </div>
                                <div className="serv-profile">
                                  <span className="badge badge-soft-primary">
                                    {serviceData
                                      ? serviceData.category ||
                                        "Service Not Found"
                                      : "Loading..."}
                                  </span>
                                  <h5 className="my-2">
                                    {serviceData
                                      ? serviceData.serviceTitle ||
                                        "Service Not Found"
                                      : "Loading..."}
                                  </h5>
                                  <div className="d-flex align-items-center">
                                    <span className="avatar avatar-md rounded-circle me-2">
                                      <img
                                        alt="img"
                                        className="rounded-circle"
                                        src= {provider
                                          ? provider.profileImage || "Service Not Found"
                                          : "Loading..."}
                                      />
                                    </span>
                                    <div className="serv-pro-info">
                                      <h6 className="fs-14 fw-medium">
                                        {provider
                                          ? provider.name || "Service Not Found"
                                          : "Loading..."}
                                      </h6>
                                      <p className="serv-review">
                                        <i className="fa-solid fa-star" />{" "}
                                        <span>4.9 </span>
                                        (255 reviews)
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-7">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="">
                                    <div className="provide-box d-flex align-items-center mb-3">
                                      <span className="me-2">
                                        <i className="feather-phone" />
                                      </span>
                                      <div className="provide-info">
                                        <h6 className="fs-14 fw-medium mb-1">
                                          Phone
                                        </h6>
                                        <p>
                                          {provider
                                            ? provider.phone ||
                                              "Service Not Found"
                                            : "Loading..."}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="provide-box d-flex align-items-center">
                                      <span className="me-2">
                                        <i className="feather-mail" />
                                      </span>
                                      <div className="provide-info">
                                        <h6 className="fs-14 fw-medium mb-1">
                                          Email
                                        </h6>
                                        <p>
                                          {provider
                                            ? provider.email ||
                                              "Service Not Found"
                                            : "Loading..."}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="">
                                    <div className="provide-box d-flex align-items-center mb-3">
                                      <span className="me-2">
                                        <i className="feather-map-pin" />
                                      </span>
                                      <div className="provide-info">
                                        <h6 className="fs-14 fw-medium mb-1">
                                          Address
                                        </h6>
                                        <p>
                                          {provider
                                            ? provider.city ||
                                              "Service Not Found"
                                            : "Loading..."}
                                          ,{" "}
                                          {provider
                                            ? provider.state ||
                                              "Service Not Found"
                                            : "Loading..."}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="provide-box d-flex align-items-center">
                                      <span className="me-2">
                                        <i className="ti ti-wallet" />
                                      </span>
                                      <div className="provide-info">
                                        <h6 className="fs-14 fw-medium mb-1">
                                          Service Amount
                                        </h6>
                                        <h5>
                                          {serviceData
                                            ? serviceData.total ||
                                              "Service Not Found"
                                            : "Loading..."}{" "}
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="d-flex align-items-center social">
                                <a
                                  className="d-flex align-items-center justify-content-center"
                                  href="javascript:void(0);"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="book-form border-top border-bottom pt-4 pb-2">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Address</label>
                              <input
                                className="form-control"
                                type="text"
                                name="address"
                                value={
                                  formData.address || userData.address || ""
                                }
                                onChange={handleInputChange}
                              />
                              {errors.address && (
                                <span className="text-danger">
                                  {errors.address}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">city</label>
                              <input
                                className="form-control"
                                type="text"
                                name="city"
                                value={formData.city || userData.city || ""}
                                onChange={handleInputChange}
                              />
                              {errors.city && (
                                <span className="text-danger">
                                  {errors.city}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">State</label>
                              <input
                                className="form-control"
                                type="text"
                                name="state"
                                value={formData.state || userData.state || ""}
                                onChange={handleInputChange}
                              />
                              {errors.state && (
                                <span className="text-danger">
                                  {errors.state}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Postal Code</label>
                              <input
                                className="form-control"
                                type="text"
                                name="code"
                                value={
                                  formData.code || userData.postalcode || ""
                                }
                                onChange={handleInputChange}
                              />
                              {errors.code && (
                                <span className="text-danger">
                                  {errors.code}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  )}
                  <div className="row">
                        <div className="col-lg-4">
                          <div className="book-title">
                            <h5>Appointment Date</h5>
                          </div>
                          <div className="card">
                            <div className="card-body p-2 pt-3">
                              <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                minDate={new Date()} // Prevent past date selection
                                className="form-control"
                              />
                              {errors.appointmentDate && (
                                <span className="text-danger">
                                  {errors.appointmentDate}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-8">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="book-title">
                                <h5>Appointment Time</h5>
                              </div>
                            </div>
                          </div>
                          <div className="token-slot mt-2">
                            {slotloading ? (
                              <div className="mt-3 text-center">
                                <span>Loading available slots...</span>
                              </div>
                            ) : (
                              timeSlots.length > 0 && (
                                <div className="mt-3">
                                  <div className="d-flex flex-wrap">
                                    {timeSlots.map(
                                      ({ time, disabled }, index) => (
                                        <div
                                          key={index}
                                          className="form-check-inline visits me-2"
                                        >
                                          <label
                                            className={`visit-btns ${
                                              disabled ? "disabled-slot" : ""
                                            }`}
                                          >
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              name="appointment"
                                              value={time}
                                              onChange={() =>
                                                handleTimeSelect(time)
                                              }
                                              disabled={disabled} // Disable the booked slots
                                            />
                                            <span className="visit-rsn">
                                              {time}
                                            </span>
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                  {errors.appointmentTime && (
                                    <span className="text-danger">
                                      {errors.appointmentTime}
                                    </span>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                          <div className="d-flex align-items-center justify-content-end mt-4">
                            <a
                              className="btn btn-light me-2"
                              href="javascript:void(0);"
                            >
                              Cancel
                            </a>
                            <a
                              href="/booking-payment"
                              className="btn btn-dark"
                              onClick={(e) => {
                                if (!handleSubmit()) {
                                  e.preventDefault(); // Prevent redirection if validation fails
                                }
                              }}
                            >
                              Book Appointment
                            </a>
                          </div>
                        </div>
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <script
          data-cfasync="false"
          src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
        />
        <script
          src="assets/js/jquery-3.7.1.min.js"
          type="112f2ee0b97a702ffc27049a-text/javascript"
        />
        <script
          src="assets/js/bootstrap.bundle.min.js"
          type="112f2ee0b97a702ffc27049a-text/javascript"
        />
        <script
          src="assets/js/wow.min.js"
          type="112f2ee0b97a702ffc27049a-text/javascript"
        />
        <script
          src="assets/plugins/select2/js/select2.min.js"
          type="112f2ee0b97a702ffc27049a-text/javascript"
        />
        <script
          src="assets/js/moment.js"
          type="112f2ee0b97a702ffc27049a-text/javascript"
        />
        <script
          src="assets/js/bootstrap-datetimepicker.min.js"
          type="112f2ee0b97a702ffc27049a-text/javascript"
        />
        <script
          src="assets/plugins/owlcarousel/owl.carousel.min.js"
          type="112f2ee0b97a702ffc27049a-text/javascript"
        />
        <script
          src="assets/js/cursor.js"
          type="112f2ee0b97a702ffc27049a-text/javascript"
        />
        <script
          src="assets/js/script.js"
          type="112f2ee0b97a702ffc27049a-text/javascript"
        />
        <script
          data-cf-settings="112f2ee0b97a702ffc27049a-|49"
          defer
          src="../../cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js"
        />
        <script
          crossOrigin="anonymous"
          data-cf-beacon='{"rayId":"908e4e7a3f504019","version":"2025.1.0","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"token":"3ca157e612a14eccbb30cf6db6691c29","b":1}'
          defer
          integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
          src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        />
      </div>
      ;
    </>
  );
}

export default User_booking;
