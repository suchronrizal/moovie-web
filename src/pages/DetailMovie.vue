<template>
  <div class="relative w-full min-h-[500px]">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img
        :src="detailMovie.backdrop"
        alt="Backdrop Image"
        loading="lazy"
        class="w-full h-[500px] object-cover"
      />
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>
    <div
      class="absolute top-0 left-0 right-0 h-20 bg-secondary opacity-70"
    ></div>
    <div class="absolute inset-0 bg-secondary opacity-50">
      <Navbar />
    </div>
    <!-- Movie Details -->
    <div
      class="text-black absolute inset-x-0 bottom-[-120px] mx-auto w-full max-w-7xl px-4 z-10"
    >
      <div class="flex flex-col md:flex-row items-center">
        <img
          :src="detailMovie.image"
          alt="Movie Poster"
          loading="lazy"
          class="h-[330px] w-[220px] object-cover border-4 border-white shadow-lg"
        />
        <div class="ml-0 md:ml-4 text-white max-h-[250px]">
          <p>{{ detailMovie.year }}</p>
          <h1 class="text-2xl font-bold">{{ detailMovie.title }}</h1>
          <p class="text-gray-300">{{ detailMovie.genres }}</p>

          <div
            class="flex justify-between gap-2 mt-10 font-normal text-xs uppercase items-center"
          >
            <div
              class="flex w-40 justify-between items-center gap-1 border-r border-slate-600 pr-3"
            >
              <div class="flex items-center">
                <Icon icon="solar:star-bold" class="h-6 w-6 text-yellow-500" />
                <span class="text-xl ml-1">{{ detailMovie.rating }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-slate-300">User Rating</span>
                {{ detailMovie.vote }} Votes
              </div>
            </div>
            <div class="part-detail-custom">
              <span class="text-slate-300">Status</span>
              {{ detailMovie.status }}
            </div>
            <div class="part-detail-custom">
              <span class="text-slate-300">Language</span>
              {{ detailMovie.language }}
            </div>
            <div class="part-detail-custom">
              <span class="text-slate-300">Budget</span>
              {{ detailMovie.budget }}
            </div>
            <div class="flex w-40 pl-6 flex-col">
              <span class="text-slate-300">Production</span>
              {{ detailMovie.production }}
            </div>
          </div>
          <div class="mt-9 text-black flex flex-col">
            <span class="text-red text-sm uppercase">Overview</span>
            <div class="w-3xl mt-3 max-h-[150px] overflow-y-hidden">
              {{ detailMovie.overview }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full right-0 left-0 bottom-0 absolute bg-black opacity-50 h-20 text-white"
    >
      &nbsp;
    </div>
  </div>
  <!-- Overview -->
  <div class="h-52"></div>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <h1 class="text-red text-md uppercase">Review</h1>
    <div class="grid grid-cols-2 gap-6 mt-5">
      <div
        v-for="review in reviewsRef"
        :key="review.id"
        class="bg-gray-100 p-6 rounded-lg"
      >
        <div class="flex justify-between items-center mb-4">
          <div class="flex w-1/2">
            <img
              :src="review.author_img"
              loading="lazy"
              alt="Reviewer"
              class="w-12 h-12 rounded-full"
            />
            <div class="ml-4">
              <h3 class="text-primary">{{ review.author }}</h3>
              <p class="text-gray-400 text-sm">{{ review.updated_at }}</p>
            </div>
          </div>
          <div class="flex w-1/2 justify-end">
            <div
              class="flex items-center gap-1 font-bold text-yellow-500 text-xl bg-gray-200 p-2 px-4 text-md rounded-lg"
            >
              <Icon icon="solar:star-bold" class="h-2 w-2" />
              {{ review.rating }}
            </div>
          </div>
        </div>

        <p class="text-primary mt-4">{{ review.content }}</p>
      </div>
      <div v-if="reviewsRef.length === 0" class="col-span-2">
        <p class="text-gray-400">No reviews found.</p>
      </div>
    </div>
  </div>
  <!-- Recommendation Movies -->
  <div class="mt-10 bg-secondary">
    <div class="max-w-7xl mx-auto text-white py-10">
      <h1 class="uppercase">Recommendation Movie</h1>
      <div class="grid grid-cols-5 gap-4 py-7">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="formatCardMovie(movie)"
        />
      </div>
    </div>
  </div>
  <Footer />
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";
import MovieCard from "../components/MovieCard.vue";
import Footer from "../components/Footer.vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useMoviesStore } from "../stores/mooviesStore";

import {
  formatCardMovie,
  formatDetailMovie,
  formatReviews,
} from "../utils/formatting";
import { getReviews } from "../api/tmdb";

const moviesStore = useMoviesStore();
const route = useRoute();
const reviewsRef = ref([]);

const movies = computed(() => moviesStore.movies.slice(0, 5));
const detailMovie = computed(() => formatDetailMovie(moviesStore.detailMovie));

onMounted(() => {
  fetchMovieData(route.params.id);
});

watch(
  () => route.params.id,
  async (newMovieId) => {
    await fetchMovieData(newMovieId);
  }
);
const fetchMovieData = async (movieId) => {
  try {
    await Promise.all([
      moviesStore.fetchRecomendationMovies(movieId),
      moviesStore.getDetailMovie(movieId),
      fetchReviews(movieId),
    ]);
  } catch {
    console.log("Error fetching movie data:", error);
  }
};

watch(detailMovie, (newValue) => {
  if (newValue && Object.keys(newValue).length) {
    console.log("Movie Detail Fetched:");
  }
});

const fetchReviews = async (movie) => {
  try {
    const response = await getReviews(movie);
    reviewsRef.value = formatReviews(response.slice(0, 2));
  } catch {
    console.log("error");
  }
};
</script>
<style scoped></style>
