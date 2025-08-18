const MembershipRequest = require('../models/MembershipRequest');
const Member = require('../models/Member');
const Plan = require('../models/Plan');

// Create a new membership request
exports.createRequest = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user.id;

    const existingRequest = await MembershipRequest.findOne({ user: userId, status: 'pending' });
    if (existingRequest) {
      return res.status(400).json({ msg: 'You already have a pending request.' });
    }

    const newRequest = new MembershipRequest({ user: userId, plan: planId });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get all pending requests (for admin)
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

// Update a request's status (approve/reject for admin)
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

      await Member.create({
        user: request.user,
        membershipType: plan.planName,
        startDate,
        endDate,
      });
    }

    request.status = status;
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};