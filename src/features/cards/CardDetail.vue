<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Card Details</h1>
      <router-link 
        to="/cards" 
        class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        Back to Cards
      </router-link>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Card Preview -->
      <div class="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
        <div class="flex justify-between items-start mb-8">
          <div>
            <h2 class="text-xl font-bold">{{ card.name }}</h2>
            <p class="text-blue-100">{{ card.type }} • {{ card.network }}</p>
          </div>
          <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span class="text-2xl">💳</span>
          </div>
        </div>
        
        <div class="mb-6">
          <p class="text-blue-100 text-sm mb-1">Card Number</p>
          <p class="text-xl font-mono tracking-wider">{{ formatCardNumber(card.number) }}</p>
        </div>
        
        <div class="flex justify-between">
          <div>
            <p class="text-blue-100 text-sm mb-1">Cardholder Name</p>
            <p class="font-medium">{{ card.holderName }}</p>
          </div>
          
          <div>
            <p class="text-blue-100 text-sm mb-1">Expires</p>
            <p class="font-medium">{{ card.expiry }}</p>
          </div>
        </div>
      </div>
      
      <!-- Card Details -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Card Information</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <div class="flex items-center">
              <span :class="['w-2 h-2 rounded-full mr-2', card.status === 'active' ? 'bg-green-500' : 'bg-gray-400']"></span>
              <span class="text-gray-900 dark:text-white capitalize">{{ card.status }}</span>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Linked Account</label>
            <p class="text-gray-900 dark:text-white">{{ card.linkedAccount }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Balance</label>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(card.balance) }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Available Credit</label>
            <p class="text-xl font-semibold text-green-600 dark:text-green-400">{{ formatCurrency(card.availableCredit) }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Credit Limit</label>
            <p class="text-gray-900 dark:text-white">{{ formatCurrency(card.creditLimit) }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVV</label>
            <div class="flex items-center">
              <p class="font-mono text-gray-900 dark:text-white">•••</p>
              <button 
                @click="showCVV = !showCVV"
                class="ml-2 text-blue-600 dark:text-blue-400 text-sm"
              >
                {{ showCVV ? 'Hide' : 'Show' }}
              </button>
            </div>
            <p v-if="showCVV" class="font-mono text-gray-900 dark:text-white">{{ card.cvv }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Card Controls -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Card Controls</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="font-medium text-gray-900 dark:text-white mb-3">Card Status</h3>
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span>Freeze Card</span>
            <button 
              @click="toggleFreeze"
              :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors', 
                      card.frozen ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600']"
            >
              <span 
                :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', 
                        card.frozen ? 'translate-x-6' : 'translate-x-1']"
              />
            </button>
          </div>
        </div>
        
        <div>
          <h3 class="font-medium text-gray-900 dark:text-white mb-3">Spending Limit</h3>
          <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Current limit: {{ formatCurrency(card.spendingLimit) }}</p>
            <button 
              @click="showLimitModal = true"
              class="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
            >
              Change Limit
            </button>
          </div>
        </div>
        
        <div>
          <h3 class="font-medium text-gray-900 dark:text-white mb-3">International Use</h3>
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span>Allow International</span>
            <button 
              @click="toggleInternational"
              :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors', 
                      card.internationalUse ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600']"
            >
              <span 
                :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', 
                        card.internationalUse ? 'translate-x-6' : 'translate-x-1']"
              />
            </button>
          </div>
        </div>
        
        <div>
          <h3 class="font-medium text-gray-900 dark:text-white mb-3">Online Transactions</h3>
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span>Allow Online</span>
            <button 
              @click="toggleOnline"
              :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors', 
                      card.onlineTransactions ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600']"
            >
              <span 
                :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', 
                        card.onlineTransactions ? 'translate-x-6' : 'translate-x-1']"
              />
            </button>
          </div>
        </div>
      </div>
      
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          Report Lost/Stolen
        </button>
        <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          Request Replacement
        </button>
      </div>
    </div>
    
    <!-- Spending Limit Modal -->
    <div v-if="showLimitModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Set Spending Limit</h2>
          <button @click="showLimitModal = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            &times;
          </button>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Spending Limit</label>
          <input 
            v-model="newSpendingLimit"
            type="number" 
            step="0.01"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter amount"
          />
        </div>
        
        <div class="grid grid-cols-3 gap-2 mb-4">
          <button 
            v-for="amount in presetLimits" 
            :key="amount"
            @click="newSpendingLimit = amount"
            :class="['py-2 rounded-md transition-colors', 
                    newSpendingLimit === amount 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600']"
          >
            ${{ amount }}
          </button>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button 
            @click="showLimitModal = false"
            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="updateSpendingLimit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Limit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { formatCurrency } from '@/utils/formatCurrency'

const route = useRoute()
const cardId = route.params.id
const showCVV = ref(false)
const showLimitModal = ref(false)
const newSpendingLimit = ref('')
const presetLimits = [100, 500, 1000, 2000, 5000, 10000]

const card = ref({
  id: cardId,
  name: 'Platinum Credit Card',
  type: 'Credit',
  network: 'Visa',
  number: '4234567890123456',
  holderName: 'John Doe',
  expiry: '12/25',
  cvv: '123',
  status: 'active',
  linkedAccount: 'Checking Account ••1234',
  balance: 1250.75,
  availableCredit: 8749.25,
  creditLimit: 10000,
  spendingLimit: 5000,
  frozen: false,
  internationalUse: true,
  onlineTransactions: true
})

onMounted(() => {
  // Load card details from API based on cardId
  newSpendingLimit.value = card.value.spendingLimit
})

const formatCardNumber = (number) => {
  return number.replace(/(\d{4})/g, '$1 ').trim()
}

const toggleFreeze = () => {
  card.value.frozen = !card.value.frozen
  // Update via API
}

const toggleInternational = () => {
  card.value.internationalUse = !card.value.internationalUse
  // Update via API
}

const toggleOnline = () => {
  card.value.onlineTransactions = !card.value.onlineTransactions
  // Update via API
}

const updateSpendingLimit = () => {
  card.value.spendingLimit = parseFloat(newSpendingLimit.value)
  showLimitModal.value = false
  // Update via API
}
</script>