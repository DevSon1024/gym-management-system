const express = require('express');
const router = express.Router();
const {
  getAllTrainers,
  createTrainer,
  updateTrainer,
  deleteTrainer
} = require('../controllers/trainerController');

router.route('/')
  .get(getAllTrainers)
  .post(createTrainer);

router.route('/:id')
  .put(updateTrainer)
  .delete(deleteTrainer);

module.exports = router;