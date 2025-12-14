const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number, // in minutes
    required: true,
  },
}, {
  timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
