const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate Token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role, sector: user.sector },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// @desc    Register user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, phone, password, role, sector } = req.body;

    // Check if user exists
    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ success: false, message: 'Account with this phone number already exists' });
    }

    // Create user
    user = await User.create({
      name,
      phone,
      passwordHash: password, // Schema middleware will hash it
      role,
      sector
    });

    const token = generateToken(user);
    res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Find user
    const user = await User.findOne({ phone }).select('+passwordHash');
    if (!user) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    const token = generateToken(user);
    res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update current user profile
// @route   PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, city, state } = req.body;
    
    // Find the user
    let user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    // Check if phone is being updated and already exists
    if (phone && phone !== user.phone) {
      const phoneExists = await User.findOne({ phone });
      if (phoneExists) {
        return res.status(400).json({ success: false, message: 'Phone number already in use' });
      }
    }
    
    // Update fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (city) user.city = city;
    if (state) user.state = state;
    
    await user.save();
    
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server Error' });
  }
};

// @desc    Upgrade subscription plan
// @route   POST /api/auth/subscribe
exports.subscribe = async (req, res) => {
  try {
    const { plan } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user || user.role !== 'employer') {
      return res.status(403).json({ success: false, message: 'Only employers can subscribe to plans' });
    }

    if (!['free', 'standard', 'premium'].includes(plan)) {
      return res.status(400).json({ success: false, message: 'Invalid plan selected' });
    }

    // Set new plan and quota
    user.employerProfile.subscriptionPlan = plan;
    if (plan === 'standard') {
      user.employerProfile.jobsRemaining += 5; // e.g. gives 5 more jobs
    } else if (plan === 'premium') {
      user.employerProfile.jobsRemaining = 9999; // unlimited proxy
    }
    
    await user.save();
    res.status(200).json({ success: true, message: `Successfully upgraded to ${plan} plan`, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
