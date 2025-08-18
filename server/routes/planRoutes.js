const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan
} = require('../controllers/planController');

// PUBLIC ROUTE: Anyone can view plans
router.get('/', getAllPlans);

// ADMIN-ONLY ROUTES
router.post('/', [auth, admin, upload.single('image')], createPlan);
router.put('/:id', [auth, admin, upload.single('image')], updatePlan);
router.delete('/:id', [auth, admin], deletePlan);

module.exports = router;