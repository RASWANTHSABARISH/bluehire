import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/api';
import { 
  ShieldCheck, LayoutDashboard, Briefcase, MessageSquare, 
  Settings, UserCheck, Clock, ArrowRight, AlertCircle,
  PlusCircle, Users, ClipboardList, Calendar, Loader2,
  Phone, MapPin, User, Save
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LocationSelector from '../components/LocationSelector';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const isEmployer = user?.role === 'employer';
  const [stats, setStats] = useState({ jobs: 0, applicants: 0, applications: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [myApplications, setMyApplications] = useState([]);
  
  // Settings State
  const [settingsForm, setSettingsForm] = useState({ 
    name: user?.name || '', 
    phone: user?.phone || '', 
    country: 'India', 
    city: user?.city || '', 
    state: user?.state || '' 
  });
  
  // Messages State
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      
      try {
        if (isEmployer) {
          const res = await fetch(API_ENDPOINTS.JOBS.MINE, { headers });
          const data = await res.json();
          if (data.success) {
            const totalApplicants = data.data.reduce((sum, job) => sum + (job.applicantCount || 0), 0);
            setStats(prev => ({ ...prev, jobs: data.count || 0, applicants: totalApplicants }));
          }
          const actRes = await fetch(API_ENDPOINTS.APPLICATIONS.EMPLOYER_RECENT, { headers });
          const actData = await actRes.json();
          if (actData.success) {
            setRecentActivity(actData.data);
          }
        } else {
          const res = await fetch(API_ENDPOINTS.APPLICATIONS.MINE, { headers });
          const data = await res.json();
          if (data.success) {
            setStats(prev => ({ ...prev, applications: data.count || 0 }));
            setRecentActivity(data.data.slice(0, 3));
            setMyApplications(data.data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, [user, isEmployer]);

  useEffect(() => {
    if (activeTab === 'messages' && user) {
      const fetchConversations = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(API_ENDPOINTS.MESSAGES.CONVERSATIONS, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) setConversations(data.data);
        } catch (err) { console.error(err); }
      };
      fetchConversations();
    }
  }, [activeTab, user]);

  useEffect(() => {
    if (activeConversation && user) {
      const fetchMessages = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(API_ENDPOINTS.MESSAGES.GET_MESSAGES(activeConversation), {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) setMessages(data.data);
        } catch (err) { console.error(err); }
      };
      fetchMessages();
      
      // Simple polling for new messages every 5 seconds
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [activeConversation, user]);

  const handleSettingsChange = (e) => {
    setSettingsForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_ENDPOINTS.AUTH.UPDATE_PROFILE, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(settingsForm)
      });
      const data = await res.json();
      if (data.success) {
        alert('Profile updated successfully!');
        window.location.reload(); // Reload to refresh user context
      }
    } catch (err) { console.error(err); }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !activeConversation) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_ENDPOINTS.MESSAGES.SEND, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ receiverId: activeConversation, content: messageText })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, data.data]);
        setMessageText('');
      }
    } catch (err) { console.error(err); }
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="animate-spin" size={48} color="var(--blue-primary)" />
    </div>
  );

  return (
    <div className="dashboard-page animate-fade" style={{ background: 'var(--bg-tertiary)', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container">
        <div className="jobs-layout">
          {/* Dashboard Sidebar */}
          <aside className="filters-sidebar">
            <div style={{ textAlign: 'center', paddingBottom: '24px', borderBottom: '1px solid var(--border-light)', marginBottom: '24px' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--blue-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-primary)', margin: '0 auto 16px', fontSize: '2rem', fontWeight: 800 }}>
                {user?.name?.charAt(0) || 'U'}
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{user?.name || 'User'}</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                {user?.isVerified ? (
                  <span style={{ fontSize: '0.75rem', background: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={12} /> {isEmployer ? 'Business Verified' : 'Verified Pro'}
                  </span>
                ) : (
                  <span style={{ fontSize: '0.75rem', background: '#FEF3C7', color: '#92400E', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    Unverified
                  </span>
                )}
                {isEmployer && (
                  <span style={{ fontSize: '0.75rem', background: 'var(--blue-light)', color: 'var(--blue-primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, border: '1px solid var(--blue-primary)' }}>
                    {user?.employerProfile?.subscriptionPlan ? user.employerProfile.subscriptionPlan.charAt(0).toUpperCase() + user.employerProfile.subscriptionPlan.slice(1) : 'Basic'} Plan
                  </span>
                )}
              </div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                onClick={() => setActiveTab('overview')}
                className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-ghost'}`} 
                style={activeTab === 'overview' ? { justifyContent: 'flex-start', background: 'var(--blue-light)', color: 'var(--blue-primary)', border: 'none' } : { justifyContent: 'flex-start' }}
              >
                <LayoutDashboard size={18} /> Overview
              </button>
              
              {isEmployer ? (
                <>
                  <button onClick={() => navigate('/manage-applications')} className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
                    <ClipboardList size={18} /> Manage Applications
                  </button>
                  <button onClick={() => navigate('/post-job')} className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
                    <PlusCircle size={18} /> Post a New Job
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setActiveTab('applications')}
                  className={`btn ${activeTab === 'applications' ? 'btn-primary' : 'btn-ghost'}`} 
                  style={activeTab === 'applications' ? { justifyContent: 'flex-start', background: 'var(--blue-light)', color: 'var(--blue-primary)', border: 'none' } : { justifyContent: 'flex-start' }}
                >
                  <Briefcase size={18} /> My Applications
                </button>
              )}
              
              <button 
                onClick={() => setActiveTab('messages')}
                className={`btn ${activeTab === 'messages' ? 'btn-primary' : 'btn-ghost'}`} 
                style={activeTab === 'messages' ? { justifyContent: 'flex-start', background: 'var(--blue-light)', color: 'var(--blue-primary)', border: 'none' } : { justifyContent: 'flex-start' }}
              >
                <MessageSquare size={18} /> Messages
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`btn ${activeTab === 'settings' ? 'btn-primary' : 'btn-ghost'}`} 
                style={activeTab === 'settings' ? { justifyContent: 'flex-start', background: 'var(--blue-light)', color: 'var(--blue-primary)', border: 'none' } : { justifyContent: 'flex-start' }}
              >
                <Settings size={18} /> Settings
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main>
            {activeTab === 'overview' && (
              <div className="animate-fade">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.75rem', color: 'var(--blue-deep)' }}>Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h2>
                    <p style={{ color: 'var(--text-muted)' }}>
                      {isEmployer ? 'Manage your active listings and hire specialized talent.' : 'Manage your professional profile and applications.'}
                    </p>
                  </div>
                  {!user?.isVerified && (
                    <Link to="/verification" className="btn btn-primary">
                      Start Verification
                    </Link>
                  )}
                </div>

                {/* Role-Specific Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
                  {isEmployer ? (
                    <>
                      <div className="job-card-premium" style={{ padding: '24px' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '8px' }}>Active Postings</p>
                        <h3 style={{ fontSize: '2rem' }}>{stats.jobs < 10 ? `0${stats.jobs}` : stats.jobs}</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--blue-primary)', fontWeight: 700, marginTop: '8px' }}>Active Now</p>
                      </div>
                      <div className="job-card-premium" style={{ padding: '24px' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '8px' }}>Total Applicants</p>
                        <h3 style={{ fontSize: '2rem' }}>{stats.applicants < 10 ? `0${stats.applicants}` : stats.applicants}</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700, marginTop: '8px' }}>Pending Review</p>
                      </div>
                      <div className="job-card-premium" style={{ padding: '24px' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '8px' }}>Hire Success Rate</p>
                        <h3 style={{ fontSize: '2rem' }}>92%</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>Top Employer Badge</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="job-card-premium" style={{ padding: '24px' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '8px' }}>Applications</p>
                        <h3 style={{ fontSize: '2rem' }}>{stats.applications < 10 ? `0${stats.applications}` : stats.applications}</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700, marginTop: '8px' }}>Submitted</p>
                      </div>
                      <div className="job-card-premium" style={{ padding: '24px' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '8px' }}>Profile Views</p>
                        <h3 style={{ fontSize: '2rem' }}>450</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--blue-primary)', fontWeight: 700, marginTop: '8px' }}>+15% monthly</p>
                      </div>
                      <div className="job-card-premium" style={{ padding: '24px' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '8px' }}>Interviews</p>
                        <h3 style={{ fontSize: '2rem' }}>03</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>Upcoming</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Quick Actions / Activity */}
                <div style={{ display: 'grid', gridTemplateColumns: isEmployer ? '1.5fr 1fr' : '1fr', gap: '24px' }}>
                  <div className="job-card-premium" style={{ padding: '32px' }}>
                    <h3 style={{ marginBottom: '24px' }}>{isEmployer ? 'Recent Applicants' : 'Recent Activity'}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {isEmployer ? (
                        recentActivity.length > 0 ? recentActivity.map((app, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                            <div style={{ width: '32px', height: '32px', background: 'var(--blue-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-primary)' }}>
                              <Users size={16} />
                            </div>
                            <div>
                              <p style={{ fontSize: '0.95rem', margin: 0 }}>{app.workerId?.name || 'A user'} applied for {app.jobId?.title || 'a job'}</p>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{new Date(app.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        )) : (
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No recent applicants yet.</p>
                        )
                      ) : (
                        recentActivity.length > 0 ? recentActivity.map((app, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                            <div style={{ width: '32px', height: '32px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-primary)' }}>
                              <Briefcase size={16} />
                            </div>
                            <div>
                              <p style={{ fontSize: '0.95rem', margin: 0 }}>Applied to {app.jobId?.title || 'a job'}</p>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{new Date(app.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        )) : (
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No recent applications yet.</p>
                        )
                      )}
                    </div>
                    <button 
                      onClick={() => isEmployer ? navigate('/manage-applications') : setActiveTab('applications')}
                      className="btn btn-ghost" style={{ marginTop: '24px', width: '100%', borderTop: '1px solid var(--border-light)', paddingTop: '16px', borderRadius: 0 }}
                    >
                      {isEmployer ? 'Manage all applications' : 'View all applications'} <ArrowRight size={16} />
                    </button>
                  </div>

                  {isEmployer && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div className="job-card-premium" style={{ padding: '32px', background: 'var(--blue-deep)', color: 'white' }}>
                        <PlusCircle size={32} style={{ marginBottom: '16px', color: 'var(--blue-light)' }} />
                        <h3 style={{ color: 'white', marginBottom: '12px' }}>Post a Job</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '24px' }}>Need specialized talent? Post your listing in minutes.</p>
                        <button onClick={() => navigate('/post-job')} className="btn btn-primary" style={{ width: '100%', background: 'white', color: 'var(--blue-deep)' }}>
                          Start Posting
                        </button>
                      </div>
                      
                      <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', background: 'white', border: '1px solid var(--border-light)' }}>
                        <h4 style={{ marginBottom: '12px' }}>Hiring Tip</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                          Employers who verify their business profile see 40% more applications from top-rated professionals.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'applications' && !isEmployer && (
              <div className="animate-fade">
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '1.75rem', color: 'var(--blue-deep)', marginBottom: '8px' }}>My Applications</h2>
                  <p style={{ color: 'var(--text-muted)' }}>Track the status of jobs you've applied for.</p>
                </div>
                
                <div className="job-card-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {myApplications.length > 0 ? myApplications.map(app => (
                    <div key={app._id} className="job-card-premium" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ width: '48px', height: '48px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Briefcase size={20} color="var(--blue-primary)" />
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{app.jobId?.title || 'Unknown Job'}</h4>
                          <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                            <span>Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                              ₹{app.jobId?.salaryMin} - ₹{app.jobId?.salaryMax} ({app.jobId?.salaryFreq})
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <span style={{ 
                          padding: '6px 12px', 
                          borderRadius: 'var(--radius-full)', 
                          fontSize: '0.85rem', 
                          fontWeight: 700,
                          background: app.status === 'accepted' ? '#DCFCE7' : app.status === 'rejected' ? '#FEE2E2' : '#FEF3C7',
                          color: app.status === 'accepted' ? '#166534' : app.status === 'rejected' ? '#991B1B' : '#92400E',
                        }}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  )) : (
                    <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
                      <Briefcase size={48} color="var(--text-light)" style={{ margin: '0 auto 16px' }} />
                      <h3 style={{ marginBottom: '8px' }}>No Applications Yet</h3>
                      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>You haven't applied to any jobs yet. Start exploring!</p>
                      <button onClick={() => navigate('/jobs')} className="btn btn-primary">Find Jobs</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="animate-fade" style={{ display: 'flex', gap: '24px', height: '600px' }}>
                <div className="glass" style={{ flex: 1, borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ padding: '20px', borderBottom: '1px solid var(--border-light)' }}>
                    <h3 style={{ margin: 0 }}>Conversations</h3>
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto' }}>
                    {conversations.length > 0 ? conversations.map(c => (
                      <div key={c.partnerId} onClick={() => setActiveConversation(c.partnerId)} style={{ padding: '16px', borderBottom: '1px solid var(--border-light)', cursor: 'pointer', background: activeConversation === c.partnerId ? 'var(--blue-light)' : 'transparent' }}>
                        <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>{c.partner.name}</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.latestMessage}</p>
                      </div>
                    )) : (
                      <p style={{ padding: '20px', color: 'var(--text-muted)', textAlign: 'center' }}>No conversations yet.</p>
                    )}
                  </div>
                </div>

                <div className="glass" style={{ flex: 2, borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  {activeConversation ? (
                    <>
                      <div style={{ padding: '20px', borderBottom: '1px solid var(--border-light)', background: 'white' }}>
                        <h3 style={{ margin: 0 }}>{conversations.find(c => c.partnerId === activeConversation)?.partner.name}</h3>
                      </div>
                      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--bg-tertiary)' }}>
                        {messages.map(m => (
                          <div key={m._id} style={{ alignSelf: m.senderId === user._id ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                            <div style={{ background: m.senderId === user._id ? 'var(--blue-primary)' : 'white', color: m.senderId === user._id ? 'white' : 'var(--text-main)', padding: '12px 16px', borderRadius: '12px', border: m.senderId === user._id ? 'none' : '1px solid var(--border-light)' }}>
                              <p style={{ margin: 0 }}>{m.content}</p>
                            </div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block', textAlign: m.senderId === user._id ? 'right' : 'left' }}>
                              {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div style={{ padding: '16px', borderTop: '1px solid var(--border-light)', background: 'white', display: 'flex', gap: '12px' }}>
                        <input type="text" value={messageText} onChange={e => setMessageText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Type a message..." className="input-field" style={{ flex: 1 }} />
                        <button onClick={handleSendMessage} className="btn btn-primary">Send</button>
                      </div>
                    </>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                      Select a conversation to start chatting
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="animate-fade">
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '1.75rem', color: 'var(--blue-deep)', marginBottom: '8px' }}>Account Settings</h2>
                  <p style={{ color: 'var(--text-muted)' }}>Manage your personal information and preferences.</p>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  {/* Settings Form */}
                  <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '600px' }}>
                    <h3 style={{ marginBottom: '24px', fontSize: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>Personal Details</h3>
                    <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--blue-deep)' }}>
                          <User size={16} color="var(--blue-primary)" /> Full Name
                        </label>
                        <input type="text" name="name" value={settingsForm.name} onChange={handleSettingsChange} className="form-input-premium" placeholder="Enter your full name" required />
                      </div>
                      
                      <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--blue-deep)' }}>
                          <Phone size={16} color="var(--blue-primary)" /> Phone Number
                        </label>
                        <input type="text" name="phone" value={settingsForm.phone} onChange={handleSettingsChange} className="form-input-premium" placeholder="Enter your phone number" required />
                      </div>
                      
                      <LocationSelector 
                        countryValue={settingsForm.country}
                        stateValue={settingsForm.state}
                        cityValue={settingsForm.city}
                        onCountryChange={(val) => setSettingsForm(prev => ({ ...prev, country: val }))}
                        onStateChange={(val) => setSettingsForm(prev => ({ ...prev, state: val }))}
                        onCityChange={(val) => setSettingsForm(prev => ({ ...prev, city: val }))}
                      />
                      
                      <div style={{ marginTop: '16px', paddingTop: '24px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: 'var(--radius-lg)' }}>
                          <Save size={18} /> Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
