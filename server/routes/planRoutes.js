const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  getAllPlans,
  getPlanById, // Import the new function
  createPlan,
  updatePlan,
  deletePlan
} = require('../controllers/planController');

// PUBLIC ROUTES
router.get('/', getAllPlans);
router.get('/:id', getPlanById); // Add the new route to get a single plan

// ADMIN-ONLY ROUTES
router.post('/', [auth, admin, upload.single('image')], createPlan);
router.put('/:id', [auth, admin, upload.single('image')], updatePlan);
router.delete('/:id', [auth, admin], deletePlan);

module.exports = router;