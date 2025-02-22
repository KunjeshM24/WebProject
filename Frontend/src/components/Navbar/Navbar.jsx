import React from "react";
import "./Navbar.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../../assets/Sgsits_logo.png'

function Navbar() {
    return (
        <div className="navbar">
            {/* Left Section: Logo & Text */}
            <div className="logo">
                <img src={logo} alt="Logo" />
                <div>
                    <div className="logo-text">Shri G. S. Institute Of Tech. & Science, Indore</div>
                    <div className="address">23 Sir M. Visvesvaraya Marg, Indore, Madhya Pradesh 452003</div>
                </div>
            </div>

            {/* Right Section: Help & Support */}
            <div className="help-support">
                <div className="support-heading">
                  <strong>HELP & SUPPORT</strong>
                </div>
                <div className="support-item">
                    <i className="fa-solid fa-phone"></i> Call: <a href="tel:8989011204">8989011204</a>
                </div>
                <div className="support-item">
                    <i className="fa-solid fa-envelope"></i> Email: <a href="mailto:sgsitsindore01@gmail.com">sgsitsindore01@gmail.com</a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
