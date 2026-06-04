const express = require('express');
const router = express.Router();
const { 
  applyToJob, 
  getJobApplicants, 
  updateApplicationStatus, 
  getMyApplications 
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('worker'), applyToJob);
router.get('/mine', protect, authorize('worker'), getMyApplications);
router.get('/employer/recent', protect, authorize('employer', 'admin'), require('../controllers/applicationController').getRecentApplicants);
router.patch('/:id/status', protect, authorize('employer', 'admin'), updateApplicationStatus);

// Note: The route for fetching applicants per job is often placed under /api/jobs
// But we can also add it here for clarity or handle it in jobRoutes.

module.exports = router;
