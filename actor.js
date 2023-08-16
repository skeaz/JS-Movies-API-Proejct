const holeOfActor = document.getElementById("holeOfActor");
const holeOfActor2 = document.getElementById("holeOfActor2");

async function getActor() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/person/day?api_key=964229305065dd1ee3856990531a8f15`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getActor2() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=964229305065dd1ee3856990531a8f15`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function displayMoviesList(container, fetchDataFunction) {
  const moviesData = await fetchDataFunction();
  moviesData.forEach(async (movie) => {
    const moviesList = document.createElement("div");
    moviesList.classList.add("card1");
    const movieImg = document.createElement("img");
    movieImg.classList.add("card-img-top1");
    const imgURL = `https://www.themoviedb.org/t/p/w470_and_h470_face/${movie.profile_path}`;
    if (movie.profile_path) {
      movieImg.src = imgURL;
    } else {
      movieImg.src = `https://placehold.co/800?text=${movie.original_name}&font=playfair`;
    }
    movieImg.alt = movie.original_name;
    movieImg.title = movie.original_name;
    const cardBody = document.createElement("div");
    const nameAndRelease = document.createElement("div");
    nameAndRelease.classList.add("nameAndRelease");
    cardBody.classList.add("card-body1");
    const movieTitle = document.createElement("h5");
    movieTitle.classList.add("card-title1");
    movieTitle.textContent = movie.name;
    const movieReleaseDate = document.createElement("h6");
    movieReleaseDate.classList.add("card-text");
    movieReleaseDate.innerHTML = movie.known_for_department;
    const voteAverage = document.createElement("h6");
    voteAverage.classList.add("voteAverage");
    voteAverage.innerHTML = `  ${movie.popularity}`;
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
displayMoviesList(holeOfActor, getActor);
displayMoviesList(holeOfActor2, getActor2);
