const holeOfPopular = document.getElementById("holeOfPopular");
const holeOfTopRated = document.getElementById("holeOfTopRated");
const holeOfTrending = document.getElementById("holeOfTrending");
const holeOfNowPlaying = document.getElementById("holeOfNowPlaying");
const holeOfGenre = document.getElementById("dropdown-content");

import { displayMoviesList } from "./movieDisplay.js";
import { displayGenreMovie } from "./genreDisplay.js";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getNowPlayingMovies,
  genreMovie,
} from "./api.js";

displayMoviesList(holeOfPopular, getPopularMovies);
displayMoviesList(holeOfTopRated, getTopRatedMovies);
displayMoviesList(holeOfTrending, getTrendingMovies);
displayMoviesList(holeOfNowPlaying, getNowPlayingMovies);
displayGenreMovie(holeOfGenre, genreMovie);


const Popular = document.getElementById("Popular");
const TopRated = document.getElementById("Top Rated");
const Trending = document.getElementById("Trending");
const NowPlaying = document.getElementById("Now Playing");

Popular.addEventListener("click", async () => {
  window.location.href = `/listOfMovies/justone.html?name=Popular`;
});

TopRated.addEventListener("click", async () => {
  window.location.href = `/listOfMovies/justone.html?name=Top Rated`;
});

Trending.addEventListener("click", async () => {
  window.location.href = `/listOfMovies/justone.html?name=Trending`;
});

NowPlaying.addEventListener("click", async () => {
  window.location.href = `/listOfMovies/justone.html?name=Now Playing`;
});
