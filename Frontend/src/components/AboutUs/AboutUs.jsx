import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Our Project</h1>
        <p className="about-text">
          Welcome to our innovative project, designed to revolutionize the way users interact
          with technology. Our platform is built with cutting-edge technologies such as React
          for the frontend, Node.js and Express for the backend, and MySQL for robust database
          management. Our mission is to create seamless user experiences with a focus on
          efficiency, scalability, and modern UI/UX practices.
        </p>
        <div className="button-container">
          <button className="about-button">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;