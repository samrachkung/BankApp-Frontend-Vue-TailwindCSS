import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/styles/tailwind.css'
// // In your main.js
// import { initMobileUtils } from './utils/mobile.js'

// // Initialize mobile utilities
// initMobileUtils()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')