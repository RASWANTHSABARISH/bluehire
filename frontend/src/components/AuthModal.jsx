import React from 'react';
import { X, ShieldCheck, Mail, Lock, User, ArrowRight } from 'lucide-react';
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
      <div className="auth-card animate-up">
        {/* Left Side: Branding/Trust */}
        <div className="auth-left-hide" style={{ background: 'var(--blue-deep)', color: 'white', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '24px' }}>Welcome to HireBlue.</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: '1.6', marginBottom: '40px' }}>
            Join India's most trusted network of specialized professionals across Hospitality, Healthcare, and Textiles.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '12px' }}><ShieldCheck size={24} /></div>
                <span>Aadhaar Verified Profiles</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '12px' }}><ArrowRight size={24} /></div>
                <span>Direct Access to Top Brands</span>
             </div>
          </div>
        </div>

        {/* Right Side: Form (Scrollable) */}
        <div className="auth-form-side" style={{ position: 'relative' }}>
          <button className="btn btn-ghost auth-close" onClick={() => setShowAuth(false)} style={{ top: '20px', right: '20px' }}>
            <X size={24} />
          </button>

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--blue-deep)', marginBottom: '8px' }}>
              {authMode === 'signin' ? 'Sign In' : 'Create Account'}
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              {authMode === 'signin' ? 'Access your professional dashboard.' : 'Start your journey with HireBlue today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* THIS IS THE CRITICAL PART: Only show Name for Sign Up (Join Now) */}
            {authMode === 'signup' && (
              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '0.85rem' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input type="text" name="name" placeholder="Rahul Sharma" required style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)' }} />
                </div>
              </div>
            )}

            <div className="form-group">
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '0.85rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input type="email" name="email" placeholder="rahul@example.com" required style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)' }} />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontWeight: 700, fontSize: '0.85rem' }}>Password</label>
                {authMode === 'signin' && <button type="button" style={{ fontSize: '0.8rem', color: 'var(--blue-primary)', background: 'none', border: 'none', fontWeight: 600 }}>Forgot?</button>}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input type="password" placeholder="••••••••" required style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)' }} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', fontWeight: 700 }}>
              {authMode === 'signin' ? 'Sign In' : 'Join Now & Start Exploring'}
            </button>
          </form>

          <div style={{ margin: '32px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
             <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
             <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>or continue with</span>
             <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
             <button className="btn btn-secondary" style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                Google
             </button>
             <button className="btn btn-secondary" style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
             </button>
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.9rem' }}>
            {authMode === 'signin' ? (
              <p>New to HireBlue? <button onClick={() => setAuthMode('signup')} style={{ background: 'none', border: 'none', color: 'var(--blue-primary)', fontWeight: 700, cursor: 'pointer' }}>Create an account</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => setAuthMode('signin')} style={{ background: 'none', border: 'none', color: 'var(--blue-primary)', fontWeight: 700, cursor: 'pointer' }}>Sign in instead</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
