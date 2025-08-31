<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Money Transfer</h1>
      <p class="text-gray-600 dark:text-gray-400">Send money to accounts or beneficiaries</p>
    </div>

    <Card>
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <InputField
            v-model="formData.amount"
            label="Amount"
            type="number"
            placeholder="0.00"
            :error="errors.amount"
            required
          >
            <template #prefix>
              <span class="text-gray-500">$</span>
            </template>
          </InputField>

          <InputField
            v-model="formData.currency"
            label="Currency"
            as="select"
            :error="errors.currency"
            required
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </InputField>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Transfer Type
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              :class="[
                'p-4 border rounded-lg text-center transition-colors',
                formData.transferType === 'internal' 
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:border-primary-600 dark:text-primary-300'
                  : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
              ]"
              @click="formData.transferType = 'internal'"
            >
              <BanknotesIcon class="w-6 h-6 mx-auto mb-2" />
              <span class="text-sm font-medium">Internal Transfer</span>
            </button>
            <button
              type="button"
              :class="[
                'p-4 border rounded-lg text-center transition-colors',
                formData.transferType === 'external' 
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:border-primary-600 dark:text-primary-300'
                  : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
              ]"
              @click="formData.transferType = 'external'"
            >
              <ArrowRightIcon class="w-6 h-6 mx-auto mb-2" />
              <span class="text-sm font-medium">External Transfer</span>
            </button>
          </div>
        </div>

        <div v-if="formData.transferType === 'internal'" class="mb-6">
          <InputField
            v-model="formData.toAccount"
            label="To Account"
            as="select"
            :error="errors.toAccount"
            required
          >
            <option value="">Select account</option>
            <option 
              v-for="account in accounts" 
              :key="account.id" 
              :value="account.id"
            >
              {{ account.name }} - {{ account.number }} ({{ formatCurrency(account.balance) }})
            </option>
          </InputField>
        </div>

        <div v-else class="space-y-4 mb-6">
          <InputField
            v-model="formData.beneficiaryName"
            label="Beneficiary Name"
            placeholder="John Doe"
            :error="errors.beneficiaryName"
            required
          />

          <InputField
            v-model="formData.accountNumber"
            label="Account Number"
            placeholder="1234567890"
            :error="errors.accountNumber"
            required
          />

          <InputField
            v-model="formData.routingNumber"
            label="Routing Number"
            placeholder="021000021"
            :error="errors.routingNumber"
            required
          />

          <InputField
            v-model="formData.bankName"
            label="Bank Name"
            placeholder="Bank of America"
            :error="errors.bankName"
            required
          />
        </div>

        <InputField
          v-model="formData.description"
          label="Description"
          placeholder="Payment for services"
          :error="errors.description"
        />

        <div class="flex items-center space-x-4 mt-8">
          <Button
            type="submit"
            :loading="isLoading"
            class="flex-1"
          >
            Transfer Now
          </Button>
          <Button
            type="button"
            variant="outline"
            @click="scheduleTransfer"
            :loading="isLoading"
          >
            Schedule
          </Button>
        </div>
      </form>
    </Card>

    <!-- Recent Transfers -->
    <div class="mt-8">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Transfers</h2>
      <Card>
        <div v-if="recentTransfers.length === 0" class="text-center py-8 text-gray-500">
          <ArrowPathIcon class="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>No recent transfers</p>
        </div>
        <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
          <div
            v-for="transfer in recentTransfers"
            :key="transfer.id"
            class="py-3 flex items-center justify-between"
          >
            <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ transfer.description }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(transfer.date) }}
              </p>
            </div>
            <span
              class="text-sm font-medium"
              :class="transfer.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'"
            >
              {{ formatCurrency(transfer.amount) }}
            </span>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useAccountStore } from '../../store/accountStore'
import { useTransferStore } from '../../store/transferStore'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import { validateAmount } from '../../utils/validators'
import Card from '../../components/ui/Card.vue'
import InputField from '../../components/ui/InputField.vue'
import Button from '../../components/ui/Button.vue'
import {
  BanknotesIcon,
  ArrowRightIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'TransferForm',
  components: {
    Card,
    InputField,
    Button,
    BanknotesIcon,
    ArrowRightIcon,
    ArrowPathIcon
  },
  setup() {
    const accountStore = useAccountStore()
    const transferStore = useTransferStore()
    
    const formData = reactive({
      amount: '',
      currency: 'USD',
      transferType: 'internal',
      toAccount: '',
      beneficiaryName: '',
      accountNumber: '',
      routingNumber: '',
      bankName: '',
      description: ''
    })

    const errors = reactive({})
    const isLoading = ref(false)

    onMounted(async () => {
      await accountStore.fetchAccounts()
      await transferStore.fetchRecentTransfers()
    })

    const validateForm = () => {
      const newErrors = {}
      
      if (!formData.amount || !validateAmount(formData.amount)) {
        newErrors.amount = 'Please enter a valid amount'
      }
      
      if (formData.transferType === 'internal') {
        if (!formData.toAccount) {
          newErrors.toAccount = 'Please select an account'
        }
      } else {
        if (!formData.beneficiaryName) {
          newErrors.beneficiaryName = 'Please enter beneficiary name'
        }
        if (!formData.accountNumber) {
          newErrors.accountNumber = 'Please enter account number'
        }
        if (!formData.routingNumber) {
          newErrors.routingNumber = 'Please enter routing number'
        }
        if (!formData.bankName) {
          newErrors.bankName = 'Please enter bank name'
        }
      }

      return newErrors
    }

    const handleSubmit = async () => {
      const formErrors = validateForm()
      if (Object.keys(formErrors).length > 0) {
        Object.assign(errors, formErrors)
        return
      }

      isLoading.value = true
      try {
        const transferData = {
          amount: parseFloat(formData.amount),
          currency: formData.currency,
          description: formData.description
        }

        if (formData.transferType === 'internal') {
          transferData.toAccountId = formData.toAccount
          transferData.type = 'internal'
        } else {
          transferData.beneficiary = {
            name: formData.beneficiaryName,
            accountNumber: formData.accountNumber,
            routingNumber: formData.routingNumber,
            bankName: formData.bankName
          }
          transferData.type = 'external'
        }

        await transferStore.createTransfer(transferData)
        // Reset form
        Object.assign(formData, {
          amount: '',
          toAccount: '',
          beneficiaryName: '',
          accountNumber: '',
          routingNumber: '',
          bankName: '',
          description: ''
        })
        Object.keys(errors).forEach(key => delete errors[key])
      } catch (error) {
        console.error('Transfer failed:', error)
      } finally {
        isLoading.value = false
      }
    }

    const scheduleTransfer = async () => {
      // Implementation for scheduling transfer
      console.log('Schedule transfer functionality')
    }

    return {
      formData,
      errors,
      isLoading,
      accounts: accountStore.accounts,
      recentTransfers: transferStore.recentTransfers,
      handleSubmit,
      scheduleTransfer,
      formatCurrency,
      formatDate
    }
  }
}
</script>