import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./Utilities/Logo1.png"; 

const Login = () => {
  const [userType, setUserType] = useState("donor"); // "donor" or "organization"
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Retrieve stored email & password from localStorage
    const storedEmail = userType === "donor" ? localStorage.getItem("donorEmail") : localStorage.getItem("organizationEmail");
    const storedPassword = userType === "donor" ? localStorage.getItem("donorPassword") : localStorage.getItem("organizationPassword");

    if (formData.email === storedEmail && formData.password === storedPassword) {
      localStorage.setItem("isAuthenticated", "true"); // Store login status
      localStorage.setItem("userType", userType);
      alert("Login Successful!");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Asteya Logo" />
      </div>

      {/* Login Box */}
      <div className="login-box">
        {/* Tabs for Donor & Organization */}
        <div className="login-header">
          <span className={userType === "donor" ? "active" : ""} onClick={() => setUserType("donor")}>Donor</span>
          <span className={userType === "organization" ? "active" : ""} onClick={() => setUserType("organization")}>Organization</span>
        </div>

        <h2>Sign In As {userType === "donor" ? "Donor" : "Organization"}</h2>
        <form className="login-form" onSubmit={handleSubmit}>
  <div className="input-group">
    <input
      type="text"
      name="email"
      placeholder="Registered Email Id"
      value={formData.email}
      onChange={handleChange}
      required
    />
  </div>

  <div className="input-group">
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      required
    />
  </div>

  {error && <p className="error-message">{error}</p>}

  <button type="submit" className="login-btn">Sign In</button>
</form>


        <p className="signup-link">
          Create new account?{" "}
          <span onClick={() => navigate(userType === "donor" ? "/signup" : "/signup-organization")} style={{ color: "#6a11cb", cursor: "pointer", fontWeight: "bold" }}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
