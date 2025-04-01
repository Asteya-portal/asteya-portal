import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import SignUpDonor from "./Components/SignUpDonor";
import SignUpOrganization from "./Components/SignUpOrganization";
import Dashboard from "./Components/Dashboard";
import PrivateRoute from "./Components/PrivateRoute"; // Import PrivateRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUpDonor />} />
        <Route path="/signup-organization" element={<SignUpOrganization />} />
        
        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
