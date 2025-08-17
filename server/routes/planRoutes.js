const express = require('express');
const router = express.Router();
const {
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan
} = require('../controllers/planController');

router.route('/')
  .get(getAllPlans)
  .post(createPlan);

router.route('/:id')
  .put(updatePlan)
  .delete(deletePlan);

module.exports = router;