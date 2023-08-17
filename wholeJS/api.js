// api.js
export async function fetchVideos(movieId) {
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
fetchVideos(569094)
export async function getPopularMovies() {
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

export async function getTopRatedMovies() {
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

export async function getTrendingMovies() {
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

export async function getNowPlayingMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=964229305065dd1ee3856990531a8f15`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function genreMovie() {
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
