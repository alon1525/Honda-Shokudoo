const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres.cwkzviympmjcdqmgyhik:alonMan12@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the connection
pool.on('connect', () => {
  console.log('✅ Connected to Supabase PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
  process.exit(-1);
});

module.exports = pool;
