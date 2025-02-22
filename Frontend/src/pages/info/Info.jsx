import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';

function Info({ user }) {
  console.log("Info.jsx - Received user:", user);

  return (
    <div>
      <Navbar />
      <div className="app-content">
        <Sidebar userType={user?.category} />
      </div>
      <Footer />
    </div>
  );
}

export default Info;
