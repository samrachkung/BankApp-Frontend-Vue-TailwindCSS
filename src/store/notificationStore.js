import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  // State
  const notifications = ref([])
  const settings = ref({
    email: true,
    sms: true,
    push: true,
    transactionAlerts: true,
    securityAlerts: true,
    promotionalOffers: false,
    statementReminders: true
  })

  // Getters
  const unreadCount = computed(() => {
    return notifications.value.filter(n => !n.read).length
  })

  const recentNotifications = computed(() => {
    return notifications.value
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10)
  })

  const notificationsByType = computed(() => {
    return notifications.value.reduce((acc, notification) => {
      if (!acc[notification.type]) {
        acc[notification.type] = []
      }
      acc[notification.type].push(notification)
      return acc
    }, {})
  })

  // Actions
  const addNotification = (notification) => {
    notifications.value.unshift({
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    })
  }

  const markAsRead = (id) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  const markAllAsRead = () => {
    notifications.value.forEach(n => n.read = true)
  }

  const deleteNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const updateSettings = (newSettings) => {
    settings.value = { ...settings.value, ...newSettings }
    localStorage.setItem('notificationSettings', JSON.stringify(settings.value))
  }

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('notificationSettings')
    if (savedSettings) {
      settings.value = { ...settings.value, ...JSON.parse(savedSettings) }
    }
  }

  const sendTransactionAlert = (transaction) => {
    if (settings.value.transactionAlerts) {
      addNotification({
        type: 'transaction',
        title: 'Transaction Alert',
        message: `${transaction.type === 'credit' ? 'Received' : 'Sent'} $${Math.abs(transaction.amount)} - ${transaction.description}`,
        data: transaction
      })
    }
  }

  const sendSecurityAlert = (alert) => {
    if (settings.value.securityAlerts) {
      addNotification({
        type: 'security',
        title: 'Security Alert',
        message: alert.message,
        priority: 'high',
        data: alert
      })
    }
  }

  // Initialize settings
  loadSettings()

  return {
    // State
    notifications,
    settings,
    
    // Getters
    unreadCount,
    recentNotifications,
    notificationsByType,
    
    // Actions
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    updateSettings,
    loadSettings,
    sendTransactionAlert,
    sendSecurityAlert
  }
})