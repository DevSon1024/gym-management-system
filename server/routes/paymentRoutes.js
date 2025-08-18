const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { getMyLatestReceipt } = require('../controllers/paymentController');

// @route   GET api/payments/my-receipt
// @desc    Get the latest receipt for the logged-in user
router.get('/my-receipt', auth, getMyLatestReceipt);

module.exports = router;