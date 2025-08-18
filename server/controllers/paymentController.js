const Payment = require('../models/Payment');
const Member = require('../models/Member');
const User = require('../models/User');
const Plan = require('../models/Plan');

/**
 * @desc   Get the latest receipt for the logged-in user
 * @route  GET /api/payments/my-receipt
 * @access Private (Authenticated Users)
 */
exports.getMyLatestReceipt = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find the latest payment record for the user
    const payment = await Payment.findOne({ user: userId }).sort({ paymentDate: -1 });

    if (!payment) {
      return res.status(404).json({ message: 'No payment record found.' });
    }

    // Populate all necessary details for the receipt
    const member = await Member.findOne({ user: userId });
    const user = await User.findById(userId).select('name email contact age');
    const plan = await Plan.findById(payment.plan);

    const receipt = {
      memberDetails: {
        height: member.height,
        weight: member.weight,
        healthConditions: member.healthConditions,
        emergencyContactName: member.emergencyContactName,
        emergencyContactPhone: member.emergencyContactPhone,
        name: user.name,
        email: user.email,
        contact: user.contact,
        age: user.age,
      },
      planDetails: plan,
      paymentDetails: payment,
    };

    res.status(200).json(receipt);

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};