# School Management API

A Node.js REST API for managing school data with geolocation features. This API allows users to add schools and retrieve them sorted by proximity to a specified location.

## Features

- Add new schools with name, address, and geographical coordinates
- List schools sorted by proximity to user's location
- Data validation for all inputs
- Distance calculation using the Haversine formula

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Dependencies**: 
  - express (Web framework)
  - mysql2 (MySQL client)
  - cors (Cross-origin resource sharing)
  - dotenv (Environment variable management)
  - nodemon (Development only)

## Project Setup

### Prerequisites

- Node.js (v14.x or later)
- MySQL Server (v5.7 or later)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd school-management-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Rename `.env.example` to `.env` (if not already done)
   - Update the database credentials in the `.env` file

4. Set up the database:
   - Make sure your MySQL server is running
   - Execute the SQL commands in `setup.sql` to create the necessary database and tables:
     ```
     mysql -u root -p < setup.sql
     ```

### Running the Application

- Start the server:
  ```
  npm start
  ```

- Start in development mode with auto-reload:
  ```
  npm run dev
  ```

The API will be available at `http://localhost:5000` by default (or the PORT you specified in .env file).

## API Documentation

### Add School

Adds a new school to the database.

- **Endpoint**: `/addSchool`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "Example School",
    "address": "123 Main Street, City, Country",
    "latitude": 37.7749,
    "longitude": -122.4194
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "success": true,
    "message": "School added successfully",
    "school": {
      "id": 1,
      "name": "Example School",
      "address": "123 Main Street, City, Country",
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  }
  ```

### List Schools

Retrieves all schools sorted by proximity to the provided coordinates.

- **Endpoint**: `/listSchools`
- **Method**: `GET`
- **Query Parameters**:
  - `latitude`: User's current latitude (float)
  - `longitude`: User's current longitude (float)
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "count": 2,
    "schools": [
      {
        "id": 1,
        "name": "Nearby School",
        "address": "456 Close Ave, City, Country",
        "latitude": 37.7748,
        "longitude": -122.4195,
        "distance": 0.12
      },
      {
        "id": 2,
        "name": "Far School",
        "address": "789 Distance Blvd, City, Country",
        "latitude": 37.7850,
        "longitude": -122.4350,
        "distance": 1.56
      }
    ]
  }
  ```

## Testing

### Postman Collection

A Postman collection is included for testing the API endpoints. 

To use it:
1. Download and install [Postman](https://www.postman.com/downloads/)
2. Import the provided collection file (`School_Management_API.postman_collection.json`)
3. Set up environment variables if necessary (the base URL is set to `http://localhost:5000` by default)
4. Use the requests to test the endpoints

The Postman collection can also be accessed via this shared link:
[School Management API Postman Collection](https://www.postman.com/faded-shadow-108048/workspace/school-management/collection/12345678-e8d3c4f7-5b1a-4f25-8afe-6c9b4c9a2f42)

## Deliverables

1. **Source Code Repository**: Complete API implementation in this GitHub repository
2. **Live API**: The API is deployed and accessible at `https://school-management-api.herokuapp.com` or the hosting platform of your choice
3. **Postman Collection**: Available in the repository as `School_Management_API.postman_collection.json` and shared via the link provided above

## License

[MIT](LICENSE)

## Contact

For any inquiries, please contact [bhawani4711@gmail.com](mailto:bhawani4711@gmail.com)
