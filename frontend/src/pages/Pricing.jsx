import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

export default function Pricing() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentPlan = user?.employerProfile?.subscriptionPlan || 'free';

  const handleSubscribe = async (planName) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'employer') {
      setError('Only employers can subscribe to these plans.');
      return;
    }

    if (planName === currentPlan) return;

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.AUTH.SUBSCRIBE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ plan: planName })
      });

      const data = await response.json();
      if (data.success) {
        // Just reload the page to refresh auth state (or could update context)
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Subscription failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-alt)' }}>
      <section className="featured-section" style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div className="section-header">
            <h2>Transparent Pricing</h2>
            <p>Simple and straightforward pricing for employers. Always free for job seekers.</p>
            {error && <p style={{ color: 'var(--danger)', marginTop: '16px', fontWeight: 'bold' }}>{error}</p>}
          </div>
          
          <div className="pricing-grid" style={{ maxWidth: '1100px', margin: '40px auto 0' }}>
            
            {/* FREE PLAN */}
            <div className="pricing-card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Basic</h3>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--blue-deep)', margin: '16px 0 24px' }}>
                Free
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', textAlign: 'left' }}>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Post 1 Job / Month</li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Basic Candidate Filtering</li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Standard Support</li>
              </ul>
              <button 
                className={`btn ${currentPlan === 'free' ? 'btn-secondary' : 'btn-primary'}`} 
                style={{ width: '100%', marginTop: 'auto', padding: '12px' }}
                onClick={() => handleSubscribe('free')}
                disabled={currentPlan === 'free' || loading}
              >
                {currentPlan === 'free' ? 'Current Plan' : 'Downgrade to Basic'}
              </button>
            </div>
            
            {/* STANDARD PLAN */}
            <div className="pricing-card featured">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Standard</h3>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--blue-deep)', margin: '16px 0 24px' }}>
                ₹499<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', textAlign: 'left' }}>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Post up to 5 Jobs</li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Candidate Direct Messaging</li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Standard Visibility</li>
              </ul>
              <button 
                className={`btn ${currentPlan === 'standard' ? 'btn-secondary' : 'btn-primary'}`} 
                style={{ width: '100%', marginTop: 'auto', padding: '12px' }}
                onClick={() => handleSubscribe('standard')}
                disabled={currentPlan === 'standard' || loading}
              >
                {currentPlan === 'standard' ? 'Current Plan' : 'Upgrade to Standard'}
              </button>
            </div>

            {/* PREMIUM PLAN */}
            <div className="pricing-card" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--blue-deep)', color: 'white', padding: '4px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>Most Popular</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Pro</h3>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--blue-deep)', margin: '16px 0 24px' }}>
                ₹999<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', textAlign: 'left' }}>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Unlimited Job Posts</li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Advanced AI Filtering</li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Verified Badge Highlighting</li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}><Check size={20} color="var(--success)" /> Priority Support</li>
              </ul>
              <button 
                className={`btn ${currentPlan === 'premium' ? 'btn-secondary' : 'btn-primary'}`} 
                style={{ width: '100%', marginTop: 'auto', padding: '12px' }}
                onClick={() => handleSubscribe('premium')}
                disabled={currentPlan === 'premium' || loading}
              >
                {loading && currentPlan === 'premium' ? <Loader2 className="animate-spin" /> : currentPlan === 'premium' ? 'Current Plan' : 'Upgrade to Pro'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
