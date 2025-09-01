// Load environment variables first
require('dotenv').config();

// Debug: Check if environment variables are loaded
console.log('🔧 Environment check:');
console.log('- DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Missing');
console.log('- OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Set' : '❌ Missing');
console.log('- PORT:', process.env.PORT || '3001 (default)');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Honda Shokudo API is running' });
});

app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    const pool = require('./config/database');
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: 'Connected'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      timestamp: new Date().toISOString(),
      database: 'Disconnected',
      error: error.message
    });
  }
});

// Import and use routes
const reservationsRouter = require('./routes/reservations');
const chatbotRouter = require('./routes/chatbot');

app.use('/api/reservations', reservationsRouter);
app.use('/api/chatbot', chatbotRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
 });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📅 Reservations API: http://localhost:${PORT}/api/reservations`);
  console.log(`🤖 Chatbot API: http://localhost:${PORT}/api/chatbot`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...');
  const pool = require('./config/database');
  pool.end();
  process.exit(0);
});
