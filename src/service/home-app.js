export const KEY = 'f63615632bb4d22515832e1a6cf24a3e';
export const BASE_URL = `https://api.themoviedb.org/3`;

export function fetchMoviesSearch(name) {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${KEY}&query=${name}&language=en-US&page=1&include_adult=false`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}

export function fetchMoviesHomePage() {
  return fetch(`${BASE_URL}/trending/all/day?api_key=${KEY}`).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}

export function fetchMoviesInfo(movie_id) {
  return fetch(`${BASE_URL}/movie/${movie_id}?api_key=${KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
    },
  );
}

export function fetchActorsInfo(movie_id) {
  return fetch(
    `${BASE_URL}/movie/${movie_id}/credits?api_key=${KEY}&language=en-US`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}

export function fetchReviews(movie_id) {
  return fetch(
    `${BASE_URL}/movie/${movie_id}/reviews?api_key=${KEY}&language=en-US&page=1`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}
