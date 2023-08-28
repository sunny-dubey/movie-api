const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const movieRouter = require('./routes/movieRoutes');

const app = express();
require('dotenv').config();

// midldlware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// body-parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => {
  const readmePath = path.join(__dirname, 'README.md');
  fs.readFile(readmePath, 'utf-8', (err, data) => {
    if (!err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(data);
    }
  });
});

//serving static files
app.use(express.static(`${__dirname}/public`));

// routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/movies', movieRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
