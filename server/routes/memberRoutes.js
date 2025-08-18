const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/authMiddleware');

// Correctly import only the functions that exist in memberController
const {
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  getMemberProfile
} = require('../controllers/memberController');

// --- USER ROUTES ---
// Get the profile for the currently logged-in member
router.get('/me', auth, getMemberProfile);

// --- ADMIN ROUTES ---
// Get all members
router.get('/', [auth, admin], getAllMembers);

// Get a single member by their ID
router.get('/:id', [auth, admin], getMemberById);

// Update a member's details
router.put('/:id', [auth, admin], updateMember);

// Delete a member
router.delete('/:id', [auth, admin], deleteMember);

module.exports = router;