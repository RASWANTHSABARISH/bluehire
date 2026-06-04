const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
  role: {
    type: String,
    enum: ['worker', 'employer', 'admin'],
    default: 'worker'
  },
  sector: {
    type: String,
    enum: ['restaurant', 'healthcare', 'textile', 'student'],
    required: true
  },
  city: String,
  state: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  fcmToken: String,
  profileComplete: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Worker-specific fields (Section 1.1.1)
  workerProfile: {
    jobTitle: String,
    experienceYears: Number,
    skills: [String],
    availableDays: [String],
    availableShift: {
      type: String,
      enum: ['morning', 'afternoon', 'night', 'flexible']
    },
    expectedSalaryMin: Number,
    expectedSalaryMax: Number,
    resumeUrl: String
  },

  // Employer-specific fields (Section 1.1.2)
  employerProfile: {
    businessName: String,
    businessType: {
      type: String,
      enum: ['restaurant', 'hospital', 'textile', 'other']
    },
    gstNumber: String,
    address: String,
    totalHires: {
      type: Number,
      default: 0
    },
    subscriptionPlan: {
      type: String,
      enum: ['free', 'standard', 'premium'],
      default: 'free'
    },
    jobsRemaining: {
      type: Number,
      default: 1
    }
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
UserSchema.pre('save', async function() {
  if (!this.isModified('passwordHash')) return;
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
});

// Method to check password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model('User', UserSchema);
