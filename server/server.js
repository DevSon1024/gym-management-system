// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const fs = require('fs');
const path = require('path');
const requestRoutes = require('./routes/requestRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // Import payment routes

// --- Create uploads folder if it doesn't exist ---
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// --- Serve the uploads folder statically ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Connect to MongoDB ---
connectDB();

// --- Middleware ---
app.use(cors()); 
app.use(express.json());

// --- API Routes ---
const dashboardRoutes = require('./routes/dashboardRoutes');
const memberRoutes = require('./routes/memberRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const planRoutes = require('./routes/planRoutes');
const userRoutes = require('./routes/userRoutes');

// --- Basic API Route for Testing ---
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
app.use('/api/requests', requestRoutes);
app.use('/api/payments', paymentRoutes); // Use payment routes

// --- Define the Port ---
const PORT = process.env.PORT || 5000;

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});