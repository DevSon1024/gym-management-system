// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// --- Connect to MongoDB ---
// This function is imported from your config/db.js file
connectDB();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS) to allow your frontend to communicate with this backend
app.use(cors()); 
// Enable the Express app to parse JSON formatted request bodies
app.use(express.json());

// --- API Routes ---
// const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const memberRoutes = require('./routes/memberRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const planRoutes = require('./routes/planRoutes');
const userRoutes = require('./routes/userRoutes');

// --- Basic API Route for Testing ---
// This is a simple route to check if the server is running correctly.
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Gym Management System API' });
});

// Use the routers for specific API endpoints
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// --- Define the Port ---
// Use the port from the .env file, or default to 5000
const PORT = process.env.PORT || 5000;

// --- Start the Server ---
// This command starts the server and makes it listen for incoming requests on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});