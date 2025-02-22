import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="Add" />
          <p>Add Device</p>
        </NavLink>

        <NavLink to='/update' className="sidebar-option">
          <img src={assets.order_icon} alt="Update" />
          <p>Update Device</p>
        </NavLink>

        <NavLink to='/delete' className="sidebar-option">
          <img src={assets.order_icon} alt="Delete" />
          <p>Delete Device</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
