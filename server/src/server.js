const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start HTTP Server
const server = app.listen(PORT, () => {
  console.log('🌿 ==========================================');
  console.log('🌿 FLORVA V2 API SERVER STARTED');
  console.log(`🌿 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌿 Server URL:  http://localhost:${PORT}`);
  console.log(`🌿 Health:      http://localhost:${PORT}/api/health`);
  console.log('🌿 ==========================================');
});

// Handle unhandled Promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down Florva V2 server gracefully...');
  server.close(() => {
    console.log('💤 Process terminated.');
  });
});
