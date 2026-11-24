const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { getDBStatus } = require('./config/db');
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Security HTTP Headers (with cross-origin resource policy enabled for uploads)
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS setup (applied before static routes to ensure uploads receive CORS headers)
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, or dev proxy)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Cross-Origin Request Blocked by Florva V2 CORS Policy'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Static uploads directory serving with permissive CORS/CORP headers
app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

// Request Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Development Request Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Platform Root Info Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    platform: 'Florva V2 API',
    description: 'Botanical Plant Care & Gardening Platform RESTful Service',
    version: '2.0.0',
    milestone: 'Milestone 2 — Gardener Product CRUD',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me (Protected)',
        profile: 'PUT /api/auth/profile (Protected)'
      },
      products: {
        list: 'GET /api/products (Gardener Protected)',
        create: 'POST /api/products (Gardener Protected, multipart/form-data)',
        getOne: 'GET /api/products/:id (Gardener Protected)',
        update: 'PUT /api/products/:id (Gardener Protected, multipart/form-data)',
        delete: 'DELETE /api/products/:id (Gardener Protected)',
        status: 'PATCH /api/products/:id/status (Gardener Protected)'
      },
      dashboards: {
        customer: 'GET /api/dashboard/customer (Customer Role)',
        gardener: 'GET /api/dashboard/gardener (Gardener Role)',
        admin: 'GET /api/dashboard/admin (Admin Role)'
      }
    }
  });
});

// System Health-Check Endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = getDBStatus();

  res.status(200).json({
    success: true,
    status: 'healthy',
    message: 'Florva V2 Botanical Backend Service is operational',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptimeSeconds: Math.floor(process.uptime()),
    database: dbStatus
  });
});

// Application Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/products', productRoutes);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
