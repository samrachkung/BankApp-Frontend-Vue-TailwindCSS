export const APP_CONFIG = {
  APP_NAME: 'BankApp',
  SUPPORT_EMAIL: 'support@bankapp.com',
  SUPPORT_PHONE: '+1 (800) 123-4567',
  BUSINESS_HOURS: 'Monday - Friday, 9:00 AM - 5:00 PM EST',
  MAX_LOGIN_ATTEMPTS: 5,
  SESSION_TIMEOUT: 30, // minutes
  TRANSFER_LIMITS: {
    DAILY: 10000,
    WEEKLY: 25000,
    MONTHLY: 50000
  },
  CURRENCIES: [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' }
  ],
  COUNTRIES: [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' }
  ],
  TRANSACTION_CATEGORIES: [
    'Food & Dining',
    'Shopping',
    'Transportation',
    'Entertainment',
    'Utilities',
    'Healthcare',
    'Travel',
    'Education',
    'Transfer',
    'Other'
  ]
}