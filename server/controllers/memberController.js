const Member = require('../models/Member');
const User = require('../models/User');

// @desc   Get all members with their user details
exports.getAllMembers = async (req, res) => {
  try {
    // Populate the 'user' field to get details from the User collection
    const members = await Member.find().populate('user', 'name email contact age');
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc   Create a new member from an existing user
exports.createMember = async (req, res) => {
  const { userId, membershipType, startDate, endDate } = req.body;
  try {
    // Check if the user is already a member
    const existingMember = await Member.findOne({ user: userId });
    if (existingMember) {
      return res.status(400).json({ message: 'This user is already a member.' });
    }

    const newMember = new Member({
      user: userId,
      membershipType,
      startDate,
      endDate,
    });
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ message: 'Error creating member', error: error.message });
  }
};

// @desc   Get a single member by their ID
// @route  GET /api/members/:id
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id); // Find a member by the ID in the URL
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc   Update a member by their ID
// @route  PUT /api/members/:id
exports.updateMember = async (req, res) => {
  try {
    // Find a member by ID and update it with the data from the request body
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // Options: return the updated document and run schema validators
    );
    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: 'Error updating member', error: error.message });
  }
};

// @desc   Delete a member by their ID
// @route  DELETE /api/members/:id
exports.deleteMember = async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id); // Find and delete the member
    if (!deletedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};