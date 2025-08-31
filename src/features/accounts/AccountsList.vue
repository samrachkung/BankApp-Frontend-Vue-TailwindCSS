<template>
  <div class="max-w-6xl mx-auto p-3 sm:p-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">My Accounts</h1>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">Manage all your bank accounts in one place</p>
      </div>
      <button class="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
        <PlusIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        Open New Account
      </button>
    </div>

    <!-- Total Balance Summary -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white mb-6 sm:mb-8 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full -mr-16 sm:-mr-20 -mt-16 sm:-mt-20"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full -ml-12 sm:-ml-16 -mb-12 sm:-mb-16"></div>
      
      <div class="relative z-10">
        <h2 class="text-lg sm:text-xl font-semibold mb-2">Total Balance</h2>
        <div class="flex items-baseline mb-3 sm:mb-4">
          <span class="text-2xl sm:text-4xl font-bold">${{ totalBalance.toLocaleString() }}</span>
          <span class="ml-2 sm:ml-3 text-base sm:text-lg opacity-80">USD</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <p class="text-white/80 text-xs sm:text-sm">Available</p>
            <p class="text-lg sm:text-xl font-semibold">${{ availableBalance.toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-white/80 text-xs sm:text-sm">Pending</p>
            <p class="text-lg sm:text-xl font-semibold">${{ pendingBalance.toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-white/80 text-xs sm:text-sm">This Month</p>
            <p class="text-lg sm:text-xl font-semibold flex items-center">
              {{ monthlyChange >= 0 ? '+' : '' }}${{ Math.abs(monthlyChange).toLocaleString() }}
              <component :is="monthlyChange >= 0 ? TrendingUpIcon : TrendingDownIcon" 
                         class="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Accounts Grid -->
    <div class="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <div 
        v-for="account in accounts" 
        :key="account.id"
        @click="viewAccount(account.id)"
        class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer group"
      >
        <div class="flex justify-between items-start mb-3 sm:mb-4">
          <div class="flex items-center flex-1 min-w-0">
            <div :class="[
              'w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0',
              account.color
            ]">
              <component :is="account.icon" class="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">{{ account.name }}</h3>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{{ account.type }} • ***{{ account.number.slice(-4) }}</p>
            </div>
          </div>
          <div :class="[
            'px-2 py-1 rounded text-xs font-medium ml-2 flex-shrink-0',
            account.status === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          ]">
            {{ account.status }}
          </div>
        </div>

        <div class="mb-3 sm:mb-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Available Balance</span>
            <button 
              @click.stop="toggleBalanceVisibility(account.id)"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 -m-1"
            >
              <component :is="account.showBalance ? EyeIcon : EyeOffIcon" class="w-4 h-4" />
            </button>
          </div>
          <p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {{ account.showBalance ? `$${account.balance.toLocaleString()}` : '••••••' }}
          </p>
          <div v-if="account.pending > 0" class="flex items-center text-xs sm:text-sm text-yellow-600 dark:text-yellow-400 mt-1">
            <ClockIcon class="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            ${{ account.pending.toLocaleString() }} pending
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div>
            <p class="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">This Month</p>
            <p :class="[
              'text-sm font-semibold',
              account.monthlyChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            ]">
              {{ account.monthlyChange >= 0 ? '+' : '' }}${{ Math.abs(account.monthlyChange).toLocaleString() }}
            </p>
          </div>
          <div>
            <p class="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Interest Rate</p>
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ account.interestRate || '0.0' }}% APY
            </p>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="border-t border-gray-200 dark:border-gray-600 pt-3 sm:pt-4">
          <p class="text-sm font-medium text-gray-900 dark:text-white mb-2">Recent Activity</p>
          <div class="space-y-2">
            <div 
              v-for="transaction in account.recentActivity.slice(0, 2)" 
              :key="transaction.id"
              class="flex items-center justify-between text-xs sm:text-sm"
            >
              <div class="flex items-center flex-1 min-w-0">
                <div :class="[
                  'w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0',
                  transaction.type === 'credit' 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                    : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                ]">
                  <component :is="transaction.type === 'credit' ? PlusIcon : MinusIcon" class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </div>
                <span class="text-gray-900 dark:text-white truncate">{{ transaction.description }}</span>
              </div>
              <span :class="[
                'font-medium ml-2 flex-shrink-0',
                transaction.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              ]">
                {{ transaction.type === 'credit' ? '+' : '-' }}${{ Math.abs(transaction.amount) }}
              </span>
            </div>
          </div>
          <button class="text-blue-600 hover:text-blue-700 text-xs font-medium mt-2 group-hover:underline">
            View all transactions →
          </button>
        </div>

        <!-- Quick Actions -->
        <div class="flex space-x-2 mt-3 sm:mt-4">
          <button 
            @click.stop="transferMoney(account.id)"
            class="flex-1 py-2.5 sm:py-2 px-3 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center justify-center"
          >
            <ArrowRightLeftIcon class="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Transfer
          </button>
          <button 
            @click.stop="payBills(account.id)"
            class="flex-1 py-2.5 sm:py-2 px-3 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors flex items-center justify-center"
          >
            <FileTextIcon class="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Pay Bills
          </button>
        </div>
      </div>
    </div>

    <!-- Financial Overview -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row sm:items-center">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
            <CreditCardIcon class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Accounts</p>
            <p class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{{ accounts.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row sm:items-center">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
            <TrendingUpIcon class="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Income</p>
            <p class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">$6,450</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row sm:items-center">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
            <PiggyBankIcon class="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Savings</p>
            <p class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">$18,430</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row sm:items-center">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
            <TargetIcon class="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Savings Goal</p>
            <p class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">$25,000</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Transactions Across All Accounts -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3 sm:gap-0">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <select class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white">
            <option>All Accounts</option>
            <option v-for="account in accounts" :key="account.id">{{ account.name }}</option>
          </select>
          <button class="text-blue-600 hover:text-blue-700 text-sm font-medium text-center sm:text-left">
            View All
          </button>
        </div>
      </div>
      
      <div class="space-y-3">
        <div 
          v-for="transaction in recentTransactions" 
          :key="transaction.id"
          class="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          <div class="flex items-center flex-1 min-w-0">
            <div :class="[
              'w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0',
              getTransactionColor(transaction.type, transaction.category)
            ]">
              <component :is="getTransactionIcon(transaction.category)" class="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-semibold text-sm sm:text-base text-gray-900 dark:text-white truncate">{{ transaction.description }}</p>
              <div class="flex flex-wrap items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 gap-1">
                <span class="truncate">{{ transaction.accountName }}</span>
                <span class="hidden sm:inline">•</span>
                <span class="truncate">{{ transaction.category }}</span>
                <span class="hidden sm:inline">•</span>
                <span class="whitespace-nowrap">{{ formatDate(transaction.date) }}</span>
              </div>
            </div>
          </div>
          <div class="text-right ml-3 flex-shrink-0">
            <p :class="[
              'font-bold text-sm sm:text-lg',
              transaction.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            ]">
              {{ transaction.type === 'credit' ? '+' : '-' }}${{ Math.abs(transaction.amount).toLocaleString() }}
            </p>
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ transaction.status }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  PlusIcon, 
  EyeIcon, 
  EyeOffIcon, 
  ClockIcon,
  CreditCardIcon,
  PiggyBankIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  TargetIcon,
  ArrowRightLeftIcon,
  FileTextIcon,
  MinusIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  UtensilsIcon,
  CarIcon,
  HomeIcon
} from 'lucide-vue-next'

const accounts = ref([
  {
    id: '1',
    name: 'Premium Checking',
    type: 'Checking Account',
    number: '1234567890',
    balance: 12540.75,
    pending: 250.00,
    monthlyChange: 1240,
    interestRate: '0.1',
    status: 'active',
    showBalance: true,
    icon: CreditCardIcon,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
    recentActivity: [
      { id: 1, description: 'Salary Deposit', amount: 3200, type: 'credit' },
      { id: 2, description: 'Grocery Store', amount: -85.32, type: 'debit' }
    ]
  },
  {
    id: '2',
    name: 'High-Yield Savings',
    type: 'Savings Account',
    number: '9876543210',
    balance: 18430.20,
    pending: 0,
    monthlyChange: 450,
    interestRate: '4.5',
    status: 'active',
    showBalance: true,
    icon: PiggyBankIcon,
    color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
    recentActivity: [
      { id: 3, description: 'Interest Earned', amount: 67.23, type: 'credit' },
      { id: 4, description: 'Auto Transfer', amount: 500, type: 'credit' }
    ]
  },
  {
    id: '3',
    name: 'Investment Account',
    type: 'Investment Account',
    number: '5555666677',
    balance: 25670.80,
    pending: 1200,
    monthlyChange: -340,
    interestRate: 'Variable',
    status: 'active',
    showBalance: true,
    icon: TrendingUpIcon,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
    recentActivity: [
      { id: 5, description: 'Stock Purchase', amount: -1200, type: 'debit' },
      { id: 6, description: 'Dividend', amount: 45.80, type: 'credit' }
    ]
  },
  {
    id: '4',
    name: 'Business Checking',
    type: 'Business Account',
    number: '1111222233',
    balance: 8420.15,
    pending: 350,
    monthlyChange: 2100,
    interestRate: '0.5',
    status: 'active',
    showBalance: false,
    icon: HomeIcon,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400',
    recentActivity: [
      { id: 7, description: 'Client Payment', amount: 2500, type: 'credit' },
      { id: 8, description: 'Office Rent', amount: -1200, type: 'debit' }
    ]
  }
])

const recentTransactions = ref([
  {
    id: 1,
    description: 'Salary Deposit',
    amount: 3200,
    type: 'credit',
    category: 'Salary',
    accountName: 'Premium Checking',
    date: new Date(Date.now() - 1000 * 60 * 60 * 4),
    status: 'Completed'
  },
  {
    id: 2,
    description: 'Grocery Store',
    amount: -85.32,
    type: 'debit',
    category: 'Food & Dining',
    accountName: 'Premium Checking',
    date: new Date(Date.now() - 1000 * 60 * 60 * 6),
    status: 'Completed'
  },
  {
    id: 3,
    description: 'Interest Earned',
    amount: 67.23,
    type: 'credit',
    category: 'Interest',
    accountName: 'High-Yield Savings',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: 'Completed'
  },
  {
    id: 4,
    description: 'Stock Purchase',
    amount: -1200,
    type: 'debit',
    category: 'Investment',
    accountName: 'Investment Account',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    status: 'Pending'
  },
  {
    id: 5,
    description: 'Client Payment',
    amount: 2500,
    type: 'credit',
    category: 'Business',
    accountName: 'Business Checking',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    status: 'Completed'
  }
])

const totalBalance = computed(() => {
  return accounts.value.reduce((sum, account) => sum + account.balance, 0)
})

const availableBalance = computed(() => {
  return accounts.value.reduce((sum, account) => sum + (account.balance - account.pending), 0)
})

const pendingBalance = computed(() => {
  return accounts.value.reduce((sum, account) => sum + account.pending, 0)
})

const monthlyChange = computed(() => {
  return accounts.value.reduce((sum, account) => sum + account.monthlyChange, 0)
})

const toggleBalanceVisibility = (accountId) => {
  const account = accounts.value.find(a => a.id === accountId)
  if (account) {
    account.showBalance = !account.showBalance
  }
}

const getTransactionIcon = (category) => {
  const icons = {
    'Salary': DollarSignIcon,
    'Food & Dining': UtensilsIcon,
    'Shopping': ShoppingCartIcon,
    'Transportation': CarIcon,
    'Interest': TrendingUpIcon,
    'Investment': TrendingUpIcon,
    'Business': HomeIcon
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
    'Investment': 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400'
  }
  return colors[category] || 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
}

const formatDate = (date) => {
  const now = new Date()
  const diff = now - date
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

const viewAccount = (accountId) => {
  console.log('View account:', accountId)
}

const transferMoney = (accountId) => {
  console.log('Transfer from account:', accountId)
}

const payBills = (accountId) => {
  console.log('Pay bills from account:', accountId)
}
</script>