const holeOfPopular = document.getElementById("holeOfPopular");
const holeOfTopRated = document.getElementById("holeOfTopRated");
const holeOfTrending = document.getElementById("holeOfTrending");
const holeOfGenre = document.getElementById("dropdown-content");
const modalElement = document.getElementById("exampleModal");
const leftButtonPopular = document.getElementById("leftButtonPopular");

async function displayMoviesList(container, fetchDataFunction) {
  const moviesData = await fetchDataFunction();
  moviesData.forEach((movie) => {
    const moviesList = document.createElement("div");
    moviesList.classList.add("card1");
    const movieImg = document.createElement("img");
    movieImg.classList.add("card-img-top1");
    const imgURL = `https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.backdrop_path}`;
    movieImg.src = imgURL;
    movieImg.alt = movie.title;
    movieImg.title = movie.original_title;
    const cardBody = document.createElement("div");
    const nameAndRelease = document.createElement("div");
    nameAndRelease.classList.add("nameAndRelease");
    cardBody.classList.add("card-body1");
    const movieTitle = document.createElement("h5");
    movieTitle.classList.add("card-title1");
    movieTitle.textContent = movie.title;
    const movieReleaseDate = document.createElement("h6");
    movieReleaseDate.classList.add("card-text");
    movieReleaseDate.innerHTML = movie.release_date;
    const voteAverage = document.createElement("h6");
    voteAverage.classList.add("voteAverage");
    voteAverage.innerHTML = ` IMDB ${movie.vote_average}`;
    // console.log(movie);
    container.appendChild(moviesList);
    moviesList.appendChild(movieImg);
    moviesList.appendChild(cardBody);
    cardBody.appendChild(nameAndRelease);
    nameAndRelease.appendChild(movieTitle);
    nameAndRelease.appendChild(voteAverage);
    cardBody.appendChild(movieReleaseDate);
  });
}

async function fetchVideos(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=964229305065dd1ee3856990531a8f15`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getPopularMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=964229305065dd1ee3856990531a8f15&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getTopRatedMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=964229305065dd1ee3856990531a8f15&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getTrendingMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=964229305065dd1ee3856990531a8f15`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function genreMovie() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=964229305065dd1ee3856990531a8f15`
    );
    const data = await response.json();
    console.log(data.genres);
    return data.genres;
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function displayGenreMovie(container, fetchDataFunction) {
  const moviesData = await fetchDataFunction();
  moviesData.forEach((movie) => {
    const herf = document.createElement("a");
    herf.innerHTML = movie.name;
    herf.setAttribute("href", "#");
    herf.setAttribute("id", `${movie.id}`);
    herf.addEventListener("click",async () => {
      if (movie.id) {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=964229305065dd1ee3856990531a8f15&with_genres=${movie.id}`
          );
          const data = await response.json();
          console.log(data.results);
          return data.results;
        } catch (error) {
          console.log(error);
          return [];
        }
      }
    });
    container.appendChild(herf);
  });
}
// // async function displayMoviesList(container, fetchDataFunction) {
// //   const moviesData = await fetchDataFunction();
// //   moviesData.forEach((movie) => {
displayMoviesList(holeOfPopular, getPopularMovies);
displayMoviesList(holeOfTopRated, getTopRatedMovies);
displayMoviesList(holeOfTrending, getTrendingMovies);
displayGenreMovie(holeOfGenre, genreMovie);
