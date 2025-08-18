const Plan = require('../models/Plan');

// @desc   Get all plans
// @route  GET /api/plans
// @access Public
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc   Create a new plan
// @route  POST /api/plans
// @access Private (Admin)
exports.createPlan = async (req, res) => {
  const { planName, duration, price, description } = req.body;
  try {
    const newPlan = new Plan({
      planName,
      duration,
      price,
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    });
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(400).json({ message: 'Error creating plan', error: error.message });
  }
};

// @desc   Update a plan by ID
// @route  PUT /api/plans/:id
// @access Private (Admin)
exports.updatePlan = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }
    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedPlan) return res.status(404).json({ message: 'Plan not found' });
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(400).json({ message: 'Error updating plan' });
  }
};

// @desc   Delete a plan by ID
// @route  DELETE /api/plans/:id
// @access Private (Admin)
exports.deletePlan = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) return res.status(404).json({ message: 'Plan not found' });
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};