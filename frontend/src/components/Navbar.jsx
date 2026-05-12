import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, MapPin, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout, setShowAuth, setAuthMode } = useAuth();
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Mumbai, MH');

  const regions = [
    'Mumbai, MH', 'Bangalore, KA', 'New Delhi, DL', 
    'Chennai, TN', 'Hyderabad, TG', 'Pune, MH', 'Kolkata, WB'
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuth(true);
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
            <Link to="/employers" className={`nav-link ${location.pathname === '/employers' ? 'active' : ''}`}>For Businesses</Link>
            <Link to="/verification" className={`nav-link ${location.pathname === '/verification' ? 'active' : ''}`}>Verification</Link>
          </div>
        </div>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Region Selector */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowRegionDropdown(!showRegionDropdown)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-light)', fontSize: '0.85rem', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              <MapPin size={16} />
              <span style={{ fontWeight: 600 }}>{selectedRegion}</span>
              <ChevronDown size={14} />
            </button>
            
            {showRegionDropdown && (
              <div className="glass" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '12px', background: 'white', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', width: '200px', zIndex: 100, padding: '8px' }}>
                {regions.map(r => (
                  <button 
                    key={r}
                    onClick={() => { setSelectedRegion(r); setShowRegionDropdown(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '10px 12px', background: selectedRegion === r ? 'var(--blue-light)' : 'none', border: 'none', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer', color: selectedRegion === r ? 'var(--blue-primary)' : 'var(--text-main)' }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--border-light)' }}></div>

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link to="/dashboard" className="btn btn-ghost" style={{ padding: '8px 12px', color: 'var(--blue-primary)', fontWeight: 700 }}>
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-ghost" style={{ color: 'var(--danger)' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                className="btn btn-ghost" 
                style={{ color: 'var(--blue-primary)', fontWeight: 700 }}
                onClick={() => openAuth('signin')}
              >
                Sign In
              </button>
              <button 
                className="btn btn-primary"
                style={{ borderRadius: 'var(--radius-sm)', padding: '8px 24px', fontWeight: 700 }}
                onClick={() => openAuth('signup')}
              >
                Join Now
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
