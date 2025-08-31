import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAccountStore = defineStore('account', () => {
  // State
  const accounts = ref([])
  const selectedAccount = ref(null)
  const transactions = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const totalBalance = computed(() => {
    return accounts.value.reduce((sum, account) => sum + account.balance, 0)
  })

  const availableBalance = computed(() => {
    return accounts.value.reduce((sum, account) => sum + (account.balance - account.pending), 0)
  })

  const pendingTransactions = computed(() => {
    return transactions.value.filter(t => t.status === 'pending')
  })

  const recentTransactions = computed(() => {
    return transactions.value
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10)
  })

  const accountsByType = computed(() => {
    return accounts.value.reduce((acc, account) => {
      if (!acc[account.type]) {
        acc[account.type] = []
      }
      acc[account.type].push(account)
      return acc
    }, {})
  })

  // Actions
  const fetchAccounts = async () => {
    loading.value = true
    try {
      const response = await mockFetchAccounts()
      accounts.value = response.accounts
      error.value = null
    } catch (err) {
      error.value = 'Failed to fetch accounts'
    } finally {
      loading.value = false
    }
  }

  const fetchTransactions = async (accountId = null) => {
    loading.value = true
    try {
      const response = await mockFetchTransactions(accountId)
      transactions.value = response.transactions
      error.value = null
    } catch (err) {
      error.value = 'Failed to fetch transactions'
    } finally {
      loading.value = false
    }
  }

  const selectAccount = (accountId) => {
    selectedAccount.value = accounts.value.find(acc => acc.id === accountId)
  }

  const updateAccountBalance = (accountId, newBalance) => {
    const account = accounts.value.find(acc => acc.id === accountId)
    if (account) {
      account.balance = newBalance
    }
  }

  const addTransaction = (transaction) => {
    transactions.value.unshift({
      id: Date.now(),
      date: new Date(),
      ...transaction
    })
  }

  // Mock API functions
  const mockFetchAccounts = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          accounts: [
            {
              id: '1',
              name: 'Premium Checking',
              type: 'checking',
              number: '1234567890',
              balance: 12540.75,
              pending: 250.00,
              interestRate: 0.1,
              status: 'active'
            },
            {
              id: '2',
              name: 'High-Yield Savings',
              type: 'savings',
              number: '9876543210',
              balance: 18430.20,
              pending: 0,
              interestRate: 4.5,
              status: 'active'
            },
            {
              id: '3',
              name: 'Investment Account',
              type: 'investment',
              number: '5555666677',
              balance: 25670.80,
              pending: 1200,
              interestRate: null,
              status: 'active'
            }
          ]
        })
      }, 500)
    })
  }

  const mockFetchTransactions = async (accountId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          transactions: [
            {
              id: 1,
              accountId: accountId || '1',
              description: 'Salary Deposit',
              amount: 3200,
              type: 'credit',
              category: 'Income',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24),
              status: 'completed'
            },
            {
              id: 2,
              accountId: accountId || '1',
              description: 'Grocery Store',
              amount: -85.32,
              type: 'debit',
              category: 'Food & Dining',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
              status: 'completed'
            }
          ]
        })
      }, 300)
    })
  }

  return {
    // State
    accounts,
    selectedAccount,
    transactions,
    loading,
    error,
    
    // Getters
    totalBalance,
    availableBalance,
    pendingTransactions,
    recentTransactions,
    accountsByType,
    
    // Actions
    fetchAccounts,
    fetchTransactions,
    selectAccount,
    updateAccountBalance,
    addTransaction
  }
})