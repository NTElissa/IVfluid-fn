import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo">💙</span>
        <div>
          <div className="sidebar__title">SmartIV Monitor</div>
          <div className="sidebar__subtitle">Rwanda Network</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        <NavLink to="/dashboard" className="sidebar__link">
          <span className="sidebar__icon">📊</span> Dashboard
        </NavLink>
        <NavLink to="/patients" className="sidebar__link">
          <span className="sidebar__icon">🧑‍⚕️</span> Patients
        </NavLink>
        <NavLink to="/staff" className="sidebar__link">
          <span className="sidebar__icon">👩‍⚕️</span> Staff
        </NavLink>
        <NavLink to="/facilities" className="sidebar__link">
          <span className="sidebar__icon">🏥</span> Facilities
        </NavLink>
        <NavLink to="/alerts" className="sidebar__link">
          <span className="sidebar__icon">⚠️</span> Alerts
        </NavLink>
        <NavLink to="/settings" className="sidebar__link">
          <span className="sidebar__icon">⚙️</span> Settings
        </NavLink>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__status">
          <span className="dot dot--online" /> IoT Connected
        </div>
        <div className="sidebar__user">
          <span className="sidebar__avatar">🩺</span>
          <div>
            <div className="sidebar__user-name">Dr. Jean Baptiste</div>
            <div className="sidebar__user-role">CHUK Hospital</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
