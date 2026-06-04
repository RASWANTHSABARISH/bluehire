const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');
const whatsappService = require('../services/whatsappService');

// @desc    Get worker job feed (Personalized)
// @route   GET /api/jobs/feed
exports.getJobFeed = async (req, res) => {
  try {
    const workerSector = req.user.sector;
    const workerId = req.user.userId;

    // 1. Find jobs in worker's sector that are open and active
    let query = { 
      sector: workerSector, 
      status: 'open', 
      isActive: true 
    };

    // 2. Filter out jobs where this worker has already applied
    const myApplications = await Application.find({ workerId }).select('jobId');
    const appliedJobIds = myApplications.map(app => app.jobId);
    
    if (appliedJobIds.length > 0) {
      query._id = { $nin: appliedJobIds };
    }

    query.expiresAt = { $gt: new Date() };

    const jobs = await Job.find(query)
      .populate('employerId', 'name employerProfile')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all jobs (Admin/General)
// @route   GET /api/jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      status: 'open',
      isActive: true,
      expiresAt: { $gt: new Date() }
    }).populate('employerId', 'name employerProfile').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create a job
// @route   POST /api/jobs
exports.createJob = async (req, res) => {
  try {
    const employerId = req.user.userId;
    
    // Check employer's quota
    const user = await require('../models/User').findById(employerId);
    if (!user || user.role !== 'employer') {
      return res.status(403).json({ success: false, message: 'Not authorized as an employer' });
    }

    const plan = user.employerProfile?.subscriptionPlan || 'free';
    const jobsRemaining = user.employerProfile?.jobsRemaining || 0;

    // Premium users have unlimited jobs (jobsRemaining check bypassed)
    if (plan !== 'premium' && jobsRemaining <= 0) {
      return res.status(403).json({ 
        success: false, 
        message: 'Job posting quota exceeded. Please upgrade your plan to post more jobs.',
        quotaExceeded: true
      });
    }

    req.body.employerId = employerId;
    const job = await Job.create(req.body);

    // Decrement jobsRemaining if not premium
    if (plan !== 'premium') {
      user.employerProfile.jobsRemaining -= 1;
      await user.save();
    }

    // Trigger WhatsApp Alerts asynchronously (fire and forget)
    if (job.location && job.location.city) {
      // Find workers in the same city and sector
      User.find({
        role: 'worker',
        city: job.location.city,
        sector: job.sector
      }).then(workers => {
        const employerName = user.employerProfile?.businessName || user.name;
        workers.forEach(worker => {
          whatsappService.sendJobAlert(worker, job, employerName);
        });
      }).catch(err => {
        console.error('Error finding workers for WhatsApp alert:', err);
      });
    }

    res.status(201).json({ success: true, data: job });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all jobs posted by current employer
// @route   GET /api/jobs/mine
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employerId', 'name rating employerProfile');
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.status(200).json({ success: true, data: job });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid ID' });
  }
};
