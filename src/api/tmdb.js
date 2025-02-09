import axios from "axios";

const API_KEY = "78204f7b09a9a86eff53f87ce321ef8d";
const BASE_URL = "https://api.themoviedb.org/3/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const fetchMovies = async (shortBy = "popularity.desc") => {
  const response = await apiClient.get("/discover/movie", {
    params: {
      sort_by: shortBy,
    },
  });
  return response.data.results;
};

export const fetchTopMovies = async () => {
  const response = await apiClient.get("/movie/popular");
  return response.data.results.slice(0, 10);
};

export const getCategoryMovies = async () => {
  const response = await apiClient.get(`/genre/movie/list`);
  return response.data.genres;
};

export const searchMovies = async (query) => {
  const response = await apiClient.get("/search/movie", {
    params: {
      query,
    },
  });
  return response.data.results;
};

export const fetchMoviesByTitle = async (title) => {
  const response = await apiClient.get(`/search/movie`, {
    params: {
      query: title,
    },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (id) => {
  const response = await apiClient.get(`/movie/${id}`);
  return response.data;
};

export const fetchRecomendedMovies = async (id) => {
  const response = await apiClient.get(`/movie/${id}/recommendations`);
  return response.data.results;
};

export const getMoviesWithFilter = async (
  shortBy = "popularity.desc",
  genres = "",
  page = 1
) => {
  const response = await apiClient.get("/discover/movie", {
    params: {
      sort_by: shortBy,
      with_genres: genres,
      page,
    },
  });
  return response.data.results;
};

export const getReviews = async (movieId) => {
  const response = await apiClient.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
