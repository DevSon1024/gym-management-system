const User = require('../models/User');
const Member = require('../models/Member');

// @desc   Get all users and their membership status for the admin panel
exports.getAllUsers = async (req, res) => {
  try {
    // Find all users with the 'user' role, excluding their passwords
    const users = await User.find({ role: 'user' }).select('-password').lean();
    
    // Find all current members to cross-reference
    const memberDocs = await Member.find().select('user');
    const memberUserIds = new Set(memberDocs.map(m => m.user.toString()));

    // Add a membership status field to each user object
    const usersWithStatus = users.map(user => ({
      ...user,
      isMember: memberUserIds.has(user._id.toString()),
    }));

    res.status(200).json(usersWithStatus);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};