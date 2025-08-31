<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <!-- Header - Mobile Optimized -->
      <div class="mb-4 sm:mb-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">My Cards</h1>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">Manage your debit and credit cards</p>
          </div>
          <button class="w-full sm:w-auto px-4 py-3 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
            <PlusIcon class="w-5 h-5 mr-2" />
            <span class="sm:inline">Add Card</span>
          </button>
        </div>
      </div>

      <!-- Cards Grid - Mobile Responsive -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div 
          v-for="card in cards" 
          :key="card.id"
          @click="viewCardDetails(card.id)"
          class="relative group cursor-pointer"
        >
          <div :class="[
            'relative w-full h-48 sm:h-56 rounded-2xl p-4 sm:p-6 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl',
            card.gradient
          ]">
            <!-- Card Background Pattern -->
            <div class="absolute inset-0 bg-black/10 rounded-2xl"></div>
            <div class="absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full blur-2xl"></div>
            <div class="absolute bottom-4 left-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full blur-3xl"></div>
            
            <div class="relative z-10 h-full flex flex-col justify-between">
              <!-- Card Header -->
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-xs sm:text-sm opacity-90 font-medium">{{ card.bankName }}</p>
                  <p class="text-xs opacity-70 mt-1">{{ card.type.toUpperCase() }}</p>
                </div>
                <div class="flex items-center space-x-2">
                  <div :class="[
                    'w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full',
                    card.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                  ]"></div>
                  <div class="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <CreditCardIcon class="w-3 h-3 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>

              <!-- Card Number -->
              <div class="my-2">
                <p class="text-base sm:text-lg tracking-widest font-mono">
                  •••• •••• •••• {{ card.lastFour }}
                </p>
              </div>

              <!-- Card Footer -->
              <div class="flex justify-between items-end">
                <div>
                  <p class="text-xs opacity-70">VALID THRU</p>
                  <p class="text-xs sm:text-sm font-mono">{{ card.expiry }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs opacity-70 truncate max-w-20 sm:max-w-none">{{ card.holderName }}</p>
                  <p class="text-xs sm:text-sm font-medium truncate max-w-20 sm:max-w-none">{{ card.cardName }}</p>
                </div>
              </div>
            </div>

            <!-- Mobile-Friendly Quick Actions Overlay -->
            <div class="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 px-4">
                <button 
                  @click.stop="toggleCard(card.id)"
                  class="px-3 py-2 sm:px-4 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors flex items-center justify-center min-w-0"
                >
                  <component :is="card.status === 'active' ? LockIcon : UnlockIcon" class="w-4 h-4 sm:mr-2" />
                  <span class="hidden sm:inline">{{ card.status === 'active' ? 'Freeze' : 'Unfreeze' }}</span>
                </button>
                <button 
                  @click.stop="openSettings(card.id)"
                  class="px-3 py-2 sm:px-4 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors flex items-center justify-center min-w-0"
                >
                  <SettingsIcon class="w-4 h-4 sm:mr-2" />
                  <span class="hidden sm:inline">Settings</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Card Info Below - Mobile Optimized -->
          <div class="mt-3 sm:mt-4 px-1 sm:px-2">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate mr-2">{{ card.cardName }}</span>
              <span :class="[
                'px-2 py-1 rounded text-xs font-medium whitespace-nowrap',
                card.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              ]">
                {{ card.status }}
              </span>
            </div>
            
            <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <div class="flex justify-between mb-1">
                <span>Available</span>
                <span class="font-medium">${{ (card.creditLimit - card.currentBalance).toLocaleString() }}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                <div 
                  :class="[
                    'h-1.5 sm:h-2 rounded-full transition-all duration-500',
                    card.currentBalance / card.creditLimit > 0.8 ? 'bg-red-500' :
                    card.currentBalance / card.creditLimit > 0.6 ? 'bg-yellow-500' :
                    'bg-green-500'
                  ]"
                  :style="{ width: `${Math.min((card.currentBalance / card.creditLimit) * 100, 100)}%` }"
                ></div>
              </div>
              <div class="flex justify-between mt-1 text-xs">
                <span>Used: ${{ card.currentBalance.toLocaleString() }}</span>
                <span>Limit: ${{ card.creditLimit.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions - Mobile Optimized -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 mb-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <select 
              v-model="selectedCardFilter" 
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white flex-1 sm:flex-initial"
            >
              <option value="all">All Cards</option>
              <option v-for="card in cards" :key="card.id" :value="card.id">
                {{ card.cardName }}
              </option>
            </select>
            <button class="text-blue-600 hover:text-blue-700 text-sm font-medium py-2 sm:py-0 text-center">
              View All
            </button>
          </div>
        </div>

        <div class="space-y-3">
          <div 
            v-for="transaction in filteredTransactions" 
            :key="transaction.id"
            class="flex items-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div class="flex items-center flex-1 min-w-0">
              <div :class="[
                'w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shrink-0',
                getTransactionColor(transaction.category)
              ]">
                <component :is="getTransactionIcon(transaction.category)" class="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center mb-1">
                  <p class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate mr-2">{{ transaction.merchant }}</p>
                  <span class="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    •••• {{ transaction.cardLastFour }}
                  </span>
                </div>
                <div class="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span class="truncate">{{ transaction.category }}</span>
                  <span class="mx-1 sm:mx-2">•</span>
                  <span class="whitespace-nowrap">{{ formatDate(transaction.date) }}</span>
                </div>
              </div>
            </div>
            <div class="text-right ml-2 shrink-0">
              <p :class="[
                'font-bold text-sm sm:text-lg',
                transaction.type === 'refund' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              ]">
                {{ transaction.type === 'refund' ? '+' : '-' }}${{ transaction.amount }}
              </p>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {{ transaction.status }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Statistics - Mobile Optimized Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row sm:items-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
              <CreditCardIcon class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div class="min-w-0">
              <p class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Cards</p>
              <p class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{{ cards.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row sm:items-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
              <DollarSignIcon class="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
            </div>
            <div class="min-w-0">
              <p class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Available</p>
              <p class="text-sm sm:text-2xl font-bold text-gray-900 dark:text-white">
                ${{ (totalAvailableCredit / 1000).toFixed(0) }}k
                <span class="hidden sm:inline">${{ totalAvailableCredit.toLocaleString() }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row sm:items-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
              <TrendingUpIcon class="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div class="min-w-0">
              <p class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
              <p class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">$1,847</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row sm:items-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
              <ShieldIcon class="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div class="min-w-0">
              <p class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Rewards</p>
              <p class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">12.4k</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  CreditCardIcon, 
  PlusIcon, 
  LockIcon, 
  UnlockIcon, 
  SettingsIcon,
  DollarSignIcon,
  TrendingUpIcon,
  ShieldIcon,
  ShoppingCartIcon,
  UtensilsIcon,
  CarIcon,
  GamepadIcon,
  HeartIcon,
  HomeIcon,
  PlaneIcon
} from 'lucide-vue-next'

const selectedCardFilter = ref('all')

const cards = ref([
  {
    id: '1',
    cardName: 'Primary Visa',
    bankName: 'SecureBank',
    type: 'visa',
    lastFour: '1234',
    expiry: '12/27',
    holderName: 'J. SMITH',
    status: 'active',
    creditLimit: 5000,
    currentBalance: 1200,
    gradient: 'bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800'
  },
  {
    id: '2',
    cardName: 'Business MasterCard',
    bankName: 'BusinessBank',
    type: 'mastercard',
    lastFour: '5678',
    expiry: '09/26',
    holderName: 'J. SMITH',
    status: 'active',
    creditLimit: 10000,
    currentBalance: 3500,
    gradient: 'bg-gradient-to-br from-red-500 via-red-600 to-orange-600'
  },
  {
    id: '3',
    cardName: 'Travel Rewards',
    bankName: 'TravelBank',
    type: 'visa',
    lastFour: '9012',
    expiry: '03/28',
    holderName: 'J. SMITH',
    status: 'frozen',
    creditLimit: 7500,
    currentBalance: 890,
    gradient: 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700'
  },
  {
    id: '4',
    cardName: 'Cashback Plus',
    bankName: 'RewardsBank',
    type: 'visa',
    lastFour: '3456',
    expiry: '11/27',
    holderName: 'J. SMITH',
    status: 'active',
    creditLimit: 3000,
    currentBalance: 450,
    gradient: 'bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800'
  }
])

const transactions = ref([
  {
    id: 1,
    cardId: '1',
    cardLastFour: '1234',
    merchant: 'Amazon.com',
    amount: '89.99',
    category: 'Shopping',
    type: 'purchase',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'Completed'
  },
  {
    id: 2,
    cardId: '2',
    cardLastFour: '5678',
    merchant: 'Starbucks',
    amount: '5.75',
    category: 'Food & Dining',
    type: 'purchase',
    date: new Date(Date.now() - 1000 * 60 * 60 * 4),
    status: 'Completed'
  },
  {
    id: 3,
    cardId: '1',
    cardLastFour: '1234',
    merchant: 'Best Buy',
    amount: '299.99',
    category: 'Electronics',
    type: 'refund',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: 'Pending'
  },
  {
    id: 4,
    cardId: '3',
    cardLastFour: '9012',
    merchant: 'Delta Airlines',
    amount: '450.00',
    category: 'Travel',
    type: 'purchase',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    status: 'Completed'
  },
  {
    id: 5,
    cardId: '4',
    cardLastFour: '3456',
    merchant: 'Shell',
    amount: '45.20',
    category: 'Transportation',
    type: 'purchase',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    status: 'Completed'
  }
])

const totalAvailableCredit = computed(() => {
  return cards.value.reduce((total, card) => total + (card.creditLimit - card.currentBalance), 0)
})

const filteredTransactions = computed(() => {
  if (selectedCardFilter.value === 'all') {
    return transactions.value
  }
  return transactions.value.filter(t => t.cardId === selectedCardFilter.value)
})

const getTransactionIcon = (category) => {
  const icons = {
    'Shopping': ShoppingCartIcon,
    'Food & Dining': UtensilsIcon,
    'Transportation': CarIcon,
    'Entertainment': GamepadIcon,
    'Healthcare': HeartIcon,
    'Electronics': HomeIcon,
    'Travel': PlaneIcon
  }
  return icons[category] || DollarSignIcon
}

const getTransactionColor = (category) => {
  const colors = {
    'Shopping': 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
    'Food & Dining': 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400',
    'Transportation': 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
    'Entertainment': 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
    'Healthcare': 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400',
    'Electronics': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    'Travel': 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-400'
  }
  return colors[category] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
}

const formatDate = (date) => {
  const now = new Date()
  const diff = now - date
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

const viewCardDetails = (cardId) => {
  console.log('View card details:', cardId)
}

const toggleCard = (cardId) => {
  const card = cards.value.find(c => c.id === cardId)
  if (card) {
    card.status = card.status === 'active' ? 'frozen' : 'active'
  }
}

const openSettings = (cardId) => {
  console.log('Open card settings:', cardId)
}
</script>