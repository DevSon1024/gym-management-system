const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  getAllTrainers,
  createTrainer,
  updateTrainer,
  deleteTrainer
} = require('../controllers/trainerController');

// PUBLIC ROUTE: Anyone can view trainers
router.route('/').get(getAllTrainers);

// ADMIN-ONLY ROUTES
router.route('/').post([auth, admin, upload.single('image')], createTrainer);

router.route('/:id')
  .put([auth, admin, upload.single('image')], updateTrainer)
  .delete([auth, admin], deleteTrainer);

module.exports = router;