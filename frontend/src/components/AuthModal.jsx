import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthModal() {
  const { showAuth, setShowAuth, authMode, setAuthMode, login } = useAuth();
  const navigate = useNavigate();

  if (!showAuth) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = authMode === 'signin' ? 'John Doe' : e.target.name?.value || 'User';
    const email = e.target.email.value;
    login({ name, email });
    setShowAuth(false);
    navigate('/dashboard');
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card animate-up" style={{ maxWidth: '440px' }}>
        <button className="btn btn-ghost auth-close" onClick={() => setShowAuth(false)}>
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '48px', height: '48px', background: 'var(--blue-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-primary)', margin: '0 auto 16px' }}>
            <ShieldCheck size={28} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '8px', color: 'var(--blue-deep)' }}>
            {authMode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {authMode === 'signin' 
              ? 'Enter your details to access your dashboard.' 
              : 'Join the #1 restaurant job marketplace in India.'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {authMode === 'signup' && (
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Full Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="e.g. Rahul Sharma" 
                required 
                style={{ padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.95rem' }}
              />
            </div>
          )}

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="rahul@example.com" 
              required 
              style={{ padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.95rem' }}
            />
          </div>
          
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required 
              style={{ padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.95rem' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            {authMode === 'signin' ? 'Sign In' : 'Get Started'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {authMode === 'signin' ? (
            <p>New to HireBlue? <button onClick={() => setAuthMode('signup')} style={{ background: 'none', border: 'none', color: 'var(--blue-primary)', fontWeight: 600, cursor: 'pointer' }}>Create an account</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setAuthMode('signin')} style={{ background: 'none', border: 'none', color: 'var(--blue-primary)', fontWeight: 600, cursor: 'pointer' }}>Sign in instead</button></p>
          )}
        </div>
      </div>
    </div>
  );
}
