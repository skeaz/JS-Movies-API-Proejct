const container = document.querySelectorAll(".container")[0];
const content = document.getElementById("content");
import { fetchVideos } from "../wholeJS/api.js";

async function fetchDataFunction(id) {
  if (!id) {
    return;
  }
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=964229305065dd1ee3856990531a8f15`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function fetchCreditsData(id) {
  if (!id) {
    return;
  }
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=964229305065dd1ee3856990531a8f15`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function displayOneMovieDetails() {
  const searchParams = new URLSearchParams(window.location.search);
  const oneMovieId = searchParams.get("id");
  const moviesData = await fetchDataFunction(oneMovieId);
  const creditsData = await fetchCreditsData(oneMovieId);
  /// new div for details
  const detailsDiv = document.createElement("div");
  const rowDiv = document.createElement("div");
  rowDiv.setAttribute("class", "row");
  const colDiv = document.createElement("div");
  colDiv.setAttribute("class", "colDiv");
  detailsDiv.setAttribute("class", "details");
  const titleDiv = document.createElement("div");
  titleDiv.setAttribute("class", "title");
  const title = document.createElement("h1");
  title.textContent = moviesData.title;
  titleDiv.appendChild(title);
  detailsDiv.appendChild(titleDiv);
  const imgDiv = document.createElement("div");
  imgDiv.setAttribute("class", "img");
  const img = document.createElement("img");
  const imgURL = `https://www.themoviedb.org/t/p/w440_and_h660_face/${moviesData.poster_path}`;
  if (moviesData.poster_path) {
    img.setAttribute("src", imgURL);
  } else {
    img.src = `https://fakeimg.pl/470x470?text=${moviesData.title}`;
  }
  imgDiv.appendChild(img);
  rowDiv.appendChild(imgDiv);
  rowDiv.appendChild(colDiv);
  detailsDiv.appendChild(rowDiv);
  const descriptionDiv = document.createElement("div");
  descriptionDiv.setAttribute("class", "description");
  const descriptionTitle = document.createElement("h1");
  const description = document.createElement("p");
  descriptionTitle.textContent = "Description ";
  description.innerHTML = moviesData.overview;
  descriptionDiv.appendChild(descriptionTitle);
  descriptionDiv.appendChild(description);
  descriptionDiv.appendChild(description);
  const ratingDiv = document.createElement("div");
  ratingDiv.setAttribute("class", "rating");
  const rating = document.createElement("h2");
  const ratingTitle = document.createElement("h1");
  ratingTitle.textContent = "Rating ";
  rating.innerHTML = moviesData.vote_average;
  ratingDiv.appendChild(ratingTitle);
  ratingDiv.appendChild(rating);
  const releaseDateDiv = document.createElement("div");
  releaseDateDiv.setAttribute("class", "releaseDate");
  const releaseDate = document.createElement("h2");
  releaseDate.textContent = `Release Date : ${moviesData.release_date}`;
  releaseDateDiv.appendChild(releaseDate);
  const genresDiv = document.createElement("div");
  genresDiv.setAttribute("class", "genres");
  const genres = document.createElement("h1");
  const genresTitle = document.createElement("h1");
  genresTitle.textContent = "Genres ";
  genres.innerHTML = moviesData.genres.map((genre) => genre.name).join(", ");
  genresDiv.appendChild(genresTitle);
  genresDiv.appendChild(genres);
  colDiv.appendChild(descriptionDiv);
  colDiv.appendChild(ratingDiv);
  colDiv.appendChild(releaseDateDiv);
  colDiv.appendChild(genresDiv);

  const backdropDiv = document.createElement("div");
  backdropDiv.setAttribute("class", "backdrop");
  const backdrop = document.createElement("img");
  const backdropURL = `https://www.themoviedb.org/t/p/w440_and_h660_face/${moviesData.backdrop_path}`;
  if (moviesData.backdrop_path) {
    content.style.backgroundImage = `url(https://www.themoviedb.org/t/p/original${moviesData.backdrop_path})`;
    content.style.backgroundSize = "cover";
    content.style.backgroundRepeat = "no-repeat";
    content.style.backgroundPosition = "center";
  } else {
    backdrop.src = `https://fakeimg.pl/470x470?text=${moviesData.title}`;
  }
  backdropDiv.appendChild(backdrop);
  detailsDiv.appendChild(backdropDiv);
  container.appendChild(detailsDiv);
  const castDiv = document.createElement("div");
  const castAllImg = document.createElement("div");
  castDiv.setAttribute("class", "cast");
  castAllImg.setAttribute("class", "castAllImg");
  const castTitle = document.createElement("h1");
  castTitle.textContent = "Cast ";
  castDiv.appendChild(castTitle);
  for (let i = 0; i < 5; i++) {
    const cast = document.createElement("div");
    cast.setAttribute("class", "castOneImg");

    const castName = document.createElement("h2");
    const castImage = document.createElement("img");
    const castURL = `https://www.themoviedb.org/t/p/w440_and_h660_face/${creditsData.cast[i].profile_path}`;
    if (creditsData.cast[i].profile_path) {
      castImage.setAttribute("src", castURL);
    } else {
      castImage.src = `https://fakeimg.pl/470x470?text=${creditsData.cast[i].name}`;
    }
    cast.addEventListener("click", () => {
      window.location.href = `/Single%20Actor%20Page/SingleActorPage.html?id=${creditsData.cast[i].id}`;
    });
    castName.textContent = creditsData.cast[i].name;
    cast.appendChild(castName);
    cast.appendChild(castImage);
    castAllImg.appendChild(cast);
    castDiv.appendChild(castTitle);
    castDiv.appendChild(castAllImg);
    detailsDiv.appendChild(castDiv);
  }
  const crewDiv = document.createElement("div");
  const crewAllImg = document.createElement("div");
  crewDiv.setAttribute("class", "crew");
  crewAllImg.setAttribute("class", "crewAllImg");
  const crewTitle = document.createElement("h1");
  crewTitle.textContent = "Crew ";
  crewDiv.appendChild(crewTitle);

  const uniqueCrewIds = new Set();
  let count = 0;

  for (let j = 0; j < creditsData.crew.length && count < 5; j++) {
    const crewId = creditsData.crew[j].id;

    if (!uniqueCrewIds.has(crewId)) {
      uniqueCrewIds.add(crewId);

      const crew = document.createElement("div");
      crew.setAttribute("class", "crewOneImg");

      const crewName = document.createElement("h2");
      const crewImage = document.createElement("img");
      const crewURL = creditsData.crew[j].profile_path
        ? `https://www.themoviedb.org/t/p/w440_and_h660_face/${creditsData.crew[j].profile_path}`
        : null;

      if (crewURL) {
        crewImage.setAttribute("src", crewURL);
      } else {
        crewImage.src = `https://placehold.co/100x150?text=${creditsData.crew[j].name}&font=playfair`;
        crewImage.setAttribute("class", "wrong");
      }
      crew.addEventListener("click", () => {
        window.location.href = `/Single%20Actor%20Page/SingleActorPage.html?id=${creditsData.crew[j].id}`;
      });
      crewName.textContent = creditsData.crew[j].name;

      crew.appendChild(crewName);
      crew.appendChild(crewImage);
      crewAllImg.appendChild(crew);
      crewDiv.appendChild(crewTitle);
      crewDiv.appendChild(crewAllImg);
      detailsDiv.appendChild(crewDiv);

      count++;
    }
  }
  detailsDiv.appendChild(crewDiv);
  const trailerData = await fetchVideos(oneMovieId);
  console.log(trailerData[0].key);
  if (trailerData) {
    const trailerDiv = document.createElement("div");
    trailerDiv.setAttribute("class", "trailer");

    const trailerIframe = document.createElement("iframe");
    trailerIframe.setAttribute("src", `https://www.youtube.com/embed/${trailerData[0].key}`);
    trailerIframe.setAttribute("allowfullscreen", "");

    trailerDiv.appendChild(trailerIframe);
    detailsDiv.appendChild(trailerDiv);
  }
}
displayOneMovieDetails();
