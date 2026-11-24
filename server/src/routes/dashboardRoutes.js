const express = require('express');
const router = express.Router();
const {
  getCustomerDashboard,
  getGardenerDashboard,
  getAdminDashboard
} = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Customer-only dashboard endpoint
router.get('/customer', protect, authorize('customer'), getCustomerDashboard);

// Gardener-only dashboard endpoint
router.get('/gardener', protect, authorize('gardener'), getGardenerDashboard);

// Admin-only dashboard endpoint
router.get('/admin', protect, authorize('admin'), getAdminDashboard);

module.exports = router;
