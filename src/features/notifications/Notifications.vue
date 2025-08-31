<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
      
      <div class="flex items-center space-x-2">
        <button 
          @click="markAllAsRead"
          class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Mark all as read
        </button>
        
        <button 
          @click="showSettings = true"
          class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Settings
        </button>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div class="border-b border-gray-200 dark:border-gray-700">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['px-4 py-3 text-sm font-medium border-b-2 transition-colors', 
                  activeTab === tab.id 
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300']"
        >
          {{ tab.name }}
        </button>
      </div>
      
      <div v-if="filteredNotifications.length > 0">
        <div 
          v-for="notification in filteredNotifications" 
          :key="notification.id"
          :class="['p-4 border-b border-gray-200 dark:border-gray-700 transition-colors', 
                  notification.read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900/20']"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div :class="['w-8 h-8 rounded-full flex items-center justify-center', 
                          getNotificationIcon(notification.type).bg]">
                <span class="text-sm">{{ getNotificationIcon(notification.type).icon }}</span>
              </div>
            </div>
            
            <div class="ml-3 flex-1">
              <p :class="['text-sm', notification.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white font-medium']">
                {{ notification.message }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {{ formatTime(notification.timestamp) }}
              </p>
            </div>
            
            <div class="flex-shrink-0 ml-4">
              <button 
                @click="toggleRead(notification)"
                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                :title="notification.read ? 'Mark as unread' : 'Mark as read'"
              >
                <span v-if="!notification.read" class="w-2 h-2 bg-blue-500 rounded-full block"></span>
                <span v-else class="text-gray-400">✓</span>
              </button>
            </div>
          </div>
          
          <div v-if="notification.actions" class="mt-2 flex space-x-2">
            <button 
              v-for="action in notification.actions" 
              :key="action.label"
              @click="handleAction(notification, action)"
              class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {{ action.label }}
            </button>
          </div>
        </div>
      </div>
      
      <div v-else class="p-8 text-center">
        <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <span class="text-2xl">🔔</span>
        </div>
        <p class="text-gray-500 dark:text-gray-400">No notifications found</p>
      </div>
    </div>
    
    <!-- Notification Settings Modal -->
    <div v-if="showSettings" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Notification Settings</h2>
            <button @click="showSettings = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              &times;
            </button>
          </div>
          
          <div class="space-y-4">
            <div v-for="setting in notificationSettings" :key="setting.id" class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-gray-900 dark:text-white">{{ setting.name }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ setting.description }}</p>
              </div>
              <button 
                @click="toggleNotificationSetting(setting)"
                :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors', 
                        setting.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700']"
              >
                <span 
                  :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', 
                          setting.enabled ? 'translate-x-6' : 'translate-x-1']"
                />
              </button>
            </div>
          </div>
          
          <div class="mt-6 flex justify-end">
            <button 
              @click="showSettings = false"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { formatTime } from '@/utils/formatDate'

const activeTab = ref('all')
const showSettings = ref(false)

const tabs = [
  { id: 'all', name: 'All' },
  { id: 'unread', name: 'Unread' },
  { id: 'transactions', name: 'Transactions' },
  { id: 'security', name: 'Security' },
  { id: 'promotions', name: 'Promotions' },
]

const notifications = ref([
  {
    id: 1,
    type: 'transaction',
    message: 'Payment of $25.99 to Amazon.com was completed successfully',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
    actions: [{ label: 'View Details', handler: 'viewTransaction' }]
  },
  {
    id: 2,
    type: 'security',
    message: 'New login detected from Chrome on Windows',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    actions: [{ label: 'Review', handler: 'reviewActivity' }]
  },
  {
    id: 3,
    type: 'promotion',
    message: 'Special offer: Get 5% cashback on all grocery purchases this month',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true
  },
  {
    id: 4,
    type: 'transaction',
    message: 'You received $250.00 from John Smith',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    actions: [{ label: 'Thank', handler: 'thankSender' }]
  },
  {
    id: 5,
    type: 'account',
    message: 'Your monthly statement is ready for review',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    actions: [{ label: 'View Statement', handler: 'viewStatement' }]
  },
])

const notificationSettings = ref([
  { id: 'transaction', name: 'Transaction Alerts', description: 'Get notified for all transactions', enabled: true },
  { id: 'security', name: 'Security Alerts', description: 'Important security notifications', enabled: true },
  { id: 'promotion', name: 'Promotions', description: 'Special offers and promotions', enabled: false },
  { id: 'account', name: 'Account Updates', description: 'Account statements and updates', enabled: true },
  { id: 'push', name: 'Push Notifications', description: 'Receive notifications on your device', enabled: true },
  { id: 'email', name: 'Email Notifications', description: 'Receive notifications via email', enabled: true },
  { id: 'sms', name: 'SMS Notifications', description: 'Receive notifications via SMS', enabled: false },
])

const filteredNotifications = computed(() => {
  if (activeTab.value === 'all') return notifications.value
  if (activeTab.value === 'unread') return notifications.value.filter(n => !n.read)
  return notifications.value.filter(n => n.type === activeTab.value)
})

const getNotificationIcon = (type) => {
  const icons = {
    transaction: { icon: '💰', bg: 'bg-green-100 dark:bg-green-900/30' },
    security: { icon: '🔒', bg: 'bg-red-100 dark:bg-red-900/30' },
    promotion: { icon: '🎁', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    account: { icon: '🏦', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  }
  return icons[type] || { icon: '🔔', bg: 'bg-gray-100 dark:bg-gray-700' }
}

const toggleRead = (notification) => {
  notification.read = !notification.read
}

const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true
  })
}

const handleAction = (notification, action) => {
  console.log(`Action: ${action.handler} for notification ${notification.id}`)
  // Implement action handlers based on the action type
}

const toggleNotificationSetting = (setting) => {
  setting.enabled = !setting.enabled
}

onMounted(() => {
  // Load notifications from store or API
})
</script>