import React from 'react';
import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-alt)' }}>
      <section className="featured-section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-header">
            <h2>Transparent Pricing</h2>
            <p>Simple and straightforward pricing for employers. Always free for job seekers.</p>
          </div>
          
          <div className="type-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="type-card card-clean card-hover">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Basic</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                Free
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', textAlign: 'left' }}>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Post 1 Job / Month</li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Basic Candidate Filtering</li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Standard Support</li>
              </ul>
              <button className="btn-outline" style={{ width: '100%' }}>Get Started</button>
            </div>
            
            <div className="type-card card-clean card-hover" style={{ border: '2px solid var(--accent)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: 'white', padding: '0.25rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>Most Popular</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pro</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                ₹999<span style={{ fontSize: '1rem', color: 'var(--text-dim)', fontWeight: 'normal' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', textAlign: 'left' }}>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Unlimited Job Posts</li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Advanced AI Filtering</li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Verified Badge Highlighting</li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Priority Support</li>
              </ul>
              <button className="btn-primary" style={{ width: '100%' }}>Upgrade to Pro</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
