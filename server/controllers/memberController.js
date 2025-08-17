// Import the Member model
const Member = require('../models/Member');

// --- Controller Functions ---

// @desc   Get all members
// @route  GET /api/members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find(); // Fetches all documents from the Member collection
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc   Create a new member
// @route  POST /api/members
exports.createMember = async (req, res) => {
  try {
    // Create a new member instance using data from the request body
    const newMember = new Member(req.body);
    const savedMember = await newMember.save(); // Save the new member to the database
    res.status(201).json(savedMember); // Return the newly created member
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