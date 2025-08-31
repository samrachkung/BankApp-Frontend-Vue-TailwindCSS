<template>
  <Card title="Account Summary">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="account in accounts"
        :key="account.id"
        class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              {{ account.name }}
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ formatCurrency(account.balance) }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ account.number }}
            </p>
          </div>
          <div
            class="p-2 rounded-full"
            :class="accountTypeClasses[account.type]"
          >
            <component
              :is="accountTypeIcons[account.type]"
              class="h-5 w-5"
            />
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import { ref } from 'vue'
import { formatCurrency } from '../../../utils/formatCurrency'
import Card from '../../../components/ui/Card.vue'
import {
  BanknotesIcon,
  CreditCardIcon,
  BuildingLibraryIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'AccountSummary',
  components: {
    Card
  },
  setup() {
    const accounts = ref([
      {
        id: 1,
        name: 'Checking Account',
        number: '**** 4582',
        balance: 12560.75,
        type: 'checking'
      },
      {
        id: 2,
        name: 'Savings Account',
        number: '**** 7845',
        balance: 35620.42,
        type: 'savings'
      },
      {
        id: 3,
        name: 'Credit Card',
        number: '**** 3298',
        balance: -2456.30,
        type: 'credit'
      },
      {
        id: 4,
        name: 'Investment Account',
        number: '**** 9123',
        balance: 89245.18,
        type: 'investment'
      }
    ])

    const accountTypeIcons = {
      checking: BanknotesIcon,
      savings: BuildingLibraryIcon,
      credit: CreditCardIcon,
      investment: BuildingLibraryIcon
    }

    const accountTypeClasses = {
      checking: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
      savings: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
      credit: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
      investment: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
    }

    return {
      accounts,
      accountTypeIcons,
      accountTypeClasses,
      formatCurrency
    }
  }
}
</script>