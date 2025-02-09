<template>
  <MainLayouts>
    <Slideshow />
    <div class="relative w-full min-h-screen">
      <div class="absolute top-0 w-full h-[286px] bg-secondary"></div>
      <!-- Container -->
      <div class="relative z-10 max-w-7xl mx-auto py-12">
        <div class="flex justify-between w-full">
          <div class="w-1/2">
            <div class="bg-orange h-1 w-16 rounded">&nbsp;</div>
            <h1 class="text-xl text-white mb-4 uppercase">Discover Movies</h1>
          </div>
          <div class="w-1/2 flex gap-3 justify-end">
            <FilterButton
              label="Popularity"
              filterValue="popularity.desc"
              :currentFilter="currentFilter"
              @click="setFilter('popularity.desc')"
            />
            <FilterButton
              label="Release Date"
              filterValue="primary_release_date.desc"
              :currentFilter="currentFilter"
              @click="setFilter('primary_release_date.desc')"
            />
          </div>
        </div>
        <div v-if="useMoviesStore.isLoading" class="grid grid-cols-5 gap-4">
          <div
            v-for="n in 5"
            :key="n"
            class="bg-gray-700 rounded-lg p-4 animate-pulse h-[400px]"
          ></div>
        </div>

        <div
          v-else-if="moviesStore.movies.length > 0"
          class="grid grid-cols-5 gap-4 place-items-center"
        >
          <MovieCard
            v-for="movie in moviesStore.movies"
            :key="movie.id"
            :movie="formatCardMovie(movie)"
          />
        </div>

        <p v-else-if="moviesStore.errorMessage" class="text-red-500">
          {{ moviesStore.errorMessage }}
        </p>
        <p v-else class="text-gray-400">No movies found.</p>
      </div>
    </div>
  </MainLayouts>
  <Footer />
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useMoviesStore } from "../stores/mooviesStore";

import Footer from "../components/Footer.vue";
import MovieCard from "../components/MovieCard.vue";
import Slideshow from "../components/Slideshow.vue";
import MainLayouts from "../layouts/MainLayouts.vue";
import FilterButton from "../components/FilterButton.vue";

import { formatCardMovie } from "../utils/formatting";
import { useRouter } from "vue-router";

const router = useRouter();
const moviesStore = useMoviesStore();

const currentFilter = ref("popularity.desc");
const setFilter = (filter) => {
  if (currentFilter.value !== filter) {
    currentFilter.value = filter;
  }
  router.push({});
};

onMounted(() => {
  moviesStore.fetchMoviesList(currentFilter.value);
});

watch(currentFilter, (newFilter) => {
  moviesStore.fetchMoviesList(newFilter);
});
</script>
