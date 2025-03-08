/**
 * Validate school input data
 */
const validateSchoolInput = (data) => {
  const { name, address, latitude, longitude } = data;
  
  const errors = {};
  
  // Validate name
  if (!name || name.trim() === '') {
    errors.name = 'School name is required';
  }
  
  // Validate address
  if (!address || address.trim() === '') {
    errors.address = 'School address is required';
  }
  
  // Validate latitude
  if (latitude === undefined || latitude === null) {
    errors.latitude = 'Latitude is required';
  } else if (isNaN(parseFloat(latitude))) {
    errors.latitude = 'Latitude must be a valid number';
  } else if (parseFloat(latitude) < -90 || parseFloat(latitude) > 90) {
    errors.latitude = 'Latitude must be between -90 and 90';
  }
  
  // Validate longitude
  if (longitude === undefined || longitude === null) {
    errors.longitude = 'Longitude is required';
  } else if (isNaN(parseFloat(longitude))) {
    errors.longitude = 'Longitude must be a valid number';
  } else if (parseFloat(longitude) < -180 || parseFloat(longitude) > 180) {
    errors.longitude = 'Longitude must be between -180 and 180';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate location parameters
 */
const validateLocationParams = (params) => {
  const { latitude, longitude } = params;
  
  const errors = {};
  
  // Validate latitude
  if (latitude === undefined || latitude === null) {
    errors.latitude = 'Latitude is required';
  } else if (isNaN(parseFloat(latitude))) {
    errors.latitude = 'Latitude must be a valid number';
  } else if (parseFloat(latitude) < -90 || parseFloat(latitude) > 90) {
    errors.latitude = 'Latitude must be between -90 and 90';
  }
  
  // Validate longitude
  if (longitude === undefined || longitude === null) {
    errors.longitude = 'Longitude is required';
  } else if (isNaN(parseFloat(longitude))) {
    errors.longitude = 'Longitude must be a valid number';
  } else if (parseFloat(longitude) < -180 || parseFloat(longitude) > 180) {
    errors.longitude = 'Longitude must be between -180 and 180';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = { validateSchoolInput, validateLocationParams };
