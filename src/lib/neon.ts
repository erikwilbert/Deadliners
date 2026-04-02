import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
});

export default pool;