import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const data = [
    { name: "Documents", value: 400, color: "#FF6384" },
    { name: "Telly", value: 300, color: "#36A2EB" },
    { name: "Divas", value: 300, color: "#FFCE56" },
    { name: "Syntheta", value: 200, color: "#4BC0C0" },
    { name: "HRMS", value: 250, color: "#9966FF" },
    { name: "Donor Count", value: 150, color: "#FFA726" },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Asteya</div>
        <nav>
          <ul>
            <li>Documents</li>
            <li>Telly</li>
            <li>Divas</li>
            <li>Syntheta</li>
            <li>HRMS</li>
            <li>Donor Count</li>
            <li onClick={handleLogout} className="logout">Logout</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">
        <div className="header">Organization Dashboard</div>

        {/* Pie Chart */}
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
