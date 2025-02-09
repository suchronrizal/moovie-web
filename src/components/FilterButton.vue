<template>
  <button
    :class="[
      {
        'bg-red text-white': currentFilter === filterValue,
        'bg-gray-700 text-white': currentFilter !== filterValue,
      },
      'px-4 py-0 h-8 text-sm rounded-full hover:bg-red-600 cursor-pointer',
    ]"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    filterValue: {
      type: String,
      required: true,
    },
    currentFilter: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang=""></style>
