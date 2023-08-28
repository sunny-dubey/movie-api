const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  movie_id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  original_language: {
    type: String,
  },
  overview: {
    type: String,
  },
  poster_path: {
    type: String,
  },
  media_type: {
    type: String,
  },
  genre_ids: [
    {
      type: Number,
    },
  ],
  release_date: {
    type: Date,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  vote_count: {
    type: Number,
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
