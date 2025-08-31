<template>
  <div :class="{'dark': darkMode}">
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <router-view />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAppStore } from './store/appStore'

export default {
  name: 'App',
  setup() {
    const appStore = useAppStore()
    const darkMode = computed(() => appStore.darkMode)
    
    return {
      darkMode
    }
  }
}
</script>