const User = require('../models/User');
const Product = require('../models/Product');

/**
 * @desc    Get customer dashboard metrics & overview data
 * @route   GET /api/dashboard/customer
 * @access  Private (Role: customer)
 */
const getCustomerDashboard = async (req, res) => {
  res.status(200).json({
    success: true,
    role: 'customer',
    message: 'Authorized Customer Dashboard Access Granted',
    overview: {
      accountStatus: 'Active',
      memberSince: req.user.createdAt,
      stats: {
        personalPlants: 0,
        activeOrders: 0,
        consultationBookings: 0,
        pendingReminders: 0
      },
      nextMilestoneNote: 'Personal plant journal, dynamic watering reminders, and order tracking will be enabled in upcoming milestones.'
    }
  });
};

/**
 * @desc    Get gardener dashboard metrics & overview data
 * @route   GET /api/dashboard/gardener
 * @access  Private (Role: gardener)
 */
const getGardenerDashboard = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments({ gardener: req.user._id });
    const inStockCount = await Product.countDocuments({ gardener: req.user._id, inStock: true });
    const outOfStockCount = await Product.countDocuments({ gardener: req.user._id, inStock: false });

    res.status(200).json({
      success: true,
      role: 'gardener',
      message: 'Authorized Gardener Dashboard Access Granted',
      overview: {
        specialistName: req.user.name,
        specialty: req.user.specialty || 'Head Horticulturist & Plant Specialist',
        operationalStatus: 'Available for Service Appointments',
        stats: {
          assignedAppointments: 0,
          pendingInquiries: 0,
          catalogStockManaged: totalProducts,
          inStockCount,
          outOfStockCount,
          serviceFulfillments: 0
        },
        milestone2Note: 'Product CRUD management is fully active in Milestone 2.'
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get administrator dashboard metrics & system overview
 * @route   GET /api/dashboard/admin
 * @access  Private (Role: admin)
 */
const getAdminDashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const customerCount = await User.countDocuments({ role: 'customer' });
    const gardenerCount = await User.countDocuments({ role: 'gardener' });
    const adminCount = await User.countDocuments({ role: 'admin' });
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      success: true,
      role: 'admin',
      message: 'Authorized Administrator Governance Access Granted',
      overview: {
        platformStatus: 'Healthy & Operational',
        database: 'MongoDB Local (Active)',
        stats: {
          totalUsers,
          customerCount,
          gardenerCount,
          adminCount,
          totalProducts
        },
        securityMode: 'Role-Based Access Control (RBAC) Active'
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCustomerDashboard,
  getGardenerDashboard,
  getAdminDashboard
};
