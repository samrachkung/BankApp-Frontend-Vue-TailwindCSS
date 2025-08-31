import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('authToken'))
  const isAuthenticated = ref(false)
  const loginAttempts = ref(0)
  const isLocked = ref(false)
  const lastActivity = ref(new Date())
  const sessionTimeout = ref(30 * 60 * 1000) // 30 minutes

  const sidebarCollapsed = ref(false) // Start with sidebar closed on mobile
  const isMobile = ref(window.innerWidth < 768)

  const sidebarOpen = computed(() => {
    // On mobile, sidebar is open when not collapsed
    // On desktop, sidebar is always visible
    return isMobile.value ? !sidebarCollapsed.value : true
  })
   const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    updateTheme()
  }
  
  // Getters
  const userFullName = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName} ${user.value.lastName}`
  })

  const userInitials = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName?.[0] || ''}${user.value.lastName?.[0] || ''}`
  })

  const isSessionExpired = computed(() => {
    if (!lastActivity.value) return false
    return (Date.now() - lastActivity.value.getTime()) > sessionTimeout.value
  })

  // Actions
  const login = async (credentials) => {
    try {
      // Simulate API call
      const response = await mockLogin(credentials)
      
      if (response.success) {
        user.value = response.user
        token.value = response.token
        isAuthenticated.value = true
        loginAttempts.value = 0
        isLocked.value = false
        lastActivity.value = new Date()
        
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        
        return { success: true }
      } else {
        loginAttempts.value++
        if (loginAttempts.value >= 3) {
          isLocked.value = true
          setTimeout(() => {
            isLocked.value = false
            loginAttempts.value = 0
          }, 15 * 60 * 1000) // Lock for 15 minutes
        }
        return { success: false, message: response.message }
      }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' }
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    lastActivity.value = null
    
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }

  const updateProfile = async (profileData) => {
    try {
      // Simulate API call
      const response = await mockUpdateProfile(profileData)
      
      if (response.success) {
        user.value = { ...user.value, ...response.user }
        localStorage.setItem('user', JSON.stringify(user.value))
        return { success: true }
      }
      
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'Profile update failed. Please try again.' }
    }
  }

  const changePassword = async (passwordData) => {
    try {
      // Simulate API call
      const response = await mockChangePassword(passwordData)
      return response
    } catch (error) {
      return { success: false, message: 'Password change failed. Please try again.' }
    }
  }

  const refreshToken = async () => {
    try {
      // Simulate API call
      const response = await mockRefreshToken(token.value)
      
      if (response.success) {
        token.value = response.token
        localStorage.setItem('authToken', response.token)
        return true
      }
      
      logout()
      return false
    } catch (error) {
      logout()
      return false
    }
  }

  const updateLastActivity = () => {
    lastActivity.value = new Date()
  }

  const initializeAuth = () => {
    const savedToken = localStorage.getItem('authToken')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
      isAuthenticated.value = true
      lastActivity.value = new Date()
    }
  }

  // Mock API functions
  const mockLogin = async (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.email === 'demo@securebank.com' && credentials.password === 'demo123') {
          resolve({
            success: true,
            user: {
              id: 1,
              firstName: 'John',
              lastName: 'Smith',
              email: 'demo@securebank.com',
              phone: '+1 (555) 123-4567',
              avatar: null,
              accountType: 'Premium',
              memberSince: '2020-01-15'
            },
            token: 'mock-jwt-token-' + Date.now()
          })
        } else {
          resolve({
            success: false,
            message: 'Invalid email or password'
          })
        }
      }, 1000)
    })
  }

  const mockUpdateProfile = async (profileData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          user: profileData
        })
      }, 500)
    })
  }

  const mockChangePassword = async (passwordData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (passwordData.currentPassword === 'demo123') {
          resolve({
            success: true,
            message: 'Password changed successfully'
          })
        } else {
          resolve({
            success: false,
            message: 'Current password is incorrect'
          })
        }
      }, 500)
    })
  }

  const mockRefreshToken = async (currentToken) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          token: 'mock-jwt-token-' + Date.now()
        })
      }, 300)
    })
  }

  // Initialize auth state
  initializeAuth()

  return {
    // State
    user,
    token,
    isAuthenticated,
    loginAttempts,
    isLocked,
    lastActivity,
    sessionTimeout,
    
    // Getters
    userFullName,
    userInitials,
    isSessionExpired,
    
    // Actions
    login,
    logout,
    updateProfile,
    changePassword,
    refreshToken,
    updateLastActivity,
    initializeAuth
  }
})
