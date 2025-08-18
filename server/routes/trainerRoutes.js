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
router.get('/', getAllTrainers);

// ADMIN-ONLY ROUTES
router.post('/', [auth, admin, upload.single('image')], createTrainer);
router.put('/:id', [auth, admin, upload.single('image')], updateTrainer);
router.delete('/:id', [auth, admin], deleteTrainer);

module.exports = router;