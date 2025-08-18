const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/authMiddleware');
const {
  createRequest,
  getAllRequests,
  updateRequestStatus,
} = require('../controllers/requestController');

router.post('/', auth, createRequest);
router.get('/', [auth, admin], getAllRequests);
router.put('/:id', [auth, admin], updateRequestStatus);

module.exports = router;