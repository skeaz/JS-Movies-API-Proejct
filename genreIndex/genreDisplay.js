// genreDisplay.js
import { genreMovie } from "../wholeJS/api.js";

export async function displayGenreMovie(container, fetchDataFunction) {
  const moviesData = await fetchDataFunction();
  moviesData.forEach((movie) => {
    const herf = document.createElement("a");
    herf.innerHTML = movie.name;
    herf.setAttribute("href", "#");
    herf.setAttribute("id", `${movie.id}`);
    container.appendChild(herf);
    herf.addEventListener("click", async () => {
      window.location.href = `/genreIndex/GenreMovie.html?id=${movie.id}`;
    });
  });
}
