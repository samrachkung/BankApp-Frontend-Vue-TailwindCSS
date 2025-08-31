<template>
  <div :class="['card', { 'hover:shadow-lg transition-shadow': hover }]">
    <div v-if="$slots.header || title" class="flex items-center justify-between mb-4">
      <h3 v-if="title" class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <slot name="header"></slot>
    </div>
    
    <div :class="['card-body', bodyClass]">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: ''
    },
    hover: {
      type: Boolean,
      default: false
    },
    bodyClass: {
      type: String,
      default: ''
    }
  }
}
</script>