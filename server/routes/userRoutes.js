const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/authMiddleware');
const { getAllUsers } = require('../controllers/userController');

// This route is protected and can only be accessed by logged-in admins
router.get('/', [auth, admin], getAllUsers);

module.exports = router;