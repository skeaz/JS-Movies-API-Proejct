const holeOfPopular = document.getElementById("holeOfPopular");
const holeOfTopRated = document.getElementById("holeOfTopRated");
const holeOfTrending = document.getElementById("holeOfTrending");
const holeOfNowPlaying = document.getElementById("holeOfNowPlaying");
const holeOfGenre = document.getElementById("dropdown-content");

import { displayMoviesList } from "../wholeJS/movieDisplay.js";
import { displayGenreMovie } from "../genreIndex/genreDisplay.js";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getNowPlayingMovies,
  genreMovie,
} from "../wholeJS/api.js";

displayMoviesList(holeOfPopular, getPopularMovies);
displayMoviesList(holeOfTopRated, getTopRatedMovies);
displayMoviesList(holeOfTrending, getTrendingMovies);
displayMoviesList(holeOfNowPlaying, getNowPlayingMovies);
displayGenreMovie(holeOfGenre, genreMovie);
