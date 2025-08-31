<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">QR Code Payments</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Scan QR Code -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Scan QR Code</h2>
        
        <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-4 h-64 flex items-center justify-center">
          <div v-if="!scanning" class="text-center">
            <div class="w-16 h-16 mx-auto mb-2 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span class="text-2xl">📷</span>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">Click to start scanning</p>
            <button 
              @click="startScanning"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Scan QR Code
            </button>
          </div>
          
          <div v-else class="text-center">
            <div class="w-16 h-16 mx-auto mb-2 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <span class="text-2xl">🔍</span>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">Scanning in progress...</p>
            <button 
              @click="stopScanning"
              class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Stop Scanning
            </button>
          </div>
        </div>
        
        <div v-if="scannedData" class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          <h3 class="font-medium text-gray-900 dark:text-white mb-2">Scanned Details</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Merchant: {{ scannedData.merchant }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Amount: {{ formatCurrency(scannedData.amount) }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-300">Reference: {{ scannedData.reference }}</p>
          
          <button 
            @click="processPayment"
            class="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Pay Now
          </button>
        </div>
      </div>
      
      <!-- My QR Code -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">My QR Code</h2>
        
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 flex items-center justify-center">
          <div class="w-48 h-48 bg-white flex items-center justify-center">
            <!-- This would be a generated QR code in a real app -->
            <div class="text-center">
              <div class="w-32 h-32 mx-auto mb-2 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <span class="text-4xl">🔷</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-400">QR Code Placeholder</p>
            </div>
          </div>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount to Receive</label>
          <input 
            v-model="receiveAmount"
            type="number" 
            step="0.01"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="0.00"
          />
        </div>
        
        <div class="flex space-x-2">
          <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Share QR Code
          </button>
          <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Download
          </button>
        </div>
      </div>
    </div>
    
    <!-- Recent QR Payments -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent QR Payments</h2>
      
      <div v-if="recentQrPayments.length > 0" class="space-y-3">
        <div 
          v-for="payment in recentQrPayments" 
          :key="payment.id"
          class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md"
        >
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
              <span>{{ payment.type === 'sent' ? '📤' : '📥' }}</span>
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ payment.type === 'sent' ? 'Paid to ' + payment.merchant : 'Received from ' + payment.sender }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(payment.date) }}</p>
            </div>
          </div>
          <div class="text-right">
            <p :class="['font-medium', payment.type === 'sent' ? 'text-red-600' : 'text-green-600']">
              {{ payment.type === 'sent' ? '-' : '+' }}{{ formatCurrency(payment.amount) }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ payment.reference }}</p>
          </div>
        </div>
      </div>
      
      <p v-else class="text-gray-500 dark:text-gray-400 text-center py-4">
        No recent QR payments
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'

const scanning = ref(false)
const scannedData = ref(null)
const receiveAmount = ref('')
const recentQrPayments = ref([
  { id: 1, type: 'sent', merchant: 'Coffee Shop', amount: 5.75, date: '2023-10-15T14:30:00', reference: 'QR-001' },
  { id: 2, type: 'received', sender: 'John Smith', amount: 25.00, date: '2023-10-12T09:15:00', reference: 'QR-002' },
  { id: 3, type: 'sent', merchant: 'Grocery Store', amount: 32.45, date: '2023-10-10T17:45:00', reference: 'QR-003' },
])

const startScanning = () => {
  scanning.value = true
  // Simulate scanning process
  setTimeout(() => {
    scanning.value = false
    scannedData.value = {
      merchant: 'Sample Merchant',
      amount: 25.99,
      reference: 'QR-' + Math.floor(1000 + Math.random() * 9000)
    }
  }, 2000)
}

const stopScanning = () => {
  scanning.value = false
}

const processPayment = () => {
  alert(`Payment of ${formatCurrency(scannedData.value.amount)} to ${scannedData.value.merchant} processed successfully!`)
  recentQrPayments.value.unshift({
    id: Date.now(),
    type: 'sent',
    merchant: scannedData.value.merchant,
    amount: scannedData.value.amount,
    date: new Date().toISOString(),
    reference: scannedData.value.reference
  })
  scannedData.value = null
}
</script>