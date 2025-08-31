<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Transfer History</h1>
      <p class="text-gray-600 dark:text-gray-400">View your past money transfers</p>
    </div>

    <!-- Filters -->
    <Card class="mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InputField
          v-model="filters.search"
          label="Search"
          placeholder="Search transfers..."
        />
        <InputField
          v-model="filters.type"
          label="Type"
          as="select"
        >
          <option value="">All Types</option>
          <option value="internal">Internal</option>
          <option value="external">External</option>
        </InputField>
        <InputField
          v-model="filters.status"
          label="Status"
          as="select"
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </InputField>
        <InputField
          v-model="filters.dateRange"
          label="Date Range"
          as="select"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="custom">Custom</option>
        </InputField>
      </div>
    </Card>

    <!-- Transfers Table -->
    <Card>
      <div v-if="isLoading" class="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>

      <div v-else-if="transfers.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <ArrowPathIcon class="w-12 h-12 mx-auto" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No transfers found</h3>
        <p class="text-gray-500 dark:text-gray-400">Your transfer history will appear here</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Description</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Type</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
              <th class="px-4 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-400">Amount</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
              <th class="px-4 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="transfer in transfers"
              :key="transfer.id"
              class="table-row"
            >
              <td class="px-4 py-3">
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ transfer.description }}
                  </p>
                  <p v-if="transfer.beneficiary" class="text-xs text-gray-500 dark:text-gray-400">
                    To: {{ transfer.beneficiary.name }}
                  </p>
                </div>
              </td>
              <td class="px-4 py-3">
                <span class="text-xs font-medium px-2.5 py-0.5 rounded" :class="{
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300': transfer.type === 'internal',
                  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300': transfer.type === 'external'
                }">
                  {{ transfer.type }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                {{ formatDateTime(transfer.date) }}
              </td>
              <td class="px-4 py-3 text-right">
                <span
                  class="text-sm font-medium"
                  :class="transfer.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'"
                >
                  {{ formatCurrency(transfer.amount, transfer.currency) }}
                </span>
              </td>
              <td class="px-4 py-3">
                <span
                  class="text-xs font-medium px-2.5 py-0.5 rounded"
                  :class="statusClasses[transfer.status]"
                >
                  {{ transfer.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <button
                    @click="viewTransfer(transfer.id)"
                    class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    title="View details"
                  >
                    <EyeIcon class="w-4 h-4" />
                  </button>
                  <button
                    v-if="transfer.status === 'pending'"
                    @click="cancelTransfer(transfer.id)"
                    class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    title="Cancel transfer"
                  >
                    <XMarkIcon class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="transfers.length > 0" class="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div class="text-sm text-gray-700 dark:text-gray-300">
          Showing {{ currentPage * pageSize - pageSize + 1 }} to {{ Math.min(currentPage * pageSize, totalItems) }} of {{ totalItems }} results
        </div>
        <div class="flex space-x-2">
          <Button
            :disabled="currentPage === 1"
            @click="currentPage--"
            size="sm"
            variant="outline"
          >
            Previous
          </Button>
          <Button
            :disabled="currentPage * pageSize >= totalItems"
            @click="currentPage++"
            size="sm"
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { ref, reactive, watch, onMounted } from 'vue'
import { useTransferStore } from '../../store/transferStore'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDateTime } from '../../utils/formatDate'
import Card from '../../components/ui/Card.vue'
import InputField from '../../components/ui/InputField.vue'
import Button from '../../components/ui/Button.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'
import {
  ArrowPathIcon,
  EyeIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'TransferList',
  components: {
    Card,
    InputField,
    Button,
    LoadingSpinner,
    ArrowPathIcon,
    EyeIcon,
    XMarkIcon
  },
  setup() {
    const transferStore = useTransferStore()
    
    const filters = reactive({
      search: '',
      type: '',
      status: '',
      dateRange: '7'
    })

    const currentPage = ref(1)
    const pageSize = ref(10)
    const totalItems = ref(0)

    const statusClasses = {
      completed: 'badge-success',
      pending: 'badge-warning',
      failed: 'badge-danger',
      cancelled: 'badge-info'
    }

    onMounted(async () => {
      await loadTransfers()
    })

    watch([filters, currentPage], async () => {
      await loadTransfers()
    })

    const loadTransfers = async () => {
      const params = {
        page: currentPage.value,
        limit: pageSize.value,
        search: filters.search,
        type: filters.type,
        status: filters.status,
        days: filters.dateRange === 'custom' ? null : parseInt(filters.dateRange)
      }

      await transferStore.fetchTransfers(params)
      totalItems.value = transferStore.transfers.length // In real app, this would come from API
    }

    const viewTransfer = (id) => {
      // Navigate to transfer details
      console.log('View transfer:', id)
    }

    const cancelTransfer = async (id) => {
      if (confirm('Are you sure you want to cancel this transfer?')) {
        try {
          await transferStore.cancelTransfer(id)
        } catch (error) {
          console.error('Failed to cancel transfer:', error)
        }
      }
    }

    return {
      filters,
      currentPage,
      pageSize,
      totalItems,
      isLoading: transferStore.isLoading,
      transfers: transferStore.transfers,
      statusClasses,
      viewTransfer,
      cancelTransfer,
      formatCurrency,
      formatDateTime
    }
  }
}
</script>