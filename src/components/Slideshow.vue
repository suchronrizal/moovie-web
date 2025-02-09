<template>
  <div class="w-full px-8 py-12 hx-auto bg-primary">
    <swiper-container
      ref="swiperRef"
      :slides-per-view="2.5"
      :space-between="20"
      centeredSlides="true"
      grabCursor="true"
      loop="true"
      pagination="{ clickable: true }"
      class="swiper-container"
      :observer="true"
      :observe-parents="true"
    >
      <swiper-slide
        v-for="(slide, index) in slides"
        :key="index"
        class="relative"
      >
        <RouterLink :to="`/movie/${slide.id}`">
          <div class="flex items-center">
            <img
              :src="slide.image"
              alt="Movie Cover"
              class="h-[364px] w-[243px] object-cover shadow-lg"
            />
            <div
              class="text-white bg-third p-4 h-[324px] flex flex-col justify-items-center"
            >
              <p class="mt-2 flex gap-1 items-center">
                <Icon
                  icon="solar:star-bold"
                  class="h-3 w-3"
                  style="color: #f7d208"
                />
                {{ slide.rating }}
              </p>
              <h2 class="text-2xl">{{ slide.title }}</h2>
              <p class="text-gray-300 mt-2">
                {{ slide.year }} ● {{ slide.genres }}
              </p>
              <p class="mt-4 text-gray-400">
                {{ slide.overview }}
              </p>
            </div>
          </div>
        </RouterLink>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
<script setup>
import { fetchTopMovies, getCategoryMovies } from "../api/tmdb";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { register } from "swiper/element/bundle";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

register();
const isLoading = ref(false);
const errorMessage = ref(null);
const slides = ref([]);
const genres = ref({});
const swiperRef = ref(null);

onMounted(async () => {
  await getGenres();
  await getNowPlaying();

  const swiperIntance = swiperRef.value.swiper;
  swiperIntance.slideTo(3, 0);
});

const getGenres = async () => {
  try {
    const genreLists = await getCategoryMovies();
    genres.value = genreLists.reduce((acc, movie) => {
      acc[movie.id] = movie.name;
      return acc;
    }, {});
  } catch (error) {
    console.log(error);
  }
};

const getNowPlaying = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  try {
    const response = await fetchTopMovies();
    isLoading.value = false;
    slides.value = response.map((movie) => formatCard(movie));
  } catch (error) {
    console.error(error);
    errorMessage.value = "Failed to load movies. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

const formatCard = (movie) => ({
  id: movie.id,
  title: movie.title,
  image: movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : new URL("@/assets/no_images.png", import.meta.url).href,
  rating: movie.vote_average ? +movie.vote_average.toFixed(1) : "N/A",
  year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
  overview: movie.overview || "No overview available.",
  genres: movie.genre_ids
    ? movie.genre_ids.map((id) => genres.value[id]).join(", ")
    : "N/A",
});
</script>
<style scoped>
swiper-container {
  height: 400px;
}
swiper-container::part(pagination) {
  height: 40px;
}
swiper-container::part(bullet) {
  background-color: #fff;
  width: 10px;
  height: 10px;
  opacity: 0.6;
  border-radius: 50%;
  transform: translateY(20px);
}
swiper-container::part(bullet-active) {
  background-color: var(--color-orange);
  width: 50px;
  border-radius: 10px;

  transform: translateY(20px);
}

.swiper-pagination {
  --swiper-pagination-bottom: 2px;
}
</style>
