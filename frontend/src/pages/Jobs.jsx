import React from 'react';
import { ChefHat, Truck, HardHat, MapPin, Clock, ChevronRight } from 'lucide-react';

export default function Jobs() {
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
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-alt)' }}>
      <section className="featured-section">
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
    </div>
  );
}
