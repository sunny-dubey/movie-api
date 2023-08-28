const express = require('express');
const authController = require('../controllers/authController');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get(
  '/getAllMovies',
  authController.protect,
  movieController.getAllMovies
);

router.patch('/rateMovie', authController.protect, movieController.rateMovie);

router.get('/checkRatings', movieController.checkRatings);

module.exports = router;
