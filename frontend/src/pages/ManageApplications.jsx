import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Users, UserCheck, XCircle, 
  Calendar, Clock, Star, MapPin, 
  ChevronRight, Search, Filter, ShieldCheck,
  Phone, MessageSquare, ArrowLeft, Loader2
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/api';

export default function ManageApplications() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingApps, setLoadingApps] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Fetch Employer's Jobs
  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.JOBS.MINE, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setJobs(data.data);
          if (data.data.length > 0) setSelectedJob(data.data[0]);
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, [token]);

  // Fetch Applicants for Selected Job
  useEffect(() => {
    if (!selectedJob) return;
    
    const fetchApplicants = async () => {
      setLoadingApps(true);
      try {
        const res = await fetch(API_ENDPOINTS.JOBS.APPLICANTS(selectedJob._id), {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setApplicants(data.data);
        }
      } catch (err) {
        console.error('Error fetching applicants:', err);
      } finally {
        setLoadingApps(false);
      }
    };
    fetchApplicants();
  }, [selectedJob, token]);

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      const res = await fetch(API_ENDPOINTS.APPLICATIONS.STATUS(appId), {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        // Update local state
        setApplicants(prev => prev.map(app => app._id === appId ? { ...app, status: newStatus } : app));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="animate-spin" size={48} color="var(--blue-primary)" />
    </div>
  );

  return (
    <div className="manage-apps-page" style={{ background: 'var(--bg-tertiary)', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button onClick={() => navigate('/dashboard')} className="btn btn-ghost" style={{ padding: '8px' }}>
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 style={{ fontSize: '2rem', color: 'var(--blue-deep)' }}>Hiring Dashboard</h1>
            <p style={{ color: 'var(--text-muted)' }}>Review and manage applications for your active listings.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '32px', height: 'calc(100vh - 250px)' }}>
          
          {/* LEFT: Jobs List */}
          <div className="glass" style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '24px', overflowY: 'auto', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Your Postings</h3>
              <span className="tag" style={{ background: 'var(--blue-light)', color: 'var(--blue-primary)', fontWeight: 800 }}>{jobs.length}</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {jobs.map(job => (
                <button 
                  key={job._id}
                  onClick={() => setSelectedJob(job)}
                  style={{ 
                    width: '100%', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid',
                    borderColor: selectedJob?._id === job._id ? 'var(--blue-primary)' : 'var(--border-light)',
                    background: selectedJob?._id === job._id ? 'var(--blue-light)' : 'transparent',
                    textAlign: 'left', transition: 'var(--transition)', cursor: 'pointer'
                  }}
                >
                  <h4 style={{ margin: '0 0 4px 0', color: selectedJob?._id === job._id ? 'var(--blue-primary)' : 'var(--text-main)' }}>{job.title}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{job.location?.city || 'Local'}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-light)' }}>{job.applicantCount || 0} Applicants</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Applicants View */}
          <div className="applicants-container" style={{ overflowY: 'auto' }}>
            {!selectedJob ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)' }}>
                <Users size={64} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p>Select a job posting to view applicants</p>
              </div>
            ) : (
              <div className="animate-fade">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '1.5rem' }}>Applicants for <span style={{ color: 'var(--blue-primary)' }}>{selectedJob.title}</span></h2>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                      <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                      <input type="text" placeholder="Search name..." style={{ padding: '10px 12px 10px 40px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.9rem' }} />
                    </div>
                    <button className="btn btn-secondary"><Filter size={18} /> Filter</button>
                  </div>
                </div>

                {loadingApps ? (
                  <div style={{ textAlign: 'center', padding: '100px' }}>
                    <Loader2 className="animate-spin" size={32} color="var(--blue-primary)" />
                  </div>
                ) : applicants.length === 0 ? (
                  <div className="glass" style={{ padding: '60px', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
                    <Users size={48} style={{ marginBottom: '16px', color: 'var(--text-light)' }} />
                    <h3>No applications yet</h3>
                    <p style={{ color: 'var(--text-muted)' }}>We are promoting your job to matching professionals.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {applicants.map(app => (
                      <div key={app._id} className="job-card-premium animate-up" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '24px', alignItems: 'center' }}>
                        {/* Avatar */}
                        <div style={{ width: '64px', height: '64px', background: 'var(--bg-secondary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-primary)', fontSize: '1.5rem', fontWeight: 800 }}>
                          {app.workerId?.name?.charAt(0) || 'W'}
                        </div>

                        {/* Info */}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{app.workerId?.name || 'Worker'}</h3>
                            {app.workerId?.isVerified && <ShieldCheck size={18} color="var(--success)" title="Aadhaar Verified" />}
                          </div>
                          <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14} fill="#F59E0B" color="#F59E0B" /> {app.workerId?.rating || 0}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={14} /> {app.workerId?.workerProfile?.experienceYears || 0} Years Exp.</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {app.workerId?.city || 'Unknown'}</span>
                          </div>
                          <div style={{ marginTop: '12px' }}>
                             <span className={`tag status-${app.status}`} style={{ textTransform: 'capitalize' }}>{app.status}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                          {app.status === 'pending' && (
                            <>
                              <button onClick={() => handleStatusUpdate(app._id, 'shortlisted')} className="btn btn-secondary" style={{ color: 'var(--blue-primary)', borderColor: 'var(--blue-primary)' }}>Shortlist</button>
                              <button onClick={() => handleStatusUpdate(app._id, 'rejected')} className="btn btn-ghost" style={{ color: 'var(--danger)' }}><XCircle size={20} /></button>
                            </>
                          )}
                          {app.status === 'shortlisted' && (
                            <>
                              <button onClick={() => handleStatusUpdate(app._id, 'interview_set')} className="btn btn-primary">Set Interview</button>
                              <button className="btn btn-secondary"><MessageSquare size={18} /> Chat</button>
                            </>
                          )}
                          {app.status === 'interview_set' && (
                            <button onClick={() => handleStatusUpdate(app._id, 'hired')} className="btn btn-success" style={{ background: 'var(--success)', color: 'white', border: 'none' }}>Confirm Hire</button>
                          )}
                          {app.status === 'hired' && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontWeight: 800 }}>
                              <UserCheck size={20} /> Hired Successfully
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
