const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: 'No biography available.',
  },
  imageUrl: {
    type: String,
    default: 'https://placehold.co/400x400/000000/FFFFFF?text=Trainer',
  },
});

module.exports = mongoose.model('Trainer', TrainerSchema);