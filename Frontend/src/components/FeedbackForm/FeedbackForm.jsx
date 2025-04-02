import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedbackType: '',
        message: ''
    });
    
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', feedbackType: '', message: '' });
        }, 3000);
    };

    return (
        <div className="feedback-container">
            <div className="feedback-wrapper">
                <h1 className="main-title">Feedback Form</h1>
                
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">We value your feedback!</h2>
                        <p className="card-subtitle">Please share your thoughts to help us improve.</p>
                    </div>
                    
                    {isSubmitted ? (
                        <div className="success-message">
                            <div className="checkmark-circle">
                                <div className="checkmark draw"></div>
                            </div>
                            <h3>Thank you!</h3>
                            <p>Your feedback has been submitted successfully.</p>
                        </div>
                    ) : (
                        <form className="feedback-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    placeholder="Your name"
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    placeholder="Your email address"
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="feedbackType">Feedback Type</label>
                                <select 
                                    id="feedbackType" 
                                    name="feedbackType" 
                                    value={formData.feedbackType} 
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="bug">Bug Report</option>
                                    <option value="feature">Feature Request</option>
                                    <option value="general">General Feedback</option>
                                    <option value="suggestion">Suggestion</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    placeholder="Please provide details about your feedback..."
                                    required
                                ></textarea>
                            </div>

                            <button className="submit-button" type="submit">
                                Submit Feedback
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackForm;