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
