import React from 'react';
import { Users, Briefcase } from 'lucide-react';

export default function Employers() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <section className="user-type-section">
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
    </div>
  );
}
