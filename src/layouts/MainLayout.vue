<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Mobile Sidebar Overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 z-50 md:hidden">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        @click="closeSidebar"
        aria-hidden="true"
      ></div>
      
      <!-- Mobile Sidebar -->
      <aside class="relative w-64 bg-white dark:bg-gray-800 shadow-lg z-40 flex-shrink-0 flex flex-col h-full overflow-y-auto">
        <!-- Close button for mobile -->
        <div class="flex items-center justify-between h-16 px-4 bg-primary-600 dark:bg-primary-700 flex-shrink-0">
          <div class="flex items-center space-x-2">
            <div class="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow">
              <svg class="h-7 w-7 text-primary-600" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2" fill="#f3f4f6"/>
                <path d="M10 20c2-4 10-4 12 0" stroke="#2563eb" stroke-width="2" stroke-linecap="round" fill="none"/>
                <path d="M16 10v6" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
                <circle cx="16" cy="8" r="1.5" fill="#2563eb"/>
              </svg>
            </div>
            <span class="text-white text-xl font-bold tracking-wide">Rach Bank</span>
          </div>
          <button 
            @click="closeSidebar"
            class="text-white hover:text-gray-200 focus:outline-none"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Mobile Navigation -->
        <div class="flex-1 overflow-y-auto pt-5 pb-4">
          <nav class="mt-5 px-2 space-y-1">
            <RouterLink 
              v-for="item in navigation" 
              :key="item.name" 
              :to="item.to" 
              class="group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors"
              :class="[isActive(item.to) ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700']"
              @click="closeSidebar"
            >
              <component 
                :is="item.icon" 
                class="mr-4 h-6 w-6"
                :class="[isActive(item.to) ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400']"
              />
              {{ item.name }}
            </RouterLink>
          </nav>
        </div>
        
        <!-- Mobile User Info -->
        <div class="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" :src="user.avatar || 'https://via.placeholder.com/40'" alt="User avatar">
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ user.firstName }} {{ user.lastName }}</p>
              <button 
                @click="logout" 
                class="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- Desktop Layout -->
    <div class="flex">
      <!-- Desktop Sidebar - Your existing component -->
      <div class="hidden md:flex">
        <Sidebar />
      </div>
      
      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col min-h-screen">
        <!-- Navbar - Fixed at top -->
        <div class="sticky top-0 z-30">
          <Navbar @toggle-sidebar="toggleSidebar" />
        </div>
        
        <!-- Scrollable Content -->
        <main class="flex-1 p-4 md:p-6">
          <div class="max-w-7xl mx-auto">
            <router-view />
          </div>
        </main>
        
        <!-- Footer -->
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '../store/appStore'
import { useAuthStore } from '../store/authStore'
import Sidebar from '../components/common/Sidebar.vue'
import Navbar from '../components/common/Navbar.vue'
import Footer from '../components/common/Footer.vue'
import {
  HomeIcon,
  CreditCardIcon,
  ArrowRightIcon,
  ReceiptRefundIcon,
  BellIcon,
  CogIcon,
  QuestionMarkCircleIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'MainLayout',
  components: {
    Sidebar,
    Navbar,
    Footer
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const appStore = useAppStore()
    const authStore = useAuthStore()
    
    const sidebarOpen = computed(() => appStore.sidebarOpen)
    const user = computed(() => authStore.user || {})
    
   
    const navigation = [
      { name: 'Home', to: '/home', icon: HomeIcon },
      { name: 'Accounts', to: '/accounts', icon: CreditCardIcon },
      { name: 'Transfers', to: '/transfer', icon: ArrowRightIcon },
      { name: 'Bill Payments', to: '/pay-bills', icon: ReceiptRefundIcon },
      { name: 'Cards', to: '/cards', icon: CreditCardIcon },
      { name: 'Notifications', to: '/notifications', icon: BellIcon },
      { name: 'Settings', to: '/settings', icon: CogIcon },
      { name: 'Support', to: '/support', icon: QuestionMarkCircleIcon },
    ]
    
    // Function to check if device is mobile
    const isMobile = () => {
      return window.innerWidth < 768
    }
    
    // Initialize sidebar state based on device type
    const initializeSidebar = () => {
      if (isMobile()) {
        // Ensure sidebar is closed on mobile devices by default
        appStore.closeSidebar()
      }
    }
    
    // Handle window resize
    const handleResize = () => {
      if (isMobile() && sidebarOpen.value) {
        // Close sidebar when switching to mobile view
        appStore.closeSidebar()
      }
    }
    
    const toggleSidebar = () => {
      appStore.toggleSidebar()
    }
    
    const closeSidebar = () => {
      appStore.closeSidebar()
    }
    
    const isActive = (path) => {
      return route.path === path || route.path.startsWith(path + '/')
    }
    
    const logout = () => {
      authStore.logout()
      router.push({ name: 'Login' })
    }
    
    // Lifecycle hooks
    onMounted(() => {
      initializeSidebar()
      window.addEventListener('resize', handleResize)
    })
    
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })
    
    return {
      sidebarOpen,
      user,
      navigation,
      toggleSidebar,
      closeSidebar,
      isActive,
      logout
    }
  }
}
</script>

<style scoped>
/* Ensure proper mobile scrolling */
@media (max-width: 768px) {
  /* Allow body to scroll naturally on mobile */
  html, body {
    height: auto !important;
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  }
}

/* Remove fixed heights on mobile for better scrolling */
@media (max-width: 768px) {
  .min-h-screen {
    min-height: 100vh;
    height: auto;
  }
}

/* Ensure sidebar doesn't interfere with body scroll */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
}

/* Custom scrolling for webkit browsers */
* {
  -webkit-overflow-scrolling: touch;
}
</style>

<!-- ADDITIONAL CSS for index.html or main.css -->
<style>
/* Global CSS fixes for mobile scrolling - Add to your main CSS file */

/* Prevent horizontal scrolling */
html, body {
  overflow-x: hidden;
  width: 100%;
}

/* Mobile-specific fixes */
@media (max-width: 768px) {
  /* Ensure body can scroll */
  body {
    position: relative !important;
    height: auto !important;
    min-height: 100vh;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch;
  }
  
  /* Fix for iOS Safari */
  body.ios {
    height: -webkit-fill-available;
    min-height: -webkit-fill-available;
  }
  
  /* Prevent zoom on input focus */
  input, select, textarea {
    font-size: 16px !important;
  }
  
  /* Fix viewport units on mobile */
  .min-h-screen {
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
}

/* Fix for touch scrolling */
.scrollable {
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
}

/* Prevent body scroll when sidebar is open on mobile */
@media (max-width: 768px) {
  body.sidebar-open {
    overflow: hidden;
    position: fixed;
    width: 100%;
  }
}
</style>