const Member = require('../models/Member');
const User = require('../models/User');
const Plan = require('../models/Plan');
const Payment = require('../models/Payment');

/**
 * @desc   Create a new member after a successful "payment"
 * @route  POST /api/members
 * @access Private (Authenticated Users)
 */
exports.createMember = async (req, res) => {
  const { planId, memberDetails } = req.body;
  const userId = req.user.id;

  try {
    // Check if the user is already a member
    const existingMember = await Member.findOne({ user: userId });
    if (existingMember) {
      return res.status(400).json({ message: 'This user is already a member.' });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found.' });
    }

    // Calculate start and end dates based on the plan's duration
    const [durationValue, durationUnit] = plan.duration.split(' ');
    const startDate = new Date();
    let endDate = new Date(startDate);

    if (durationUnit.toLowerCase().startsWith('day')) {
      endDate.setDate(startDate.getDate() + parseInt(durationValue));
    } else if (durationUnit.toLowerCase().startsWith('month')) {
      endDate.setMonth(startDate.getMonth() + parseInt(durationValue));
    } else if (durationUnit.toLowerCase().startsWith('year')) {
      endDate.setFullYear(startDate.getFullYear() + parseInt(durationValue));
    }

    // Create the new member with details from the form
    const newMember = new Member({
      user: userId,
      membershipType: plan.planName,
      startDate,
      endDate,
      ...memberDetails,
    });
    await newMember.save();

    // Create a corresponding payment record
    const amount = plan.price;
    const gst = amount * 0.18; // 18% GST
    const totalAmount = amount + gst;
    const transactionId = `GYMSYS-${Date.now()}`;

    const newPayment = new Payment({
      user: userId,
      member: newMember._id,
      plan: planId,
      amount,
      gst,
      totalAmount,
      transactionId,
    });
    await newPayment.save();
    
    // Populate user and plan details to send back for the receipt
    const user = await User.findById(userId).select('name email contact age');

    res.status(201).json({
      message: 'Membership activated successfully!',
      receipt: {
        memberDetails: { ...memberDetails, name: user.name, email: user.email, contact: user.contact, age: user.age },
        planDetails: plan,
        paymentDetails: newPayment,
      },
    });

  } catch (error) {
    // Enhanced error logging
    console.error('Error creating member:', error.message);
    res.status(400).json({ message: `Error creating member: ${error.message}` });
  }
};

/**
 * @desc   Get the profile of the currently logged-in member
 * @route  GET /api/members/me
 * @access Private (Authenticated Users)
 */
exports.getMemberProfile = async (req, res) => {
  try {
    const member = await Member.findOne({ user: req.user.id }).populate('user', 'name email');
    if (!member) {
      return res.status(404).json({ message: 'Member profile not found.' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc   Get all members (for admin)
 * @route  GET /api/members
 * @access Private (Admin Only)
 */
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().populate('user', 'name email contact age');
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc   Get a single member by their ID (for admin)
 * @route  GET /api/members/:id
 * @access Private (Admin Only)
 */
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc   Update a member by their ID (for admin)
 * @route  PUT /api/members/:id
 * @access Private (Admin Only)
 */
exports.updateMember = async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: 'Error updating member', error: error.message });
  }
};

/**
 * @desc   Delete a member by their ID (for admin)
 * @route  DELETE /api/members/:id
 * @access Private (Admin Only)
 */
exports.deleteMember = async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    // Also delete the associated payment record
    await Payment.findOneAndDelete({ member: deletedMember._id });
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};