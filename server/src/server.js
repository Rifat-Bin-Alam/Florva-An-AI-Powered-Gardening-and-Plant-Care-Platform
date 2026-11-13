const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Start Express Server
const server = app.listen(PORT, () => {
  console.log('🌿 ==========================================');
  console.log(`🌿 FLORVA API SERVER STARTED SUCCESSFULLY`);
  console.log(`🌿 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌿 Local URL:   http://localhost:${PORT}`);
  console.log(`🌿 Health Check: http://localhost:${PORT}/api/health`);
  console.log('🌿 ==========================================');
});

// Handle unhandled Promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  // Keep server running in development or gracefully shut down if required
});

// Handle SIGTERM graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down Florva server gracefully...');
  server.close(() => {
    console.log('💤 Process terminated.');
  });
});
