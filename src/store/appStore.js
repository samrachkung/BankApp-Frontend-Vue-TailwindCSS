import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const theme = ref(localStorage.getItem('theme') || 'light')
  const language = ref(localStorage.getItem('language') || 'en')
  const isMobile = ref(window.innerWidth < 768)
  const sidebarCollapsed = ref(false) // false = sidebar is open/visible
  const notifications = ref([
   
    {
      id: 1,
      title: 'Payment Received',
      message: 'You received $150.00 from John Doe',
      type: 'success',
      icon: 'CurrencyDollarIcon',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false
    },
    {
      id: 2,
      title: 'Security Alert',
      message: 'New login from Chrome on Windows',
      type: 'warning',
      icon: 'ExclamationTriangleIcon',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false
    }
  ])
  const loading = ref(false)
  const error = ref(null)

  // Getters - Compatible with your Navbar component
  const isDarkMode = computed(() => theme.value === 'dark')
  const darkMode = computed(() => theme.value === 'dark') 
  
  const unreadNotifications = computed(() => 
    notifications.value.filter(n => !n.read).length
  )

  //  Sidebar state management
  const sidebarOpen = computed(() => !sidebarCollapsed.value)

  // Actions
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    updateTheme()
  }

  const toggleDarkMode = () => {
    toggleTheme()
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', theme.value)
    updateTheme()
  }

  const updateTheme = () => {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const setLanguage = (lang) => {
    language.value = lang
    localStorage.setItem('language', lang)
  }

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
    console.log('Sidebar toggled:', { 
      collapsed: sidebarCollapsed.value, 
      open: sidebarOpen.value 
    })
  }

  const closeSidebar = () => {
    sidebarCollapsed.value = true
    console.log('Sidebar closed')
  }

  const openSidebar = () => {
    sidebarCollapsed.value = false
    console.log('Sidebar opened')
  }

  const setLoading = (isLoading) => {
    loading.value = isLoading
  }

  const setError = (errorMessage) => {
    error.value = errorMessage
  }

  const clearError = () => {
    error.value = null
  }

  const addNotification = (notification) => {
    notifications.value.unshift({
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      type: 'info',
      icon: 'CheckCircleIcon',
      ...notification
    })
  }

  const markNotificationAsRead = (id) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  //  Your Navbar expects this method name
  const markAsRead = (id) => {
    markNotificationAsRead(id)
  }

  const markAllNotificationsAsRead = () => {
    notifications.value.forEach(n => n.read = true)
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  // Initialize theme on store creation
  updateTheme()

  return {
    // State
    theme,
    language,
    sidebarCollapsed,
    notifications,
    loading,
    error,
    
    // Getters
    isDarkMode,
    darkMode, //  For Navbar compatibility
    unreadNotifications,
    sidebarOpen,
    
    // Actions
    toggleTheme,
    toggleDarkMode, //  For Navbar compatibility
    setTheme,
    setLanguage,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    setLoading,
    setError,
    clearError,
    addNotification,
    markNotificationAsRead,
    markAsRead, //  For Navbar compatibility
    markAllNotificationsAsRead,
    removeNotification
  }
})