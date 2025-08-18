const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Member is not required at the time of payment, as it's created after admin approval
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  amount: { type: Number, required: true },
  gst: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  transactionId: { type: String, required: true, unique: true },
  paymentDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', PaymentSchema);