<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="mb-6">
      <button 
        @click="$router.go(-1)"
        class="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
      >
        <ArrowLeftIcon class="w-5 h-5 mr-2" />
        Back to Accounts
      </button>
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ account.name }}</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Account #{{ account.number }}</p>
        </div>
        <div class="flex space-x-3">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
            <ArrowRightLeftIcon class="w-4 h-4 mr-2" />
            Transfer
          </button>
          <button class="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center">
            <DownloadIcon class="w-4 h-4 mr-2" />
            Statement
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Account Summary -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Balance Card -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          
          <div class="relative z-10">
            <div class="flex justify-between items-start mb-6">
              <div>
                <p class="text-white/80 text-sm mb-1">Available Balance</p>
                <p class="text-3xl font-bold">${{ account.balance.toLocaleString() }}</p>
              </div>
              <div class="text-right">
                <div :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                  account.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                ]">
                  <div :class="[
                    'w-2 h-2 rounded-full mr-2',
                    account.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                  ]"></div>
                  {{ account.status }}
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-3 gap-4">
              <div>
                <p class="text-white/80 text-sm">Pending</p>
                <p class="text-lg font-semibold">${{ account.pending.toLocaleString() }}</p>
              </div>
              <div>
                <p class="text-white/80 text-sm">Available Credit</p>
                <p class="text-lg font-semibold">${{ account.availableCredit?.toLocaleString() || 'N/A' }}</p>
              </div>
              <div>
                <p class="text-white/80 text-sm">Interest Rate</p>
                <p class="text-lg font-semibold">{{ account.interestRate || '0.1' }}%</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              v-for="action in quickActions" 
              :key="action.id"
              class="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div :class="[
                'w-12 h-12 rounded-lg flex items-center justify-center mb-3',
                action.color
              ]">
                <component :is="action.icon" class="w-6 h-6" />
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ action.name }}</span>
            </button>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
            <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All Transactions
            </button>
          </div>
          
          <div class="space-y-3">
            <div 
              v-for="transaction in account.recentTransactions" 
              :key="transaction.id"
              class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div class="flex items-center">
                <div :class="[
                  'w-12 h-12 rounded-xl flex items-center justify-center mr-4',
                  getTransactionColor(transaction.type, transaction.category)
                ]">
                  <component :is="getTransactionIcon(transaction.category)" class="w-6 h-6" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">{{ transaction.description }}</p>
                  <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span>{{ transaction.category }}</span>
                    <span class="mx-2">•</span>
                    <span>{{ formatDate(transaction.date) }}</span>
                    <span v-if="transaction.pending" class="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Pending
                    </span>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <p :class="[
                  'font-bold text-lg',
                  transaction.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                ]">
                  {{ transaction.type === 'credit' ? '+' : '-' }}${{ Math.abs(transaction.amount).toLocaleString() }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Balance: ${{ transaction.balance.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Spending Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Spending Trend</h2>
          <div class="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div class="text-center text-gray-600 dark:text-gray-400">
              <TrendingUpIcon class="w-12 h-12 mx-auto mb-2" />
              <p>Chart visualization would go here</p>
              <p class="text-sm">Integration with Chart.js or similar</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Details Sidebar -->
      <div class="space-y-6">
        <!-- Account Information -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Details</h2>
          <div class="space-y-4">
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
              <span class="text-sm text-gray-600 dark:text-gray-400">Account Type</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ account.type }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
              <span class="text-sm text-gray-600 dark:text-gray-400">Account Number</span>
              <span class="font-medium text-gray-900 dark:text-white">***{{ account.number.slice(-4) }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
              <span class="text-sm text-gray-600 dark:text-gray-400">Routing Number</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ account.routingNumber }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
              <span class="text-sm text-gray-600 dark:text-gray-400">Opened</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ account.openDate }}</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">Branch</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ account.branch }}</span>
            </div>
          </div>
        </div>

        <!-- Monthly Summary -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">This Month</h2>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span class="text-sm text-gray-600 dark:text-gray-400">Money In</span>
              </div>
              <span class="font-bold text-green-600 dark:text-green-400">+$3,240</span>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span class="text-sm text-gray-600 dark:text-gray-400">Money Out</span>
              </div>
              <span class="font-bold text-red-600 dark:text-red-400">-$2,180</span>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-600 pt-3">
              <div class="flex justify-between items-center">
                <span class="font-medium text-gray-900 dark:text-white">Net Change</span>
                <span class="font-bold text-blue-600 dark:text-blue-400">+$1,060</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Alerts & Notifications -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Alerts</h2>
          <div class="space-y-3">
            <div class="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <InfoIcon class="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p class="text-sm font-medium text-blue-900 dark:text-blue-100">Direct Deposit</p>
                <p class="text-xs text-blue-700 dark:text-blue-300">Your salary will be deposited tomorrow</p>
              </div>
            </div>
            <div class="flex items-start p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangleIcon class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p class="text-sm font-medium text-yellow-900 dark:text-yellow-100">Low Balance Alert</p>
                <p class="text-xs text-yellow-700 dark:text-yellow-300">Set up alerts when balance drops below $500</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Account Settings -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h2>
          <div class="space-y-3">
            <button class="w-full flex items-center justify-between p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div class="flex items-center">
                <BellIcon class="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <span class="text-sm font-medium text-gray-900 dark:text-white">Notifications</span>
              </div>
              <ChevronRightIcon class="w-5 h-5 text-gray-400" />
            </button>
            <button class="w-full flex items-center justify-between p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div class="flex items-center">
                <LockIcon class="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <span class="text-sm font-medium text-gray-900 dark:text-white">Security</span>
              </div>
              <ChevronRightIcon class="w-5 h-5 text-gray-400" />
            </button>
            <button class="w-full flex items-center justify-between p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div class="flex items-center">
                <CreditCardIcon class="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <span class="text-sm font-medium text-gray-900 dark:text-white">Linked Cards</span>
              </div>
              <ChevronRightIcon class="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  ArrowLeftIcon, 
  ArrowRightLeftIcon, 
  DownloadIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  UtensilsIcon,
  CarIcon,
  HomeIcon,
  TrendingUpIcon,
  InfoIcon,
  AlertTriangleIcon,
  BellIcon,
  LockIcon,
  CreditCardIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  RefreshCwIcon,
  FileTextIcon
} from 'lucide-vue-next'

const account = ref({
  id: '1',
  name: 'Premium Checking',
  number: '1234567890',
  routingNumber: '021000021',
  type: 'Checking Account',
  balance: 12540.75,
  pending: 250.00,
  availableCredit: null,
  interestRate: '0.1',
  status: 'active',
  openDate: 'Jan 15, 2020',
  branch: 'Downtown Branch',
  recentTransactions: [
    {
      id: 1,
      description: 'Salary Deposit',
      amount: 3200,
      type: 'credit',
      category: 'Salary',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      balance: 12540.75,
      pending: false
    },
    {
      id: 2,
      description: 'Grocery Store',
      amount: -85.32,
      type: 'debit',
      category: 'Food & Dining',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      balance: 9340.75,
      pending: false
    },
    {
      id: 3,
      description: 'Electric Bill AutoPay',
      amount: -125.67,
      type: 'debit',
      category: 'Utilities',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      balance: 9426.07,
      pending: false
    },
    {
      id: 4,
      description: 'ATM Withdrawal',
      amount: -100.00,
      type: 'debit',
      category: 'ATM',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
      balance: 9551.74,
      pending: false
    },
    {
      id: 5,
      description: 'Online Transfer',
      amount: -500.00,
      type: 'debit',
      category: 'Transfer',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      balance: 9651.74,
      pending: true
    }
  ]
})

const quickActions = ref([
  {
    id: 1,
    name: 'Transfer',
    icon: ArrowRightLeftIcon,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
  },
  {
    id: 2,
    name: 'Pay Bills',
    icon: FileTextIcon,
    color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
  },
  {
    id: 3,
    name: 'Deposit',
    icon: PlusIcon,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
  },
  {
    id: 4,
    name: 'Withdraw',
    icon: MinusIcon,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
  }
])

const getTransactionIcon = (category) => {
  const icons = {
    'Salary': DollarSignIcon,
    'Food & Dining': UtensilsIcon,
    'Shopping': ShoppingCartIcon,
    'Transportation': CarIcon,
    'Utilities': HomeIcon,
    'ATM': DollarSignIcon,
    'Transfer': ArrowRightLeftIcon
  }
  return icons[category] || DollarSignIcon
}

const getTransactionColor = (type, category) => {
  if (type === 'credit') {
    return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
  }
  
  const colors = {
    'Food & Dining': 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400',
    'Shopping': 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
    'Transportation': 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
    'Utilities': 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400',
    'ATM': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    'Transfer': 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400'
  }
  return colors[category] || 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
}

const formatDate = (date) => {
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / 86400000)

  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}
</script>