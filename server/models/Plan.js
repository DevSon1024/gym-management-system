const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: 'No description available.',
  },
  features: {
    type: [String], // An array of strings for features
    default: [],
  },
  imageUrl: {
    type: String,
    default: 'https://placehold.co/600x400/000000/FFFFFF?text=Plan',
  },
});

module.exports = mongoose.model('Plan', PlanSchema);