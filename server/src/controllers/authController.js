const User = require('../models/User');

/**
 * Helper to format a clean user object for API responses (excluding password)
 */
const formatUserResponse = (user) => ({
  id: user._id,
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone || '',
  address: user.address || {},
  specialty: user.specialty || '',
  avatarUrl: user.avatarUrl || '',
  isActive: user.isActive,
  createdAt: user.createdAt
});

/**
 * @desc    Register a new user account (Customer or Gardener)
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, address, specialty, role } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide full name, email address, and password'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long'
      });
    }

    // 2. Strict Security Protection: Disallow public registration as Administrator
    const requestedRole = (role || 'customer').toLowerCase().trim();
    if (requestedRole === 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Administrator accounts cannot be created via public registration. Administrator accounts must be provisioned securely.'
      });
    }

    // Allow only legitimate public roles: 'customer' or 'gardener'
    const assignedRole = ['customer', 'gardener'].includes(requestedRole)
      ? requestedRole
      : 'customer';

    // 3. Check for existing account by email
    const cleanEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'An account with this email address already exists'
      });
    }

    // 4. Create new user (password is automatically hashed by pre-save hook)
    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password,
      role: assignedRole,
      phone: phone ? phone.trim() : '',
      address: typeof address === 'string' ? { street: address } : (address || {}),
      specialty: assignedRole === 'gardener' ? (specialty || 'General Horticulture & Plant Care') : ''
    });

    // 5. Generate authentication JWT
    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: formatUserResponse(user)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user credentials & issue JWT token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide both email address and password'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Query user and explicitly include password field (which is select: false)
    const user = await User.findOne({ email: cleanEmail }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Check account status
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: 'Your account has been deactivated. Please contact platform administration.'
      });
    }

    // Compare entered password with hashed password in database
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Issue JWT token
    const token = user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: formatUserResponse(user)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current authenticated user profile
 * @route   GET /api/auth/me
 * @access  Private (Bearer token)
 */
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: formatUserResponse(req.user)
  });
};

/**
 * @desc    Update current authenticated user's profile
 * @route   PUT /api/auth/profile
 * @access  Private (Bearer token)
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, address, specialty } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (specialty !== undefined && user.role === 'gardener') user.specialty = specialty.trim();
    if (address) {
      if (typeof address === 'string') {
        user.address.street = address;
      } else {
        user.address = { ...user.address.toObject(), ...address };
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: formatUserResponse(user)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile
};
