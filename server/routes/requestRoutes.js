const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/authMiddleware');
const {
  createRequest,
  getAllRequests,
  updateRequestStatus,
  getMyPendingRequest, // Import the new function
} = require('../controllers/requestController');

router.post('/', auth, createRequest);
router.get('/me', auth, getMyPendingRequest); // Add the new route for the user dashboard
router.get('/', [auth, admin], getAllRequests);
router.put('/:id', [auth, admin], updateRequestStatus);

module.exports = router;