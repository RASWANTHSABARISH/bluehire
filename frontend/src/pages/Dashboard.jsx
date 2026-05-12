import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, LayoutDashboard, Briefcase, MessageSquare, 
  Settings, UserCheck, Clock, ArrowRight, AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-page animate-fade" style={{ background: 'var(--bg-tertiary)', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container">
        <div className="jobs-layout">
          {/* Dashboard Sidebar */}
          <aside className="filters-sidebar">
            <div style={{ textAlign: 'center', paddingBottom: '24px', borderBottom: '1px solid var(--border-light)', marginBottom: '24px' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--blue-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-primary)', margin: '0 auto 16px', fontSize: '2rem', fontWeight: 800 }}>
                {user?.name?.charAt(0) || 'U'}
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{user?.name || 'User'}</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                {user?.isVerified ? (
                  <span style={{ fontSize: '0.75rem', background: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={12} /> Verified
                  </span>
                ) : (
                  <span style={{ fontSize: '0.75rem', background: '#FEF3C7', color: '#92400E', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    Unverified
                  </span>
                )}
              </div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button className="btn btn-primary" style={{ justifyContent: 'flex-start', background: 'var(--blue-light)', color: 'var(--blue-primary)', border: 'none' }}>
                <LayoutDashboard size={18} /> Overview
              </button>
              <button className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
                <Briefcase size={18} /> My Applications
              </button>
              <button className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
                <MessageSquare size={18} /> Messages
              </button>
              <button className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
                <Settings size={18} /> Settings
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--blue-deep)' }}>Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h2>
                <p style={{ color: 'var(--text-muted)' }}>Manage your professional profile and applications.</p>
              </div>
              {!user?.isVerified && (
                <Link to="/verification" className="btn btn-primary">
                  Start Verification
                </Link>
              )}
            </div>

            {/* Verification Status Banner */}
            {!user?.isVerified && (
              <div className="glass" style={{ background: '#FFFBEB', border: '1px solid #FEF3C7', padding: '24px', borderRadius: 'var(--radius-lg)', marginBottom: '32px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', background: '#FEF3C7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
                  <AlertCircle size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#92400E', marginBottom: '4px' }}>Profile Verification Required</h4>
                  <p style={{ fontSize: '0.9rem', color: '#B45309' }}>Verified profiles are 3x more likely to get hired by top brands. Complete your Aadhaar check now.</p>
                </div>
                <Link to="/verification" className="btn btn-secondary" style={{ borderColor: '#D97706', color: '#92400E' }}>
                  Complete Now
                </Link>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
              <div className="job-card-premium" style={{ padding: '24px' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '8px' }}>Applications</p>
                <h3 style={{ fontSize: '2rem' }}>12</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700, marginTop: '8px' }}>+2 this week</p>
              </div>
              <div className="job-card-premium" style={{ padding: '24px' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '8px' }}>Profile Views</p>
                <h3 style={{ fontSize: '2rem' }}>450</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--blue-primary)', fontWeight: 700, marginTop: '8px' }}>+15% monthly</p>
              </div>
              <div className="job-card-premium" style={{ padding: '24px' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '8px' }}>Interviews</p>
                <h3 style={{ fontSize: '2rem' }}>03</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>Upcoming</p>
              </div>
            </div>

            <div className="job-card-premium" style={{ padding: '32px' }}>
              <h3 style={{ marginBottom: '24px' }}>Recent Activity</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { text: 'Applied to Senior Sous Chef at Taj Mahal Palace', time: '2 hours ago', icon: <Briefcase size={16} /> },
                  { text: 'Profile viewed by Apollo Hospitals', time: '5 hours ago', icon: <UserCheck size={16} /> },
                  { text: 'New job alert matching your textile skills', time: 'Yesterday', icon: <Clock size={16} /> }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-primary)' }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.95rem', margin: 0 }}>{item.text}</p>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-ghost" style={{ marginTop: '24px', width: '100%', borderTop: '1px solid var(--border-light)', paddingTop: '16px', borderRadius: 0 }}>
                View all activity <ArrowRight size={16} />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
