const mongoose = require('mongoose');

/**
 * MongoDB Atlas Connection Manager
 * Manages Mongoose connection state, reconnect attempts, and error logging.
 */
let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('⚠️  MONGODB_URI is not defined in environment variables. Database connection skipped.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of hanging
    });

    isConnected = true;
    console.log(`🌿 MongoDB Connected: ${conn.connection.host} [Database: ${conn.connection.name}]`);
    return true;
  } catch (error) {
    isConnected = false;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('ℹ️  Tip: Ensure MongoDB Atlas URI or local MongoDB instance is active in server/.env');
    return false;
  }
};

const getDBStatus = () => {
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  const stateIndex = mongoose.connection.readyState;
  return {
    state: states[stateIndex] || 'Unknown',
    readyState: stateIndex,
    isConnected: stateIndex === 1
  };
};

module.exports = {
  connectDB,
  getDBStatus
};
