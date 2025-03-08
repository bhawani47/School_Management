const mysql = require('mysql2/promise');
require('dotenv').config();

let pool = null;
let isConnecting = false;
const maxRetries = 5;
const retryInterval = 5000;

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 60000, // Increased timeout for cloud environments
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false  // Changed to false to accept self-signed certificates
  } : false
};

async function createPool(retryCount = 0) {
  if (isConnecting) return pool;
  isConnecting = true;

  try {
    console.log('Attempting to connect to database...');
    pool = mysql.createPool(dbConfig);

    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
    isConnecting = false;
    return pool;

  } catch (error) {
    console.error(`Database connection attempt ${retryCount + 1} failed:`, error.message);
    isConnecting = false;

    if (retryCount < maxRetries) {
      console.log(`Retrying connection in ${retryInterval/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryInterval));
      return createPool(retryCount + 1);
    }

    throw new Error('Failed to establish database connection after maximum retries');
  }
}

// Initialize the pool with error handling
const initializePool = async () => {
  try {
    await createPool();
    return pool;
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    process.exit(1);
  }
};

// Initialize connection pool
initializePool();

module.exports = pool;
