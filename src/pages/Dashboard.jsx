import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTicketStats, getSession } from '../utils/helpers';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, open: 0, in_progress: 0, closed: 0 });
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const session = getSession();
    setUser(session);
    const ticketStats = getTicketStats();
    setStats(ticketStats);
  }, []);
  
  return (
    <div className="app-container">
      <Header isAuth={true} />
      
      <main className="dashboard-content">
        <h1>Welcome to Your Dashboard{user ? `, ${user.name}` : ''}</h1>
        
        <section className="stat-cards-grid">
          <div className="stat-card" data-testid="total-tickets-card">
            <div className="stat-icon"><i className="fa-solid fa-list-check"></i></div>
            <div className="stat-value" data-testid="total-tickets-value">{stats.total}</div>
            <div className="stat-label">Total Tickets</div>
          </div>
          
          <div className="stat-card status-open" data-testid="open-tickets-card">
            <div className="stat-icon"><i className="fa-solid fa-unlock"></i></div>
            <div className="stat-value" data-testid="open-tickets-value">{stats.open}</div>
            <div className="stat-label">Open Tickets</div>
          </div>
          
          <div className="stat-card status-progress" data-testid="in-progress-tickets-card">
            <div className="stat-icon"><i className="fa-solid fa-spinner"></i></div>
            <div className="stat-value" data-testid="in-progress-tickets-value">{stats.in_progress}</div>
            <div className="stat-label">In Progress</div>
          </div>
          
          <div className="stat-card status-closed" data-testid="resolved-tickets-card">
            <div className="stat-icon"><i className="fa-solid fa-check-double"></i></div>
            <div className="stat-value" data-testid="resolved-tickets-value">{stats.closed}</div>
            <div className="stat-label">Resolved Tickets</div>
          </div>
        </section>
        
        <section className="action-section">
          <h2>Quick Actions</h2>
          <div className="action-box card-box">
            <p>Ready to jump into the details? View, create, and manage all support requests.</p>
            <Link to="/tickets" className="btn btn-manage" data-testid="manage-tickets-button">
              <i className="fa-solid fa-gear"></i> Go to Ticket Management
            </Link>
          </div>
          
          <div className="decorative-circle top-right"></div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
