import React from 'react';
import { 
  MapPin, Clock, Building2, IndianRupee, 
  Calendar, ShieldCheck, Share2, Bookmark,
  ChevronLeft, ArrowRight, Star, CheckCircle2,
  Briefcase, UserCheck, AlertCircle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const formatSchedule = (days) => {
    if (days.length === 7) return "Full Week / 7 Days";
    if (days.length === 5 && !days.includes('Sat') && !days.includes('Sun')) return "Mon - Fri (Weekdays)";
    return days.join(', ');
  };

  const job = {
    title: "Executive Head Chef",
    company: "Taj Mahal Palace",
    location: "Colaba, Mumbai",
    salary: "₹80,000 - ₹1,20,000",
    salaryFreq: "Monthly",
    type: "Full-time",
    experience: "5+ Years (Senior)",
    startTime: "11:00 AM",
    endTime: "10:00 PM",
    selectedDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    posted: "2 hours ago",
    applicants: 42,
    verifiedOnly: true,
    description: "We are looking for a visionary Head Chef to lead our main kitchen at the iconic Taj Mahal Palace. You will be responsible for menu design, kitchen operations, and maintaining the highest standards of culinary excellence. This role requires a deep understanding of both traditional Indian flavors and modern international techniques. You will manage a team of 30+ culinary professionals and oversee multiple dining outlets within the palace.",
    requirements: [
      "Expertise in Continental & Indian Fusion",
      "Proven leadership of teams larger than 20",
      "HACCP and Food Safety certification",
      "Availability for split shifts during peak seasons",
      "Degree in Culinary Arts or equivalent"
    ],
    benefits: [
      "Luxury Staff Housing",
      "Comprehensive Health Insurance",
      "Performance-based Annual Bonus",
      "Global transfer opportunities"
    ]
  };

  return (
    <div className="job-details-page animate-fade" style={{ background: 'var(--bg-tertiary)', minHeight: '100vh', padding: '32px 0 80px' }}>
      <div className="container">
        
        <button onClick={() => navigate(-1)} className="btn btn-ghost" style={{ marginBottom: '20px', paddingLeft: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-small)' }}>
          <ChevronLeft size={18} /> Back to Search
        </button>

        {/* Normal grid layout, no sticky/fixed pinning */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', alignItems: 'start' }}>
          
          {/* Main Content Side */}
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
                      {job.company}
                      <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-light)', fontWeight: 400 }}>
                        <MapPin size={14} /> {job.location}
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
                <div className="tag tag-blue" style={{ fontSize: '0.75rem', padding: '4px 10px' }}><Briefcase size={14} /> {job.type}</div>
                <div className="tag tag-blue" style={{ fontSize: '0.75rem', padding: '4px 10px' }}><Clock size={14} /> {job.experience}</div>
                {job.verifiedOnly && (
                  <div className="tag" style={{ fontSize: '0.75rem', padding: '4px 10px', background: '#F0FDF4', color: '#166534', border: '1px solid #22C55E' }}>
                    <ShieldCheck size={14} /> Verified Only
                  </div>
                )}
              </div>

              <div className="job-description" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
                <h3 style={{ marginBottom: '12px', fontSize: 'var(--fs-h3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Job Description</h3>
                <p style={{ fontSize: 'var(--fs-body)', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '24px', opacity: 0.9 }}>{job.description}</p>
                
                <h3 style={{ marginBottom: '12px', fontSize: 'var(--fs-h3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Key Requirements</h3>
                <ul style={{ paddingLeft: '18px', marginBottom: '24px' }}>
                  {job.requirements.map((req, i) => (
                    <li key={i} style={{ marginBottom: '8px', fontSize: 'var(--fs-body)', lineHeight: '1.6' }}>{req}</li>
                  ))}
                </ul>

                <h3 style={{ marginBottom: '12px', fontSize: 'var(--fs-h3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Benefits</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {job.benefits.map((ben, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontSize: '0.85rem', background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: '10px' }}>
                      <CheckCircle2 size={16} color="var(--success)" /> {ben}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Normal element that scrolls with page */}
          <div className="job-sidebar">
            <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', background: 'white', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginBottom: '2px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.5px' }}>Compensation</p>
                <h2 style={{ color: 'var(--success)', fontSize: '1.5rem', fontWeight: 800 }}>
                  {job.salary}
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 400 }}> / {job.salaryFreq === 'Per Day' ? 'Day' : job.salaryFreq.replace('ly', '')}</span>
                </h2>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '18px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Calendar size={18} color="var(--blue-primary)" />
                  <div>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-light)', margin: 0, textTransform: 'uppercase', fontWeight: 800 }}>Schedule</p>
                    <p style={{ fontWeight: 700, margin: 0, color: 'var(--blue-deep)', fontSize: '0.85rem' }}>{formatSchedule(job.selectedDays)}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={18} color="var(--blue-primary)" />
                  <div>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-light)', margin: 0, textTransform: 'uppercase', fontWeight: 800 }}>Shift</p>
                    <p style={{ fontWeight: 700, margin: 0, color: 'var(--blue-deep)', fontSize: '0.85rem' }}>{job.startTime} - {job.endTime}</p>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', padding: '14px', marginBottom: '12px', fontSize: '1rem', fontWeight: 800 }}>
                Apply Now
                <ArrowRight size={18} />
              </button>
              
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', margin: 0 }}>
                  <UserCheck size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  {job.applicants} Applied
                </p>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '18px', background: 'var(--blue-light)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
               <ShieldCheck size={24} color="var(--blue-primary)" style={{ margin: '0 auto 8px' }} />
               <p style={{ fontSize: '0.8rem', color: 'var(--blue-primary)', fontWeight: 800, margin: 0 }}>
                 Verified Professional Only
               </p>
               <p style={{ fontSize: '0.7rem', color: 'var(--blue-primary)', margin: '2px 0 0', opacity: 0.8 }}>
                 Aadhaar verification required.
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
