<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Transfer Status</h1>
      <p class="text-gray-600 dark:text-gray-400">Track your money transfer</p>
    </div>

    <Card v-if="isLoading">
      <div class="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    </Card>

    <Card v-else-if="!transfer">
      <div class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <QuestionMarkCircleIcon class="w-12 h-12 mx-auto" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Transfer Not Found</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">The transfer you're looking for doesn't exist</p>
        <RouterLink to="/transfers">
          <Button>View All Transfers</Button>
        </RouterLink>
      </div>
    </Card>

    <div v-else class="space-y-6">
      <!-- Transfer Overview -->
      <Card>
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ transfer.description }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Reference: {{ transfer.reference }}
            </p>
          </div>
          <span
            class="text-xs font-medium px-2.5 py-0.5 rounded"
            :class="statusClasses[transfer.status]"
          >
            {{ transfer.status }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-6">
          <div>
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Amount</h3>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ formatCurrency(transfer.amount, transfer.currency) }}
            </p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Date</h3>
            <p class="text-sm text-gray-900 dark:text-white">
              {{ formatDateTime(transfer.date) }}
            </p>
          </div>
        </div>
      </Card>

      <!-- Transfer Details -->
      <Card title="Transfer Details">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">From Account</h3>
            <p class="text-sm text-gray-900 dark:text-white">
              {{ transfer.fromAccount.name }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ transfer.fromAccount.number }}
            </p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {{ transfer.type === 'internal' ? 'To Account' : 'Beneficiary' }}
            </h3>
            <p class="text-sm text-gray-900 dark:text-white">
              {{ transfer.type === 'internal' ? transfer.toAccount.name : transfer.beneficiary.name }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ transfer.type === 'internal' ? transfer.toAccount.number : transfer.beneficiary.accountNumber }}
            </p>
            <p v-if="transfer.type === 'external'" class="text-xs text-gray-500 dark:text-gray-400">
              {{ transfer.beneficiary.bankName }}
            </p>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Additional Information</h3>
          <p class="text-sm text-gray-900 dark:text-white">
            {{ transfer.description || 'No additional information' }}
          </p>
        </div>
      </Card>

      <!-- Status Timeline -->
      <Card title="Status Timeline">
        <div class="space-y-4">
          <div
            v-for="(status, index) in statusHistory"
            :key="index"
            class="flex items-start"
          >
            <div
              class="flex-shrink-0 relative"
              :class="{ 'h-8': index !== statusHistory.length - 1 }"
            >
              <div
                class="w-3 h-3 rounded-full border-2"
                :class="status.active ? 'border-primary-500 bg-primary-100 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600'"
              ></div>
              <div
                v-if="index !== statusHistory.length - 1"
                class="w-0.5 h-8 bg-gray-300 dark:bg-gray-600 mx-auto"
              ></div>
            </div>
            <div class="ml-4">
              <p
                class="text-sm font-medium"
                :class="status.active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'"
              >
                {{ status.label }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ status.timestamp ? formatDateTime(status.timestamp) : status.description }}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <!-- Actions -->
      <div class="flex space-x-4">
        <Button
          v-if="transfer.status === 'pending'"
          @click="cancelTransfer"
          variant="danger"
          class="flex-1"
        >
          Cancel Transfer
        </Button>
        <Button
          @click="downloadReceipt"
          variant="outline"
          class="flex-1"
        >
          Download Receipt
        </Button>
        <RouterLink to="/transfer" class="flex-1">
          <Button class="w-full">
            New Transfer
          </Button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTransferStore } from '../../store/transferStore'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDateTime } from '../../utils/formatDate'
import Card from '../../components/ui/Card.vue'
import Button from '../../components/ui/Button.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'TransferStatus',
  components: {
    Card,
    Button,
    LoadingSpinner,
    QuestionMarkCircleIcon
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const transferStore = useTransferStore()
    
    const isLoading = ref(false)
    const transferId = route.params.id

    const statusClasses = {
      completed: 'badge-success',
      pending: 'badge-warning',
      failed: 'badge-danger',
      cancelled: 'badge-info'
    }

    onMounted(async () => {
      isLoading.value = true
      try {
        await transferStore.getTransfer(transferId)
      } catch (error) {
        console.error('Failed to load transfer:', error)
      } finally {
        isLoading.value = false
      }
    })

    const transfer = computed(() => transferStore.transferStatus)

    const statusHistory = computed(() => {
      if (!transfer.value) return []
      
      const history = [
        {
          label: 'Transfer Initiated',
          description: 'Transfer request received',
          active: true,
          timestamp: transfer.value.date
        }
      ]

      if (transfer.value.status === 'completed') {
        history.push(
          {
            label: 'Processing',
            description: 'Transfer being processed',
            active: true,
            timestamp: new Date(transfer.value.date.getTime() + 5 * 60000)
          },
          {
            label: 'Completed',
            description: 'Transfer successful',
            active: true,
            timestamp: new Date(transfer.value.date.getTime() + 10 * 60000)
          }
        )
      } else if (transfer.value.status === 'pending') {
        history.push(
          {
            label: 'Processing',
            description: 'Transfer being processed',
            active: true
          },
          {
            label: 'Pending',
            description: 'Waiting for completion',
            active: false
          }
        )
      } else if (transfer.value.status === 'failed') {
        history.push(
          {
            label: 'Processing',
            description: 'Transfer being processed',
            active: true,
            timestamp: new Date(transfer.value.date.getTime() + 5 * 60000)
          },
          {
            label: 'Failed',
            description: 'Transfer failed',
            active: true,
            timestamp: new Date(transfer.value.date.getTime() + 8 * 60000)
          }
        )
      }

      return history
    })

    const cancelTransfer = async () => {
      if (confirm('Are you sure you want to cancel this transfer?')) {
        try {
          await transferStore.cancelTransfer(transferId)
          await transferStore.getTransfer(transferId)
        } catch (error) {
          console.error('Failed to cancel transfer:', error)
        }
      }
    }

    const downloadReceipt = () => {
      // Implement receipt download
      console.log('Download receipt for transfer:', transferId)
    }

    return {
      isLoading,
      transfer,
      statusClasses,
      statusHistory,
      cancelTransfer,
      downloadReceipt,
      formatCurrency,
      formatDateTime
    }
  }
}
</script>