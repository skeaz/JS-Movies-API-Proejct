import { displayMoviesList } from "../movieDisplay.js";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getNowPlayingMovies,
} from "../api.js";

const holeOfPopular = document.getElementById("holeOfPopular");
const holeOfTopRated = document.getElementById("holeOfTopRated");
const holeOfTrending = document.getElementById("holeOfTrending");
const holeOfNowPlaying = document.getElementById("holeOfNowPlaying");
const Popular1 = document.getElementById("Popular1");
const TopRated1 = document.getElementById("Top Rated1");
const Trending1 = document.getElementById("Trending1");
const NowPlaying1 = document.getElementById("Now Playing1");
const HOME1 = document.getElementById("HOME1");
const Popular = document.getElementById("Popular");
const TopRated = document.getElementById("Top Rated");
const Trending = document.getElementById("Trending");
const NowPlaying = document.getElementById("Now Playing");
const navbarlinks2 = document.querySelectorAll(".navbar-links2");

async function displayMovieDetailsBasedOnName(name) {
  if (name === "Popular") {
    holeOfPopular.classList.add("listOfMovies");
    displayMoviesList(holeOfPopular, getPopularMovies);
  } else if (name === "Top Rated") {
    holeOfTopRated.classList.add("listOfMovies");
    displayMoviesList(holeOfTopRated, getTopRatedMovies);
  } else if (name === "Trending") {
    holeOfTrending.classList.add("listOfMovies");
    displayMoviesList(holeOfTrending, getTrendingMovies);
  } else if (name === "Now Playing") {
    holeOfNowPlaying.classList.add("listOfMovies");
    displayMoviesList(holeOfNowPlaying, getNowPlayingMovies);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchParams = new URLSearchParams(window.location.search);
  const name = searchParams.get("name");
  displayMovieDetailsBasedOnName(name);
  if (name === "Popular") {
    TopRated.style.display = "none";
    Trending.style.display = "none";
    NowPlaying.style.display = "none";
  } else if (name === "Top Rated") {
    Popular.style.display = "none";
    Trending.style.display = "none";
    NowPlaying.style.display = "none";
  } else if (name === "Trending") {
    Popular.style.display = "none";
    TopRated.style.display = "none";
    NowPlaying.style.display = "none";
  } else if (name === "Now Playing") {
    Popular.style.display = "none";
    TopRated.style.display = "none";
    Trending.style.display = "none";
  }
});

Popular1.addEventListener("click", async () => {
  window.location.href = `/listOfMovies/justone.html?name=Popular`;
});

TopRated1.addEventListener("click", async () => {
  window.location.href = `/listOfMovies/justone.html?name=Top Rated`;
});

Trending1.addEventListener("click", async () => {
  window.location.href = `/listOfMovies/justone.html?name=Trending`;
});

NowPlaying1.addEventListener("click", async () => {
  window.location.href = `/listOfMovies/justone.html?name=Now Playing`;
});

HOME1.addEventListener("click", async () => {
  window.location.href = `/main.html`;
});
