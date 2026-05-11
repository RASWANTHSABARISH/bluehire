import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, ExternalLink, Share2, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link to="/" className="logo" style={{ marginBottom: '20px', display: 'inline-block' }}>
              HireBlue
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '300px' }}>
              India's #1 dedicated marketplace for restaurant professionals. We bridge the gap between verified talent and the hospitality industry.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <a href="#" className="footer-link"><Share2 size={20} /></a>
              <a href="#" className="footer-link"><MessageSquare size={20} /></a>
              <a href="#" className="footer-link"><ExternalLink size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="footer-title">For Workers</h4>
            <ul className="footer-links">
              <li><Link to="/jobs" className="footer-link">Find Jobs</Link></li>
              <li><a href="#" className="footer-link">Digital Resume</a></li>
              <li><Link to="/verification" className="footer-link">Verification</Link></li>
              <li><a href="#" className="footer-link">Job Alerts</a></li>
              <li><a href="#" className="footer-link">Career Advice</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-title">For Restaurants</h4>
            <ul className="footer-links">
              <li><Link to="/employers" className="footer-link">Post a Job</Link></li>
              <li><a href="#" className="footer-link">Talent Search</a></li>
              <li><Link to="/pricing" className="footer-link">Pricing Plans</Link></li>
              <li><a href="#" className="footer-link">Success Stories</a></li>
              <li><a href="#" className="footer-link">Hiring Tips</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-title">Contact & Support</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <Phone size={16} /> +91 800 123 4567
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', margin: '8px 0 16px' }}>
                <Mail size={16} /> support@hireblue.in
              </li>
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} HireBlue Inc. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <Globe size={16} />
              <span>India (English)</span>
            </div>
            <a href="#" className="footer-link">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
