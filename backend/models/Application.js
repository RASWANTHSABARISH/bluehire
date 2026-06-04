const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'interview_set', 'offer_sent', 'hired', 'rejected'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  interviewSlot: Date,
  interviewConfirmed: {
    type: Boolean,
    default: false
  },
  offerSentAt: Date,
  hiredAt: Date,
  rejectionReason: String, // Internal tag
  chatThreadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  },
  workerRating: Number,
  employerRating: Number,
  ratingDue: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
