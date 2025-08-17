const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/dashboardController');

// Define the stats route
router.get('/stats', getStats);

module.exports = router;