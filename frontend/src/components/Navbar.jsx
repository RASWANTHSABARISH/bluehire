import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, LayoutDashboard, Globe } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, user, logout, setShowAuth, setAuthMode } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar glass-nav">
      <div className="container nav-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <Link to="/" className="logo">
            HireBlue
          </Link>
          
          <div className="nav-links">
            <Link to="/jobs" className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`}>Find Jobs</Link>
            <Link to="/employers" className={`nav-link ${location.pathname === '/employers' ? 'active' : ''}`}>For Employers</Link>
            <Link to="/verification" className={`nav-link ${location.pathname === '/verification' ? 'active' : ''}`}>Verification</Link>
          </div>
        </div>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-light)', fontSize: '0.85rem', cursor: 'pointer' }}>
            <Globe size={16} />
            <span>English (India)</span>
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--border-light)' }}></div>

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link to="/dashboard" className="btn btn-ghost" style={{ padding: '8px 12px' }}>
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-ghost" style={{ color: 'var(--danger)' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <button 
                className="btn btn-ghost" 
                style={{ color: 'var(--blue-primary)', fontWeight: 700 }}
                onClick={() => { setAuthMode('signin'); setShowAuth(true); }}
              >
                Sign In
              </button>
              <button 
                className="btn btn-primary"
                style={{ borderRadius: 'var(--radius-sm)' }}
                onClick={() => { setAuthMode('signup'); setShowAuth(true); }}
              >
                Post a Job
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
