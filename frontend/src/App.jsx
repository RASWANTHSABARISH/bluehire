import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Users, 
  Search, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  TrendingUp, 
  Globe, 
  ArrowRight,
  Menu,
  X,
  ChefHat,
  Truck,
  HardHat,
  Monitor
} from 'lucide-react';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('home'); // 'home' or 'dashboard'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredJobs = [
    {
      id: 1,
      title: "Senior Sous Chef",
      company: "Elite Gastronomy",
      location: "Bangalore, KA",
      type: "Full-time",
      salary: "₹45k - ₹60k",
      icon: <ChefHat size={24} />
    },
    {
      id: 2,
      title: "Warehouse Supervisor",
      company: "LogiTrans India",
      location: "Chennai, TN",
      type: "Contract",
      salary: "₹35k - ₹45k",
      icon: <HardHat size={24} />
    },
    {
      id: 3,
      title: "E-commerce Delivery Lead",
      company: "SwiftShip",
      location: "Mumbai, MH",
      type: "Full-time",
      salary: "₹25k - ₹35k",
      icon: <Truck size={24} />
    }
  ];

  return (
    <div className="app">
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <a href="/" className="logo">
            <Briefcase size={28} className="logo-icon" />
            HireBlue
          </a>
          
          <div className="nav-links desktop-only">
            <a href="#jobs" className="nav-link">Find Jobs</a>
            <a href="#hire" className="nav-link">For Employers</a>
            <a href="#verify" className="nav-link">Verification</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            
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
                    <a 
                      href="#dashboard" 
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveSection('dashboard');
                        setShowProfileMenu(false);
                      }}
                    >
                      <Monitor size={16} /> Dashboard
                    </a>
                    <a href="#settings" className="dropdown-item">
                      <Users size={16} /> Account Settings
                    </a>
                    <button 
                      className="dropdown-item logout" 
                      onClick={() => {
                        setIsLoggedIn(false);
                        setUser(null);
                        setShowProfileMenu(false);
                        setActiveSection('home');
                      }}
                    >
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
          <a href="#jobs" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Find Jobs</a>
          <a href="#hire" className="nav-link" onClick={() => setMobileMenuOpen(false)}>For Employers</a>
          <a href="#verify" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Verification</a>
          <a href="#pricing" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <div className="mobile-actions">
            <button className="btn-secondary" onClick={() => { setShowAuth(true); setMobileMenuOpen(false); }}>Sign In</button>
            <button className="btn-primary">Post a Job</button>
          </div>
        </div>
      </nav>

      {activeSection === 'home' ? (
        <>
          {/* Hero Section */}
          <section className="hero-section">
            <div className="container">
              <div className="hero-content">
                <div className="hero-badge">
                  New: Verify your profile instantly with Aadhaar
                </div>
                <h1 className="hero-title">
                  Find the right talent. <br />
                  <span>Build the perfect team.</span>
                </h1>
                <p className="hero-desc">
                  Join India's most trusted blue-collar workforce network. We connect verified professionals with top companies seamlessly and securely.
                </p>
                
                <div className="hero-actions">
                  <button className="btn-primary">Find a Job</button>
                  <button className="btn-secondary">Hire Talent</button>
                </div>
              </div>
            </div>
          </section>

          {/* User Type Selection */}
          <section className="user-type-section" id="hire">
            <div className="container">
              <div className="section-header">
                <h2>Designed for Both Worlds</h2>
                <p>Whether you're looking for your next big break or the perfect addition to your team, HireBlue provides the tools you need to succeed.</p>
              </div>
              
              <div className="type-grid">
                <div className="type-card card-clean card-hover">
                  <div className="type-icon-box">
                    <Users size={32} />
                  </div>
                  <h3>I'm looking for a Job</h3>
                  <p>Create a professional profile, showcase your skills, and get hired by top companies in your city.</p>
                  <button className="btn-outline" style={{ marginTop: 'auto' }}>Explore Opportunities</button>
                </div>
                
                <div className="type-card card-clean card-hover">
                  <div className="type-icon-box">
                    <Briefcase size={32} />
                  </div>
                  <h3>I'm looking to Hire</h3>
                  <p>Post jobs, filter through verified candidates, and manage your workforce with our powerful employer dashboard.</p>
                  <button className="btn-primary" style={{ marginTop: 'auto' }}>Post a Job Now</button>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Jobs */}
          <section className="featured-section" id="jobs" style={{ background: 'var(--bg-alt)' }}>
            <div className="container">
              <div className="section-header">
                <h2>Trending Opportunities</h2>
                <p>Hand-picked roles from top employers across the country, updated daily.</p>
              </div>
              
              <div className="job-grid">
                {featuredJobs.map(job => (
                  <div key={job.id} className="job-card card-clean card-hover">
                    <div className="job-header">
                      <div className="company-info">
                        <div className="company-logo">
                          {job.icon}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.15rem' }}>{job.title}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: 0 }}>{job.company}</p>
                        </div>
                      </div>
                      <span className="job-tag">{job.type}</span>
                    </div>
                    
                    <div className="job-meta">
                      <div className="job-meta-item">
                        <MapPin size={16} />
                        {job.location}
                      </div>
                      <div className="job-meta-item">
                        <Clock size={16} />
                        Posted 2h ago
                      </div>
                    </div>
                    
                    <div className="job-footer">
                      <span className="salary">{job.salary}</span>
                      <button className="btn-outline" style={{ padding: '0.5rem 1rem' }}>View Details</button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button className="btn-secondary">
                  View All Jobs
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </section>

          {/* Trust & Features */}
          <section className="trust-section" id="verify">
            <div className="container">
              <div className="section-header">
                <h2>Built on Trust</h2>
                <p>We go the extra mile to ensure every connection made on HireBlue is safe, secure, and professional.</p>
              </div>
              
              <div className="type-grid">
                <div className="feature-item card-clean">
                  <div className="feature-icon">
                    <ShieldCheck size={32} />
                  </div>
                  <h3>Identity Verified</h3>
                  <p>Every worker undergoes a multi-step background check and identity verification process.</p>
                </div>
                <div className="feature-item card-clean">
                  <div className="feature-icon">
                    <TrendingUp size={32} />
                  </div>
                  <h3>Skill Badging</h3>
                  <p>Workers can earn badges based on their work history, punctuality, and employer ratings.</p>
                </div>
                <div className="feature-item card-clean">
                  <div className="feature-icon">
                    <Globe size={32} />
                  </div>
                  <h3>Pan-India Network</h3>
                  <p>Access a nationwide pool of talent or find jobs in your local neighborhood with ease.</p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="dashboard-section">
          <div className="container">
            <div className="dashboard-grid">
              <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                  <div className="avatar large">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>{user?.name}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{user?.email}</p>
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
                  <h2>Welcome back, {user?.name.split(' ')[0]}!</h2>
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
      )}

      {/* Auth Modal */}
      {showAuth && (
        <div className="auth-overlay">
          <div className="auth-modal">
            <button className="close-btn" onClick={() => setShowAuth(false)}>
              <X size={24} />
            </button>

            <div className="auth-illustration">
              <div className="illustration-content">
                <Briefcase size={48} className="logo-icon" style={{ marginBottom: '1.5rem', color: '#60A5FA' }} />
                <h2>{authMode === 'signin' ? 'Welcome Back.' : 'Join HireBlue.'}</h2>
                <p>{authMode === 'signin' 
                  ? 'Access your dashboard, manage your profile, and find your next big opportunity.' 
                  : 'Create an account to connect with verified professionals and top employers across India.'}</p>
              </div>
            </div>
            
            <div className="auth-form-container">
              <div className="auth-header">
                <h2>{authMode === 'signin' ? 'Sign In' : 'Create Account'}</h2>
                <p>{authMode === 'signin' ? 'Please enter your details to continue.' : 'Fill out the form below to get started.'}</p>
              </div>

              <button className="google-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.86 16.79 15.69 17.57V20.34H19.26C21.35 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                  <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.69 17.57C14.71 18.23 13.46 18.63 12 18.63C9.17001 18.63 6.78001 16.72 5.92001 14.16H2.23001V17.02C4.03001 20.59 7.71001 23 12 23Z" fill="#34A853"/>
                  <path d="M5.92001 14.16C5.70001 13.5 5.58001 12.77 5.58001 12C5.58001 11.23 5.70001 10.5 5.92001 9.84V6.98H2.23001C1.49001 8.45 1.07001 10.17 1.07001 12C1.07001 13.83 1.49001 15.55 2.23001 17.02L5.92001 14.16Z" fill="#FBBC05"/>
                  <path d="M12 5.38C13.62 5.38 15.06 5.94 16.2 7.02L19.34 3.88C17.45 2.12 14.97 1.07 12 1.07C7.71001 1.07 4.03001 3.41 2.23001 6.98L5.92001 9.84C6.78001 7.28 9.17001 5.38 12 5.38Z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div className="auth-divider">
                <span>or</span>
              </div>

              <form className="auth-form grid-form" onSubmit={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
                setUser({ name: authMode === 'signin' ? 'John Doe' : e.target.name?.value || 'User', email: e.target.email.value });
                setShowAuth(false);
              }}>
                {authMode === 'signup' && (
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="Full name" required />
                  </div>
                )}

                {authMode === 'signup' && (
                  <div className="form-group">
                    <label>I am a</label>
                    <select>
                      <option value="worker">Job Seeker</option>
                      <option value="employer">Employer</option>
                    </select>
                  </div>
                )}
                
                <div className="form-group full-width">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="name@company.com" required />
                </div>
                
                <div className="form-group full-width">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••" required />
                </div>

                <button type="submit" className="btn-primary full-width" style={{ marginTop: '0.5rem', padding: '0.85rem' }}>
                  {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="auth-footer">
                {authMode === 'signin' ? (
                  <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setAuthMode('signup'); }}>Sign Up</a></p>
                ) : (
                  <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setAuthMode('signin'); }}>Sign In</a></p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <a href="/" className="logo">
                <Briefcase size={24} className="logo-icon" />
                HireBlue
              </a>
              <p>The leading platform for blue-collar hiring in India. Building a bridge between skill and opportunity.</p>
            </div>
            <div>
              <h4 className="footer-title">For Workers</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Find Jobs</a></li>
                <li><a href="#" className="footer-link">Profile Builder</a></li>
                <li><a href="#" className="footer-link">Skill Certification</a></li>
                <li><a href="#" className="footer-link">Job Alerts</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">For Employers</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Post a Job</a></li>
                <li><a href="#" className="footer-link">Browse Talent</a></li>
                <li><a href="#" className="footer-link">Dashboard</a></li>
                <li><a href="#" className="footer-link">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Company</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">About Us</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                <li><a href="#" className="footer-link">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2026 HireBlue Inc. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" className="footer-link">Twitter</a>
              <a href="#" className="footer-link">LinkedIn</a>
              <a href="#" className="footer-link">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
