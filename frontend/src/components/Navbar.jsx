import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Users, Monitor, X, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, user, logout, setShowAuth, setAuthMode } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <Link to="/" className="logo">
            <Briefcase size={28} className="logo-icon" />
            HireBlue
          </Link>
          
          <div className="nav-links desktop-only">
            <Link to="/jobs" className="nav-link">Find Jobs</Link>
            <Link to="/employers" className="nav-link">For Employers</Link>
            <Link to="/verification" className="nav-link">Verification</Link>
            <Link to="/pricing" className="nav-link">Pricing</Link>
            
            {isLoggedIn ? (
              <div className="profile-container">
                <button 
                  className="profile-trigger"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <div className="avatar">
                    <Users size={16} />
                  </div>
                  <span className="user-name">{user?.name || 'User'}</span>
                </button>

                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <div className="dropdown-header">
                      <strong>{user?.name}</strong>
                      <span>{user?.email}</span>
                    </div>
                    <Link 
                      to="/dashboard" 
                      className="dropdown-item"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Monitor size={16} /> Dashboard
                    </Link>
                    <Link to="/settings" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                      <Users size={16} /> Account Settings
                    </Link>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <X size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button 
                  className="btn-secondary" 
                  onClick={() => { setShowAuth(true); setAuthMode('signin'); }}
                >
                  Sign In
                </button>
                <button className="btn-primary">Post a Job</button>
              </>
            )}
          </div>

          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/jobs" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Find Jobs</Link>
          <Link to="/employers" className="nav-link" onClick={() => setMobileMenuOpen(false)}>For Employers</Link>
          <Link to="/verification" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Verification</Link>
          <Link to="/pricing" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <div className="mobile-actions">
            <button className="btn-secondary" onClick={() => { setShowAuth(true); setAuthMode('signin'); setMobileMenuOpen(false); }}>Sign In</button>
            <button className="btn-primary">Post a Job</button>
          </div>
        </div>
      </nav>
    </>
  );
}
