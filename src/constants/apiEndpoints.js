const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE}/auth/login`,
  REGISTER: `${API_BASE}/auth/register`,
  LOGOUT: `${API_BASE}/auth/logout`,
  FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
  VERIFY_2FA: `${API_BASE}/auth/verify-2fa`,
  REFRESH_TOKEN: `${API_BASE}/auth/refresh-token`
}

export const ACCOUNT_ENDPOINTS = {
  GET_ACCOUNTS: `${API_BASE}/accounts`,
  GET_ACCOUNT: (id) => `${API_BASE}/accounts/${id}`,
  GET_ACCOUNT_STATEMENT: (id) => `${API_BASE}/accounts/${id}/statement`,
  EXPORT_STATEMENT: (id) => `${API_BASE}/accounts/${id}/statement/export`
}

export const TRANSFER_ENDPOINTS = {
  CREATE_TRANSFER: `${API_BASE}/transfers`,
  GET_TRANSFERS: `${API_BASE}/transfers`,
  GET_TRANSFER: (id) => `${API_BASE}/transfers/${id}`,
  SCHEDULE_TRANSFER: `${API_BASE}/transfers/schedule`,
  CANCEL_TRANSFER: (id) => `${API_BASE}/transfers/${id}/cancel`
}

export const CARD_ENDPOINTS = {
  GET_CARDS: `${API_BASE}/cards`,
  GET_CARD: (id) => `${API_BASE}/cards/${id}`,
  FREEZE_CARD: (id) => `${API_BASE}/cards/${id}/freeze`,
  UNFREEZE_CARD: (id) => `${API_BASE}/cards/${id}/unfreeze`,
  SET_SPENDING_LIMIT: (id) => `${API_BASE}/cards/${id}/spending-limit`
}

export const PAYMENT_ENDPOINTS = {
  PAY_BILL: `${API_BASE}/payments/bill`,
  MOBILE_TOPUP: `${API_BASE}/payments/topup`,
  QR_PAYMENT: `${API_BASE}/payments/qr`
}

export const NOTIFICATION_ENDPOINTS = {
  GET_NOTIFICATIONS: `${API_BASE}/notifications`,
  MARK_AS_READ: (id) => `${API_BASE}/notifications/${id}/read`,
  MARK_ALL_READ: `${API_BASE}/notifications/read-all`,
  GET_SETTINGS: `${API_BASE}/notifications/settings`,
  UPDATE_SETTINGS: `${API_BASE}/notifications/settings`
}

export const USER_ENDPOINTS = {
  GET_PROFILE: `${API_BASE}/user/profile`,
  UPDATE_PROFILE: `${API_BASE}/user/profile`,
  CHANGE_PASSWORD: `${API_BASE}/user/change-password`,
  UPDATE_SETTINGS: `${API_BASE}/user/settings`
}

export const SUPPORT_ENDPOINTS = {
  GET_FAQS: `${API_BASE}/support/faqs`,
  CREATE_TICKET: `${API_BASE}/support/tickets`,
  GET_TICKETS: `${API_BASE}/support/tickets`,
  GET_TICKET: (id) => `${API_BASE}/support/tickets/${id}`,
  CHATBOT: `${API_BASE}/support/chatbot`
}