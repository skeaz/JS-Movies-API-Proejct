const search = document.getElementById("search");
const holeOfsearch = document.getElementById("holeOfsearch");
// search for movies names in the main.html
async function fetchDataFunction(string) {
  if (!string) {
    return;
  }
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${string}&api_key=964229305065dd1ee3856990531a8f15`
    );

    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.log(error);
  }
}
async function getSearchDeities() {
  search.addEventListener("keyup", async (e) => {
    if (e.key === "Enter") {
      window.location.href = `/search/search.html?query=${e.target.value}`;
    }
  });
}
getSearchDeities();
async function displaySearchDetails() {
  const searchParams = new URLSearchParams(window.location.search);
  const oneMovieId = searchParams.get("query");
  const moviesData = await fetchDataFunction(oneMovieId);
  return moviesData;
}
displaySearchDetails();
async function displayMoviesList(container, fetchDataFunction1) {
  const moviesData = await fetchDataFunction1();
  console.log(moviesData);
  moviesData.forEach((movie) => {
    const moviesList = document.createElement("div");
    moviesList.classList.add("card1");
    const movieImg = document.createElement("img");
    movieImg.classList.add("card-img-top1");
    const imgURL = `https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`;
    if (movie.poster_path && movie.backdrop_path == null) {
      movieImg.src = imgURL;
    } else if (movie.poster_path && movie.backdrop_path) {
      movieImg.src = imgURL;
    } else if (movie.poster_path == null && movie.backdrop_path) {
      const imgURL = `https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.backdrop_path}`;
      movieImg.src = imgURL;
    } else if (movie.poster_path == null && movie.backdrop_path == null) {
      movieImg.src = `https://placehold.co/100x150?text=${movie.title}&font=playfair`;
    }
    movieImg.alt = movie.title;
    movieImg.title = movie.original_title;
    //////////
    movieImg.addEventListener("click", async (event) => {
      event.stopPropagation();

      const popoverContent = document.createElement("div");
      const movieId = await fetchVideos(movie.id);
      const youtubeVideoId = movieId[0].key;
      popoverContent.classList.add("popover-content");

      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${youtubeVideoId}`;
      iframe.width = "420";
      iframe.height = "315";
      iframe.frameborder = "0";
      iframe.allowfullscreen = true;
      iframe.classList.add("embed-responsive-item");
      popoverContent.appendChild(iframe);

      $(movieImg).popover({
        content: popoverContent,
        html: true,
        title: movie.title,
        placement: "top",
        trigger: "manual",
      });

      $(movieImg).popover("show");

      const popoverId = $(movieImg).attr("aria-describedby");
      const popover = $(`#${popoverId}`);
      $(document.body).on("click", (event) => {
        if (
          !popover.is(event.target) &&
          popover.has(event.target).length === 0
        ) {
          $(movieImg).popover("hide");
        }
      });
    });

    ////////
    const cardBody = document.createElement("div");
    const nameAndRelease = document.createElement("div");
    nameAndRelease.classList.add("nameAndRelease");
    /////////////
    nameAndRelease.addEventListener("click", () => {
      window.location.href = `/Single%20Movie%20Page/SingleMoviePage.html?id=${movie.id}`;
    });
    /////////////
    cardBody.classList.add("card-body1");
    const movieTitle = document.createElement("h5");
    movieTitle.classList.add("card-title1");
    movieTitle.textContent = movie.title;
    const movieReleaseDate = document.createElement("p");
    movieReleaseDate.classList.add("card-text");
    movieReleaseDate.innerHTML = movie.release_date;
    const voteAverage = document.createElement("h6");
    voteAverage.classList.add("voteAverage");
    voteAverage.innerHTML = `IMDB : ${movie.vote_average}`;

    // console.log(movie);

    container.appendChild(moviesList);

    moviesList.appendChild(movieImg);
    moviesList.appendChild(cardBody);
    cardBody.appendChild(nameAndRelease);
    nameAndRelease.appendChild(movieTitle);
    nameAndRelease.appendChild(voteAverage);
    cardBody.appendChild(movieReleaseDate);
    return movieImg;
  });
}
displayMoviesList(holeOfsearch, displaySearchDetails);
