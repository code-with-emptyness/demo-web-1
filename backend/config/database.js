const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  // If connection is already open (readyState 1), reuse it
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If a connection promise is in progress, await it
  if (cachedConnection) {
    return cachedConnection;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('[Database] MONGODB_URI is not set in environment variables.');
    return null;
  }

  try {
    cachedConnection = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    });

    const conn = await cachedConnection;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    cachedConnection = null;
    console.error('[Database] Connection error:', error.message);
    if (require.main === module && process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB;
