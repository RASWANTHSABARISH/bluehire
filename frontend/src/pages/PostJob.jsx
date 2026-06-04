import React, { useState } from 'react';
import { 
  Building2, MapPin, Briefcase, IndianRupee, 
  ChevronRight, ArrowLeft, CheckCircle2, ShieldCheck, 
  Utensils, Stethoscope, Factory, GraduationCap,
  Sparkles, Clock, Calendar, Star, Loader2, Wand2,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/api';
import LocationSelector from '../components/LocationSelector';

export default function PostJob() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  React.useEffect(() => {
    if (user && user.role !== 'employer' && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  // Data State
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [selectedSector, setSelectedSector] = useState('restaurant');
  const [jobType, setJobType] = useState('full-time');
  const [experience, setExperience] = useState('Entry Level (0-1 Year)');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [salaryFreq, setSalaryFreq] = useState('Monthly');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [description, setDescription] = useState('');
  
  const [experienceMode, setExperienceMode] = useState('preset');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);



  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const sectors = [
    { id: 'restaurant', label: 'Hospitality', icon: <Utensils size={24} /> },
    { id: 'healthcare', label: 'Healthcare', icon: <Stethoscope size={24} /> },
    { id: 'textile', label: 'Textiles', icon: <Factory size={24} /> },
    { id: 'student', label: 'Gigs/Student', icon: <GraduationCap size={24} /> }
  ];

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const handlePublish = async () => {
    setLoading(true);
    setError(null);
    
    const shiftTiming = `${formatTime(startTime)} to ${formatTime(endTime)}`;
    
    const jobData = {
      title,
      description,
      sector: selectedSector,
      jobType,
      shiftTiming,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      location: {
        address: address || `${city}, ${state}`,
        city: city,
      },
      sectorMeta: {
        salaryFreq,
        experience,
        days: selectedDays,
        verifiedOnly
      }
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.JOBS.BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
      });

      const data = await response.json();
      
      if (data.success) {
        setLoading(false);
        setStep(4);
      } else {
        if (data.quotaExceeded) {
          setError('QUOTA_EXCEEDED');
          setLoading(false);
          return;
        }
        throw new Error(data.message || 'Failed to publish');
      }
    } catch (err) {
      setError(err.message || 'Failed to publish job. Please try again.');
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 3) {
      handlePublish();
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(prev => prev + 1);
    }, 600);
  };

  const generateAIDescription = () => {
    if (!keywords) return;
    setGenerating(true);
    
    const templates = [
      `We are looking for a skilled professional with expertise in ${keywords}. Shift timings are ${startTime} - ${endTime}. Pay is provided on a ${salaryFreq} basis.`,
      `Exciting role for an experienced ${selectedSector} professional. Schedule: ${selectedDays.length === 7 ? 'Full Week' : selectedDays.join('/')}, ${startTime} to ${endTime}. Compensation: ${salaryFreq}.`,
      `Seeking ${keywords} expertise for our ${selectedSector} team. Competitive ${salaryFreq} pay.`
    ];

    setTimeout(() => {
      setDescription(templates[Math.floor(Math.random() * templates.length)]);
      setGenerating(false);
    }, 1200);
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <div className="post-job-page animate-fade" style={{ background: 'var(--bg-tertiary)', minHeight: '100vh', paddingTop: '60px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', color: 'var(--blue-deep)', marginBottom: '8px' }}>Post a New Job</h1>
              <p style={{ color: 'var(--text-muted)' }}>Fill in the details to reach India's top specialized talent.</p>
            </div>
            
            <div className="glass" style={{ padding: '12px 24px', borderRadius: 'var(--radius-lg)', background: 'white', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '16px' }}>
               <div style={{ textAlign: 'right' }}>
                 <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: verifiedOnly ? 'var(--blue-primary)' : 'var(--text-light)' }}>Verified Only</p>
                 <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>{verifiedOnly ? 'Limited to Aadhaar-verified' : 'Open to all candidates'}</p>
               </div>
               <label className="switch">
                 <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} />
                 <span className="slider"></span>
               </label>
            </div>
          </div>

          <div className="verif-card" style={{ maxWidth: '100%', padding: '48px' }}>
            <div className="step-indicator" style={{ marginBottom: '60px' }}>
              <div className={`step-dot ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}>1</div>
              <div className={`step-dot ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}>2</div>
              <div className={`step-dot ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'active' : ''}`}>3</div>
              <div className={`step-dot ${step === 4 ? 'completed' : ''}`}><CheckCircle2 size={16} /></div>
            </div>

            {step === 1 && (
              <div className="animate-up">
                <div className="form-group" style={{ marginBottom: '32px' }}>
                  <label>Select Industry Sector</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    {sectors.map(s => (
                      <button key={s.id} onClick={() => setSelectedSector(s.id)} style={{ padding: '24px 12px', borderRadius: 'var(--radius-lg)', border: selectedSector === s.id ? '2px solid var(--blue-primary)' : '1px solid var(--border-light)', background: selectedSector === s.id ? 'var(--blue-light)' : 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                        <div style={{ color: selectedSector === s.id ? 'var(--blue-primary)' : 'var(--text-light)' }}>{s.icon}</div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: selectedSector === s.id ? 'var(--blue-primary)' : 'var(--text-main)' }}>{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                  <div className="form-group">
                    <label>Job Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input-premium" placeholder="e.g. Senior Sous Chef" required />
                  </div>
                  <div className="form-group">
                    <label>Job Nature</label>
                    <select className="form-input-premium" value={jobType} onChange={(e) => setJobType(e.target.value)} style={{ background: 'white' }}>
                      <option value="full-time">Full-time Role</option>
                      <option value="part-time">Part-time Role</option>
                      <option value="single-shift">Single-shift / Gig</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '40px' }}>
                  <label>Specific Address (Optional)</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input-premium" placeholder="e.g. 123 Main St, Colaba" />
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <LocationSelector 
                    countryValue={country}
                    stateValue={state}
                    cityValue={city}
                    onCountryChange={setCountry}
                    onStateChange={setState}
                    onCityChange={setCity}
                  />
                </div>

                <button className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1.1rem' }} onClick={handleNext} disabled={!title || !country || !state || !city}>
                  {loading ? <Loader2 className="animate-spin" /> : 'Continue to Logistics'}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-up">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '40px' }}>
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label>Experience Required</label>
                      <button onClick={() => setExperienceMode(experienceMode === 'preset' ? 'manual' : 'preset')} style={{ fontSize: '0.75rem', color: 'var(--blue-primary)', background: 'none', border: 'none', fontWeight: 800, cursor: 'pointer' }}>
                        {experienceMode === 'preset' ? '+ CUSTOM REQUIREMENT' : 'USE PRESETS'}
                      </button>
                    </div>
                    {experienceMode === 'preset' ? (
                      <select className="form-input-premium" value={experience} onChange={(e) => setExperience(e.target.value)} style={{ background: 'white' }}>
                        <option>Entry Level (0-1 Year)</option>
                        <option>Intermediate (1-3 Years)</option>
                        <option>Experienced (3-5 Years)</option>
                        <option>Senior (5+ Years)</option>
                      </select>
                    ) : (
                      <input type="text" className="form-input-premium" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. Minimum 12 years in industrial loom maintenance" />
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px' }}>
                    <div className="form-group">
                      <label><Clock size={14} style={{ marginRight: '6px' }} /> Shift Timing</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input type="time" className="form-input-premium" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        <span style={{ fontWeight: 700, color: 'var(--text-light)' }}>TO</span>
                        <input type="time" className="form-input-premium" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label><Calendar size={14} style={{ marginRight: '6px' }} /> Working Days</label>
                      <div className="day-picker">
                        {days.map(day => (
                          <button key={day} onClick={() => toggleDay(day)} className={`day-btn ${selectedDays.includes(day) ? 'active' : ''}`}>
                            {day[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Compensation & Pay Frequency</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '16px', alignItems: 'center' }}>
                      <div style={{ position: 'relative' }}>
                        <IndianRupee size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        <input type="number" className="form-input-premium" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} placeholder="Min" style={{ paddingLeft: '40px' }} />
                      </div>
                      <div style={{ position: 'relative' }}>
                        <IndianRupee size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        <input type="number" className="form-input-premium" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} placeholder="Max" style={{ paddingLeft: '40px' }} />
                      </div>
                      <select className="form-input-premium" value={salaryFreq} onChange={(e) => setSalaryFreq(e.target.value)} style={{ background: 'white' }}>
                        <option>Per Day</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Yearly</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button className="btn btn-secondary" style={{ flex: 1, padding: '16px' }} onClick={() => setStep(1)}>Back</button>
                  <button className="btn btn-primary" style={{ flex: 2, padding: '16px' }} onClick={handleNext} disabled={!salaryMin || !salaryMax}>Next: AI Description</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-up">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Description & AI Assistant</h3>
                  <div className="tag tag-blue"><Sparkles size={14} /> AI POWERED</div>
                </div>

                <div className="glass" style={{ background: 'var(--bg-alt)', padding: '24px', borderRadius: 'var(--radius-lg)', marginBottom: '32px', border: '1px solid var(--blue-primary)' }}>
                  <label style={{ color: 'var(--blue-deep)', fontWeight: 800, fontSize: '0.8rem' }}>AI Generator</label>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <input type="text" className="form-input-premium" placeholder="e.g. Continental, Fine Dining, Team Lead" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                    <button className="btn btn-primary" onClick={generateAIDescription} disabled={generating || !keywords} style={{ minWidth: '160px' }}>
                      {generating ? <Loader2 className="animate-spin" size={18} /> : <><Wand2 size={18} /> Generate</>}
                    </button>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '40px' }}>
                  <label>Final Job Description</label>
                  <textarea rows="8" className="form-input-premium" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Review and edit the AI-generated description..." style={{ resize: 'none', lineHeight: '1.6' }}></textarea>
                </div>

                {error === 'QUOTA_EXCEEDED' ? (
                  <div style={{ background: '#FEF2F2', border: '1px solid #EF4444', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', textAlign: 'center' }}>
                    <p style={{ color: '#B91C1C', fontWeight: 800, marginBottom: '8px' }}>Job Posting Quota Exceeded</p>
                    <p style={{ color: '#991B1B', fontSize: '0.9rem', marginBottom: '16px' }}>You have used all job posts in your current plan. Upgrade to post more jobs.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/pricing')} style={{ background: '#DC2626' }}>View Upgrade Plans</button>
                  </div>
                ) : error ? (
                  <p style={{ color: 'var(--danger)', marginBottom: '20px', textAlign: 'center' }}>{error}</p>
                ) : null}

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStep(2)}>Back</button>
                  <button className="btn btn-primary" style={{ flex: 2, padding: '16px' }} onClick={handleNext} disabled={!description}>
                    {loading ? <Loader2 className="animate-spin" /> : 'Publish Listing'}
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-up" style={{ textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto 24px' }}>
                  <CheckCircle2 size={48} />
                </div>
                <h2 style={{ marginBottom: '12px', fontSize: '2rem' }}>Job Published!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>
                  Your listing is now live. Pay cycle: <strong>{salaryFreq}</strong>.
                </p>
                <button className="btn btn-primary" style={{ width: '100%', padding: '18px' }} onClick={() => navigate('/dashboard')}>Manage Postings</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
