<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm z-10">
    <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
      <div class="flex items-center">
        <button 
          @click="$emit('toggle-sidebar')" 
          class="md:hidden mr-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">{{ currentRouteName }}</h1>
      </div>
      
      <div class="flex items-center space-x-4">
        <button 
          @click="toggleDarkMode" 
          class="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg v-if="darkMode" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        </button>
        
        <div class="relative">
          <button 
            @click="showNotifications = !showNotifications" 
            class="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span 
              v-if="unreadNotifications > 0" 
              class="absolute top-0 right-0 flex h-4 w-4 -mt-1 -mr-1"
            >
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-xs text-white items-center justify-center">
                {{ unreadNotifications > 9 ? '9+' : unreadNotifications }}
              </span>
            </span>
          </button>
          
          <!-- Notifications dropdown -->
          <div 
            v-if="showNotifications" 
            class="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 dark:divide-gray-700"
            v-click-outside="() => showNotifications = false"
          >
            <div class="px-4 py-3">
              <p class="text-sm font-medium text-gray-900 dark:text-white">Notifications</p>
            </div>
            <div class="py-1 max-h-96 overflow-y-auto">
              <div 
                v-for="notification in notifications.slice(0, 5)" 
                :key="notification.id" 
                class="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                @click="markAsRead(notification.id)"
              >
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <span 
                      class="h-8 w-8 rounded-full flex items-center justify-center"
                      :class="[notification.type === 'success' ? 'bg-green-100 text-green-600' : notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600']"
                    >
                      <component :is="notification.icon" class="h-5 w-5" />
                    </span>
                  </div>
                  <div class="ml-3 flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ notification.title }}</p>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{{ notification.message }}</p>
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ formatTime(notification.timestamp) }}</p>
                  </div>
                </div>
              </div>
              <div v-if="notifications.length === 0" class="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                No notifications
              </div>
            </div>
            <div class="py-1">
              <RouterLink 
                to="/notifications" 
                class="block px-4 py-2 text-sm text-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                @click="showNotifications = false"
              >
                View all notifications
              </RouterLink>
            </div>
          </div>
        </div>
        
        <div class="relative">
          <button 
            @click="showUserMenu = !showUserMenu" 
            class="flex items-center text-sm rounded-full focus:outline-none"
          >
            <img class="h-8 w-8 rounded-full" :src="user.avatar || 'https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg'" alt="User avatar">
          </button>
          
          <!-- User menu dropdown -->
          <div 
            v-if="showUserMenu" 
            class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 dark:divide-gray-700"
            v-click-outside="() => showUserMenu = false"
          >
            <div class="px-4 py-3">
              <p class="text-sm text-gray-900 dark:text-white">Signed in as</p>
              <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ user.email }}</p>
            </div>
            <div class="py-1">
              <RouterLink 
                to="/profile" 
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                @click="showUserMenu = false"
              >
                Your Profile
              </RouterLink>
              <RouterLink 
                to="/settings" 
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                @click="showUserMenu = false"
              >
                Settings
              </RouterLink>
            </div>
            <div class="py-1">
              <button 
                @click="logout" 
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../store/authStore'
import { useAppStore } from '../../store/appStore'
import { CurrencyDollarIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import vClickOutside from 'click-outside-vue3'

export default {
  name: 'Navbar',
  directives: {
    clickOutside: vClickOutside.directive
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()
    const appStore = useAppStore()
    
    const showNotifications = ref(false)
    const showUserMenu = ref(false)
    
    const user = computed(() => authStore.user || {})
    const darkMode = computed(() => appStore.darkMode)
    const notifications = computed(() => appStore.notifications)
    const unreadNotifications = computed(() => appStore.unreadNotifications)
    
    const currentRouteName = computed(() => {
      const routeName = route.name
      if (!routeName) return 'Home'
      
      // Convert route name to a more readable format
      return String(routeName).replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    })
    
    const toggleDarkMode = () => {
      appStore.toggleDarkMode()
    }
    
    const markAsRead = (id) => {
      appStore.markAsRead(id)
    }
    
    const logout = () => {
      authStore.logout()
      router.push({ name: 'Login' })
    }
    
    const formatTime = (timestamp) => {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      const now = new Date()
      const diff = now.getTime() - date.getTime()
      
      if (diff < 60000) return 'Just now'
      if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`
      if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`
      if (diff < 604800000) return `${Math.floor(diff / 86400000)} days ago`
      
      return date.toLocaleDateString()
    }
    
    return {
      user,
      darkMode,
      notifications,
      unreadNotifications,
      currentRouteName,
      showNotifications,
      showUserMenu,
      toggleDarkMode,
      markAsRead,
      logout,
      formatTime,
      CurrencyDollarIcon,
      ExclamationTriangleIcon,
      CheckCircleIcon
    }
  }
}
</script>