const nextprivios = document.getElementById("nextprivios");
async function fetchDataFunction(id) {
  if (!id) {
    return;
  }
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=964229305065dd1ee3856990531a8f15&with_genres=${id}`
    );

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

async function displayPokemonDetails() {
  const searchParams = new URLSearchParams(window.location.search);
  const genreName = searchParams.get("id");
  const container = document.getElementById("holeOfGenre");

  const moviesData = await fetchDataFunction(genreName);
  moviesData.forEach(async (movie) => {
    const moviesList = document.createElement("div");
    moviesList.classList.add("card1");
    const movieImg = document.createElement("img");
    movieImg.classList.add("card-img-top1");
    const imgURL = `https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.backdrop_path}`;
    console.log(movie.backdrop_path);
    if (movie.backdrop_path) {
      movieImg.src = imgURL;
    } else {
      movieImg.src = `https://placehold.co/600x400?text=${movie.title}&font=Oswald`;
    }
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

displayPokemonDetails();
async function genreMovie2() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=964229305065dd1ee3856990531a8f15`
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function displayGenreMovie(container, fetchDataFunction) {
  const searchParams = new URLSearchParams(window.location.search);
  const genreId = searchParams.get("id");
  const moviesData = await fetchDataFunction();
  moviesData.forEach((movie) => {
    if (genreId == movie.id) {
      const newGenreName = document.createElement("h1");
      newGenreName.innerHTML = ` ${movie.name}`;
      container.appendChild(newGenreName);
    }
  });
}
displayGenreMovie(nextprivios, genreMovie2);
