const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/authMiddleware');
const { getAllUsers } = require('../controllers/userController');

// @route   GET api/users
// @desc    Get all users (for admin)
router.get('/', [auth, admin], getAllUsers);

module.exports = router;