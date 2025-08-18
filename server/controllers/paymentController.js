const Payment = require('../models/Payment');
const User = require('../models/User');
const Plan = require('../models/Plan');

exports.createPayment = async (req, res) => {
  const { planId, amount, gst, totalAmount } = req.body;
  const userId = req.user.id;

  try {
    const transactionId = `GYMSYS-${Date.now()}`;
    
    const newPayment = new Payment({
      user: userId,
      plan: planId,
      amount,
      gst,
      totalAmount,
      transactionId,
    });

    await newPayment.save();
    
    // Immediately create and return the full receipt
    const user = await User.findById(userId).select('name email contact age');
    const plan = await Plan.findById(planId);

    const receipt = {
      memberDetails: user, // At this point, they are a user, not a member
      planDetails: plan,
      paymentDetails: newPayment,
    };

    res.status(201).json({ 
        message: 'Payment successful!',
        receipt: receipt 
    });

  } catch (error) {
    res.status(400).json({ message: 'Error creating payment', error: error.message });
  }
};

exports.getMyLatestReceipt = async (req, res) => {
  try {
    const userId = req.user.id;
    const payment = await Payment.findOne({ user: userId }).sort({ paymentDate: -1 });

    if (!payment) {
      return res.status(404).json({ message: 'No payment record found.' });
    }

    const user = await User.findById(userId).select('name email contact age');
    const plan = await Plan.findById(payment.plan);

    const receipt = {
      memberDetails: user,
      planDetails: plan,
      paymentDetails: payment,
    };

    res.status(200).json(receipt);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};