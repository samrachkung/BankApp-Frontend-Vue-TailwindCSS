import api from './api'
import { NOTIFICATION_ENDPOINTS } from '../constants/apiEndpoints'

export const notificationService = {
  async getNotifications(params = {}) {
    const response = await api.get(NOTIFICATION_ENDPOINTS.GET_NOTIFICATIONS, { params })
    return response.data
  },

  async markAsRead(id) {
    const response = await api.post(NOTIFICATION_ENDPOINTS.MARK_AS_READ(id))
    return response.data
  },

  async markAllAsRead() {
    const response = await api.post(NOTIFICATION_ENDPOINTS.MARK_ALL_READ)
    return response.data
  },

  async getSettings() {
    const response = await api.get(NOTIFICATION_ENDPOINTS.GET_SETTINGS)
    return response.data
  },

  async updateSettings(settings) {
    const response = await api.post(NOTIFICATION_ENDPOINTS.UPDATE_SETTINGS, settings)
    return response.data
  }
}