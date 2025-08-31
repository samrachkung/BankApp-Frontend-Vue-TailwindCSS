<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <CreditCardIcon class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">SecureBank</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Create your account to get started</p>
      </div>

      <!-- Registration Form -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Progress Steps -->
          <div class="flex items-center justify-center mb-6">
            <div v-for="(step, index) in steps" :key="index" class="flex items-center">
              <div :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                currentStep >= index + 1 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              ]">
                {{ index + 1 }}
              </div>
              <div v-if="index < steps.length - 1" :class="[
                'w-12 h-1 mx-2',
                currentStep > index + 1 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              ]"></div>
            </div>
          </div>

          <!-- Step 1: Personal Information -->
          <div v-if="currentStep === 1" class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white text-center mb-4">
              Personal Information
            </h2>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  v-model="form.firstName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  v-model="form.lastName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div class="relative">
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="john@example.com"
                />
                <MailIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <div class="relative">
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
                <PhoneIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date of Birth
              </label>
              <input
                v-model="form.dateOfBirth"
                type="date"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              />
            </div>
          </div>

          <!-- Step 2: Account Security -->
          <div v-if="currentStep === 2" class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white text-center mb-4">
              Account Security
            </h2>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  minlength="8"
                  class="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Create a strong password"
                />
                <LockIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <component :is="showPassword ? EyeOffIcon : EyeIcon" class="w-5 h-5" />
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
                Confirm Password
              </label>
              <div class="relative">
                <input
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Confirm your password"
                />
                <LockIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <component :is="showConfirmPassword ? EyeOffIcon : EyeIcon" class="w-5 h-5" />
                </button>
              </div>
              <p v-if="form.confirmPassword && form.password !== form.confirmPassword" 
                 class="text-sm text-red-600 dark:text-red-400 mt-1">
                Passwords do not match
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Security Question
              </label>
              <select
                v-model="form.securityQuestion"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              >
                <option value="">Choose a security question</option>
                <option value="mother-maiden">What is your mother's maiden name?</option>
                <option value="first-pet">What was the name of your first pet?</option>
                <option value="first-car">What was your first car?</option>
                <option value="birth-city">In what city were you born?</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Security Answer
              </label>
              <input
                v-model="form.securityAnswer"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="Enter your answer"
              />
            </div>
          </div>

          <!-- Step 3: Verification -->
          <div v-if="currentStep === 3" class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white text-center mb-4">
              Verify Your Phone
            </h2>

            <div class="text-center mb-6">
              <div class="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <SmartphoneIcon class="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                We've sent a verification code to<br />
                <strong>{{ form.phone }}</strong>
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Verification Code
              </label>
              <div class="flex space-x-3 justify-center">
                <input
                  v-for="(digit, index) in verificationCode"
                  :key="index"
                  v-model="verificationCode[index]"
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
                  @click="resendCode"
                  :disabled="resendTimer > 0"
                  class="text-blue-600 hover:text-blue-700 font-medium ml-1"
                >
                  {{ resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code' }}
                </button>
              </p>
            </div>
          </div>

          <!-- Step 4: Success -->
          <div v-if="currentStep === 4" class="text-center space-y-6">
            <div class="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircleIcon class="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Account Created Successfully!
              </h2>
              <p class="text-gray-600 dark:text-gray-400">
                Welcome to SecureBank! Your account has been created and verified.
              </p>
            </div>
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p class="text-sm text-blue-800 dark:text-blue-200">
                <strong>Next Steps:</strong><br />
                Check your email for important account information and login to explore your new banking experience.
              </p>
            </div>
          </div>

          <!-- Terms and Conditions (Steps 1-2) -->
          <div v-if="currentStep <= 2" class="flex items-start">
            <input
              id="terms"
              v-model="form.acceptTerms"
              type="checkbox"
              required
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
            />
            <label for="terms" class="ml-3 text-sm text-gray-600 dark:text-gray-400">
              I agree to the 
              <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a> 
              and 
              <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>
            </label>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex space-x-4">
            <button
              v-if="currentStep > 1 && currentStep < 4"
              type="button"
              @click="previousStep"
              class="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Previous
            </button>
            
            <button
              v-if="currentStep < 3"
              type="button"
              @click="nextStep"
              :disabled="!canProceed"
              class="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              Continue
              <ArrowRightIcon class="w-5 h-5 ml-2" />
            </button>

            <button
              v-if="currentStep === 3"
              type="button"
              @click="verifyCode"
              :disabled="!isCodeComplete"
              class="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Verify & Create Account
            </button>

            <button
              v-if="currentStep === 4"
              type="button"
              @click="goToLogin"
              class="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              Go to Login
              <ArrowRightIcon class="w-5 h-5 ml-2" />
            </button>
          </div>
        </form>

        <!-- Login Link -->
        <div v-if="currentStep < 4" class="mt-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <router-link to="/login" class="text-blue-600 hover:text-blue-700 font-medium">
              Sign In
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  CreditCardIcon, 
  MailIcon, 
  PhoneIcon, 
  LockIcon,
  EyeIcon, 
  EyeOffIcon, 
  ArrowRightIcon,
  SmartphoneIcon,
  CheckCircleIcon
} from 'lucide-vue-next'

const currentStep = ref(1)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const resendTimer = ref(0)
const verificationCode = ref(['', '', '', '', '', ''])

const steps = ref([
  'Personal Info',
  'Security',
  'Verification',
  'Complete'
])

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  password: '',
  confirmPassword: '',
  securityQuestion: '',
  securityAnswer: '',
  acceptTerms: false
})

const passwordStrength = computed(() => {
  const password = form.value.password
  let strength = 0
  
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  
  return strength
})

const canProceed = computed(() => {
  if (currentStep.value === 1) {
    return form.value.firstName && form.value.lastName && 
           form.value.email && form.value.phone && 
           form.value.dateOfBirth && form.value.acceptTerms
  }
  if (currentStep.value === 2) {
    return form.value.password && form.value.confirmPassword &&
           form.value.password === form.value.confirmPassword &&
           form.value.securityQuestion && form.value.securityAnswer &&
           passwordStrength.value >= 2
  }
  return false
})

const isCodeComplete = computed(() => {
  return verificationCode.value.every(digit => digit !== '')
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

const nextStep = () => {
  if (canProceed.value && currentStep.value < 4) {
    currentStep.value++
    if (currentStep.value === 3) {
      sendVerificationCode()
    }
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const sendVerificationCode = () => {
  // Simulate sending verification code
  console.log('Sending verification code to:', form.value.phone)
  startResendTimer()
}

const resendCode = () => {
  if (resendTimer.value === 0) {
    sendVerificationCode()
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
  if (event.key === 'Backspace' && !verificationCode.value[index] && index > 0) {
    const prevInput = event.target.parentNode.children[index - 1]
    if (prevInput) prevInput.focus()
  }
}

const verifyCode = () => {
  // Simulate code verification
  const code = verificationCode.value.join('')
  console.log('Verifying code:', code)
  currentStep.value = 4
}

const goToLogin = () => {
  // Navigate to login page
  console.log('Redirecting to login...')
}

const handleRegister = () => {
  console.log('Registration form submitted')
}
</script>