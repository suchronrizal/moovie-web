<template>
  <div class="flex justify-center flex-col items-center h-screen bg-primary">
    <h1 class="text-3xl font-bold text-white">404 Not Found</h1>
    <RouterLink
      to="/"
      class="text-white bg-red px-4 py-2 rounded-full cursor-pointer mt-4"
      >Back to Home</RouterLink
    >
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
</script>
<style lang=""></style>
