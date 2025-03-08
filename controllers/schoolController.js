const School = require('../models/School');
const { validateSchoolInput, validateLocationParams } = require('../utils/validation');
const { calculateDistance } = require('../utils/distance');
const pool = require('../config/db');

/**
 * Add a new school
 * @route POST /addSchool
 */
const addSchool = async (req, res) => {
  let connection;
  try {
    // Validate input data
    const validation = validateSchoolInput(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: validation.errors 
      });
    }

    // Get connection from pool
    connection = await pool.getConnection();
    
    // Create school using the model
    const school = await School.create(req.body, connection);
    
    res.status(201).json({
      success: true,
      message: 'School added successfully',
      school
    });
  } catch (error) {
    console.error('Error adding school:', error);
    
    // Handle specific database errors
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        message: 'Database service unavailable',
        error: 'Connection refused'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to add school',
      error: error.message
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

/**
 * List schools sorted by proximity
 * @route GET /listSchools
 */
const listSchools = async (req, res) => {
  try {
    // Validate input parameters
    const validation = validateLocationParams(req.query);
    
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: validation.errors 
      });
    }

    const { latitude, longitude } = req.query;
    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);
    
    // Fetch all schools using the model
    const schools = await School.findAll();
    
    // Calculate distance for each school and add it as a property
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(
        userLat, 
        userLng, 
        school.latitude, 
        school.longitude
      );
      
      return {
        ...school,
        distance: parseFloat(distance.toFixed(2))  // Round to 2 decimal places
      };
    });
    
    // Sort schools by distance (closest first)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    
    res.status(200).json({
      success: true,
      count: schoolsWithDistance.length,
      schools: schoolsWithDistance
    });
  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list schools',
      error: error.message
    });
  }
};

module.exports = {
  addSchool,
  listSchools
};
