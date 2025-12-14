const express = require('express');
const router = express.Router();
const {
  getMovies,
  searchMovies,
  getSortedMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getMovies).post(protect, admin, addMovie);
router.route('/search').get(searchMovies);
router.route('/sorted').get(getSortedMovies);
router
  .route('/:id')
  .put(protect, admin, updateMovie)
  .delete(protect, admin, deleteMovie);

module.exports = router;
