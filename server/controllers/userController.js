const User = require('../models/User');
const Member = require('../models/Member');

// @desc   Get all users and their membership status
exports.getAllUsers = async (req, res) => {
  try {
    // Get all users
    const users = await User.find({ role: 'user' }).select('-password').lean();
    
    // Get all member user IDs
    const memberDocs = await Member.find().select('user');
    const memberUserIds = new Set(memberDocs.map(m => m.user.toString()));

    // Add a membership status to each user
    const usersWithStatus = users.map(user => ({
      ...user,
      isMember: memberUserIds.has(user._id.toString()),
    }));

    res.status(200).json(usersWithStatus);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};