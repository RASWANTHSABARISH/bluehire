import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, ArrowRight, ShieldCheck, Clock, Building2, 
  Apple, Play, Quote, ChefHat, Utensils, Users, LayoutGrid, 
  Zap, AlertCircle, BarChart3, Fingerprint 
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const departments = [
    { 
      title: "Back of House", 
      icon: <ChefHat size={32} />, 
      roles: "Chefs, Cooks, Dishwashers",
      count: "4.2k+ open roles",
      color: "#EFF6FF"
    },
    { 
      title: "Front of House", 
      icon: <Utensils size={32} />, 
      roles: "Waiters, Bartenders, Hosts",
      count: "3.8k+ open roles",
      color: "#F0FDF4"
    },
    { 
      title: "Management", 
      icon: <Users size={32} />, 
      roles: "Managers, Captains, HR",
      count: "1.5k+ open roles",
      color: "#FFF7ED"
    },
    { 
      title: "Operations", 
      icon: <LayoutGrid size={32} />, 
      roles: "Cashiers, Delivery, Support",
      count: "2.1k+ open roles",
      color: "#F5F3FF"
    }
  ];

  const insights = [
    {
      icon: <AlertCircle color="var(--danger)" />,
      title: "The Staffing Crisis",
      desc: "75% annual turnover in Indian restaurants causes constant service disruptions."
    },
    {
      icon: <Zap color="var(--warning)" />,
      title: "Speed to Hire",
      desc: "Fill emergency vacancies in under 4 hours with our on-demand talent pool."
    },
    {
      icon: <Fingerprint color="var(--blue-primary)" />,
      title: "Verified Trust",
      desc: "Every professional is Aadhaar-verified and background checked for safety."
    }
  ];

  const featuredJobs = [
    {
      id: 1,
      title: "Senior Sous Chef",
      company: "Taj Mahal Palace",
      location: "Mumbai, MH",
      salary: "₹45,000 - ₹60,000",
      type: "Full-time",
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "Front of House Manager",
      company: "Olive Bar & Kitchen",
      location: "Bangalore, KA",
      salary: "₹35,000 - ₹50,000",
      type: "Full-time",
      posted: "5 hours ago"
    },
    {
      id: 3,
      title: "Part-time Server",
      company: "Social Offline",
      location: "New Delhi, DL",
      salary: "₹15,000 - ₹20,000",
      type: "Part-time",
      posted: "1 day ago"
    }
  ];

  return (
    <div className="home-page animate-fade">
      {/* Search Hero Section */}
      <section className="home-hero" style={{ paddingBottom: '40px' }}>
        <div className="container">
          <h1 className="hero-title-main">Find your next restaurant job.</h1>
          
          <div className="search-container">
            <div className="search-field">
              <label htmlFor="what">What</label>
              <Search size={18} color="var(--text-light)" />
              <input 
                type="text" 
                id="what" 
                placeholder="Job title, keywords, or company" 
              />
            </div>
            <div className="search-field">
              <label htmlFor="where">Where</label>
              <MapPin size={18} color="var(--text-light)" />
              <input 
                type="text" 
                id="where" 
                placeholder="City or state" 
              />
            </div>
            <button className="btn btn-primary" style={{ borderRadius: 'var(--radius-md)', padding: '0 32px', marginLeft: '8px' }}>
              Find Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Role Departments (Replacing Pills) */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>Explore by department</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {departments.map((dept, idx) => (
              <div key={idx} className="card-hover" style={{ padding: '32px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: '64px', height: '64px', background: dept.color, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-deep)', margin: '0 auto 20px' }}>
                  {dept.icon}
                </div>
                <h3 style={{ marginBottom: '8px', fontSize: '1.25rem' }}>{dept.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{dept.roles}</p>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue-primary)' }}>
                  {dept.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ShiftServe Insights (Replacing Popular Cities) */}
      <section className="section-padding" style={{ background: 'var(--blue-deep)', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '24px', lineHeight: '1.2' }}>Revolutionizing restaurant staffing.</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '32px' }}>
                ShiftServe is a niche job marketplace built for a sector with chronic staffing shortages and high turnover.
              </p>
              <button className="btn btn-primary" style={{ background: 'white', color: 'var(--blue-deep)' }}>
                Read our mission
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
                <h2 style={{ color: 'white', marginBottom: '4px' }}>80M+</h2>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>Global Workforce</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header-clean" style={{ marginBottom: '40px' }}>
            <h2 className="section-title">Fresh openings today</h2>
            <p className="section-subtitle">Join top-rated restaurants and hotels across India.</p>
          </div>

          <div className="job-card-list">
            {featuredJobs.map(job => (
              <div key={job.id} className="job-card-premium">
                <div className="job-card-header">
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{job.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                      <Building2 size={16} />
                      {job.company}
                    </div>
                  </div>
                  <div style={{ background: 'var(--blue-light)', color: 'var(--blue-primary)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                    {job.type}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                    <MapPin size={16} /> {job.location}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--success)' }}>
                    {job.salary}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    <Clock size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    {job.posted}
                  </span>
                  <button className="btn btn-ghost" style={{ fontSize: '0.9rem', padding: '6px 12px' }}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leads Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div className="card-hover" style={{ padding: '40px', background: 'var(--blue-light)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.5rem' }}>For Restaurants</h3>
            <p style={{ color: 'var(--text-muted)' }}>Fill your kitchen vacancies within 24 hours. Our verified talent pool ensures high quality and low churn.</p>
            <button className="btn btn-primary" style={{ width: 'fit-content' }} onClick={() => navigate('/employers')}>
              Start Hiring
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="card-hover" style={{ padding: '40px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.5rem' }}>For Workers</h3>
            <p style={{ color: 'var(--text-muted)' }}>Get your Aadhaar-verified skill badge and stand out to top restaurant owners across India.</p>
            <button className="btn btn-secondary" style={{ width: 'fit-content' }} onClick={() => navigate('/jobs')}>
              Create Profile
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>What our community says</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div className="testimonial-card">
              <Quote size={32} color="var(--blue-primary)" style={{ opacity: 0.2, marginBottom: '16px' }} />
              <p className="testimonial-text">"HireBlue helped me find a Sous Chef role in a top Bangalore hotel within 3 days. The verification process made me feel trusted."</p>
              <div className="testimonial-user">
                <div className="user-img"></div>
                <div>
                  <h4 style={{ fontSize: '1rem' }}>Rajesh Kumar</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Sous Chef, ITC Gardenia</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <Quote size={32} color="var(--blue-primary)" style={{ opacity: 0.2, marginBottom: '16px' }} />
              <p className="testimonial-text">"We saved over 40% on recruitment agency fees by using HireBlue. The quality of applicants is much higher than generic portals."</p>
              <div className="testimonial-user">
                <div className="user-img"></div>
                <div>
                  <h4 style={{ fontSize: '1rem' }}>Ananya Rao</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>HR Manager, Olive Group</p>
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
            <h2 style={{ fontSize: '2.5rem' }}>Get the HireBlue app</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Apply to jobs, chat with employers, and manage your shifts on the go.</p>
            
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
