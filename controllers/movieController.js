const Movie = require('../models/movieModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.find();

  res.status(200).json({
    status: 'success',
    results: movies.length,
    data: {
      movies,
    },
  });
});

exports.rateMovie = catchAsync(async (req, res, next) => {
  const { movieId, rating } = req.body;
  if (!movieId || !rating) {
    return next(new AppError('Please enter the movie_id and rating', 404));
  }
  if (rating < 0.5 || rating > 10) {
    return next(new AppError('Rating must be between 0.5 to 10', 404));
  }
  const movie = await Movie.findOne({ movie_id: movieId });
  if (!movie) {
    return next(new AppError('Movie not found', 400));
  }

  movie.vote_average =
    (movie.vote_count * movie.vote_average + rating) / (movie.vote_count + 1);
  movie.vote_count = movie.vote_count + 1;

  await movie.save();

  res.status(202).json({
    message: `update rating successfully and now vote_average is ${movie.vote_average} with total voting count of ${movie.vote_count}`,
  });
});

exports.checkRatings = catchAsync(async (req, res, next) => {
  const movies = await Movie.find();
  const list = movies.map((movie) => {
    return [movie.title, movie.vote_average];
  });
  res.status(200).json({
    status: 'success',
    data: {
      list,
    },
  });
});
