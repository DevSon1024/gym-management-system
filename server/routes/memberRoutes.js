const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/authMiddleware');
const {
  getAllMembers,
  createMember,
  getMemberById,
  updateMember,
  deleteMember,
  getMemberProfile
} = require('../controllers/memberController');

// USER ROUTES
router.get('/me', auth, getMemberProfile);
router.post('/', auth, createMember);

// ADMIN ROUTES
router.get('/', [auth, admin], getAllMembers);
router.get('/:id', [auth, admin], getMemberById);
router.put('/:id', [auth, admin], updateMember);
router.delete('/:id', [auth, admin], deleteMember);

module.exports = router;