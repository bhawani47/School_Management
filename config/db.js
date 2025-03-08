const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Test the connection
  pool.getConnection()
    .then(connection => {
      console.log('Database connection established successfully');
      connection.release();
    })
    .catch(err => {
      console.error('Error connecting to the database:', err.message);
      throw err;
    });

} catch (error) {
  console.error('Error initializing database pool:', error.message);
  process.exit(1); // Exit the application on critical database errors
}

// Add connection error handler
pool.on('error', err => {
  console.error('Unexpected database error:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed');
  }
  if (err.code === 'ER_CON_COUNT_ERROR') {
    console.error('Database has too many connections');
  }
  if (err.code === 'ECONNREFUSED') {
    console.error('Database connection was refused');
  }
});

module.exports = pool;
