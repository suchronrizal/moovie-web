<template>
  <div
    v-if="movie"
    class="overflow-hidden w-full cursor-pointer group relative"
  >
    <div class="relative">
      <img
        :src="movie.image"
        alt="Movie Poster"
        loading="lazy"
        class="w-full h-[383px] object-cover"
      />
      <div
        class="absolute top-0 right-0 bg-secondary opacity-60 text-white text-xs font-bold p-2"
      >
        {{ movie.rating }}
      </div>
    </div>
    <div class="p-3">
      <h3 class="text-white text-lg font-semibold truncate">
        {{ movie.title }}
      </h3>
      <p class="text-gray-400 text-sm">{{ movie.year }}</p>
    </div>
    <div
      class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3"
    >
      <!-- Rating -->
      <div class="flex flex-row gap-2 items-center text-white text-xl">
        <Icon icon="solar:star-bold" class="h-6 w-6 text-yellow-500" />
        <span>{{ movie.rating }}</span>
      </div>

      <div class="flex items-center py-7 text-white text-2xl">Action</div>
      <!-- View Button -->
      <button
        class="bg-red-500 text-white font-bold px-4 py-1 w-28 rounded-full hover:bg-red-600 cursor-pointer"
        @click="handleClick(movie)"
      >
        VIEW
      </button>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useRouter } from "vue-router";
const router = useRouter();
defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
const handleClick = (movie) => {
  router.push({ path: `/movie/${movie.id}` });
};
</script>
<style scoped></style>
