const container = document.querySelectorAll(".container")[0];
const content = document.getElementById("content");
const mySidenav = document.getElementById("mySidenav");

async function fetchDataFunction(id) {
  if (!id) {
    return;
  }
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=964229305065dd1ee3856990531a8f15`
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
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=964229305065dd1ee3856990531a8f15`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function fetchExternalIdsData(id) {
  if (!id) {
    return;
  }
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=964229305065dd1ee3856990531a8f15`
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
  const externalIds = await fetchExternalIdsData(oneMovieId);
  console.log(externalIds);
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
  title.textContent = moviesData.name;
  titleDiv.appendChild(title);
  detailsDiv.appendChild(titleDiv);
  const imgDiv = document.createElement("div");
  imgDiv.setAttribute("class", "img");
  const img = document.createElement("img");
  const imgURL = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${moviesData.profile_path}`;
  if (moviesData.profile_path) {
    img.setAttribute("src", imgURL);
  } else {
    img.src = `https://placehold.co/100x150?text=${moviesData.title}&font=playfair`;
  }
  imgDiv.appendChild(img);
  rowDiv.appendChild(imgDiv);
  rowDiv.appendChild(colDiv);
  detailsDiv.appendChild(rowDiv);
  const descriptionDiv = document.createElement("div");
  descriptionDiv.setAttribute("class", "description");
  const descriptionTitle = document.createElement("h1");
  const description = document.createElement("p");
  descriptionTitle.textContent = "Biography ";
  description.innerHTML = moviesData.biography;
  descriptionDiv.appendChild(descriptionTitle);
  descriptionDiv.appendChild(description);
  descriptionDiv.appendChild(description);
  const ratingDiv = document.createElement("div");
  ratingDiv.setAttribute("class", "rating");
  const rating = document.createElement("h2");
  const ratingTitle = document.createElement("h1");
  ratingTitle.textContent = "Popularity ";
  rating.innerHTML = moviesData.popularity;
  ratingDiv.appendChild(ratingTitle);
  ratingDiv.appendChild(rating);
  const releaseDateDiv = document.createElement("div");
  releaseDateDiv.setAttribute("class", "releaseDate");
  const releaseDate = document.createElement("h2");
  releaseDate.textContent = `Birthday : ${moviesData.birthday}`;
  releaseDateDiv.appendChild(releaseDate);
  const genresDiv = document.createElement("div");
  genresDiv.setAttribute("class", "genres");
  const genres = document.createElement("h1");
  const genresTitle = document.createElement("h1");
  genresTitle.textContent = "place of birth  ";
  genres.innerHTML = moviesData.place_of_birth;
  genresDiv.appendChild(genresTitle);
  genresDiv.appendChild(genres);
  colDiv.appendChild(descriptionDiv);
  colDiv.appendChild(ratingDiv);
  colDiv.appendChild(releaseDateDiv);
  colDiv.appendChild(genresDiv);

  const backdropDiv = document.createElement("div");
  backdropDiv.setAttribute("class", "backdrop");
  const backdrop = document.createElement("img");
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

    const castName = document.createElement("h4");
    const castImage = document.createElement("img");
    const castURL = `https://www.themoviedb.org/t/p/w440_and_h660_face/${creditsData.cast[i].poster_path}`;
    if (creditsData.cast[i].poster_path) {
      castImage.setAttribute("src", castURL);
    } else {
      castImage.src = `https://placehold.co/100x150?text=${creditsData.cast[i].name}&font=playfair`;
    }
    cast.addEventListener("click", () => {
      window.location.href = `/Single%20Movie%20Page/SingleMoviePage.html?id=${creditsData.cast[i].id}`;
    });
    castName.textContent = creditsData.cast[i].title;
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

      const crewName = document.createElement("h4");
      const crewImage = document.createElement("img");
      const crewURL = creditsData.crew[j].poster_path
        ? `https://www.themoviedb.org/t/p/w440_and_h660_face/${creditsData.crew[j].poster_path}`
        : null;

      if (crewURL) {
        crewImage.setAttribute("src", crewURL);
      } else {
        crewImage.src = `https://placehold.co/100x150?text=${creditsData.crew[j].title}&font=playfair`;
        crewImage.setAttribute("class", "wrong");
      }
      crew.addEventListener("click", () => {
        window.location.href = `/Single%20Movie%20Page/SingleMoviePage.html?id=${creditsData.crew[j].id}`;
      });
      crewName.textContent = creditsData.crew[j].title;

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
}
displayOneMovieDetails();
async function displayExternalIdsDetails() {
  const searchParams = new URLSearchParams(window.location.search);
  const oneMovieId = searchParams.get("id");
  const externalIds = await fetchExternalIdsData(oneMovieId);
  externalIds.instagram_id;
  console.log(externalIds.instagram_id);
  mySidenav.innerHTML = ` 
  <a href="https://www.instagram.com/${externalIds.instagram_id}/" id="about" target="_blank">INSTAGRAM</a>
  <a href="https://www.facebook.com/${externalIds.facebook_id}/" id="blog" target="_blank">FACEBOOK</a>
  <a href="https://www.youtube.com/@${externalIds.youtube_id}" id="projects" target="_blank">YOUTUBE</a>
  <a href="https://www.tiktok.com/@${externalIds.tiktok_id}" id="contact" target="_blank">TIKTOK</a>`;
}
displayExternalIdsDetails();
window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementById("mySidenav");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky1");
  } else {
    navbar.classList.remove("sticky1");
  }
}
