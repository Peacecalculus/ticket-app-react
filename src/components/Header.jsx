import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../utils/helpers';

const Header = ({ isAuth = false }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (isAuth) {
    return (
      <header className="app-header">
        <div className="logo">TicketApp</div>
        <nav className="main-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/tickets">Manage Tickets</Link>
          <button onClick={handleLogout} className="btn btn-logout" data-testid="logout-button">
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </nav>
      </header>
    );
  }
  
  return (
    <header className="header_wrapper">
      <div className="logo_section">
        <div className="logo">TicketApp</div>
        <nav className="nav-links">
          <Link to="/auth" className="nav-btn--push-right">Login</Link>
          <Link to="/auth" className="nav_btn">Get Started</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
