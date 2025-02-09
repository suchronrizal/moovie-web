import { defineStore } from "pinia";
import {
  fetchMovieDetails,
  fetchMovies,
  fetchMoviesByTitle,
  fetchRecomendedMovies,
  getMoviesWithFilter,
  searchMovies,
} from "../api/tmdb";
const options = [
  { label: "Popularity Ascending", value: "popularity.asc" },
  { label: "Popularity Descending", value: "popularity.desc" },
  { label: "Release Date Ascending", value: "release_date.asc" },
  { label: "Release Date Descending", value: "release_date.desc" },
  { label: "Rating Ascending", value: "vote_average.asc" },
  { label: "Rating Descending", value: "vote_average.desc" },
];

export const useMoviesStore = defineStore("moviesStore", {
  state: () => ({
    movies: [],
    autocompleteMovies: [],
    detailMovie: {},
    isLoading: false,
    errorMessage: null,
    selectedGenres: [],
    selectedOption: "popularity.desc",
    isDropdownOpen: false,
    hasMoreMovies: true,
    page: 1,
  }),

  actions: {
    async fetchMoviesList(filter = "popularity.desc") {
      this.isLoading = true;
      this.errorMessage = null;

      try {
        const response = await fetchMovies(filter);
        this.movies = response;
      } catch (error) {
        console.error("Error fetching movies:", error);
        this.errorMessage = "Failed to load movies. Please try again later.";
      } finally {
        this.isLoading = false;
      }
    },

    async searchMoviesAutocomplete(query) {
      if (query.trim() === "") {
        this.autocompleteMovies = [];
        return;
      }

      this.isLoading = true;
      this.errorMessage = null;
      try {
        const response = await searchMovies(query);
        this.autocompleteMovies = response;
      } catch (error) {
        console.error("Error searching movies:", error);
        this.errorMessage =
          "Failed to load search results. Please try again later.";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchMoviesListByTitle(title) {
      this.isLoading = true;
      this.errorMessage = null;

      this.selectedOption = "popularity.desc";
      this.selectedGenres = [];
      this.movies = [];
      try {
        const response = await fetchMoviesByTitle(title);
        this.movies = response;
      } catch (error) {
        console.error(error);
        this.errorMessage =
          "Failed to load movies by title. Please try again later.";
      } finally {
        this.isLoading = false;
      }
    },

    async getDetailMovie(id) {
      this.isLoading = true;
      this.errorMessage = null;
      try {
        const response = await fetchMovieDetails(id);
        this.detailMovie = response;
      } catch (error) {
        console.error(error);
        this.errorMessage =
          "Failed to load movie details. Please try again later.";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchRecomendationMovies(id) {
      this.isLoading = true;
      this.errorMessage = null;
      try {
        const response = await fetchRecomendedMovies(id);
        this.movies = response;
      } catch (error) {
        console.error("Error fetching recommendation movies:", error);
        this.errorMessage =
          "Failed to load recommended movies. Please try again later.";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchMoviesWithFilter(
      shortBy = "popularity.desc",
      genres = "",
      page = 1
    ) {
      this.isLoading = true;
      this.errorMessage = null;
      try {
        const response = await getMoviesWithFilter(shortBy, genres, page);
        if (response.length === 0) {
          this.hasMoreMovies = false;
        } else {
          this.movies = page > 1 ? [...this.movies, ...response] : response;
          this.hasMoreMovies = true;
          this.page = page;
        }
      } catch (error) {
        console.error("Error fetching filtered movies:", error);
        this.errorMessage =
          "Failed to load movies by filter. Please try again later.";
      } finally {
        this.isLoading = false;
      }
    },

    async loadMoreMovies() {
      await this.fetchMoviesWithFilter(
        this.selectedOption,
        this.selectedGenres.join(","),
        this.page + 1
      );
    },

    toggleGenre(genreId) {
      if (this.selectedGenres.includes(genreId)) {
        this.selectedGenres = this.selectedGenres.filter(
          (id) => id !== genreId
        );
      } else {
        this.selectedGenres.push(genreId);
      }
      this.fetchMoviesWithFilter(
        this.selectedOption,
        this.selectedGenres.join(","),
        1
      );
    },

    async selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;

      this.fetchMoviesWithFilter(option, this.selectedGenres.join(","), 1);
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },

  getters: {
    getLabelByValue: (state) => (value) => {
      const option = options.find((opt) => opt.value === value);
      return option ? option.label : "Unknown Option";
    },
  },
});
