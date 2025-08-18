const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  membershipType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  healthConditions: { type: String, default: 'None' },
  emergencyContactName: { type: String, required: true },
  emergencyContactPhone: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Member', MemberSchema);