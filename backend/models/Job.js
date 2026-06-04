const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  sector: {
    type: String,
    enum: ['restaurant', 'healthcare', 'textile', 'student'],
    required: [true, 'Sector is required']
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'single-shift'],
    required: true
  },
  shiftTiming: {
    type: String, // Human-readable (e.g. "8am to 4pm")
    required: true
  },
  salaryMin: {
    type: Number,
    required: true
  },
  salaryMax: {
    type: Number,
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  status: {
    type: String,
    enum: ['open', 'filled', 'closed', 'expired'],
    default: 'open'
  },
  sectorMeta: {
    type: mongoose.Schema.Types.Mixed
  },
  applicantCount: {
    type: Number,
    default: 0
  },
  hiredWorkerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  closedAt: Date,
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for geo-spatial queries and text search (Section 4.3)
JobSchema.index({ title: 'text', description: 'text' });
JobSchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model('Job', JobSchema);
