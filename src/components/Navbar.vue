<template>
  <div class="bg-secondary w-full">
    <nav
      class="flex items-center max-w-7xl mx-auto justify-between p-4 bg-secondary"
    >
      <div class="flex items-center gap-2">
        <img
          src="@/assets/logo.svg"
          alt="Logo"
          class="h-8 cursor-pointer"
          @click="$router.push({ name: 'home' })"
        />
      </div>

      <!-- Search Bar -->
      <div
        class="flex w-1/2 items-center bg-primary rounded px-3 py-2 relative"
      >
        <Icon icon="heroicons-outline:film" class="h-5 w-5 text-gray-400" />
        <input
          v-model="searchQuery"
          @input="handleAutocomplete"
          type="text"
          autocomplete="off"
          placeholder="Find movies..."
          class="ml-2 bg-transparent text-white placeholder-gray-400 focus:outline-none w-full"
        />
        <Icon
          v-if="searchQuery"
          icon="heroicons-outline:x"
          class="h-5 w-5 text-gray-400 cursor-pointer"
          @click="resetSearch"
        />
        <Icon v-else icon="bi:search" class="h-5 w-5 text-gray-400" />
        <ul
          v-if="autocompleteVisible"
          class="absolute left-0 top-9 w-full bg-third text-white mt-1 overflow-hidden shadow-lg z-20"
        >
          <li
            v-for="item in moviesStore.autocompleteMovies.slice(0, 10)"
            :key="item.id"
            class="py-1 px-4 hover:bg-gray-700 cursor-pointer"
            @click="selectMovie(item.title)"
            v-html="highlightMatch(item.title)"
          ></li>
          <li
            v-if="moviesStore.autocompleteMovies.length === 0 && searchQuery"
            class="py-2 px-4 text-gray-400"
          >
            No movies found.
          </li>
        </ul>
      </div>

      <!-- Menu Links -->
      <div class="flex items-center gap-6 text-white uppercase">
        <div
          class="flex items-center gap-1 cursor-pointer relative"
          @click="toggleDropdown"
        >
          <Icon icon="tabler:category-filled" class="h-5 w-5" />
          <span>Category</span>
          <ul
            class="absolute text-primary rounded w-40 z-30 flex flex-col shadow-lg top-12 -left-7 py-5 bg-white"
            v-if="isDropdownOpen"
          >
            <li
              v-for="genre in genres"
              :key="genre"
              class="py-1 cursor-pointer hover:bg-gray-200 text-sm"
            >
              <span class="px-4">{{ genre.name }}</span>
            </li>
          </ul>
        </div>
        <router-link to="/page-list" class="hover:text-gray-300"
          >Movies</router-link
        >
        <a href="#" class="hover:text-gray-300">TV Shows</a>
        <a href="#" class="hover:text-gray-300">Login</a>
      </div>
      <!-- Logo -->
    </nav>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useMoviesStore } from "../stores/mooviesStore";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const moviesStore = useMoviesStore();
const searchQuery = ref("");
const isDropdownOpen = ref(false);
const autocompleteVisible = ref(false);
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
let timeout;
const handleAutocomplete = async () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (searchQuery.value.trim()) {
      moviesStore.searchMoviesAutocomplete(searchQuery.value).then(() => {
        autocompleteVisible.value = true;
      });
    } else {
      resetSearch();
    }
  }, 500);
};

const highlightMatch = (text) => {
  const regex = new RegExp(searchQuery.value, "gi");
  return text.replace(
    regex,
    (match) => `<span class="font-bold text-white">${match}</span>`
  ); // eslint-disable-line
};

const selectMovie = (title) => {
  searchQuery.value = title;
  moviesStore.selectedGenres = [];
  moviesStore.selectedOption = "popularity.desc";
  router.push({ query: { search: title } });

  moviesStore.fetchMoviesListByTitle(title);
  autocompleteVisible.value = false;
};

const resetSearch = () => {
  searchQuery.value = "";
  moviesStore.autocompleteMovies = [];
  autocompleteVisible.value = false;
  moviesStore.selectedGenres = [];
  moviesStore.fetchMoviesList(); //Reset default

  router.push({ query: {} });
};

watch(
  () => route.query.search,
  (newQuery) => {
    if (newQuery) {
      searchQuery.value = newQuery;
      moviesStore.fetchMoviesListByTitle(newQuery);
    } else {
      resetSearch();
    }
  },
  {
    immediate: true,
  }
);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
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
