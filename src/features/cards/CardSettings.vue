<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Card Settings</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Manage your card preferences and security settings</p>
    </div>

    <!-- Card Selection -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Card</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="card in cards" 
          :key="card.id"
          @click="selectedCardId = card.id"
          :class="[
            'relative cursor-pointer rounded-lg p-4 border-2 transition-all',
            selectedCardId === card.id 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
          ]"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-900 dark:text-white">
              {{ card.name }}
            </span>
            <div v-if="selectedCardId === card.id" class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <CheckIcon class="w-3 h-3 text-white" />
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            •••• •••• •••• {{ card.lastFour }}
          </p>
          <div :class="[
            'mt-2 inline-flex items-center px-2 py-1 rounded text-xs font-medium',
            card.status === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          ]">
            {{ card.status }}
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Spending Limits -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <DollarSignIcon class="w-5 h-5 mr-2 text-green-600" />
          Spending Limits
        </h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Daily Limit
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                v-model="limits.daily"
                type="number"
                class="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Monthly Limit
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                v-model="limits.monthly"
                type="number"
                class="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ATM Withdrawal Limit
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                v-model="limits.atm"
                type="number"
                class="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        <button class="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Update Limits
        </button>
      </div>

      <!-- Security Settings -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <ShieldIcon class="w-5 h-5 mr-2 text-blue-600" />
          Security Settings
        </h2>
        
        <div class="space-y-4">
          <div v-for="setting in securitySettings" :key="setting.id" 
               class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center">
              <component :is="setting.icon" class="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{{ setting.title }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ setting.description }}</p>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                v-model="setting.enabled" 
                type="checkbox" 
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Transaction Categories -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <TagIcon class="w-5 h-5 mr-2 text-purple-600" />
          Transaction Categories
        </h2>
        
        <div class="space-y-3">
          <div v-for="category in transactionCategories" :key="category.id" 
               class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center">
              <div :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center mr-3',
                category.color
              ]">
                <component :is="category.icon" class="w-4 h-4" />
              </div>
              <span class="font-medium text-gray-900 dark:text-white">{{ category.name }}</span>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                v-model="category.enabled" 
                type="checkbox" 
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Notification Preferences -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <BellIcon class="w-5 h-5 mr-2 text-yellow-600" />
          Notifications
        </h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Transaction Alert Threshold
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                v-model="notificationThreshold"
                type="number"
                placeholder="100"
                class="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Get alerts for transactions above this amount
            </p>
          </div>

          <div class="space-y-3">
            <div v-for="notification in notificationTypes" :key="notification.id" 
                 class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{{ notification.name }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ notification.description }}</p>
              </div>
              <div class="flex space-x-2">
                <button 
                  v-for="method in notification.methods"
                  :key="method"
                  @click="toggleNotificationMethod(notification.id, method)"
                  :class="[
                    'px-3 py-1 text-xs rounded-full transition-colors',
                    notification.enabledMethods.includes(method)
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  ]"
                >
                  {{ method }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="mt-8 flex flex-col sm:flex-row gap-4">
      <button class="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
        <SaveIcon class="w-5 h-5 mr-2" />
        Save All Settings
      </button>
      <button class="flex-1 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center">
        <RotateCcwIcon class="w-5 h-5 mr-2" />
        Reset to Defaults
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  DollarSignIcon, 
  ShieldIcon, 
  BellIcon, 
  TagIcon,
  CheckIcon,
  SaveIcon,
  RotateCcwIcon,
  CreditCardIcon,
  SmartphoneIcon,
  MapPinIcon,
  AlertTriangleIcon,
  ShoppingCartIcon,
  CarIcon,
  HomeIcon,
  UtensilsIcon,
  HeartIcon,
  GamepadIcon
} from 'lucide-vue-next'

const selectedCardId = ref('1')
const notificationThreshold = ref(100)

const cards = ref([
  { id: '1', name: 'Primary Visa', lastFour: '1234', status: 'active' },
  { id: '2', name: 'Business MasterCard', lastFour: '5678', status: 'active' },
  { id: '3', name: 'Travel Card', lastFour: '9012', status: 'frozen' }
])

const limits = ref({
  daily: 1000,
  monthly: 5000,
  atm: 500
})

const securitySettings = ref([
  {
    id: 1,
    title: 'Transaction Alerts',
    description: 'Get instant notifications for all transactions',
    icon: BellIcon,
    enabled: true
  },
  {
    id: 2,
    title: 'Online Purchases',
    description: 'Allow card to be used for online transactions',
    icon: CreditCardIcon,
    enabled: true
  },
  {
    id: 3,
    title: 'International Transactions',
    description: 'Allow card to be used outside your country',
    icon: MapPinIcon,
    enabled: false
  },
  {
    id: 4,
    title: 'Contactless Payments',
    description: 'Enable tap-to-pay functionality',
    icon: SmartphoneIcon,
    enabled: true
  },
  {
    id: 5,
    title: 'Fraud Protection',
    description: 'Advanced fraud detection and blocking',
    icon: ShieldIcon,
    enabled: true
  }
])

const transactionCategories = ref([
  { id: 1, name: 'Shopping', icon: ShoppingCartIcon, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400', enabled: true },
  { id: 2, name: 'Transportation', icon: CarIcon, color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400', enabled: true },
  { id: 3, name: 'Housing', icon: HomeIcon, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400', enabled: true },
  { id: 4, name: 'Food & Dining', icon: UtensilsIcon, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400', enabled: true },
  { id: 5, name: 'Healthcare', icon: HeartIcon, color: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400', enabled: false },
  { id: 6, name: 'Entertainment', icon: GamepadIcon, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400', enabled: true }
])

const notificationTypes = ref([
  {
    id: 1,
    name: 'Transaction Alerts',
    description: 'Notifications for every transaction',
    methods: ['Email', 'SMS', 'Push'],
    enabledMethods: ['Email', 'Push']
  },
  {
    id: 2,
    name: 'Security Alerts',
    description: 'Suspicious activity notifications',
    methods: ['Email', 'SMS', 'Push'],
    enabledMethods: ['Email', 'SMS', 'Push']
  },
  {
    id: 3,
    name: 'Payment Reminders',
    description: 'Due date and payment reminders',
    methods: ['Email', 'SMS'],
    enabledMethods: ['Email']
  },
  {
    id: 4,
    name: 'Promotional Offers',
    description: 'Special offers and rewards notifications',
    methods: ['Email', 'Push'],
    enabledMethods: []
  }
])

const toggleNotificationMethod = (notificationId, method) => {
  const notification = notificationTypes.value.find(n => n.id === notificationId)
  if (notification) {
    const index = notification.enabledMethods.indexOf(method)
    if (index > -1) {
      notification.enabledMethods.splice(index, 1)
    } else {
      notification.enabledMethods.push(method)
    }
  }
}
</script>