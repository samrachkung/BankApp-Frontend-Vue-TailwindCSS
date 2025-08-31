import { createPinia } from 'pinia'

// Create and export the pinia instance
export const pinia = createPinia()

// Export all stores for convenient importing
export { useAppStore } from './appStore'
export { useAuthStore } from './authStore'
export { useAccountStore } from './accountStore'
export { useTransferStore } from './transferStore'
export { useNotificationStore } from './notificationStore'

// src/main.js (Update your main.js file)
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './store'
import './assets/styles/tailwind.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

// SOLUTION FOR YOUR IMPORT ERROR:
// In your Settings.vue file, change this import:
// import { useAppStore } from '../store/appStore'
// 
// To one of these options:

// OPTION 1: Direct import (recommended)
// import { useAppStore } from '../../store/appStore'

// OPTION 2: Import from index (if you prefer centralized imports)
// import { useAppStore } from '../../store'

// OPTION 3: Use absolute import with alias (requires vite.config.js setup)
// import { useAppStore } from '@/store/appStore'

// Example of how to update your vite.config.js for absolute imports:
/* 
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
*/