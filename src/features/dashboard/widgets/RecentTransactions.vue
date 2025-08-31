<template>
  <Card title="Recent Transactions">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Description</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
            <th class="px-4 py-2 text-right text-sm font-medium text-gray-600 dark:text-gray-400">Amount</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="transaction.id"
            class="table-row"
          >
            <td class="px-4 py-3">
              <div class="flex items-center">
                <div
                  class="p-2 rounded-full mr-3"
                  :class="transactionCategoryClasses[transaction.category]"
                >
                  <component
                    :is="transactionCategoryIcons[transaction.category]"
                    class="h-4 w-4"
                  />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ transaction.description }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ transaction.category }}
                  </p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
              {{ formatDate(transaction.date) }}
            </td>
            <td class="px-4 py-3 text-right">
              <span
                class="text-sm font-medium"
                :class="transaction.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'"
              >
                {{ formatCurrency(transaction.amount) }}
              </span>
            </td>
            <td class="px-4 py-3">
              <span
                class="text-xs font-medium px-2.5 py-0.5 rounded"
                :class="transactionStatusClasses[transaction.status]"
              >
                {{ transaction.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <template #footer>
      <RouterLink
        to="/accounts"
        class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
      >
        View all transactions →
      </RouterLink>
    </template>
  </Card>
</template>

<script>
import { ref } from 'vue'
import { formatCurrency } from '../../../utils/formatCurrency'
import { formatDate } from '../../../utils/formatDate'
import Card from '../../../components/ui/Card.vue'
import {
  ShoppingBagIcon,
  HomeIcon,
  TruckIcon,
  FilmIcon,
  WifiIcon,
  HeartIcon,
  AcademicCapIcon,
  ArrowRightCircleIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'RecentTransactions',
  components: {
    Card
  },
  setup() {
    const transactions = ref([
      {
        id: 1,
        description: 'Grocery Store',
        category: 'Food & Dining',
        date: '2024-01-15',
        amount: -85.42,
        status: 'completed'
      },
      {
        id: 2,
        description: 'Salary Deposit',
        category: 'Income',
        date: '2024-01-14',
        amount: 4500.00,
        status: 'completed'
      },
      {
        id: 3,
        description: 'Electricity Bill',
        category: 'Utilities',
        date: '2024-01-13',
        amount: -125.36,
        status: 'completed'
      },
      {
        id: 4,
        description: 'Online Shopping',
        category: 'Shopping',
        date: '2024-01-12',
        amount: -64.99,
        status: 'pending'
      },
      {
        id: 5,
        description: 'Coffee Shop',
        category: 'Food & Dining',
        date: '2024-01-11',
        amount: -8.75,
        status: 'completed'
      }
    ])

    const transactionCategoryIcons = {
      'Food & Dining': ShoppingBagIcon,
      'Income': ArrowRightCircleIcon,
      'Utilities': WifiIcon,
      'Shopping': ShoppingBagIcon,
      'Transportation': TruckIcon,
      'Entertainment': FilmIcon,
      'Healthcare': HeartIcon,
      'Education': AcademicCapIcon,
      'Other': HomeIcon
    }

    const transactionCategoryClasses = {
      'Food & Dining': 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400',
      'Income': 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
      'Utilities': 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
      'Shopping': 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
      'Transportation': 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400',
      'Entertainment': 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-400',
      'Healthcare': 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400',
      'Education': 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400',
      'Other': 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400'
    }

    const transactionStatusClasses = {
      completed: 'badge-success',
      pending: 'badge-warning',
      failed: 'badge-danger',
      cancelled: 'badge-info'
    }

    return {
      transactions,
      transactionCategoryIcons,
      transactionCategoryClasses,
      transactionStatusClasses,
      formatCurrency,
      formatDate
    }
  }
}
</script>