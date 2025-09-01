const { Pool } = require('pg');

// Use environment variable for database connection
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.cwkzviympmjcdqmgyhik:alonMan12@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

// Connection event listeners
pool.on('connect', () => {
  console.log('✅ Connected to Supabase PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
  process.exit(-1);
});

module.exports = pool;
