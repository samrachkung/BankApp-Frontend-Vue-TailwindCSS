<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Security Settings</h2>
      
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
          </div>
          <button 
            @click="toggle2FA"
            :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors', 
                     is2FAEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700']"
          >
            <span 
              :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', 
                      is2FAEnabled ? 'translate-x-6' : 'translate-x-1']"
            />
          </button>
        </div>
        
        <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <h3 class="font-medium text-gray-900 dark:text-white">Biometric Login</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Use fingerprint or face recognition to log in</p>
          </div>
          <button 
            @click="toggleBiometric"
            :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors', 
                     isBiometricEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700']"
          >
            <span 
              :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', 
                      isBiometricEnabled ? 'translate-x-6' : 'translate-x-1']"
            />
          </button>
        </div>
        
        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 class="font-medium text-gray-900 dark:text-white mb-2">Change Password</h3>
          <button 
            @click="changePassword"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h2>
      
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Receive important updates via email</p>
          </div>
          <button 
            @click="toggleEmailNotifications"
            :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors', 
                     emailNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700']"
          >
            <span 
              :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', 
                      emailNotifications ? 'translate-x-6' : 'translate-x-1']"
            />
          </button>
        </div>
        
        <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <h3 class="font-medium text-gray-900 dark:text-white">SMS Notifications</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Receive transaction alerts via SMS</p>
          </div>
          <button 
            @click="toggleSMSNotifications"
            :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors', 
                     smsNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700']"
          >
            <span 
              :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', 
                      smsNotifications ? 'translate-x-6' : 'translate-x-1']"
            />
          </button>
        </div>
        
        <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <h3 class="font-medium text-gray-900 dark:text-white">Push Notifications</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Receive real-time alerts on your device</p>
          </div>
          <button 
            @click="togglePushNotifications"
            :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors', 
                     pushNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700']"
          >
            <span 
              :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', 
                      pushNotifications ? 'translate-x-6' : 'translate-x-1']"
            />
          </button>
        </div>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
      
      <div class="flex items-center space-x-4">
        <button 
          @click="setTheme('light')"
          :class="['px-4 py-2 rounded-md transition-colors', 
                  theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200']"
        >
          Light Mode
        </button>
        
        <button 
          @click="setTheme('dark')"
          :class="['px-4 py-2 rounded-md transition-colors', 
                  theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200']"
        >
          Dark Mode
        </button>
        
        <button 
          @click="setTheme('auto')"
          :class="['px-4 py-2 rounded-md transition-colors', 
                  theme === 'auto' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200']"
        >
          System Default
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const is2FAEnabled = ref(true)
const isBiometricEnabled = ref(false)
const emailNotifications = ref(true)
const smsNotifications = ref(true)
const pushNotifications = ref(true)
const theme = ref('light')

onMounted(() => {
  // Load settings from localStorage or API
  const savedTheme = localStorage.getItem('theme') || 'light'
  setTheme(savedTheme)
})

const toggle2FA = () => {
  is2FAEnabled.value = !is2FAEnabled.value
  // Save to API
}

const toggleBiometric = () => {
  isBiometricEnabled.value = !isBiometricEnabled.value
  // Save to API
}

const changePassword = () => {
  // Navigate to change password page
  console.log('Change password')
}

const toggleEmailNotifications = () => {
  emailNotifications.value = !emailNotifications.value
  // Save to API
}

const toggleSMSNotifications = () => {
  smsNotifications.value = !smsNotifications.value
  // Save to API
}

const togglePushNotifications = () => {
  pushNotifications.value = !pushNotifications.value
  // Save to API
}

const setTheme = (newTheme) => {
  theme.value = newTheme
  localStorage.setItem('theme', newTheme)
  
  if (newTheme === 'dark' || (newTheme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>