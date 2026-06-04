import React, { useState, useEffect } from 'react';
import { 
  MapPin, Clock, Building2, IndianRupee, 
  Calendar, ShieldCheck, Share2, Bookmark,
  ChevronLeft, ArrowRight, Star, CheckCircle2,
  Briefcase, UserCheck, AlertCircle, Loader2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../context/AuthContext';

export default function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${API_ENDPOINTS.JOBS.BASE}/${id}`);
        const data = await res.json();
        if (data.success) {
          setJob(data.data);
        } else {
          setError(data.message || 'Failed to load job');
        }
      } catch (err) {
        setError('Failed to connect to the server');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      alert("Please login as a worker to apply for jobs.");
      return;
    }
    
    if (user.role === 'employer' || user.role === 'admin') {
      alert("Employers cannot apply to jobs.");
      return;
    }

    setApplying(true);
    setApplyError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_ENDPOINTS.APPLICATIONS.BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ jobId: id })
      });
      const data = await res.json();
      if (data.success) {
        setApplySuccess(true);
        setJob(prev => ({ ...prev, applicantCount: (prev.applicantCount || 0) + 1 }));
      } else {
        setApplyError(data.message || 'Failed to apply');
      }
    } catch (err) {
      setApplyError('Network error. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  const formatSchedule = (days) => {
    if (!days || !days.length) return "Flexible";
    if (days.length === 7) return "Full Week / 7 Days";
    if (days.length === 5 && !days.includes('Sat') && !days.includes('Sun')) return "Mon - Fri (Weekdays)";
    return days.join(', ');
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)' }}>
      <Loader2 className="animate-spin" size={48} color="var(--blue-primary)" />
    </div>
  );

  if (error || !job) return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)' }}>
      <AlertCircle size={48} color="var(--danger)" style={{ marginBottom: '16px' }} />
      <h2>{error || 'Job not found'}</h2>
      <button onClick={() => navigate('/jobs')} className="btn btn-primary" style={{ marginTop: '24px' }}>Back to Jobs</button>
    </div>
  );

  return (
    <div className="job-details-page animate-fade" style={{ background: 'var(--bg-tertiary)', minHeight: '100vh', padding: '32px 0 80px' }}>
      <div className="container">
        
        <button onClick={() => navigate(-1)} className="btn btn-ghost" style={{ marginBottom: '20px', paddingLeft: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-small)' }}>
          <ChevronLeft size={18} /> Back to Search
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', alignItems: 'start' }}>
          
          <div className="job-main">
            <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius-lg)', background: 'white', border: '1px solid var(--border-light)', marginBottom: '32px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '64px', height: '64px', background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 size={32} color="var(--blue-primary)" />
                  </div>
                  <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>{job.title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>
                      {job.employerId?.employerProfile?.businessName || job.employerId?.name || 'Top Employer'}
                      <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-light)', fontWeight: 400 }}>
                        <MapPin size={14} /> {job.location?.city ? `${job.location.city}, ${job.location.state || ''}` : (job.location?.address || 'Location NA')}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary" style={{ padding: '8px', borderRadius: 'var(--radius-md)' }}><Share2 size={18} /></button>
                  <button className="btn btn-secondary" style={{ padding: '8px', borderRadius: 'var(--radius-md)' }}><Bookmark size={18} /></button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                <div className="tag tag-blue" style={{ fontSize: '0.75rem', padding: '4px 10px' }}><Briefcase size={14} /> {job.jobType}</div>
                {job.sectorMeta && job.sectorMeta.experience && <div className="tag tag-blue" style={{ fontSize: '0.75rem', padding: '4px 10px' }}><Clock size={14} /> {job.sectorMeta.experience}</div>}
                
                {job.sectorMeta && job.sectorMeta.verifiedOnly && (
                  <div className="tag" style={{ fontSize: '0.75rem', padding: '4px 10px', background: '#F0FDF4', color: '#166534', border: '1px solid #22C55E' }}>
                    <ShieldCheck size={14} /> Verified Only
                  </div>
                )}
              </div>

              <div className="job-description" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
                <h3 style={{ marginBottom: '12px', fontSize: 'var(--fs-h3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Job Description</h3>
                <p style={{ fontSize: 'var(--fs-body)', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '24px', opacity: 0.9 }}>{job.description}</p>
                
                {job.requirements && job.requirements.length > 0 && (
                  <>
                    <h3 style={{ marginBottom: '12px', fontSize: 'var(--fs-h3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Key Requirements</h3>
                    <ul style={{ paddingLeft: '18px', marginBottom: '24px' }}>
                      {job.requirements.map((req, i) => (
                        <li key={i} style={{ marginBottom: '8px', fontSize: 'var(--fs-body)', lineHeight: '1.6' }}>{req}</li>
                      ))}
                    </ul>
                  </>
                )}

                {job.benefits && job.benefits.length > 0 && (
                  <>
                    <h3 style={{ marginBottom: '12px', fontSize: 'var(--fs-h3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Benefits</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {job.benefits.map((ben, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontSize: '0.85rem', background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: '10px' }}>
                          <CheckCircle2 size={16} color="var(--success)" /> {ben}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="job-sidebar">
            <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', background: 'white', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginBottom: '2px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.5px' }}>Compensation</p>
                <h2 style={{ color: 'var(--success)', fontSize: '1.5rem', fontWeight: 800 }}>
                  ₹{job.salaryMin?.toLocaleString()} - ₹{job.salaryMax?.toLocaleString()}
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 400 }}> / {job.sectorMeta?.salaryFreq ? job.sectorMeta.salaryFreq.replace('ly', '') : 'Month'}</span>
                </h2>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '18px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Calendar size={18} color="var(--blue-primary)" />
                  <div>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-light)', margin: 0, textTransform: 'uppercase', fontWeight: 800 }}>Schedule</p>
                    <p style={{ fontWeight: 700, margin: 0, color: 'var(--blue-deep)', fontSize: '0.85rem' }}>{formatSchedule(job.sectorMeta?.days || [])}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={18} color="var(--blue-primary)" />
                  <div>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-light)', margin: 0, textTransform: 'uppercase', fontWeight: 800 }}>Shift</p>
                    <p style={{ fontWeight: 700, margin: 0, color: 'var(--blue-deep)', fontSize: '0.85rem' }}>{job.shiftTiming}</p>
                  </div>
                </div>
              </div>

              {applyError && <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '12px', textAlign: 'center' }}>{applyError}</p>}
              
              {applySuccess ? (
                <button className="btn btn-success" style={{ width: '100%', padding: '14px', marginBottom: '12px', fontSize: '1rem', fontWeight: 800, background: 'var(--success)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} disabled>
                  <CheckCircle2 size={18} /> Applied Successfully
                </button>
              ) : (
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '14px', marginBottom: '12px', fontSize: '1rem', fontWeight: 800 }}
                  onClick={handleApply}
                  disabled={applying || (user && (user.role === 'employer' || user.role === 'admin'))}
                >
                  {applying ? <Loader2 className="animate-spin" size={18} /> : (
                    <>
                      Apply Now
                      <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </>
                  )}
                </button>
              )}
              
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', margin: 0 }}>
                  <UserCheck size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  {job.applicantCount || 0} Applied
                </p>
              </div>
            </div>

            {job.sectorMeta && job.sectorMeta.verifiedOnly && (
              <div style={{ marginTop: '20px', padding: '18px', background: 'var(--blue-light)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                 <ShieldCheck size={24} color="var(--blue-primary)" style={{ margin: '0 auto 8px' }} />
                 <p style={{ fontSize: '0.8rem', color: 'var(--blue-primary)', fontWeight: 800, margin: 0 }}>
                   Verified Professional Only
                 </p>
                 <p style={{ fontSize: '0.7rem', color: 'var(--blue-primary)', margin: '2px 0 0', opacity: 0.8 }}>
                   Aadhaar verification required.
                 </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
