const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const schoolRoutes = require('./routes/schoolRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use routes
app.use('/', schoolRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to School Management API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
