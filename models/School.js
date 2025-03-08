const pool = require('../config/db');

class School {
  static async create(schoolData) {
    const { name, address, latitude, longitude } = schoolData;
    
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, parseFloat(latitude), parseFloat(longitude)]
    );
    
    return {
      id: result.insertId,
      name,
      address,
      latitude,
      longitude
    };
  }
  
  static async findAll() {
    const [schools] = await pool.query('SELECT * FROM schools');
    return schools;
  }
}

module.exports = School;
