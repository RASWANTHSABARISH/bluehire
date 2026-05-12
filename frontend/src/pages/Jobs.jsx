import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, Building2, ChevronDown, Bookmark, Utensils, Stethoscope, Factory, GraduationCap } from 'lucide-react';

export default function Jobs() {
  const navigate = useNavigate();
  const [selectedSector, setSelectedSector] = useState('restaurant');
  
  // Professional Sector Config
  const sectors = [
    { id: 'restaurant', label: 'Restaurant', icon: <Utensils size={18} /> },
    { id: 'healthcare', label: 'Healthcare', icon: <Stethoscope size={18} /> },
    { id: 'textile', label: 'Textiles', icon: <Factory size={18} /> },
    { id: 'student', label: 'Student Work', icon: <GraduationCap size={18} /> }
  ];

  // Dynamic Filter Config per Sector
  const filterConfig = {
    restaurant: {
      departments: ["Back of House", "Front of House", "Management", "Operations"],
      salary: ["₹15k - ₹25k", "₹25k - ₹40k", "₹40k - ₹70k", "₹70k+"]
    },
    healthcare: {
      departments: ["Nursing Staff", "Technical Staff", "Support & Helpers", "Administration"],
      salary: ["₹20k - ₹35k", "₹35k - ₹60k", "₹60k - ₹1L", "₹1L+"]
    },
    textile: {
      departments: ["Loom Operations", "Maintenance", "QC & Packing", "Design & Admin"],
      salary: ["₹12k - ₹20k", "₹20k - ₹35k", "₹35k - ₹50k", "₹50k+"]
    },
    student: {
      departments: ["Events & Promos", "Gig Delivery", "Data & Admin", "Tutoring"],
      salary: ["₹5k - ₹12k", "₹12k - ₹20k", "₹20k - ₹30k", "₹30k+"]
    }
  };

  // Mock Jobs Data (Ideally this would come from an API filtered by sector)
  const allJobs = [
    {
      id: 1,
      sector: 'restaurant',
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
      sector: 'healthcare',
      title: "Staff Nurse (ICU)",
      company: "Apollo Hospitals",
      location: "Chennai, TN",
      salary: "₹35,000 - ₹50,000",
      type: "Full-time",
      dept: "Nursing Staff",
      posted: "1h ago",
      tags: ["Housing Provided", "Verified"]
    },
    {
      id: 3,
      sector: 'textile',
      title: "Loom Operator",
      company: "Lakshmi Textiles",
      location: "Coimbatore, TN",
      salary: "₹18,000 - ₹25,000",
      type: "Full-time",
      dept: "Loom Operations",
      posted: "4h ago",
      tags: ["Day Shift", "Aadhaar Verified"]
    },
    {
      id: 4,
      sector: 'student',
      title: "Event Promoter",
      company: "BrandLaunch India",
      location: "Bangalore, KA",
      salary: "₹8,000 - ₹12,000",
      type: "Part-time",
      dept: "Events & Promos",
      posted: "30m ago",
      tags: ["Student Friendly", "Weekend Only"]
    }
  ];

  // Filter jobs based on selected sector
  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => job.sector === selectedSector);
  }, [selectedSector]);

  return (
    <div className="jobs-page-container animate-fade">
      <div className="container" style={{ paddingTop: '40px' }}>
        
        {/* Sector Switcher (Top of the page) */}
        <div style={{ marginBottom: '32px', display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
          {sectors.map(s => (
            <button 
              key={s.id}
              onClick={() => setSelectedSector(s.id)}
              className={`btn ${selectedSector === s.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>

        <div className="jobs-layout">
          
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Filters</h3>
              <button style={{ fontSize: '0.85rem', color: 'var(--blue-primary)', background: 'none', fontWeight: 600 }}>Reset</button>
            </div>

            <div className="filter-group">
              <h4 className="filter-title">{sectors.find(s => s.id === selectedSector).label} Departments</h4>
              {filterConfig[selectedSector].departments.map(opt => (
                <label key={opt} className="filter-option">
                  <input type="checkbox" />
                  {opt}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Salary Range</h4>
              {filterConfig[selectedSector].salary.map(opt => (
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
              <h4 className="filter-title">Experience Level</h4>
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
                <input type="text" placeholder={`Search ${sectors.find(s => s.id === selectedSector).label} jobs...`} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer' }}>
                Sort by: <strong>Most Recent</strong>
                <ChevronDown size={16} />
              </div>
            </div>

            <p style={{ marginBottom: '24px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
              Showing <strong>{filteredJobs.length} active roles</strong> in {sectors.find(s => s.id === selectedSector).label}
            </p>

            <div className="job-card-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredJobs.length > 0 ? filteredJobs.map(job => (
                <div key={job.id} className="job-card-premium" style={{ cursor: 'pointer' }} onClick={() => navigate(`/jobs/${job.id}`)}>
                  <div className="job-card-header">
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ width: '48px', height: '48px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {sectors.find(s => s.id === selectedSector).icon}
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
                    <div style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                      {job.dept}
                    </div>
                    <div style={{ color: 'var(--success)', fontSize: '0.95rem', fontWeight: 700, marginLeft: 'auto' }}>
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
              )) : (
                <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
                   <p style={{ color: 'var(--text-muted)' }}>No jobs found in this sector yet. Check back soon!</p>
                </div>
              )}
            </div>

            {/* Pagination Placeholder */}
            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>Previous</button>
              <button className="btn btn-primary" style={{ padding: '8px 16px' }}>1</button>
              <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>Next</button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
