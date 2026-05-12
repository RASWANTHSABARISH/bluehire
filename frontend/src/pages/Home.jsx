import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, ArrowRight, ShieldCheck, Clock, Building2, 
  Apple, Play, Quote, ChefHat, Utensils, Users, LayoutGrid, 
  Zap, AlertCircle, Fingerprint, Stethoscope, Factory, GraduationCap, ChevronRight 
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [selectedSector, setSelectedSector] = useState('restaurant');

  // Sector-specific department data
  const sectorData = {
    restaurant: {
      tagline: "The Future of Restaurant Hiring",
      title: "Find your next restaurant job.",
      departments: [
        { title: "Back of House", icon: <ChefHat size={32} />, roles: "Chefs, Cooks, Dishwashers", count: "4.2k+", color: "#EFF6FF" },
        { title: "Front of House", icon: <Utensils size={32} />, roles: "Waiters, Bartenders, Hosts", count: "3.8k+", color: "#F0FDF4" },
        { title: "Management", icon: <Users size={32} />, roles: "Managers, Captains, HR", count: "1.5k+", color: "#FFF7ED" },
        { title: "Operations", icon: <LayoutGrid size={32} />, roles: "Cashiers, Delivery, Support", count: "2.1k+", color: "#F5F3FF" }
      ]
    },
    healthcare: {
      tagline: "Specialized Healthcare Staffing",
      title: "Reliable healthcare work, faster.",
      departments: [
        { title: "Nursing Staff", icon: <Stethoscope size={32} />, roles: "Staff Nurse, ANM/GNM", count: "1.2k+", color: "#EFF6FF" },
        { title: "Technical", icon: <Zap size={32} />, roles: "Lab Tech, OT Assistant", count: "800+", color: "#F0FDF4" },
        { title: "Support Staff", icon: <Users size={32} />, roles: "Ward Boys, Ayahs, Helpers", count: "2.5k+", color: "#FFF7ED" },
        { title: "Administration", icon: <LayoutGrid size={32} />, roles: "Reception, Billing, PR", count: "600+", color: "#F5F3FF" }
      ]
    },
    textile: {
      tagline: "Textile & Machinery Network",
      title: "Connect with the weaving industry.",
      departments: [
        { title: "Power Loom", icon: <Factory size={32} />, roles: "Operators, Loom Fixers", count: "3.1k+", color: "#EFF6FF" },
        { title: "Hand Loom", icon: <LayoutGrid size={32} />, roles: "Weavers, Designers", count: "1.2k+", color: "#F0FDF4" },
        { title: "Maintenance", icon: <Zap size={32} />, roles: "Mechanics, Electricians", count: "900+", color: "#FFF7ED" },
        { title: "QC & Packing", icon: <ShieldCheck size={32} />, roles: "Checkers, Packers", count: "1.8k+", color: "#F5F3FF" }
      ]
    },
    student: {
      tagline: "Student Part-time Marketplace",
      title: "Earn while you learn.",
      departments: [
        { title: "Events & Promos", icon: <Zap size={32} />, roles: "Promoters, Ushers, Hosts", count: "2.8k+", color: "#EFF6FF" },
        { title: "Data & Admin", icon: <LayoutGrid size={32} />, roles: "Data Entry, Call Center", count: "1.5k+", color: "#F0FDF4" },
        { title: "Gig Delivery", icon: <Users size={32} />, roles: "Campus Delivery, Logistics", count: "4.5k+", color: "#FFF7ED" },
        { title: "Tutoring", icon: <GraduationCap size={32} />, roles: "Home Tutors, Assistants", count: "900+", color: "#F5F3FF" }
      ]
    }
  };

  const sectors = [
    { id: 'restaurant', label: 'Restaurant', icon: <Utensils size={20} /> },
    { id: 'healthcare', label: 'Healthcare', icon: <Stethoscope size={20} /> },
    { id: 'textile', label: 'Textiles', icon: <Factory size={20} /> },
    { id: 'student', label: 'Student Work', icon: <GraduationCap size={20} /> }
  ];

  const insights = [
    { icon: <AlertCircle color="var(--danger)" />, title: "The Staffing Crisis", desc: "High turnover across specialized sectors causes constant business disruptions." },
    { icon: <Zap color="var(--warning)" />, title: "Speed to Hire", desc: "Fill emergency vacancies in under 4 hours with our on-demand talent pool." },
    { icon: <Fingerprint color="var(--blue-primary)" />, title: "Verified Trust", desc: "Every professional is Aadhaar-verified and background checked for safety." }
  ];

  return (
    <div className="home-page animate-fade">
      {/* Search Hero Section */}
      <section className="home-hero" style={{ paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
             <div className="tag tag-blue" style={{ marginBottom: '16px' }}>{sectorData[selectedSector].tagline}</div>
             <h1 className="hero-title-main" style={{ marginBottom: '0' }}>{sectorData[selectedSector].title}</h1>
             <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '12px' }}>Find professional shift work in your specialized sector.</p>
          </div>
          
          <div className="search-container">
            <div className="search-field">
              <label htmlFor="what">What</label>
              <Search size={18} color="var(--text-light)" />
              <input type="text" id="what" placeholder="Job title or keywords" />
            </div>
            <div className="search-field">
              <label htmlFor="where">Where</label>
              <MapPin size={18} color="var(--text-light)" />
              <input type="text" id="where" placeholder="City or state" />
            </div>
            <button className="btn btn-primary" style={{ borderRadius: 'var(--radius-md)', padding: '0 32px', marginLeft: '8px' }}>
              Find Jobs
            </button>
          </div>

          {/* Sector Selector Tabs */}
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {sectors.map(s => (
              <button 
                key={s.id} 
                onClick={() => setSelectedSector(s.id)}
                className={`btn ${selectedSector === s.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Role Departments */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: '8px' }}>Explore {sectors.find(s => s.id === selectedSector).label} roles</h2>
              <p style={{ color: 'var(--text-muted)' }}>Top categories with active hiring today.</p>
            </div>
            <button className="btn btn-ghost" style={{ color: 'var(--blue-primary)', fontWeight: 700 }}>
              View all roles <ChevronRight size={18} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {sectorData[selectedSector].departments.map((dept, idx) => (
              <div key={idx} className="card-hover" style={{ padding: '32px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: '64px', height: '64px', background: dept.color, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-deep)', margin: '0 auto 20px' }}>
                  {dept.icon}
                </div>
                <h3 style={{ marginBottom: '8px', fontSize: '1.25rem' }}>{dept.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{dept.roles}</p>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue-primary)' }}>
                   {dept.count} Active Jobs
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ShiftServe Insights */}
      <section className="section-padding" style={{ background: 'var(--blue-deep)', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '24px', lineHeight: '1.2' }}>One platform. <br/>All your staffing needs.</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '32px' }}>
                ShiftServe connects verified professionals across India's most critical sectors—from food service and healthcare to the textile loom network.
              </p>
              <button className="btn btn-primary" style={{ background: 'white', color: 'var(--blue-deep)' }} onClick={() => navigate('/employers')}>
                Learn about our sectors
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {insights.map((insight, idx) => (
                <div key={idx} className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ marginBottom: '16px' }}>{insight.icon}</div>
                  <h4 style={{ color: 'white', marginBottom: '8px' }}>{insight.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>{insight.desc}</p>
                </div>
              ))}
              <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', background: 'var(--blue-primary)', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                <h2 style={{ color: 'white', marginBottom: '4px' }}>4 Sectors</h2>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>Specialized Networks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Placeholder Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header-clean" style={{ marginBottom: '40px' }}>
            <h2 className="section-title">Fresh {sectors.find(s => s.id === selectedSector).label} openings</h2>
            <p className="section-subtitle">Join top-rated institutions and brands across the country.</p>
          </div>

          <div className="job-card-list">
             {/* Note: In a real app, this would filter by selectedSector */}
             <div className="job-card-premium">
                <div className="job-card-header">
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Professional {sectors.find(s => s.id === selectedSector).label} Role</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                      <Building2 size={16} />
                      Premium Institute
                    </div>
                  </div>
                  <div style={{ background: 'var(--blue-light)', color: 'var(--blue-primary)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                    Full-time
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', marginTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                    <MapPin size={16} /> Chennai, TN
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--success)' }}>
                    ₹35,000 - ₹50,000
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    <Clock size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    Posted Just Now
                  </span>
                  <button className="btn btn-ghost" style={{ fontSize: '0.9rem', padding: '6px 12px' }} onClick={() => navigate('/jobs/1')}>
                    View Details
                  </button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Leads Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div className="card-hover" style={{ padding: '40px', background: 'var(--blue-light)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.5rem' }}>For Organizations</h3>
            <p style={{ color: 'var(--text-muted)' }}>Fill your critical vacancies within 24 hours. Our sector-specific talent pools ensure high quality and professional standards.</p>
            <button className="btn btn-primary" style={{ width: 'fit-content' }} onClick={() => navigate('/employers')}>
              Start Hiring
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="card-hover" style={{ padding: '40px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.5rem' }}>For Professionals</h3>
            <p style={{ color: 'var(--text-muted)' }}>Build your digital CV for your specific industry, get verified, and stand out to top employers.</p>
            <button className="btn btn-secondary" style={{ width: 'fit-content' }} onClick={() => navigate('/jobs')}>
              Create Profile
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>Trusted across all sectors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div className="testimonial-card">
              <Quote size={32} color="var(--blue-primary)" style={{ opacity: 0.2, marginBottom: '16px' }} />
              <p className="testimonial-text">"HireBlue helped me find a Nursing role in a top Bangalore hospital within 3 days. The verification process made me feel trusted."</p>
              <div className="testimonial-user">
                <div className="user-img"></div>
                <div>
                  <h4 style={{ fontSize: '1rem' }}>Dr. Priya Singh</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Hospital Admin</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <Quote size={32} color="var(--blue-primary)" style={{ opacity: 0.2, marginBottom: '16px' }} />
              <p className="testimonial-text">"The loom mechanic we found on HireBlue was highly skilled and verified. It's rare to find such specialized textile talent online."</p>
              <div className="testimonial-user">
                <div className="user-img"></div>
                <div>
                  <h4 style={{ fontSize: '1rem' }}>Karthik V.</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Textile Unit Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Promo */}
      <section className="container" style={{ marginBottom: '80px' }}>
        <div className="app-promo">
          <div style={{ padding: '0 60px', maxWidth: '600px' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Your sector, your app.</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Apply to jobs, chat with employers, and manage your shifts across 4 specialized industries. Available for free.</p>
            
            <div className="app-buttons">
              <button className="app-btn">
                <Apple size={24} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Download on the</div>
                  <div style={{ fontWeight: 700 }}>App Store</div>
                </div>
              </button>
              <button className="app-btn">
                <Play size={24} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>GET IT ON</div>
                  <div style={{ fontWeight: 700 }}>Google Play</div>
                </div>
              </button>
            </div>
          </div>
          <div style={{ position: 'absolute', right: '-100px', top: '50%', transform: 'translateY(-50%)', width: '400px', height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        </div>
      </section>
    </div>
  );
}
