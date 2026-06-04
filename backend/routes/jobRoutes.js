const express = require('express');
const router = express.Router();
const { getJobs, createJob, getJob, getJobFeed, getMyJobs } = require('../controllers/jobController');
const { getJobApplicants } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/feed', protect, getJobFeed);
router.get('/mine', protect, authorize('employer', 'admin'), getMyJobs);
router.get('/:jobId/applications', protect, authorize('employer', 'admin'), getJobApplicants);

router.route('/')
  .get(getJobs)
  .post(protect, authorize('employer', 'admin'), createJob);

router.route('/:id')
  .get(getJob);

module.exports = router;
