require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const channelRoutes = require('./routes/channels');
const epgRoutes = require('./routes/epg');
const searchRoutes = require('./routes/search');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  skip: (req) => req.path === '/health'
});
app.use(limiter);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/epg', epgRoutes);
app.use('/api/search', searchRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Canadian IPTV Player API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      channels: '/api/channels',
      epg: '/api/epg',
      search: '/api/search'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🎬 Canadian IPTV Player API`);
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api/channels`);
  console.log(`📅 EPG: http://localhost:${PORT}/api/epg`);
  console.log(`🔍 Search: http://localhost:${PORT}/api/search`);
  console.log(`\n`);
});

module.exports = app;
