// movieDisplay.js
import { fetchVideos } from './api.js';

export async function displayMoviesList(container, fetchDataFunction) {
    const moviesData = await fetchDataFunction();
    moviesData.forEach((movie) => {
        const moviesList = document.createElement("div");
        moviesList.classList.add("card1");
        const movieImg = document.createElement("img");
        movieImg.classList.add("card-img-top1");
        const imgURL = `https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.backdrop_path}`;
        if (movie.backdrop_path) {
            movieImg.src = imgURL;
          } else {
            movieImg.src = `https://fakeimg.pl/470x470?text=${movie.title}`;
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
        voteAverage.innerHTML = `IMDB : ${movie.vote_average}`;

        // console.log(movie);

        container.appendChild(moviesList);

        moviesList.appendChild(movieImg);
        moviesList.appendChild(cardBody);
        cardBody.appendChild(nameAndRelease);
        nameAndRelease.appendChild(movieTitle);
        nameAndRelease.appendChild(voteAverage);
        cardBody.appendChild(movieReleaseDate);
    });}
