import React from 'react';
import { X, Briefcase } from 'lucide-react';
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
    navigate('/dashboard');
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={() => setShowAuth(false)}>
          <X size={24} />
        </button>

        <div className="auth-illustration">
          <div className="illustration-content">
            <Briefcase size={48} className="logo-icon" style={{ marginBottom: '1.5rem', color: '#60A5FA' }} />
            <h2>{authMode === 'signin' ? 'Welcome Back.' : 'Join HireBlue.'}</h2>
            <p>{authMode === 'signin' 
              ? 'Access your dashboard, manage your profile, and find your next big opportunity.' 
              : 'Create an account to connect with verified professionals and top employers across India.'}</p>
          </div>
        </div>
        
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>{authMode === 'signin' ? 'Sign In' : 'Create Account'}</h2>
            <p>{authMode === 'signin' ? 'Please enter your details to continue.' : 'Fill out the form below to get started.'}</p>
          </div>

          <button className="google-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.86 16.79 15.69 17.57V20.34H19.26C21.35 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
              <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.69 17.57C14.71 18.23 13.46 18.63 12 18.63C9.17001 18.63 6.78001 16.72 5.92001 14.16H2.23001V17.02C4.03001 20.59 7.71001 23 12 23Z" fill="#34A853"/>
              <path d="M5.92001 14.16C5.70001 13.5 5.58001 12.77 5.58001 12C5.58001 11.23 5.70001 10.5 5.92001 9.84V6.98H2.23001C1.49001 8.45 1.07001 10.17 1.07001 12C1.07001 13.83 1.49001 15.55 2.23001 17.02L5.92001 14.16Z" fill="#FBBC05"/>
              <path d="M12 5.38C13.62 5.38 15.06 5.94 16.2 7.02L19.34 3.88C17.45 2.12 14.97 1.07 12 1.07C7.71001 1.07 4.03001 3.41 2.23001 6.98L5.92001 9.84C6.78001 7.28 9.17001 5.38 12 5.38Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <form className="auth-form grid-form" onSubmit={handleSubmit}>
            {authMode === 'signup' && (
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="Full name" required />
              </div>
            )}

            {authMode === 'signup' && (
              <div className="form-group">
                <label>I am a</label>
                <select name="type">
                  <option value="worker">Job Seeker</option>
                  <option value="employer">Employer</option>
                </select>
              </div>
            )}
            
            <div className="form-group full-width">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="name@company.com" required />
            </div>
            
            <div className="form-group full-width">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>

            <button type="submit" className="btn-primary full-width" style={{ marginTop: '0.5rem', padding: '0.85rem' }}>
              {authMode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            {authMode === 'signin' ? (
              <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setAuthMode('signup'); }}>Sign Up</a></p>
            ) : (
              <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setAuthMode('signin'); }}>Sign In</a></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
