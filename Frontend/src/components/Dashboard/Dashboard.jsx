import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="dashboard">
      <div className="container">
        {/* Left Section - Department Boxes */}
        {/* <div className="features">
          {[
            "Computer Science Department",
            "Information Technology Department",
            "Electronics & Communication Department",
            "Electric Engineering Department",  
          ].map((dept, index) => (
            <div key={index} className="feature-box">
              <h3>{dept}</h3>
            </div>
          ))}
        </div> */}
        <div className="features">
          <p>Welcome to,</p>
          <h1>SGSITS Data Center Automation</h1>
          <button>About Us</button>
        </div>

        {/* Right Section - Login Panel */}
        <div className="login">
          {[
            { text: "Student Login", icon: "fa-user", route: "/student-login" },
            { text: "Placement Login", icon: "fa-building-columns", route: "/placement-login" },
            { text: "Eduroam Login", icon: "fa-id-badge", route: "/eduroam-login" },
            { text: "Guest Login", icon: "fa-key", route: "/guest-login" },
            { text: "Feedback Form", icon: "fa-user-edit", route: "/feedback" },
          ].map((item, index) => (
            <button key={index} className="login-btn" onClick={() => handleNavigation(item.route)}>
              <i className={`fa-solid ${item.icon}`}></i> {item.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
