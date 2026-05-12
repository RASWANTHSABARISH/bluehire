import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, Fingerprint, Smartphone, FileText, 
  CheckCircle2, Upload, AlertCircle, ArrowRight, 
  Loader2, Star, Zap, TrendingUp, Award 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Verification() {
  const { user, updateUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // If not logged in, redirect
  if (!isLoggedIn) {
    return (
      <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <AlertCircle size={48} color="var(--danger)" style={{ margin: '0 auto 24px' }} />
        <h2>Sign in to start verification</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>You must be logged in to verify your identity and documents.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  // ALREADY VERIFIED VIEW
  if (user?.isVerified) {
    return (
      <div className="verification-page animate-fade" style={{ background: 'var(--bg-tertiary)', minHeight: '100vh', paddingTop: '60px', paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="verif-card" style={{ textAlign: 'center', maxWidth: '100%' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto 24px' }}>
                <ShieldCheck size={48} />
              </div>
              <h1 style={{ fontSize: '2.25rem', color: 'var(--blue-deep)', marginBottom: '12px' }}>You are Verified!</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '40px' }}>
                Your identity and professional credentials have been successfully authenticated by HireBlue.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', textAlign: 'left', background: 'var(--blue-light)', border: '1px solid var(--blue-primary)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Award size={20} color="var(--blue-primary)" />
                      <span style={{ fontWeight: 700, color: 'var(--blue-deep)' }}>Trust Badge Active</span>
                   </div>
                   <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>The verified shield is now visible on your profile and applications.</p>
                </div>
                <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', textAlign: 'left', background: '#F0FDF4', border: '1px solid #22C55E' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <TrendingUp size={20} color="#22C55E" />
                      <span style={{ fontWeight: 700, color: '#166534' }}>3x Visibility</span>
                   </div>
                   <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Verified professionals appear first in employer searches and recommendations.</p>
                </div>
              </div>

              <div style={{ textAlign: 'left', background: 'white', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '32px', marginBottom: '40px' }}>
                <h3 style={{ marginBottom: '24px' }}>Your Verified Benefits</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                   <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-primary)' }}>
                        <Star size={20} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, margin: '0 0 4px' }}>Premium Job Access</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Apply to 5-star hospitality and top-tier healthcare roles exclusive to verified users.</p>
                      </div>
                   </div>
                   <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-primary)' }}>
                        <Zap size={20} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, margin: '0 0 4px' }}>Priority Interviews</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Skip the long queues. Your applications are fast-tracked for direct employer review.</p>
                      </div>
                   </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn btn-primary" style={{ flex: 1, padding: '16px' }} onClick={() => navigate('/jobs')}>
                  Explore Premium Jobs
                  <ArrowRight size={18} />
                </button>
                <button className="btn btn-secondary" style={{ flex: 1, padding: '16px' }}>
                  Update Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // WIZARD VIEW (If not verified)
  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(prev => prev + 1);
    }, 1200);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleFinalSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      updateUser({ 
        verificationStatus: 'verified',
        isVerified: true 
      });
      setLoading(false);
      setStep(4);
    }, 2000);
  };

  return (
    <div className="verification-page animate-fade" style={{ background: 'var(--bg-tertiary)', minHeight: '100vh', paddingTop: '60px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.25rem', color: 'var(--blue-deep)' }}>Professional Verification</h1>
          <p style={{ color: 'var(--text-muted)' }}>Get your Aadhaar-verified badge to unlock premium jobs.</p>
        </div>

        <div className="verif-card">
          <div className="step-indicator">
            <div className={`step-dot ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}>1</div>
            <div className={`step-dot ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}>2</div>
            <div className={`step-dot ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'active' : ''}`}>3</div>
            <div className={`step-dot ${step === 4 ? 'completed' : ''}`}>
              <CheckCircle2 size={16} />
            </div>
          </div>

          {step === 1 && (
            <div className="animate-up">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Fingerprint size={24} color="var(--blue-primary)" />
                <h3 style={{ margin: 0 }}>Identity Verification</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '32px' }}>
                Enter your 12-digit Aadhaar number. We will send a secure OTP to the mobile number linked with your Aadhaar.
              </p>
              
              <div className="form-group" style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Aadhaar Number</label>
                <input 
                  type="text" 
                  placeholder="0000 0000 0000" 
                  value={aadhaar}
                  onChange={(e) => setAadhaar(e.target.value)}
                  maxLength={12}
                  style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '1.1rem', letterSpacing: '4px' }}
                />
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '16px' }} 
                onClick={handleNext}
                disabled={aadhaar.length < 12 || loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Send OTP'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-up">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Smartphone size={24} color="var(--blue-primary)" />
                <h3 style={{ margin: 0 }}>Enter OTP</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '32px' }}>
                A 6-digit code has been sent to your Aadhaar-linked mobile number ending in **89.
              </p>

              <div className="otp-grid">
                {otp.map((digit, i) => (
                  <input 
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    className="otp-input"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    maxLength={1}
                  />
                ))}
              </div>

              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Didn't receive code? <button style={{ background: 'none', border: 'none', color: 'var(--blue-primary)', fontWeight: 700, cursor: 'pointer' }}>Resend in 0:45</button>
                </p>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '16px' }} 
                onClick={handleNext}
                disabled={otp.some(d => !d) || loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Verify & Continue'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-up">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <FileText size={24} color="var(--blue-primary)" />
                <h3 style={{ margin: 0 }}>Skill Documentation</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '32px' }}>
                Upload your professional certificates or training documents to qualify for specialized roles.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Identity Document (Aadhaar Front/Back)</label>
                  <div className="upload-box">
                    <Upload size={32} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Click to upload or drag and drop</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>JPG, PNG or PDF (Max 5MB)</p>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Professional Certificate (Optional)</label>
                  <div className="upload-box">
                    <Upload size={32} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Upload Food Safety, Nursing, or Technical license</p>
                  </div>
                </div>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '16px' }} 
                onClick={handleFinalSubmit}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Submit for Verification'}
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="animate-up" style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto 24px' }}>
                <CheckCircle2 size={48} />
              </div>
              <h2 style={{ marginBottom: '12px' }}>Identity Verified Successfully!</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                Congratulations, {user?.name}! Your Aadhaar identity has been verified. Our team is now reviewing your professional documents.
              </p>
              <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }} onClick={() => navigate('/dashboard')}>
                Go to Dashboard
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
