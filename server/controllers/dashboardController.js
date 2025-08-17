const Member = require('../models/Member');
const Trainer = require('../models/Trainer');
const Plan = require('../models/Plan');

// @desc   Get dashboard statistics
// @route  GET /api/dashboard/stats
exports.getStats = async (req, res) => {
  try {
    // Get the total count of documents in each collection
    const memberCount = await Member.countDocuments({ role: 'user' });
    const trainerCount = await Trainer.countDocuments();
    const planCount = await Plan.countDocuments();

    // Send the counts back in a JSON response
    res.status(200).json({
      totalMembers: memberCount,
      totalTrainers: trainerCount,
      activePlans: planCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};