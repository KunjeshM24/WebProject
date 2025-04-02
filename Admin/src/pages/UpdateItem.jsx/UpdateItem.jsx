import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UpdateItem.css"; // Import CSS for styling

const UpdateItem = ({ url }) => {
    const { type, id } = useParams();
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    url = "http://localhost:5000";

    useEffect(() => {
        axios.get(`${url}/api/${type}/get/${id}`)
            .then(response => {
                setFormData(response.data.data || {});
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [id, type, url]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { WiFiId, SwitchId, IP_Addr, Ip_addr, Category, Password } = formData;

        // ID validation (WiFiId or SwitchId)
        const idValue = type === "wifi" ? WiFiId : SwitchId;
        if (!idValue || isNaN(idValue) || idValue < 1 || idValue > 9999) {
            toast.error("ID must be between 1 and 9999.");
            return false;
        }

        // IP Address validation
        const ipValue = type === "wifi" ? IP_Addr : Ip_addr;
        const ipPattern = /^(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])$/;
        if (!ipPattern.test(ipValue)) {
            toast.error("Invalid IP address format.");
            return false;
        }

        // Category validation (S, E, P, G)
        if (!["S", "E", "P", "G"].includes(Category)) {
            toast.error("Category must be S, E, P, or G.");
            return false;
        }

        // Password validation (for WiFi only)
        if (type === "wifi") {
            const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!Password || !passwordPattern.test(Password)) {
                toast.error("Password must be at least 8 characters long, contain 1 uppercase letter and 1 number.");
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const updatedData = { ...formData, originalId: id };

        try {
            await axios.post(`${url}/api/${type}/update`, updatedData);
            toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`);
            navigate("/update");
        } catch (error) {
            toast.error("Failed to update item.");
            console.error("Error updating:", error);
        }
    };

    return (
        <div className="update-container">
            <h2 className="update-title">Update {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <form className="update-form" onSubmit={handleSubmit}>
                {Object.keys(formData).map(key => (
                    <div className="update-form-group" key={key}>
                        <label className="update-label">{key}:</label>
                        <input 
                            className="update-input"
                            name={key} 
                            value={formData[key] || ''} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                ))}
                <button type="submit" className="update-btn">Update</button>
            </form>
        </div>
    );
};

export default UpdateItem;
