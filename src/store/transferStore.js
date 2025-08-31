import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTransferStore = defineStore('transfer', () => {
  // State
  const transfers = ref([])
  const scheduledTransfers = ref([])
  const beneficiaries = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const recentTransfers = computed(() => {
    return transfers.value
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
  })

  const pendingTransfers = computed(() => {
    return transfers.value.filter(t => t.status === 'pending')
  })

  const upcomingScheduledTransfers = computed(() => {
    return scheduledTransfers.value
      .filter(t => t.status === 'active' && new Date(t.nextDate) > new Date())
      .sort((a, b) => new Date(a.nextDate) - new Date(b.nextDate))
  })

  // Actions
  const createTransfer = async (transferData) => {
    loading.value = true
    try {
      const response = await mockCreateTransfer(transferData)
      
      if (response.success) {
        transfers.value.unshift(response.transfer)
        return { success: true, transfer: response.transfer }
      }
      
      return { success: false, message: response.message }
    } catch (err) {
      error.value = 'Transfer failed'
      return { success: false, message: 'Transfer failed. Please try again.' }
    } finally {
      loading.value = false
    }
  }

  const scheduleTransfer = async (transferData) => {
    loading.value = true
    try {
      const response = await mockScheduleTransfer(transferData)
      
      if (response.success) {
        scheduledTransfers.value.unshift(response.scheduledTransfer)
        return { success: true, scheduledTransfer: response.scheduledTransfer }
      }
      
      return { success: false, message: response.message }
    } catch (err) {
      error.value = 'Scheduling failed'
      return { success: false, message: 'Scheduling failed. Please try again.' }
    } finally {
      loading.value = false
    }
  }

  const cancelScheduledTransfer = async (transferId) => {
    loading.value = true
    try {
      const response = await mockCancelScheduledTransfer(transferId)
      
      if (response.success) {
        const transfer = scheduledTransfers.value.find(t => t.id === transferId)
        if (transfer) {
          transfer.status = 'cancelled'
        }
        return { success: true }
      }
      
      return { success: false, message: response.message }
    } catch (err) {
      error.value = 'Cancellation failed'
      return { success: false, message: 'Cancellation failed. Please try again.' }
    } finally {
      loading.value = false
    }
  }

  const fetchTransfers = async () => {
    loading.value = true
    try {
      const response = await mockFetchTransfers()
      transfers.value = response.transfers
      scheduledTransfers.value = response.scheduledTransfers
    } catch (err) {
      error.value = 'Failed to fetch transfers'
    } finally {
      loading.value = false
    }
  }

  const addBeneficiary = async (beneficiary) => {
    loading.value = true
    try {
      const response = await mockAddBeneficiary(beneficiary)
      
      if (response.success) {
        beneficiaries.value.unshift(response.beneficiary)
        return { success: true }
      }
      
      return { success: false, message: response.message }
    } catch (err) {
      return { success: false, message: 'Failed to add beneficiary' }
    } finally {
      loading.value = false
    }
  }

  // Mock API functions
  const mockCreateTransfer = async (transferData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transfer: {
            id: Date.now(),
            ...transferData,
            status: 'pending',
            date: new Date(),
            reference: `TXN-${Date.now()}`
          }
        })
      }, 1000)
    })
  }

  const mockScheduleTransfer = async (transferData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          scheduledTransfer: {
            id: Date.now(),
            ...transferData,
            status: 'active',
            createdDate: new Date(),
            reference: `SCH-${Date.now()}`
          }
        })
      }, 500)
    })
  }

  const mockCancelScheduledTransfer = async (transferId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 300)
    })
  }

  const mockFetchTransfers = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          transfers: [
            {
              id: 1,
              fromAccount: 'Premium Checking',
              toAccount: 'High-Yield Savings',
              amount: 500,
              type: 'internal',
              status: 'completed',
              date: new Date(Date.now() - 1000 * 60 * 60 * 24),
              reference: 'TXN-001'
            }
          ],
          scheduledTransfers: [
            {
              id: 1,
              fromAccount: 'Premium Checking',
              toAccount: 'High-Yield Savings',
              amount: 200,
              frequency: 'monthly',
              nextDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
              status: 'active',
              reference: 'SCH-001'
            }
          ]
        })
      }, 500)
    })
  }

  const mockAddBeneficiary = async (beneficiary) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          beneficiary: {
            id: Date.now(),
            ...beneficiary,
            verified: false,
            dateAdded: new Date()
          }
        })
      }, 500)
    })
  }

  return {
    // State
    transfers,
    scheduledTransfers,
    beneficiaries,
    loading,
    error,
    
    // Getters
    recentTransfers,
    pendingTransfers,
    upcomingScheduledTransfers,
    
    // Actions
    createTransfer,
    scheduleTransfer,
    cancelScheduledTransfer,
    fetchTransfers,
    addBeneficiary
  }
})