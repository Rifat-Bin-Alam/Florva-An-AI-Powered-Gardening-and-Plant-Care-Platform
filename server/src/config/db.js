const mongoose = require('mongoose');

/**
 * MongoDB Connection Manager for Florva V2
 * Handles connection lifecycle, reconnects, and status reporting.
 */
let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/florva';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of hanging indefinitely
    });

    isConnected = true;
    console.log(`🌿 MongoDB Connected: ${conn.connection.host}:${conn.connection.port} [Database: ${conn.connection.name}]`);
    return true;
  } catch (error) {
    isConnected = false;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('ℹ️  Ensure your local MongoDB service is running (e.g. mongodb://127.0.0.1:27017/florva)');
    return false;
  }
};

const getDBStatus = () => {
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  const stateIndex = mongoose.connection.readyState;
  return {
    state: states[stateIndex] || 'Unknown',
    readyState: stateIndex,
    isConnected: stateIndex === 1,
    host: mongoose.connection.host || '127.0.0.1',
    name: mongoose.connection.name || 'florva'
  };
};

module.exports = {
  connectDB,
  getDBStatus
};
