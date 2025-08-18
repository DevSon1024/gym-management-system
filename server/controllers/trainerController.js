const Trainer = require('../models/Trainer');

// Get all trainers
exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new trainer
exports.createTrainer = async (req, res) => {
  const { name, expertise, contact, bio } = req.body;
  try {
    const newTrainer = new Trainer({
      name,
      expertise,
      contact,
      bio,
      // If a file was uploaded, save its path. Otherwise, use the default.
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    });
    const savedTrainer = await newTrainer.save();
    res.status(201).json(savedTrainer);
  } catch (error) {
    res.status(400).json({ message: 'Error creating trainer', error: error.message });
  }
};

// Update a trainer by ID
exports.updateTrainer = async (req, res) => {
  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTrainer) return res.status(404).json({ message: 'Trainer not found' });
    res.status(200).json(updatedTrainer);
  } catch (error) {
    res.status(400).json({ message: 'Error updating trainer' });
  }
};

// Delete a trainer by ID
exports.deleteTrainer = async (req, res) => {
  try {
    const deletedTrainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!deletedTrainer) return res.status(404).json({ message: 'Trainer not found' });
    res.status(200).json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};