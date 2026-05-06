import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-alt)' }}>
      <section className="dashboard-section" style={{ padding: '40px 0' }}>
        <div className="container">
          <div className="dashboard-grid">
            <aside className="dashboard-sidebar">
              <div className="sidebar-header">
                <div className="avatar large">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <h3 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>{user?.name || 'User'}</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{user?.email || 'user@example.com'}</p>
              </div>
              <nav className="sidebar-nav">
                <a href="#" className="nav-item active">Overview</a>
                <a href="#" className="nav-item">My Applications</a>
                <a href="#" className="nav-item">Messages</a>
                <a href="#" className="nav-item">Profile Settings</a>
                <a href="#" className="nav-item">Verification</a>
              </nav>
            </aside>

            <main className="dashboard-main">
              <header className="main-header">
                <h2>Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h2>
                <p>Here's what's happening with your profile today.</p>
              </header>

              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-label">Applications</span>
                  <span className="stat-val">12</span>
                  <span className="stat-change positive">+2 this week</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Profile Views</span>
                  <span className="stat-val">450</span>
                  <span className="stat-change positive">+15% vs last month</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Interviews</span>
                  <span className="stat-val">3</span>
                  <span className="stat-change">Upcoming</span>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-dot success"></div>
                    <div className="activity-info">
                      <p>Applied to <strong>Senior Sous Chef</strong> at Elite Gastronomy</p>
                      <span>2 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-dot blue"></div>
                    <div className="activity-info">
                      <p>Your profile was viewed by <strong>LogiTrans India</strong></p>
                      <span>5 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-dot amber"></div>
                    <div className="activity-info">
                      <p>Invitation to interview from <strong>SwiftShip</strong></p>
                      <span>Yesterday</span>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
