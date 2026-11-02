const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Import database connection
const connectDB = require('./config/database');

// Initial connection attempt (does not crash process if unhandled in serverless)
connectDB().catch((err) => {
  console.warn('[Database] Initial connection delayed or failed:', err.message);
});

const app = express();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (e) {
    console.warn('[Storage] Could not create uploads directory:', e.message);
  }
}

// Allowed CORS origins
const parseAllowedOrigins = () => {
  const envUrl = process.env.CLIENT_URL || process.env.FRONTEND_URL;
  if (!envUrl || envUrl === '*') return null; // allow all
  return envUrl.split(',').map((u) => u.trim().replace(/\/+$/, ''));
};

const allowedOrigins = parseAllowedOrigins();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      // If no CLIENT_URL configured or wildcard, echo origin (allowing credentials)
      if (!allowedOrigins) {
        return callback(null, true);
      }

      // Check if origin matches allowed list or is localhost
      const normalized = origin.replace(/\/+$/, '');
      if (
        allowedOrigins.includes(normalized) ||
        normalized.includes('localhost') ||
        normalized.includes('127.0.0.1')
      ) {
        return callback(null, true);
      }

      // In development, allow any origin
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(uploadsDir));

// Health Check endpoints (for Render, Railway, AWS, Fly.io, Uptime checkers)
app.get(['/health', '/api/health'], (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend static build if present (for single-service full-stack deployment)
const frontendDistPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
} else {
  // Root welcome endpoint for standalone API deployment
  app.get('/', (req, res) => {
    res.json({
      name: 'T-Shirt Store API',
      status: 'online',
      version: '1.0.0',
      endpoints: {
        health: '/api/health',
        products: '/api/products',
        auth: '/api/auth'
      }
    });
  });
}

// Ensure database connection middleware for serverless/cold starts
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    // If DB is not available, continue and let route handlers report errors
  }
  next();
});

// Routes
app.use('/api/user', require('./routes/userProfile'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin/auth', require('./routes/adminAuth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

// Fallback to index.html for SPA routing if static build exists
if (fs.existsSync(frontendDistPath)) {
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path === '/health') {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

// Error handling middleware
app.use(require('./middleware/errorHandler'));

// Start server when run directly (node server.js, Render, Railway, Docker, VPS)
const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Server] Running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

// Export app for serverless function deployments (Vercel, AWS Lambda)
module.exports = app;
