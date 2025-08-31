<template>
  <div class="max-w-md mx-auto p-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Mobile Top-Up</h1>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <form @submit.prevent="topUp">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
          <input 
            v-model="topUpData.phoneNumber"
            type="tel" 
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter mobile number"
            required
          />
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Operator</label>
          <select 
            v-model="topUpData.operator"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select operator</option>
            <option v-for="operator in operators" :key="operator" :value="operator">{{ operator }}</option>
          </select>
        </div>
        
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
          <div class="grid grid-cols-4 gap-2">
            <button 
              v-for="amount in presetAmounts" 
              :key="amount"
              type="button"
              @click="topUpData.amount = amount"
              :class="['py-2 rounded-md transition-colors', 
                      topUpData.amount === amount 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600']"
            >
              ${{ amount }}
            </button>
          </div>
          
          <div class="mt-2">
            <input 
              v-model="topUpData.amount"
              type="number" 
              step="0.01"
              min="1"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Or enter custom amount"
              required
            />
          </div>
        </div>
        
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Account</label>
          <select 
            v-model="topUpData.fromAccount"
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
          {{ processing ? 'Processing...' : 'Top Up' }}
        </button>
      </form>
    </div>
    
    <div v-if="recentTopUps.length > 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Top-Ups</h2>
      
      <div class="space-y-3">
        <div 
          v-for="topUp in recentTopUps" 
          :key="topUp.id"
          class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md"
        >
          <div>
            <p class="font-medium text-gray-900 dark:text-white">{{ topUp.phoneNumber }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(topUp.date) }}</p>
          </div>
          <div class="text-right">
            <p class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(topUp.amount) }}</p>
            <p :class="['text-sm', topUp.status === 'completed' ? 'text-green-600' : 'text-yellow-600']">
              {{ topUp.status }}
            </p>
          </div>
        </div>
      </div>
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
const operators = ref(['Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'Google Fi', 'Mint Mobile'])
const presetAmounts = ref([10, 20, 30, 50])
const processing = ref(false)
const recentTopUps = ref([])

const topUpData = ref({
  phoneNumber: '',
  operator: '',
  amount: '',
  fromAccount: ''
})

onMounted(async () => {
  // Load accounts and recent top-ups
  accounts.value = await accountStore.getAccounts()
  loadRecentTopUps()
})

const topUp = async () => {
  processing.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Add to recent top-ups
    recentTopUps.value.unshift({
      id: Date.now(),
      phoneNumber: topUpData.value.phoneNumber,
      amount: parseFloat(topUpData.value.amount),
      date: new Date().toISOString(),
      status: 'completed'
    })
    
    // Reset form
    topUpData.value = {
      phoneNumber: '',
      operator: '',
      amount: '',
      fromAccount: ''
    }
    
    alert('Mobile top-up successful!')
  } catch (error) {
    alert('Error processing top-up. Please try again.')
    console.error(error)
  } finally {
    processing.value = false
  }
}

const loadRecentTopUps = () => {
  // Simulate loading recent top-ups
  recentTopUps.value = [
    { id: 1, phoneNumber: '+1 (555) 123-4567', amount: 30, date: '2023-10-12', status: 'completed' },
    { id: 2, phoneNumber: '+1 (555) 987-6543', amount: 20, date: '2023-10-05', status: 'completed' },
    { id: 3, phoneNumber: '+1 (555) 456-7890', amount: 50, date: '2023-09-28', status: 'completed' },
  ]
}
</script>