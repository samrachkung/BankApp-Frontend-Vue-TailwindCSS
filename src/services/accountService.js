import api from './api'
import { ACCOUNT_ENDPOINTS } from '../constants/apiEndpoints'

export const accountService = {
  async getAccounts() {
    const response = await api.get(ACCOUNT_ENDPOINTS.GET_ACCOUNTS)
    return response.data
  },

  async getAccount(id) {
    const response = await api.get(ACCOUNT_ENDPOINTS.GET_ACCOUNT(id))
    return response.data
  },

  async getAccountStatement(id, startDate, endDate) {
    const params = {}
    if (startDate) params.startDate = startDate
    if (endDate) params.endDate = endDate
    
    const response = await api.get(ACCOUNT_ENDPOINTS.GET_ACCOUNT_STATEMENT(id), { params })
    return response.data
  },

  async exportStatement(id, format, startDate, endDate) {
    const params = { format }
    if (startDate) params.startDate = startDate
    if (endDate) params.endDate = endDate
    
    const response = await api.get(ACCOUNT_ENDPOINTS.EXPORT_STATEMENT(id), { 
      params,
      responseType: 'blob'
    })
    return response.data
  }
}