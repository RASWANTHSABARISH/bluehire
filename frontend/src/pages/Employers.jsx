import React, { useState } from 'react';
import { 
  Users, Briefcase, ShieldCheck, Zap, BarChart3, 
  ArrowRight, CheckCircle2, Building2, Utensils, 
  Stethoscope, Factory, GraduationCap 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Employers() {
  const navigate = useNavigate();
  const [selectedSector, setSelectedSector] = useState('restaurant');

  const sectorBenefits = {
    restaurant: "Access 100k+ verified chefs, waiters, and managers ready for immediate placement.",
    healthcare: "Connect with certified nurses, lab techs, and hospital support staff with verified credentials.",
    textile: "Find skilled loom operators, mechanics, and weavers for your factory or production unit.",
    student: "Hire energetic students for events, promos, and temporary gig roles."
  };

  const sectors = [
    { id: 'restaurant', label: 'Hospitality', icon: <Utensils size={20} /> },
    { id: 'healthcare', label: 'Healthcare', icon: <Stethoscope size={20} /> },
    { id: 'textile', label: 'Textiles', icon: <Factory size={20} /> },
    { id: 'student', label: 'Gigs/Student', icon: <GraduationCap size={20} /> }
  ];

  return (
    <div className="employers-page animate-fade">
      {/* Hero Section */}
      <section className="employer-hero">
        <div className="container">
          <h1>Hire specialized talent in <span style={{ color: '#60A5FA' }}>24 hours.</span></h1>
          <p>India's first niche-focused marketplace for professional blue-collar and shift-based workers.</p>
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button className="btn btn-primary" style={{ background: 'white', color: 'var(--blue-deep)', padding: '14px 32px' }} onClick={() => navigate('/post-job')}>
              Post a Job Now
            </button>
            <button className="btn btn-outline" style={{ borderColor: 'white', color: 'white', padding: '14px 32px' }}>
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Sector Solutions */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Solutions for every industry</h2>
            <p style={{ color: 'var(--text-muted)' }}>Choose your sector to see how we can help you hire better.</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
            {sectors.map(s => (
              <button 
                key={s.id} 
                onClick={() => setSelectedSector(s.id)}
                className={`btn ${selectedSector === s.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)', padding: '12px 28px', display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>

          <div className="glass" style={{ background: 'var(--bg-tertiary)', padding: '48px', borderRadius: 'var(--radius-lg)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '20px' }}>Expert hiring for {sectors.find(s => s.id === selectedSector).label}</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '32px' }}>
                {sectorBenefits[selectedSector]}
              </p>
              <ul className="pricing-features" style={{ margin: '0 0 32px' }}>
                <li>Aadhaar & Background Verified</li>
                <li>Sector-specific Skill Testing</li>
                <li>Zero-agency placement fees</li>
                <li>24/7 dedicated support</li>
              </ul>
              <button className="btn btn-primary" style={{ width: 'fit-content' }} onClick={() => navigate('/jobs')}>
                View Talent Pool <ArrowRight size={18} />
              </button>
            </div>
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '12px', height: '12px', background: '#10B981', borderRadius: '50%' }}></div>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Live Talent Stats: {sectors.find(s => s.id === selectedSector).label}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                   <span>Total Professionals</span>
                   <span style={{ fontWeight: 700 }}>12,450+</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                   <span>Ready to Interview</span>
                   <span style={{ fontWeight: 700 }}>840+</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                   <span>Avg. Hiring Time</span>
                   <span style={{ fontWeight: 700 }}>18 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why HireBlue */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Why top brands trust ShiftServe</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            <div className="pricing-card" style={{ padding: '32px' }}>
              <ShieldCheck size={48} color="var(--blue-primary)" style={{ margin: '0 auto 20px' }} />
              <h4 style={{ marginBottom: '12px' }}>Safety First</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Every worker undergoes biometric verification and digital background checks before appearing in our pool.</p>
            </div>
            <div className="pricing-card" style={{ padding: '32px' }}>
              <Zap size={48} color="var(--blue-primary)" style={{ margin: '0 auto 20px' }} />
              <h4 style={{ marginBottom: '12px' }}>Lightning Fast</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Post a job and get your first qualified applicant in under 15 minutes. Perfect for emergency staffing.</p>
            </div>
            <div className="pricing-card" style={{ padding: '32px' }}>
              <BarChart3 size={48} color="var(--blue-primary)" style={{ margin: '0 auto 20px' }} />
              <h4 style={{ marginBottom: '12px' }}>Reduced Churn</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Our matching algorithm uses reliability scores to find workers who stay longer and perform better.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Simple, transparent pricing</h2>
            <p style={{ color: 'var(--text-muted)' }}>Choose the plan that fits your business scale.</p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <h3 style={{ fontSize: '1.5rem' }}>Basic</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>For small cafes & clinics</p>
              <div className="price">₹0<span>/mo</span></div>
              <ul className="pricing-features">
                <li>3 active job posts</li>
                <li>Basic applicant tracking</li>
                <li>Standard support</li>
                <li>Community verification</li>
              </ul>
              <button className="btn btn-secondary" onClick={() => navigate('/post-job')}>Get Started</button>
            </div>

            <div className="pricing-card featured">
              <div style={{ background: 'var(--blue-primary)', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)' }}>MOST POPULAR</div>
              <h3 style={{ fontSize: '1.5rem' }}>Growth</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>For growing restaurant groups</p>
              <div className="price">₹4,999<span>/mo</span></div>
              <ul className="pricing-features">
                <li>Unlimited job posts</li>
                <li>Advanced talent filters</li>
                <li>Aadhaar verified badge</li>
                <li>Priority 24/7 support</li>
                <li>Featured job boost</li>
              </ul>
              <button className="btn btn-primary" onClick={() => navigate('/post-job')}>Start Free Trial</button>
            </div>

            <div className="pricing-card">
              <h3 style={{ fontSize: '1.5rem' }}>Enterprise</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>For large hotels & factories</p>
              <div className="price">Custom</div>
              <ul className="pricing-features">
                <li>Multi-location management</li>
                <li>Custom API integrations</li>
                <li>Dedicated account manager</li>
                <li>Bulk hiring discounts</li>
                <li>Advanced reporting</li>
              </ul>
              <button className="btn btn-secondary">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding" style={{ background: 'var(--blue-deep)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '24px' }}>Ready to transform your workforce?</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Join 2,000+ businesses hiring smarter and faster on HireBlue.
          </p>
          <button className="btn btn-primary" style={{ background: 'white', color: 'var(--blue-deep)', padding: '16px 48px', fontSize: '1.1rem' }} onClick={() => navigate('/post-job')}>
            Post your first job for free
          </button>
        </div>
      </section>
    </div>
  );
}
