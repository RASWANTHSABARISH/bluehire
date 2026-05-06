import React from 'react';
import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link to="/" className="logo">
              <Briefcase size={24} className="logo-icon" />
              HireBlue
            </Link>
            <p>The leading platform for blue-collar hiring in India. Building a bridge between skill and opportunity.</p>
          </div>
          <div>
            <h4 className="footer-title">For Workers</h4>
            <ul className="footer-links">
              <li><Link to="/jobs" className="footer-link">Find Jobs</Link></li>
              <li><a href="#" className="footer-link">Profile Builder</a></li>
              <li><Link to="/verification" className="footer-link">Skill Certification</Link></li>
              <li><a href="#" className="footer-link">Job Alerts</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">For Employers</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Post a Job</a></li>
              <li><a href="#" className="footer-link">Browse Talent</a></li>
              <li><a href="#" className="footer-link">Dashboard</a></li>
              <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
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
  );
}
