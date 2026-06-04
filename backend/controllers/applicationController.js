const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply to a job
// @route   POST /api/applications
exports.applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const workerId = req.user.userId;

    // Check if already applied
    const existingApp = await Application.findOne({ workerId, jobId });
    if (existingApp) {
      return res.status(400).json({ success: false, message: 'You have already applied for this job' });
    }

    // Get job to find employerId
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    const application = await Application.create({
      workerId,
      jobId,
      employerId: job.employerId,
      status: 'pending'
    });

    // Increment applicant count on job
    await Job.findByIdAndUpdate(jobId, { $inc: { applicantCount: 1 } });

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get applicants for a specific job (Employer Only)
// @route   GET /api/jobs/:jobId/applications
exports.getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Verify job belongs to employer
    const job = await Job.findById(jobId);
    if (!job || job.employerId.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const applications = await Application.find({ jobId })
      .populate('workerId', 'name phone rating workerProfile city isVerified')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid Job ID' });
  }
};

// @desc    Update application status
// @route   PATCH /api/applications/:id/status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, interviewSlot } = req.body;
    
    let application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });

    // Verify employer owns the job
    if (application.employerId.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    application.status = status;
    if (interviewSlot) application.interviewSlot = interviewSlot;
    
    await application.save();

    res.status(200).json({ success: true, data: application });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get my applications (Worker Only)
// @route   GET /api/applications/mine
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ workerId: req.user.userId })
      .populate('jobId', 'title location salaryMin salaryMax salaryFreq employerId')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get recent applications for all employer's jobs
// @route   GET /api/applications/employer/recent
exports.getRecentApplicants = async (req, res) => {
  try {
    const applications = await Application.find({ employerId: req.user.userId })
      .populate('workerId', 'name')
      .populate('jobId', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
