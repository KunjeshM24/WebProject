import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sidebar.css';

const departments = ["CS", "IT", "ECE", "MECH", "EE", "EI", "CIVIL"];

const Sidebar = ({ userType }) => {
  const [selectedDept, setSelectedDept] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = async (dept, category) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve JWT token
      if (!token) {
        console.error("No token found, please login.");
        return;
      }
  
      const response = await axios.get(`http://localhost:5000/api/devices/${dept}/${category}`, {
        headers: { Authorization: `Bearer ${token}` }, // Attach token to request
      });
  
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.response?.data || error);
    }
  };
  

  const handleDeptClick = (dept) => {
    setSelectedDept(dept);
    if (userType) {
      fetchData(dept, userType);
    }
  };

  return (
    <div className="cont">
      <div className="sidebar">
        <div className="sidebar-options">
          {departments.map((dept) => (
            <button key={dept} className="sidebar-option" onClick={() => handleDeptClick(dept)}>
              {dept}
            </button>
          ))}
        </div>
      </div>

      <div className="content">
  {selectedDept ? (
    <div>
      <h2 className="dept-title">{selectedDept} Department</h2>
      {data ? (
        <div className="device-grid">
          {data.wifi.length > 0 && (
            <div className="device-section">
              <h3 className="section-title">WiFi Networks</h3>
              <div className="device-list">
                {data.wifi.map((wifi, index) => (
                  <div key={wifi.WiFiId} className="device-card">
                    <span className="device-index">#{index + 1}</span>
                    <div className="device-details">
                      <p><strong>ID:</strong> {wifi.WiFiId}</p>
                      <p><strong>IP Address:</strong> {wifi.IP_Addr}</p>
                      <p><strong>Password:</strong> {wifi.Password}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.switches.length > 0 && (
            <div className="device-section">
              <h3 className="section-title">Switches</h3>
              <div className="device-list">
                {data.switches.map((sw, index) => (
                  <div key={sw.SwitchId} className="device-card">
                    <span className="device-index">#{index + 1}</span>
                    <div className="device-details">
                      <p><strong>ID:</strong> {sw.SwitchId}</p>
                      <p><strong>IP Address:</strong> {sw.Ip_addr}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="loading-text">Fetching data...</p>
      )}
    </div>
  ) : (
    <p className="select-text">Select a department to view device details</p>
  )}
</div>

    </div>
  );
};

export default Sidebar;
