import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./Utilities/Logo1.png";
import "./SignUpOrganization.css";

const SignUpOrganization = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    gstNumber: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false); // You should use this
  const navigate = useNavigate(); // You should use this

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
        setVerified(true); // Now using `verified`
        alert("OTP verified successfully! Please log in.");
        navigate("/"); // Redirect to login after successful OTP verification
      } else {
        alert("Invalid OTP, please try again.");
      }
    } catch (error) {
      alert("Error verifying OTP");
    }
  };

  return (
    <div className="signup-organization-container">
      <div className="signup-organization-logo">
        <img src={logo} alt="Asteya Logo" style={{ width: "100%", height: "auto", maxWidth: "80px" }} />
      </div> 

      <div className="signup-organization-box">
        <h2 className="signup-organization-title">Sign Up As Organization</h2>
        <input type="text" name="organizationName" placeholder="Organization Name" value={formData.organizationName} onChange={handleChange} className="signup-organization-input" />
        <input type="text" name="contactPerson" placeholder="Contact Person" value={formData.contactPerson} onChange={handleChange} className="signup-organization-input" />
        <input type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleChange} className="signup-organization-input" />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="signup-organization-input" />
        <input type="text" name="gstNumber" placeholder="Company GST No (Optional)" value={formData.gstNumber} onChange={handleChange} className="signup-organization-input" />

        {!otpSent ? (
          <button onClick={sendOtp} className="signup-organization-btn">Send OTP</button>
        ) : (
          <div>
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="signup-organization-input" />
            <button onClick={verifyOtp} className="signup-organization-btn">Verify OTP</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpOrganization;
