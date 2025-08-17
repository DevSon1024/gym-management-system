const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  // Link to the User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // A user can only be a member once
  },
  membershipType: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Member', MemberSchema);