const Plan = require('../models/Plan');

// Get all plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new plan
exports.createPlan = async (req, res) => {
  const { planName, duration, price, description } = req.body;
  try {
    const newPlan = new Plan({
      planName,
      duration,
      price,
      description,
      // If a file was uploaded, save its path.
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    });
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(400).json({ message: 'Error creating plan', error: error.message });
  }
};

// Update a plan by ID
exports.updatePlan = async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlan) return res.status(404).json({ message: 'Plan not found' });
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(400).json({ message: 'Error updating plan' });
  }
};

// Delete a plan by ID
exports.deletePlan = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) return res.status(404).json({ message: 'Plan not found' });
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};