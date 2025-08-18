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
router.route('/').get(getAllPlans);

// ADMIN-ONLY ROUTES
router.route('/').post([auth, admin, upload.single('image')], createPlan);

router.route('/:id')
  .put([auth, admin, upload.single('image')], updatePlan)
  .delete([auth, admin], deletePlan);

module.exports = router;