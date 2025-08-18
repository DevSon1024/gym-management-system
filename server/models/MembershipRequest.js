const mongoose = require('mongoose');

const MembershipRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true,
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  // User-submitted details
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  healthConditions: { type: String, default: 'None' },
  emergencyContactName: { type: String, required: true },
  emergencyContactPhone: { type: String, required: true },
});

module.exports = mongoose.model('MembershipRequest', MembershipRequestSchema);