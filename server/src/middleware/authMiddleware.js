const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect Middleware
 * Ensures the incoming request includes a valid Bearer JWT token,
 * verifies the token, and attaches the authenticated user to req.user.
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'florva_v2_fallback_jwt_secret_2026'
      );

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Not authorized: User account no longer exists'
        });
      }

      if (!req.user.isActive) {
        return res.status(403).json({
          success: false,
          error: 'Account suspended: Please contact Florva platform administration'
        });
      }

      return next();
    } catch (error) {
      console.error('JWT verification error:', error.message);
      return res.status(401).json({
        success: false,
        error: 'Not authorized: Invalid or expired session token'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized: No authentication token provided'
    });
  }
};

/**
 * Authorize Middleware
 * Restricts endpoint access to specific roles (e.g. 'admin', 'gardener', 'customer').
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Access denied: Role '${req.user ? req.user.role : 'guest'}' is not authorized to access this resource`
      });
    }
    next();
  };
};

module.exports = {
  protect,
  authorize
};
