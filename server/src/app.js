const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { getDBStatus } = require('./config/db');
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');

const app = express();

// Security HTTP Headers
app.use(helmet());

// Cross-Origin Resource Sharing
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (such as mobile apps, curl, or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Cross-Origin Request Blocked by Florva CORS Policy'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Development Request Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Platform Root Info Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    name: 'Florva API',
    description: 'An AI-Powered Gardening and Plant Care Platform RESTful API',
    author: 'Rifat Bin Alam',
    version: '1.0.0',
    documentation: '/api/docs',
    healthCheck: '/api/health'
  });
});

// System Health-Check Endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = getDBStatus();
  
  res.status(200).json({
    success: true,
    status: 'healthy',
    message: 'Florva Botanical Backend Service is operational',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptimeSeconds: Math.floor(process.uptime()),
    database: dbStatus
  });
});

// Authentication Routes
app.use('/api/auth', authRoutes);

// Central Error Handling & 404 Route Catchers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
