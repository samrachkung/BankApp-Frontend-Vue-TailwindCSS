<template>
  <div :class="['flex items-center justify-center', sizeClass]">
    <svg
      class="animate-spin text-primary-600"
      :class="spinnerSizeClass"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <span v-if="text" class="ml-2 text-gray-600 dark:text-gray-400">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    sizeClass() {
      const sizes = {
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8'
      }
      return sizes[this.size]
    },
    spinnerSizeClass() {
      const sizes = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12'
      }
      return sizes[this.size]
    }
  }
}
</script>