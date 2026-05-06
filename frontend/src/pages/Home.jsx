import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: '80px' }}>
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
              <button className="btn-primary" onClick={() => navigate('/jobs')}>Find a Job</button>
              <button className="btn-secondary" onClick={() => navigate('/employers')}>Hire Talent</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
