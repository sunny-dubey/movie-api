const axios = require('axios');
const dotenv = require('dotenv');
const Movie = require('../models/movieModel');
dotenv.config({ path: './.env' });
const API_KEY = process.env.API_KEY;
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const addMovieToDB = async (movie_id) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    const res = movie.data;
    const options = {
      movie_id: res.id,
      title: res.title,
      original_language: res.original_language,
      overview: res.overview,
      poster_path: res.poster_path,
      media_type: res.media_type,
      genre_ids: res.genre_ids,
      release_date: res.release_date,
      vote_average: res.vote_average,
      vote_count: res.vote_count,
    };

    await Movie.create(options);
  } catch (error) {
    console.log(error);
  }
};

const getMovieDetails = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    const list = response.data.results;
    const IDs = list.map((el) => {
      return el.id;
    });
    IDs.map((movie_id) => {
      addMovieToDB(movie_id);
    });
    console.log('Movie data successfully imported to database');
  } catch (error) {
    console.log(error);
  }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Movie.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  getMovieDetails();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
