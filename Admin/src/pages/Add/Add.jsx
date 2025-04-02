import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Add.css"; // Updated CSS file

const Add = () => {
  const [formType, setFormType] = useState("WiFi"); // Default: WiFi
  const [formData, setFormData] = useState({
    id: "",
    location: "",
    customLocation: "",
    category: "S", // Default category
    ip_addr: "",
    password: "", // New password field
  });

  // Reset form data when component mounts
  useEffect(() => {
    const formEl = document.getElementById("device-form");
    if (formEl) {
      formEl.reset();
    }
    // Force clear the password field
    setFormData(prev => ({...prev, password: ""}));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidIP = (ip) => ip.split('.').length === 4;

  // Password validation function
  const isValidPassword = (password) => {
    // Check if password is at least 8 characters
    if (password.length < 8) return false;
    
    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) return false;
    
    // Check if password contains at least one number
    if (!/[0-9]/.test(password)) return false;
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = formType === "WiFi" ? "/api/wifi/add" : "/api/switch/add";

    const requestData = {
      ...(formType === "WiFi" ? { WiFiId: formData.id } : { SwitchId: formData.id }),
      IP_Addr: formData.ip_addr,
      Location: formData.customLocation || formData.location,
      Category: formData.category,
    };
    
    // Only add password for WiFi entries
    if (formType === "WiFi") {
      // Validate password
      if (!isValidPassword(formData.password)) {
        toast.error("Password must be at least 8 characters and contain at least one uppercase letter and one number");
        return;
      }
      requestData.Password = formData.password;
    }

    if (!isValidIP(requestData.IP_Addr)) {
      toast.error("Invalid IP Address! It should contain exactly 3 dots.");
      return;
    } 

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, requestData);

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ id: "", location: "", customLocation: "", category: "S", ip_addr: "", password: "" });
        
        // Reset form completely to avoid browser autofill persistence
        const formEl = document.getElementById("device-form");
        if (formEl) {
          formEl.reset();
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error submitting form");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="add-container">
      <div className="form-card">
        <div className="button-group">
          <button className={formType === "WiFi" ? "active" : ""} onClick={() => setFormType("WiFi")}>
            Add WiFi
          </button>
          <button className={formType === "Switch" ? "active" : ""} onClick={() => setFormType("Switch")}>
            Add Switch
          </button>
        </div>

        <form id="device-form" className="form" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label>{formType} ID:</label>
            <input type="number" name="id" value={formData.id} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>IP Address:</label>
            <input type="text" name="ip_addr" value={formData.ip_addr} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>Location:</label>
            <select name="location" value={formData.location} onChange={handleInputChange}>
              <option value="">Select Location</option>
              <option value="IT">IT</option>
              <option value="CS">CS</option>
              <option value="ECE">ECE</option>
              <option value="EI">EI</option>
              <option value="EE">EE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
            <input
              type="text"
              name="customLocation"
              placeholder="Or enter a new location"
              value={formData.customLocation}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select name="category" value={formData.category} onChange={handleInputChange} required>
              <option value="S">S</option>
              <option value="P">P</option>
              <option value="E">E</option>
              <option value="G">G</option>
            </select>
          </div>

          {/* Password field - only show for WiFi */}
          {formType === "WiFi" && (
            <div className="form-group">
              <label>Password:</label>
              <input 
                type="password" 
                name="password"
                autoComplete="new-password"
                value={formData.password} 
                onChange={handleInputChange} 
                required 
              />
              <small className="password-requirements">Min 8 chars, 1 uppercase, 1 number</small>
            </div>
          )}

          <button type="submit" className="submit-btn">ADD</button>
        </form>
      </div>
    </div>
  );
};

export default Add;