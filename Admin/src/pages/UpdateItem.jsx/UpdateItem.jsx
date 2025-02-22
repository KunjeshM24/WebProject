import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdateItem.css'; // Import CSS for styling

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isFormValid = Object.values(formData).every(
            value => value !== null && value !== undefined && String(value).trim() !== ""
        );

        if (!isFormValid) {
            toast.error("Please fill all fields before updating.");
            return;
        }

        try {
            await axios.post(`${url}/api/${type}/update`, formData);
            toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`);
            navigate('/update');
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
                <button type='submit' className="update-btn">Update</button>
            </form>
        </div>
    );
};

export default UpdateItem;
