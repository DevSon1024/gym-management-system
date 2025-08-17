const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/authMiddleware');
const {
  getAllMembers,
  createMember,
  getMemberById,
  updateMember,
  deleteMember,
} = require('../controllers/memberController');

// Protect all routes with auth and admin middleware
router.route('/').get([auth, admin], getAllMembers).post([auth, admin], createMember);
router.route('/:id').get([auth, admin], getMemberById).put([auth, admin], updateMember).delete([auth, admin], deleteMember);

module.exports = router;