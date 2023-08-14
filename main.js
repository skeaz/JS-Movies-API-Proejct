const holeOfPopular = document.getElementById("holeOfPopular");
const holeOfTopRated = document.getElementById("holeOfTopRated");
const holeOfTrending = document.getElementById("holeOfTrending");
async function displayPopularMoviesList() {
  const moviesData = await getPopularMovies();
  moviesData.forEach((movie) => {
    const moviesList = document.createElement("div");
    moviesList.classList.add("card");
    moviesList.style.maxWidth = "10rem";
    const movieImg = document.createElement("img");
    movieImg.classList.add("card-img-top");
    const imgURL = `https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.backdrop_path}`;
    movieImg.src = imgURL;
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const movieTitle = document.createElement("h5");
    movieTitle.classList.add("card-title");
    movieTitle.textContent = movie.title;
    const movieDescription = document.createElement("p");
    movieDescription.classList.add("card-text");
    //////////
    holeOfPopular.appendChild(moviesList);
    moviesList.appendChild(movieImg);
    moviesList.appendChild(cardBody);
    cardBody.appendChild(movieTitle);
    cardBody.appendChild(movieDescription);
    movieImg.addEventListener("mouseover", async () => {
      async function getVideo() {
        try {
          const videos = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=964229305065dd1ee3856990531a8f15`
          );

          const data = await videos.json();
          return data.results;
        } catch (error) {
          console.log(error);
          return [];
        }
      }
      async function palyVideo() {
        const moviesData = await getVideo();
        // console.log(moviesData);
        console.log(moviesData[0].key);
        const key = moviesData[0].key;
        const iFrameVideo = document.createElement("iframe");
        iFrameVideo.src = `https://www.youtube.com/watch?v=${key}`;
        iFrameVideo.width="420px"
        iFrameVideo.height="420px"
        // iFrameVideo.paly()
        return key;
      }
      palyVideo();
    });
  });
}
async function displayTopRatedMoviesList() {
  const moviesData = await getTopRatedMovies();
  moviesData.forEach((movie) => {
    const moviesList = document.createElement("div");
    moviesList.classList.add("card");
    moviesList.style.maxWidth = "10rem";
    const movieImg = document.createElement("img");
    movieImg.classList.add("card-img-top");
    const imgURL = `https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.backdrop_path}`;
    movieImg.src = imgURL;
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const movieTitle = document.createElement("h5");
    movieTitle.classList.add("card-title");
    movieTitle.textContent = movie.title;
    const movieDescription = document.createElement("p");
    movieDescription.classList.add("card-text");
    // movieDescription.innerHTML = movie.overview;
    //////////
    holeOfTopRated.appendChild(moviesList);
    moviesList.appendChild(movieImg);
    moviesList.appendChild(cardBody);
    cardBody.appendChild(movieTitle);
    cardBody.appendChild(movieDescription);
  });
}
async function getPopularMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=964229305065dd1ee3856990531a8f15&language=en-US&page=1`
    );

    const data = await response.json();
    console.log(data.results);
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
    console.log(data.results);
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
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function displayTrendingMoviesList() {
  const moviesData = await getTrendingMovies();
  moviesData.forEach((movie) => {
    const moviesList = document.createElement("div");
    moviesList.classList.add("card");
    moviesList.style.maxWidth = "10rem";
    const movieImg = document.createElement("img");
    movieImg.classList.add("card-img-top");
    const imgURL = `https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.backdrop_path}`;
    movieImg.src = imgURL;
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const movieTitle = document.createElement("h5");
    movieTitle.classList.add("card-title");
    movieTitle.textContent = movie.title;
    const movieDescription = document.createElement("p");
    movieDescription.classList.add("card-text");
    // movieDescription.innerHTML = movie.overview;
    //////////
    holeOfTrending.appendChild(moviesList);
    moviesList.appendChild(movieImg);
    moviesList.appendChild(cardBody);
    cardBody.appendChild(movieTitle);
    cardBody.appendChild(movieDescription);
  });
}
displayPopularMoviesList();
displayTopRatedMoviesList();
displayTrendingMoviesList();
