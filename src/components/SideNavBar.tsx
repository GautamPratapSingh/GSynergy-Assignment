import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideNavBar.css';

const SideNavBar: React.FC = () => {
  return (
    <nav className="side-nav">
      <ul>
        <li>
          <NavLink 
            to="/stores" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <i className="fas fa-store"></i> Store
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/skus" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <i className="fas fa-box"></i> SKU
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/planning" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <i className="fas fa-calendar-alt"></i> Planning
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/chart" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <i className="fas fa-chart-bar"></i> Charts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavBar;