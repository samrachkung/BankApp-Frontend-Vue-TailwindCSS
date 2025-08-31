<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pay Bills</h1>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Select Biller</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button 
          v-for="biller in billers" 
          :key="biller.id"
          @click="selectBiller(biller)"
          :class="['flex flex-col items-center justify-center p-4 rounded-lg border transition-colors',
                  selectedBiller?.id === biller.id 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500']"
        >
          <div class="w-12 h-12 mb-2 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
            <span class="text-xl">{{ biller.icon }}</span>
          </div>
          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ biller.name }}</span>
        </button>
      </div>
      
      <div v-if="selectedBiller" class="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Pay {{ selectedBiller.name }} Bill</h3>
        
        <form @submit.prevent="payBill">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Number</label>
              <input 
                v-model="billPayment.accountNumber"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter account number"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
              <input 
                v-model="billPayment.amount"
                type="number" 
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <input 
              v-model="billPayment.description"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Bill payment description"
            />
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Date</label>
            <input 
              v-model="billPayment.paymentDate"
              type="date" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Account</label>
            <select 
              v-model="billPayment.fromAccount"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select account</option>
              <option v-for="account in accounts" :key="account.id" :value="account.id">
                {{ account.name }} - {{ account.number }} ({{ formatCurrency(account.balance) }})
              </option>
            </select>
          </div>
          
          <button 
            type="submit" 
            class="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            :disabled="processing"
          >
            {{ processing ? 'Processing...' : 'Pay Bill' }}
          </button>
        </form>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Bill Payments</h2>
      
      <div v-if="recentPayments.length > 0" class="space-y-3">
        <div 
          v-for="payment in recentPayments" 
          :key="payment.id"
          class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md"
        >
          <div>
            <p class="font-medium text-gray-900 dark:text-white">{{ payment.biller }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(payment.date) }}</p>
          </div>
          <div class="text-right">
            <p class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(payment.amount) }}</p>
            <p :class="['text-sm', payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600']">
              {{ payment.status }}
            </p>
          </div>
        </div>
      </div>
      
      <p v-else class="text-gray-500 dark:text-gray-400 text-center py-4">
        No recent bill payments
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAccountStore } from '@/store/accountStore'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'

const accountStore = useAccountStore()
const accounts = ref([])
const billers = ref([
  { id: 1, name: 'Electricity', icon: '⚡' },
  { id: 2, name: 'Water', icon: '💧' },
  { id: 3, name: 'Internet', icon: '🌐' },
  { id: 4, name: 'Gas', icon: '🔥' },
  { id: 5, name: 'Phone', icon: '📞' },
  { id: 6, name: 'TV', icon: '📺' },
  { id: 7, name: 'Rent', icon: '🏠' },
  { id: 8, name: 'Insurance', icon: '🛡️' },
])

const selectedBiller = ref(null)
const processing = ref(false)
const recentPayments = ref([])

const billPayment = ref({
  biller: '',
  accountNumber: '',
  amount: '',
  description: '',
  paymentDate: new Date().toISOString().split('T')[0],
  fromAccount: ''
})

onMounted(async () => {
  // Load accounts and recent payments
  accounts.value = await accountStore.getAccounts()
  loadRecentPayments()
})

const selectBiller = (biller) => {
  selectedBiller.value = biller
  billPayment.value.biller = biller.name
}

const payBill = async () => {
  processing.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Add to recent payments
    recentPayments.value.unshift({
      id: Date.now(),
      biller: selectedBiller.value.name,
      amount: parseFloat(billPayment.value.amount),
      date: new Date().toISOString(),
      status: 'completed'
    })
    
    // Reset form
    billPayment.value = {
      biller: selectedBiller.value.name,
      accountNumber: '',
      amount: '',
      description: '',
      paymentDate: new Date().toISOString().split('T')[0],
      fromAccount: ''
    }
    
    alert('Bill payment successful!')
  } catch (error) {
    alert('Error processing payment. Please try again.')
    console.error(error)
  } finally {
    processing.value = false
  }
}

const loadRecentPayments = () => {
  // Simulate loading recent payments
  recentPayments.value = [
    { id: 1, biller: 'Electricity', amount: 125.75, date: '2023-10-15', status: 'completed' },
    { id: 2, biller: 'Internet', amount: 89.99, date: '2023-10-10', status: 'completed' },
    { id: 3, biller: 'Water', amount: 67.50, date: '2023-10-05', status: 'completed' },
  ]
}
</script>