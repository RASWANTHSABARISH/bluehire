import React from 'react';
import { Search, MapPin, Filter, Clock, Building2, ChevronDown, Star, Bookmark } from 'lucide-react';

export default function Jobs() {
  const jobs = [
    {
      id: 1,
      title: "Executive Head Chef",
      company: "Taj Mahal Palace",
      location: "Mumbai, MH",
      salary: "₹80,000 - ₹1,20,000",
      type: "Full-time",
      dept: "Back of House",
      posted: "2h ago",
      tags: ["High Growth", "Aadhaar Verified"]
    },
    {
      id: 2,
      title: "Waitstaff / Captain",
      company: "Olive Bar & Kitchen",
      location: "Bangalore, KA",
      salary: "₹30,000 - ₹45,000",
      type: "Full-time",
      dept: "Front of House",
      posted: "5h ago",
      tags: ["Flexible Shifts"]
    },
    {
      id: 3,
      title: "Commis I (Continental)",
      company: "Social Offline",
      location: "New Delhi, DL",
      salary: "₹25,000 - ₹35,000",
      type: "Part-time",
      dept: "Back of House",
      posted: "1d ago",
      tags: ["Immediate Start"]
    },
    {
      id: 4,
      title: "Restaurant Manager",
      company: "Blue Ginger",
      location: "Chennai, TN",
      salary: "₹60,000 - ₹85,000",
      type: "Full-time",
      dept: "Management",
      posted: "3h ago",
      tags: ["Bonus Eligible"]
    },
    {
      id: 5,
      title: "Bartender",
      company: "The Bombay Canteen",
      location: "Mumbai, MH",
      salary: "₹35,000 - ₹50,000",
      type: "Contract",
      dept: "Front of House",
      posted: "6h ago",
      tags: ["Night Shift"]
    }
  ];

  return (
    <div className="jobs-page-container animate-fade">
      <div className="container" style={{ paddingTop: '40px' }}>
        
        {/* Jobs Layout */}
        <div className="jobs-layout">
          
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Filters</h3>
              <button style={{ fontSize: '0.85rem', color: 'var(--blue-primary)', background: 'none', fontWeight: 600 }}>Clear all</button>
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Department</h4>
              {["Front of House", "Back of House", "Management", "Operations"].map(opt => (
                <label key={opt} className="filter-option">
                  <input type="checkbox" />
                  {opt}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Shift Type</h4>
              {["Full-time", "Part-time", "One-off Shift", "Contract"].map(opt => (
                <label key={opt} className="filter-option">
                  <input type="checkbox" />
                  {opt}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Salary Range</h4>
              {["₹15k - ₹25k", "₹25k - ₹40k", "₹40k - ₹70k", "₹70k+"].map(opt => (
                <label key={opt} className="filter-option">
                  <input type="checkbox" />
                  {opt}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Experience</h4>
              {["Entry Level", "1-3 Years", "3-5 Years", "Senior Level"].map(opt => (
                <label key={opt} className="filter-option">
                  <input type="checkbox" />
                  {opt}
                </label>
              ))}
            </div>
          </aside>

          {/* Main Jobs Feed */}
          <main className="jobs-feed">
            <div className="jobs-feed-header">
              <div className="search-mini">
                <Search size={18} color="var(--text-light)" />
                <input type="text" placeholder="Search by job title or company..." />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer' }}>
                Sort by: <strong>Most Recent</strong>
                <ChevronDown size={16} />
              </div>
            </div>

            <p style={{ marginBottom: '24px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
              Showing <strong>1,240 jobs</strong> matching your preferences
            </p>

            <div className="job-card-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {jobs.map(job => (
                <div key={job.id} className="job-card-premium" style={{ cursor: 'pointer' }}>
                  <div className="job-card-header">
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ width: '48px', height: '48px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Building2 size={24} color="var(--blue-primary)" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '4px', color: 'var(--blue-primary)' }}>{job.title}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontWeight: 500, fontSize: '0.95rem' }}>
                          {job.company}
                          <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>•</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-light)', fontWeight: 400 }}>
                            <MapPin size={14} /> {job.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-ghost" style={{ padding: '8px' }}>
                      <Bookmark size={20} color="var(--text-light)" />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', margin: '16px 0' }}>
                    <div style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                      {job.type}
                    </div>
                    <div style={{ color: 'var(--success)', fontSize: '0.95rem', fontWeight: 700 }}>
                      {job.salary}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    {job.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '0.75rem', background: 'var(--blue-light)', color: 'var(--blue-primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      <Clock size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                      Posted {job.posted}
                    </span>
                    <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem', borderRadius: 'var(--radius-md)' }}>
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>Previous</button>
              <button className="btn btn-primary" style={{ padding: '8px 16px' }}>1</button>
              <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>2</button>
              <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>3</button>
              <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>Next</button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
