<template>
  <div class="bg-third text-slate-300 w-full">
    <div class="flex justify-between max-w-7xl mx-auto items-center h-22">
      <div class="flex-1">&copy; 2025 MoovieTime. All rights reserved</div>
      <div class="flex-1 justify-items-center">
        <img
          src="/src/assets/logo.svg"
          alt="logo"
          class="cursor-pointer"
          @click="$router.push({ name: 'home' })"
        />
      </div>
      <div class="flex-1 text-right">Made with Vue Js</div>
    </div>
  </div>
</template>
<script setup></script>
