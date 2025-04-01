import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./Utilities/Logo1.png";
import "./SignUpDonor.css";

const SignUpDonor = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    gstNumber: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate(); // Now we will use it

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:5000/send-otp", { email: formData.email });
      setOtpSent(true);
      alert("OTP sent successfully!");
    } catch (error) {
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/verify-otp", { email: formData.email, otp });
      if (res.data.success) {
        setVerified(true);
        alert("OTP verified successfully! Please log in.");
        navigate("/"); // Redirecting after OTP verification
      } else {
        alert("Invalid OTP, please try again.");
      }
    } catch (error) {
      alert("Error verifying OTP");
    }
  };

  return (
    <div className="signup-donor-container">
      <div className="signup-donor-logo">
        <img src={logo} alt="Asteya Logo" style={{ width: "100%", height: "auto", maxWidth: "80px" }} />
      </div> 

      <div className="signup-donor-box">
        <h2 className="signup-donor-title">Sign Up As Donor</h2>
        <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="signup-donor-input" />
        <input type="text" name="contactPerson" placeholder="Contact Person" value={formData.contactPerson} onChange={handleChange} className="signup-donor-input" />
        <input type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleChange} className="signup-donor-input" />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="signup-donor-input" />
        <input type="text" name="gstNumber" placeholder="Company GST No (Optional)" value={formData.gstNumber} onChange={handleChange} className="signup-donor-input" />

        {!otpSent ? (
          <button onClick={sendOtp} className="signup-donor-btn">Send OTP</button>
        ) : (
          <div>
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="signup-donor-input" />
            <button onClick={verifyOtp} className="signup-donor-btn">Verify OTP</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpDonor;
