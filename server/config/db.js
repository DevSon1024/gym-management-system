// Import the Mongoose library
const mongoose = require('mongoose');
// Import the dotenv library to load environment variables
require('dotenv').config();

// Function to connect to the database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    
    // If the connection is successful, log a confirmation message
    console.log('MongoDB connected successfully.');
  } catch (err) {
    // If an error occurs, log the error message and exit the process
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit with a failure code
  }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;