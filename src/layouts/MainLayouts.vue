<template>
  <div class="min-h-screen bg-primary">
    <Navbar />
    <slot />
  </div>
</template>
<script setup>
import Navbar from "../components/Navbar.vue";
</script>
