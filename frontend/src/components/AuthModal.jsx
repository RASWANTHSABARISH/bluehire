import React, { useState } from 'react';
import { X, ShieldCheck, Phone, Lock, User, ArrowRight, Briefcase, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthModal() {
  const { showAuth, setShowAuth, authMode, setAuthMode, login, register } = useAuth();
  const [role, setRole] = useState('worker');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (!showAuth) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    let result;
    if (authMode === 'signup') {
      result = await register({
        name: data.name,
        phone: data.phone,
        password: data.password,
        role: role,
        sector: data.sector || 'restaurant'
      });
    } else {
      result = await login({
        phone: data.phone,
        password: data.password
      });
    }

    if (result.success) {
      setShowAuth(false);
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card animate-up">
        {/* Left Side: Branding/Trust (Optimized for scrolling) */}
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
        <div className="auth-form-side" style={{ position: 'relative', overflowY: 'auto', maxHeight: '90vh' }}>
          <button className="btn btn-ghost auth-close" onClick={() => setShowAuth(false)} style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
            <X size={24} />
          </button>

          <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '20px' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--blue-deep)', marginBottom: '8px' }}>
              {authMode === 'signin' ? 'Sign In' : 'Create Account'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {authMode === 'signin' ? 'Access your professional dashboard.' : 'Start your journey with HireBlue today.'}
            </p>
          </div>

          {/* Role Toggle (Signup Only) */}
          {authMode === 'signup' && (
            <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '4px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
              <button 
                type="button"
                onClick={() => setRole('worker')}
                style={{ flex: 1, padding: '10px', borderRadius: 'var(--radius-sm)', border: 'none', background: role === 'worker' ? 'white' : 'transparent', color: role === 'worker' ? 'var(--blue-primary)' : 'var(--text-light)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'var(--transition)', boxShadow: role === 'worker' ? 'var(--shadow-sm)' : 'none' }}
              >
                I'm a Professional
              </button>
              <button 
                type="button"
                onClick={() => setRole('employer')}
                style={{ flex: 1, padding: '10px', borderRadius: 'var(--radius-sm)', border: 'none', background: role === 'employer' ? 'white' : 'transparent', color: role === 'employer' ? 'var(--blue-primary)' : 'var(--text-light)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'var(--transition)', boxShadow: role === 'employer' ? 'var(--shadow-sm)' : 'none' }}
              >
                I want to Hire
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {authMode === 'signup' && (
              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '0.85rem' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input type="text" name="name" placeholder="Rahul Sharma" required style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem' }} />
                </div>
              </div>
            )}

            <div className="form-group">
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '0.85rem' }}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input type="tel" name="phone" placeholder="+91 98765 43210" required style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem' }} />
              </div>
            </div>

            {/* Sector Selection (Signup Only) */}
            {authMode === 'signup' && (
              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '0.85rem' }}>
                  {role === 'worker' ? 'Primary Industry' : 'Business Category'}
                </label>
                <div style={{ position: 'relative' }}>
                  {role === 'worker' ? <Briefcase size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} /> : <Building2 size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />}
                  <select name="sector" required style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', background: 'white', appearance: 'none' }}>
                    <option value="restaurant">Hospitality / Restaurants</option>
                    <option value="healthcare">Healthcare / Medical</option>
                    <option value="textile">Textile / Manufacturing</option>
                    <option value="student">Student Gigs / Events</option>
                  </select>
                </div>
              </div>
            )}

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontWeight: 700, fontSize: '0.85rem' }}>Password</label>
                {authMode === 'signin' && <button type="button" style={{ fontSize: '0.8rem', color: 'var(--blue-primary)', background: 'none', border: 'none', fontWeight: 600 }}>Forgot?</button>}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input type="password" name="password" placeholder="••••••••" required style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem' }} />
              </div>
            </div>

            {error && (
              <div style={{ padding: '12px', background: 'var(--danger-light)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', fontWeight: 700, marginTop: '10px' }}>
              {authMode === 'signin' ? 'Sign In' : 'Join Now & Start Exploring'}
            </button>
          </form>

          <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
             <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
             <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Social Access</span>
             <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
             <button className="btn btn-secondary" style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                Google
             </button>
             <button className="btn btn-secondary" style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
             </button>
          </div>

          <div style={{ marginTop: '32px', paddingBottom: '20px', textAlign: 'center', fontSize: '0.85rem' }}>
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
