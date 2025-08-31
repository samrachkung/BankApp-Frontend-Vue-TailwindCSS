<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <LockIcon class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">We'll help you get back into your account</p>
      </div>

      <!-- Reset Form -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <!-- Step 1: Enter Email/Phone -->
        <div v-if="currentStep === 1" class="space-y-6">
          <div class="text-center mb-6">
            <MailIcon class="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Find Your Account
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              Enter your email address or phone number to search for your account
            </p>
          </div>

          <form @submit.prevent="findAccount" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address or Phone Number
              </label>
              <div class="relative">
                <input
                  v-model="identifier"
                  type="text"
                  required
                  class="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Enter email or phone number"
                />
                <UserIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              :disabled="!identifier || loading"
              class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <component v-if="loading" :is="LoaderIcon" class="w-5 h-5 mr-2 animate-spin" />
              {{ loading ? 'Searching...' : 'Continue' }}
            </button>
          </form>
        </div>

        <!-- Step 2: Choose Reset Method -->
        <div v-if="currentStep === 2" class="space-y-6">
          <div class="text-center mb-6">
            <div class="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircleIcon class="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Account Found
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              How would you like to reset your password?
            </p>
          </div>

          <div class="space-y-3">
            <div 
              v-for="method in resetMethods" 
              :key="method.id"
              @click="selectedMethod = method.id"
              :class="[
                'p-4 border-2 rounded-lg cursor-pointer transition-all',
                selectedMethod === method.id 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              ]"
            >
              <div class="flex items-center">
                <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                  <component :is="method.icon" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div class="flex-1">
                  <p class="font-medium text-gray-900 dark:text-white">{{ method.title }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ method.description }}</p>
                </div>
                <div v-if="selectedMethod === method.id" class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckIcon class="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>

          <button
            @click="sendResetCode"
            :disabled="!selectedMethod"
            class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send Reset Code
          </button>
        </div>

        <!-- Step 3: Enter Reset Code -->
        <div v-if="currentStep === 3" class="space-y-6">
          <div class="text-center mb-6">
            <ShieldCheckIcon class="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Enter Reset Code
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              We've sent a reset code to {{ getSelectedMethodText() }}
            </p>
          </div>

          <form @submit.prevent="verifyResetCode" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reset Code
              </label>
              <div class="flex space-x-3 justify-center">
                <input
                  v-for="(digit, index) in resetCode"
                  :key="index"
                  v-model="resetCode[index]"
                  type="text"
                  maxlength="1"
                  class="w-12 h-12 text-center text-2xl font-bold border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                  @input="handleCodeInput($event, index)"
                  @keydown="handleCodeKeydown($event, index)"
                />
              </div>
            </div>

            <div class="text-center">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Didn't receive the code?
                <button 
                  type="button"
                  @click="resendResetCode"
                  :disabled="resendTimer > 0"
                  class="text-blue-600 hover:text-blue-700 font-medium ml-1"
                >
                  {{ resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code' }}
                </button>
              </p>
            </div>

            <button
              type="submit"
              :disabled="!isResetCodeComplete"
              class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Verify Code
            </button>
          </form>
        </div>

        <!-- Step 4: Create New Password -->
        <div v-if="currentStep === 4" class="space-y-6">
          <div class="text-center mb-6">
            <KeyIcon class="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Create New Password
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              Choose a strong password for your account
            </p>
          </div>

          <form @submit.prevent="resetPassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <div class="relative">
                <input
                  v-model="newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  required
                  minlength="8"
                  class="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Enter new password"
                />
                <LockIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <component :is="showNewPassword ? EyeOffIcon : EyeIcon" class="w-5 h-5" />
                </button>
              </div>
              <!-- Password Strength Indicator -->
              <div class="mt-2">
                <div class="flex space-x-1">
                  <div v-for="i in 4" :key="i" :class="[
                    'h-2 flex-1 rounded-full transition-colors',
                    passwordStrength >= i ? getPasswordStrengthColor() : 'bg-gray-200 dark:bg-gray-700'
                  ]"></div>
                </div>
                <p class="text-sm mt-1" :class="getPasswordStrengthTextColor()">
                  {{ getPasswordStrengthText() }}
                </p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm New Password
              </label>
              <div class="relative">
                <input
                  v-model="confirmNewPassword"
                  :type="showConfirmNewPassword ? 'text' : 'password'"
                  required
                  class="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Confirm new password"
                />
                <LockIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  @click="showConfirmNewPassword = !showConfirmNewPassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <component :is="showConfirmNewPassword ? EyeOffIcon : EyeIcon" class="w-5 h-5" />
                </button>
              </div>
              <p v-if="confirmNewPassword && newPassword !== confirmNewPassword" 
                 class="text-sm text-red-600 dark:text-red-400 mt-1">
                Passwords do not match
              </p>
            </div>

            <button
              type="submit"
              :disabled="!newPassword || !confirmNewPassword || newPassword !== confirmNewPassword || passwordStrength < 2"
              class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Reset Password
            </button>
          </form>
        </div>

        <!-- Step 5: Success -->
        <div v-if="currentStep === 5" class="text-center space-y-6">
          <div class="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <CheckCircleIcon class="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Password Reset Successful!
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              Your password has been updated. You can now sign in with your new password.
            </p>
          </div>
          <button
            @click="goToLogin"
            class="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            Go to Login
            <ArrowRightIcon class="w-5 h-5 ml-2" />
          </button>
        </div>

        <!-- Back to Login Link -->
        <div v-if="currentStep < 5" class="mt-6 text-center">
          <router-link 
            to="/login" 
            class="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center"
          >
            <ArrowLeftIcon class="w-4 h-4 mr-2" />
            Back to Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  LockIcon, 
  MailIcon, 
  UserIcon, 
  CheckCircleIcon,
  ShieldCheckIcon, 
  KeyIcon, 
  EyeIcon, 
  EyeOffIcon,
  CheckIcon, 
  ArrowRightIcon, 
  ArrowLeftIcon,
  SmartphoneIcon, 
  LoaderIcon
} from 'lucide-vue-next'

const currentStep = ref(1)
const loading = ref(false)
const identifier = ref('')
const selectedMethod = ref(null)
const resetCode = ref(['', '', '', '', '', ''])
const resendTimer = ref(0)
const newPassword = ref('')
const confirmNewPassword = ref('')
const showNewPassword = ref(false)
const showConfirmNewPassword = ref(false)

const resetMethods = ref([
  {
    id: 'email',
    title: 'Email',
    description: 'j***@example.com',
    icon: MailIcon
  },
  {
    id: 'sms',
    title: 'Text Message',
    description: '+1 ***-***-1234',
    icon: SmartphoneIcon
  }
])

const passwordStrength = computed(() => {
  const password = newPassword.value
  let strength = 0
  
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  
  return strength
})

const isResetCodeComplete = computed(() => {
  return resetCode.value.every(digit => digit !== '')
})

const getPasswordStrengthColor = () => {
  if (passwordStrength.value <= 1) return 'bg-red-500'
  if (passwordStrength.value === 2) return 'bg-yellow-500'
  if (passwordStrength.value === 3) return 'bg-blue-500'
  return 'bg-green-500'
}

const getPasswordStrengthTextColor = () => {
  if (passwordStrength.value <= 1) return 'text-red-600 dark:text-red-400'
  if (passwordStrength.value === 2) return 'text-yellow-600 dark:text-yellow-400'
  if (passwordStrength.value === 3) return 'text-blue-600 dark:text-blue-400'
  return 'text-green-600 dark:text-green-400'
}

const getPasswordStrengthText = () => {
  if (passwordStrength.value <= 1) return 'Weak password'
  if (passwordStrength.value === 2) return 'Fair password'
  if (passwordStrength.value === 3) return 'Good password'
  return 'Strong password'
}

const getSelectedMethodText = () => {
  const method = resetMethods.value.find(m => m.id === selectedMethod.value)
  return method ? method.description : ''
}

const findAccount = async () => {
  loading.value = true
  // Simulate API call
  setTimeout(() => {
    loading.value = false
    currentStep.value = 2
  }, 1000)
}

const sendResetCode = () => {
  currentStep.value = 3
  startResendTimer()
}

const resendResetCode = () => {
  if (resendTimer.value === 0) {
    startResendTimer()
  }
}

const startResendTimer = () => {
  resendTimer.value = 30
  const timer = setInterval(() => {
    resendTimer.value--
    if (resendTimer.value === 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const handleCodeInput = (event, index) => {
  const value = event.target.value
  if (value && index < 5) {
    const nextInput = event.target.parentNode.children[index + 1]
    if (nextInput) nextInput.focus()
  }
}

const handleCodeKeydown = (event, index) => {
  if (event.key === 'Backspace' && !resetCode.value[index] && index > 0) {
    const prevInput = event.target.parentNode.children[index - 1]
    if (prevInput) prevInput.focus()
  }
}

const verifyResetCode = () => {
  currentStep.value = 4
}

const resetPassword = () => {
  currentStep.value = 5
}

const goToLogin = () => {
  console.log('Redirecting to login...')
}
</script>