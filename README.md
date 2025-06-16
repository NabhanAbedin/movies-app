# Movie Ratings App

A full-stack MERN (MongoDB, Express, React, Node.js) movie rating application following the MVC architecture. Users can browse movie data fetched via an external API (using an API key), submit ratings and reviews, favorite movies, and leave comments.

### Live demonstration of the web app:

https://movie-ratings-tan.vercel.app/home
## Features

- Browse Movies: Search for your favorite films by title.

- Rate & Review: Submit your own rating and review text for any movie.

- Favorites: Add or remove movies to a personal favorites list.

- Comments: Leave comments on movie detail pages.

- Likes: Like or unlike movies.

- MVC Structure: Clear separation of Models, Views (API responses + React UI), and Controllers.

- Environment Configuration: Uses environment variables to store API keys and database URLs.

## Architecture

- Models: Mongoose schemas define Review, Comment, Like, Favorite, etc.

- Controllers: Business logic for each resource lives in routes/* and their associated controller functions.

- Views (React): Components in /src fetch from the API and render movie lists, detail pages, and forms.

## Tech Stack

Frontend: React, Vite, CSS Modules

Backend: Node.js, Express.js, Mongoose

Database: MongoDB Atlas

Hosting:

- Frontend deployed on Vercel

- Backend deployed on Render (or your choice of provider)

## Future implementations
- adding user autentication in order to create unique favorites and liked lists

