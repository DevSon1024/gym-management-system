const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { createPayment, getMyLatestReceipt } = require('../controllers/paymentController');

// @route   POST api/payments
// @desc    Create a new payment record
router.post('/', auth, createPayment);

// @route   GET api/payments/my-receipt
// @desc    Get the latest receipt for the logged-in user
router.get('/my-receipt', auth, getMyLatestReceipt);

module.exports = router;