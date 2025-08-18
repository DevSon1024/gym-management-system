const Member = require('../models/Member');
const User = require('../models/User');
const Payment = require('../models/Payment');

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
    await Payment.findOneAndDelete({ member: deletedMember._id });
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};