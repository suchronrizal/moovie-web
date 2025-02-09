<template>
  <MainLayouts>
    <div class="relative w-full min-h-screen">
      <div
        class="absolute top-0 w-full min-h-[286px] max-h-1/2 bg-secondary"
      ></div>

      <div class="relative z-10 max-w-7xl mx-auto py-24 p-4">
        <div class="bg-orange h-1 w-16 rounded">&nbsp;</div>
        <h1 class="text-2xl text-white mb-4 uppercase">Movies</h1>
        <div class="flex justify-between items-start gap-4">
          <!-- Sidebar Filter -->
          <div
            class="flex flex-col w-72 bg-gradient-to-b from-third to-primary rounded-lg justify-start h-[calc(100vh-1rem)] sticky top-4"
          >
            <div class="text-white mt-4 px-5 font-semibold">Sort Result By</div>
            <hr class="hr-custom" />
            <div class="w-full flex justify-center px-5 mb-5">
              <!-- Dropdown -->
              <Dropdownfilter
                :options="options"
                :selectedOption="moviesStore.selectedOption"
                @update:selectedOption="
                  (value) => (moviesStore.selectedOption = value)
                "
              />
            </div>
            <hr class="hr-custom" />
            <div class="text-white px-5 font-semibold">Genres</div>
            <hr class="hr-custom" />
            <!-- Checkbox -->
            <div class="w-full px-5 rounded-md">
              <div
                v-for="genre in genres"
                :key="genre.id"
                class="flex justify-between items-center mb-2"
              >
                <label
                  :for="'genre-' + genre.id"
                  class="flex justify-between items-center w-full cursor-pointer"
                >
                  <input
                    type="checkbox"
                    :id="'genre-' + genre.id"
                    v-model="moviesStore.selectedGenres"
                    :value="genre.id"
                    class="hidden peer"
                  />

                  <span class="text-slate-300">{{ genre.name }}</span>
                  <div
                    class="w-5 h-5 bg-primary rounded border-2 border-gray-500 flex items-center justify-center peer-checked:bg-red-500 [&>span]:peer-checked:translate-x-full"
                  >
                    <svg
                      v-if="moviesStore.selectedGenres.includes(genre.id)"
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <!-- Movies -->
          <div class="flex-1">
            <div v-if="moviesStore.isLoading" class="grid grid-cols-4 gap-4">
              <div
                v-for="n in 4"
                :key="n"
                class="bg-gray-500 rounded-lg p-4 animate-pulse h-[383px]"
              ></div>
            </div>
            <div
              v-else-if="moviesStore.movies.length > 0"
              class="grid grid-cols-4 gap-4"
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
            <div
              class="w-full flex justify-center mt-5"
              v-if="moviesStore.movies.length > 10"
            >
              <button
                @click="moviesStore.loadMoreMovies"
                class="bg-red text-white px-4 py-2 rounded-md flex items-center justify-center w-32 hover:bg-red-700 cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
                :disabled="!moviesStore.hasMoreMovies || moviesStore.isLoading"
              >
                {{ moviesStore.hasMoreMovies ? "Load More" : "No More Movies" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayouts>
</template>
<script setup>
import MainLayouts from "../layouts/MainLayouts.vue";
import { onMounted, ref, watch } from "vue";
import MovieCard from "../components/MovieCard.vue";
import { formatCardMovie } from "../utils/formatting";
import { useMoviesStore } from "../stores/mooviesStore";
import { useRouter } from "vue-router";
import Dropdownfilter from "../components/Dropdownfilter.vue";
const router = useRouter();
const moviesStore = useMoviesStore();

const genres = ref([
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
]);

const options = ref([
  { label: "Popularity Ascending", value: "popularity.asc" },
  { label: "Popularity Descending", value: "popularity.desc" },
  { label: "Release Date Ascending", value: "release_date.asc" },
  { label: "Release Date Descending", value: "release_date.desc" },
  { label: "Rating Ascending", value: "vote_average.asc" },
  { label: "Rating Descending", value: "vote_average.desc" },
]);

onMounted(() => {
  moviesStore.fetchMoviesWithFilter(
    moviesStore.selectedOption,
    moviesStore.selectedGenres.join(",")
  );
});

watch(
  () => moviesStore.selectedOption,
  (newOption) => {
    moviesStore.fetchMoviesWithFilter(
      newOption,
      moviesStore.selectedGenres.join(",")
    );
  }
);

watch(
  () => moviesStore.selectedGenres,
  (newGenres) => {
    moviesStore.fetchMoviesWithFilter(
      moviesStore.selectedOption,
      newGenres.join(","),
      1
    );
    router.push({ query: {} });
  }
);
</script>
<style scoped>
ul {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
