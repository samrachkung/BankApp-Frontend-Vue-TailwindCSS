import api from './api'
import { TRANSFER_ENDPOINTS } from '../constants/apiEndpoints'

export const transferService = {
  async createTransfer(transferData) {
    const response = await api.post(TRANSFER_ENDPOINTS.CREATE_TRANSFER, transferData)
    return response.data
  },

  async getTransfers(params = {}) {
    const response = await api.get(TRANSFER_ENDPOINTS.GET_TRANSFERS, { params })
    return response.data
  },

  async getTransfer(id) {
    const response = await api.get(TRANSFER_ENDPOINTS.GET_TRANSFER(id))
    return response.data
  },

  async scheduleTransfer(transferData) {
    const response = await api.post(TRANSFER_ENDPOINTS.SCHEDULE_TRANSFER, transferData)
    return response.data
  },

  async cancelTransfer(id) {
    const response = await api.post(TRANSFER_ENDPOINTS.CANCEL_TRANSFER(id))
    return response.data
  }
}