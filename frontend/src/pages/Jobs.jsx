import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Clock, ChevronDown, Bookmark, Utensils, Stethoscope, Factory, GraduationCap, Loader2, Briefcase } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../context/AuthContext';

const REGION_STORAGE_KEY = 'hireblue_region';
const PAGE_SIZE = 8;
const BOOKMARKS_KEY = 'hireblue_saved_jobs';

const JOB_TYPE_MAP = {
  'Full-time': 'full-time',
  'Part-time': 'part-time',
  'One-off Shift': 'single-shift',
};

function parseSalaryThreshold(label) {
  if (!label || label === 'Any' || label === 'Any Department') return null;
  const plusMatch = label.match(/₹(\d+)k\+/);
  if (plusMatch) return Number(plusMatch[1]) * 1000;
  const rangeMatch = label.match(/₹(\d+)k\s*-\s*₹(\d+)k/);
  if (rangeMatch) {
    return { min: Number(rangeMatch[1]) * 1000, max: Number(rangeMatch[2]) * 1000 };
  }
  const upperMatch = label.match(/₹(\d+)k\+/);
  if (upperMatch) return { min: Number(upperMatch[1]) * 1000 };
  const lakhMatch = label.match(/₹(\d+)L\+/);
  if (lakhMatch) return { min: Number(lakhMatch[1]) * 100000 };
  return null;
}

function jobMatchesSalary(job, selectedSalaries) {
  if (!selectedSalaries.length) return true;
  return selectedSalaries.some((label) => {
    const threshold = parseSalaryThreshold(label);
    if (!threshold) return true;
    if (typeof threshold === 'number') return job.salaryMin >= threshold;
    if (threshold.min != null && threshold.max != null) {
      return job.salaryMax >= threshold.min && job.salaryMin <= threshold.max;
    }
    return true;
  });
}

export default function Jobs() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isLoggedIn } = useAuth();

  const sectors = [
    { id: 'all', label: 'All Jobs', icon: <Briefcase size={18} /> },
    { id: 'restaurant', label: 'Restaurant', icon: <Utensils size={18} /> },
    { id: 'healthcare', label: 'Healthcare', icon: <Stethoscope size={18} /> },
    { id: 'textile', label: 'Textiles', icon: <Factory size={18} /> },
    { id: 'student', label: 'Student Work', icon: <GraduationCap size={18} /> }
  ];

  const filterConfig = {
    all: {
      departments: ["Any Department"],
      salary: ["Any", "₹10k+", "₹25k+", "₹50k+"]
    },
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

  const initialSector = searchParams.get('sector') || 'all';
  const [selectedSector, setSelectedSector] = useState(
    sectors.some((s) => s.id === initialSector) ? initialSector : 'all'
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [locationQuery, setLocationQuery] = useState(searchParams.get('where') || '');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedSalaries, setSelectedSalaries] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]');
    } catch {
      return [];
    }
  });

  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingPersonalizedFeed, setUsingPersonalizedFeed] = useState(false);

  useEffect(() => {
    const sector = searchParams.get('sector');
    const q = searchParams.get('q');
    const where = searchParams.get('where');
    if (sector && sectors.some((s) => s.id === sector)) setSelectedSector(sector);
    if (q != null) setSearchQuery(q);
    if (where != null) setLocationQuery(where);
  }, [searchParams]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const useFeed = isLoggedIn && user?.role === 'worker' && token;

        const url = useFeed ? API_ENDPOINTS.JOBS.FEED : API_ENDPOINTS.JOBS.BASE;
        const headers = useFeed ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch(url, { headers });
        const data = await res.json();
        if (data.success) {
          setAllJobs(data.data);
          setUsingPersonalizedFeed(useFeed);
        }
      } catch (err) {
        console.error('Failed to fetch jobs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [isLoggedIn, user?.role]);

  const [regionTick, setRegionTick] = useState(0);

  useEffect(() => {
    const onRegionChange = () => setRegionTick((t) => t + 1);
    window.addEventListener('hireblue-region-change', onRegionChange);
    return () => window.removeEventListener('hireblue-region-change', onRegionChange);
  }, []);

  const regionFilter = useMemo(() => {
    const stored = localStorage.getItem(REGION_STORAGE_KEY);
    return stored ? stored.split(',')[0].trim().toLowerCase() : '';
  }, [regionTick]);

  const toggleFilter = (value, selected, setter) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedDepartments([]);
    setSelectedSalaries([]);
    setSelectedJobTypes([]);
    setSelectedExperience([]);
    setSearchQuery('');
    setLocationQuery('');
    setSortBy('recent');
    setCurrentPage(1);
    setSearchParams({});
  };

  const toggleBookmark = (e, jobId) => {
    e.stopPropagation();
    setSavedJobIds((prev) => {
      const next = prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId];
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const filteredJobs = useMemo(() => {
    let jobs = [...allJobs];

    if (selectedSector !== 'all') {
      jobs = jobs.filter((job) => job.sector === selectedSector);
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      jobs = jobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(q) ||
          job.description?.toLowerCase().includes(q) ||
          job.employerId?.employerProfile?.businessName?.toLowerCase().includes(q)
      );
    }

    const where = locationQuery.trim().toLowerCase();
    if (where) {
      jobs = jobs.filter(
        (job) =>
          job.location?.city?.toLowerCase().includes(where) ||
          job.location?.state?.toLowerCase().includes(where) ||
          job.location?.address?.toLowerCase().includes(where)
      );
    } else if (regionFilter) {
      jobs = jobs.filter((job) => job.location?.city?.toLowerCase().includes(regionFilter));
    }

    if (selectedDepartments.length && !selectedDepartments.includes('Any Department')) {
      jobs = jobs.filter((job) => {
        const haystack = `${job.title} ${job.description} ${job.sectorMeta?.experience || ''}`.toLowerCase();
        return selectedDepartments.some((dept) => haystack.includes(dept.toLowerCase().split(' ')[0]));
      });
    }

    if (selectedSalaries.length && !selectedSalaries.includes('Any')) {
      jobs = jobs.filter((job) => jobMatchesSalary(job, selectedSalaries));
    }

    if (selectedJobTypes.length) {
      const mapped = selectedJobTypes.map((t) => JOB_TYPE_MAP[t]).filter(Boolean);
      if (mapped.length) jobs = jobs.filter((job) => mapped.includes(job.jobType));
    }

    if (selectedExperience.length) {
      jobs = jobs.filter((job) =>
        selectedExperience.some((exp) =>
          (job.sectorMeta?.experience || '').toLowerCase().includes(exp.toLowerCase().split(' ')[0])
        )
      );
    }

    if (sortBy === 'salary') {
      jobs.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
    } else {
      jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return jobs;
  }, [
    allJobs,
    selectedSector,
    searchQuery,
    locationQuery,
    regionFilter,
    selectedDepartments,
    selectedSalaries,
    selectedJobTypes,
    selectedExperience,
    sortBy
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const sectorIcon = sectors.find((s) => s.id === selectedSector)?.icon || <Briefcase size={18} />;

  return (
    <div className="jobs-page-container animate-fade">
      <div className="container" style={{ paddingTop: '40px' }}>
        {usingPersonalizedFeed && (
          <p style={{ marginBottom: '16px', fontSize: '0.9rem', color: 'var(--blue-primary)', fontWeight: 600 }}>
            Showing personalized jobs for your sector (excluding jobs you already applied to).
          </p>
        )}

        <div style={{ marginBottom: '32px', display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
          {sectors.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedSector(s.id);
                setCurrentPage(1);
              }}
              className={`btn ${selectedSector === s.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>

        <div className="jobs-layout">
          <aside className="filters-sidebar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Filters</h3>
              <button
                type="button"
                onClick={resetFilters}
                style={{ fontSize: '0.85rem', color: 'var(--blue-primary)', background: 'none', fontWeight: 600, border: 'none', cursor: 'pointer' }}
              >
                Reset
              </button>
            </div>

            <div className="filter-group">
              <h4 className="filter-title">{sectors.find((s) => s.id === selectedSector).label} Departments</h4>
              {filterConfig[selectedSector].departments.map((opt) => (
                <label key={opt} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(opt)}
                    onChange={() => toggleFilter(opt, selectedDepartments, setSelectedDepartments)}
                  />
                  {opt}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Salary Range</h4>
              {filterConfig[selectedSector].salary.map((opt) => (
                <label key={opt} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedSalaries.includes(opt)}
                    onChange={() => toggleFilter(opt, selectedSalaries, setSelectedSalaries)}
                  />
                  {opt}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Shift Type</h4>
              {['Full-time', 'Part-time', 'One-off Shift'].map((opt) => (
                <label key={opt} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedJobTypes.includes(opt)}
                    onChange={() => toggleFilter(opt, selectedJobTypes, setSelectedJobTypes)}
                  />
                  {opt}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Experience Level</h4>
              {['Entry Level', '1-3 Years', '3-5 Years', 'Senior Level'].map((opt) => (
                <label key={opt} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedExperience.includes(opt)}
                    onChange={() => toggleFilter(opt, selectedExperience, setSelectedExperience)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </aside>

          <main className="jobs-feed">
            <div className="jobs-feed-header">
              <div className="search-mini">
                <Search size={18} color="var(--text-light)" />
                <input
                  type="text"
                  placeholder={`Search ${sectors.find((s) => s.id === selectedSector).label} jobs...`}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => setSortBy((s) => (s === 'recent' ? 'salary' : 'recent'))}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer', background: 'none', border: 'none' }}
              >
                Sort by: <strong>{sortBy === 'recent' ? 'Most Recent' : 'Highest Salary'}</strong>
                <ChevronDown size={16} />
              </button>
            </div>

            {locationQuery && (
              <p style={{ marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Location filter: <strong>{locationQuery}</strong>
              </p>
            )}

            <p style={{ marginBottom: '24px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
              Showing <strong>{filteredJobs.length} active roles</strong> in {sectors.find((s) => s.id === selectedSector).label}
            </p>

            <div className="job-card-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                  <Loader2 className="animate-spin" size={32} color="var(--blue-primary)" />
                </div>
              ) : paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <div
                    key={job._id}
                    className="job-card-premium"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/jobs/${job._id}`)}
                  >
                    <div className="job-card-header">
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {sectorIcon}
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.25rem', marginBottom: '4px', color: 'var(--blue-primary)' }}>{job.title}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontWeight: 500, fontSize: '0.95rem' }}>
                            {job.employerId?.employerProfile?.businessName || job.employerId?.name || 'Top Employer'}
                            <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>•</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-light)', fontWeight: 400 }}>
                              <MapPin size={14} /> {job.location?.city ? `${job.location.city}${job.location?.state ? `, ${job.location.state}` : ''}` : 'Location NA'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-ghost"
                        style={{ padding: '8px' }}
                        onClick={(e) => toggleBookmark(e, job._id)}
                        aria-label={savedJobIds.includes(job._id) ? 'Remove bookmark' : 'Save job'}
                      >
                        <Bookmark
                          size={20}
                          color={savedJobIds.includes(job._id) ? 'var(--blue-primary)' : 'var(--text-light)'}
                          fill={savedJobIds.includes(job._id) ? 'var(--blue-primary)' : 'none'}
                        />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', margin: '16px 0' }}>
                      <div style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                        {job.jobType}
                      </div>
                      <div style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                        {job.sectorMeta?.experience || 'General'}
                      </div>
                      <div style={{ color: 'var(--success)', fontSize: '0.95rem', fontWeight: 700, marginLeft: 'auto' }}>
                        ₹{job.salaryMin?.toLocaleString()} - ₹{job.salaryMax?.toLocaleString()}
                      </div>
                    </div>

                    {job.sectorMeta?.verifiedOnly && (
                      <span style={{ fontSize: '0.75rem', background: '#F0FDF4', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        Verified applicants only
                      </span>
                    )}

                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                        <Clock size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ padding: '8px 20px', fontSize: '0.9rem', borderRadius: 'var(--radius-md)' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/jobs/${job._id}`);
                        }}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
                  <p style={{ color: 'var(--text-muted)' }}>No jobs match your filters. Try resetting filters or another sector.</p>
                </div>
              )}
            </div>

            {filteredJobs.length > PAGE_SIZE && (
              <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px' }}
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', padding: '0 12px' }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px' }}
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
