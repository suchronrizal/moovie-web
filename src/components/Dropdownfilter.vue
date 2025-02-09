<template>
  <div class="relative w-full">
    <button
      @click="toggleDropdown"
      class="bg-secondary text-white px-4 py-2 rounded-md flex items-center justify-between w-full"
    >
      <span>{{ getLabelByValue(selectedOption) }}</span>
      <Icon icon="material-symbols:arrow-drop-down" class="h-5 w-5" />
    </button>
    <ul
      v-if="isDropdownOpen"
      class="absolute z-10 mt-1 w-full bg-primary rounded-md shadow-lg"
    >
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option.value)"
        class="text-white px-4 py-2 hover:bg-gray-700 cursor-pointer"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  selectedOption: {
    type: String,
    required: true,
  },
});
const emit = defineEmits();

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectOption = (value) => {
  emit("update:selectedOption", value);
  isDropdownOpen.value = false;
};

const getLabelByValue = (value) => {
  if (!Array.isArray(props.options)) return "Select Option";
  const option = props.options.find((o) => o.value === value);
  return option ? option.label : "Select Option";
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
