# MOVIES API

A simple backend project consisting of CRUD APIs to register in a system and perform task such as get movies list, rate movies etc.
This project has login ang signup features as well as the routes are protected.

## API Reference

#### Register New User

```http
  POST /api/v1/users/signup
```

| Body              | Type     | Description                         |
| :---------------- | :------- | :---------------------------------- |
| `name`            | `string` | **Required**. name                  |
| `email`           | `string` | **Required**. email                 |
| `password`        | `string` | **Required**. password              |
| `passwordConfirm` | `string` | **Required**. password confirmation |

#### Login User

```http
  POST /api/v1/users/login
```

| Body       | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `email`    | `string` | **Required**. email    |
| `password` | `string` | **Required**. password |

#### Get Movies List

```http
  GET /api/v1/movies/getAllMovies
```

This route will be protected and shall only be accessible to the logged in user.

#### Rate Movie

```http
  PATCH /api/v1/movies/rateMovie
```

| Body      | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `movieId` | `string` | **Required**. movieId to fetch the movie |
| `rating`  | `string` | **Required**. add your rating as user    |

This route will be protected and shall only be accessible to the logged in user.

#### Check Ratings

```http
  GET /api/v1/movies/checkRatings
```

This is a public route accessible to all


## Documentation

[API-Documentation](https://documenter.getpostman.com/view/28873754/2s9Y5ZugQb)

## Authors

- [@sunnydubey](https://www.github.com/sunny-dubey)
