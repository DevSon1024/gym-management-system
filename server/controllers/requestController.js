const MembershipRequest = require('../models/MembershipRequest');
const Member = require('../models/Member');
const Plan = require('../models/Plan');
const Payment = require('../models/Payment');

// ... (createRequest and getAllRequests functions remain the same)
exports.createRequest = async (req, res) => {
  try {
    const { planId, paymentId, memberDetails } = req.body;
    const userId = req.user.id;

    const existingRequest = await MembershipRequest.findOne({ user: userId, status: 'pending' });
    if (existingRequest) {
      return res.status(400).json({ msg: 'You already have a pending request.' });
    }

    const newRequest = new MembershipRequest({
      user: userId,
      plan: planId,
      payment: paymentId,
      ...memberDetails
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await MembershipRequest.find({ status: 'pending' })
      .populate('user', 'name email')
      .populate('plan', 'planName price duration');
    res.json(requests);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};


// This function is now updated to link the payment to the new member
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await MembershipRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }

    if (status === 'approved' && request.status === 'pending') {
      const plan = await Plan.findById(request.plan);
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

      // Create the new member
      const newMember = await Member.create({
        user: request.user,
        membershipType: plan.planName,
        startDate,
        endDate,
        height: request.height,
        weight: request.weight,
        healthConditions: request.healthConditions,
        emergencyContactName: request.emergencyContactName,
        emergencyContactPhone: request.emergencyContactPhone,
      });
      
      // Update the original payment record with the new member's ID
      await Payment.findByIdAndUpdate(request.payment, { member: newMember._id });
    }

    request.status = status;
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getMyPendingRequest = async (req, res) => {
  try {
    const request = await MembershipRequest.findOne({ user: req.user.id, status: 'pending' });
    if (!request) {
      return res.status(404).json({ msg: 'No pending request found.' });
    }
    res.json(request);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};