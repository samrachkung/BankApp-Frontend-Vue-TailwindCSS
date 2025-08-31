import api from './api'
import { PAYMENT_ENDPOINTS } from '../constants/apiEndpoints'

export const paymentService = {
  async payBill(billData) {
    const response = await api.post(PAYMENT_ENDPOINTS.PAY_BILL, billData)
    return response.data
  },

  async mobileTopUp(topUpData) {
    const response = await api.post(PAYMENT_ENDPOINTS.MOBILE_TOPUP, topUpData)
    return response.data
  },

  async qrPayment(qrData) {
    const response = await api.post(PAYMENT_ENDPOINTS.QR_PAYMENT, qrData)
    return response.data
  }
}