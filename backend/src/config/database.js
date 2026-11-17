const { Pool } = require('pg');

const sslEnabled = process.env.DB_SSL === 'true';
const pool = new Pool({
  ...(process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {
    host: process.env.PGHOST,
    port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
  }),
  ...(sslEnabled ? { ssl: { rejectUnauthorized: false } } : {})
});
pool.on('error', (error) => console.error('Error inesperado en el pool de PostgreSQL:', error));
module.exports = pool;
