<!-- Footer.vue - Professional Banking App Footer -->
<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
              <CreditCardIcon class="w-6 h-6 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">SecureBank</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Your trusted digital banking partner, providing secure and innovative financial solutions 
            for individuals and businesses worldwide.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <FacebookIcon class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <TwitterIcon class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <InstagramIcon class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <LinkedinIcon class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Banking Services -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Banking Services
          </h3>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Personal Banking
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Business Banking
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Investment Services
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Loans & Mortgages
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Credit Cards
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                International Banking
              </a>
            </li>
          </ul>
        </div>

        <!-- Support & Resources -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Support & Resources
          </h3>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Contact Support
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Security Center
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Financial Education
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Mobile App
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                API Documentation
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact & Security -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Contact & Security
          </h3>
          <div class="space-y-4">
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <PhoneIcon class="w-4 h-4 mr-3 text-gray-500" />
              <span>1-800-SECURE (732-873)</span>
            </div>
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <MailIcon class="w-4 h-4 mr-3 text-gray-500" />
              <span>support@securebank.com</span>
            </div>
            <div class="flex items-start text-sm text-gray-600 dark:text-gray-400">
              <MapPinIcon class="w-4 h-4 mr-3 mt-0.5 text-gray-500 flex-shrink-0" />
              <span>123 Financial District<br />New York, NY 10004</span>
            </div>
            
            <!-- Security Badges -->
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Secured & Protected</p>
              <div class="flex items-center space-x-3">
                <div class="flex items-center bg-green-100 dark:bg-green-900 px-2 py-1 rounded text-xs">
                  <ShieldCheckIcon class="w-3 h-3 text-green-600 dark:text-green-400 mr-1" />
                  <span class="text-green-700 dark:text-green-300">FDIC Insured</span>
                </div>
                <div class="flex items-center bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-xs">
                  <LockIcon class="w-3 h-3 text-blue-600 dark:text-blue-400 mr-1" />
                  <span class="text-blue-700 dark:text-blue-300">SSL Secured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter Signup -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="max-w-md">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Stay Updated
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Get the latest financial news and updates delivered to your inbox.
          </p>
          <form @submit.prevent="subscribeNewsletter" class="flex space-x-3">
            <div class="flex-1">
              <input
                v-model="newsletterEmail"
                type="email"
                placeholder="Enter your email"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white text-sm"
              />
            </div>
            <button 
              type="submit"
              :disabled="subscribing"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm flex items-center"
            >
              <component v-if="subscribing" :is="LoaderIcon" class="w-4 h-4 mr-2 animate-spin" />
              {{ subscribing ? 'Subscribing...' : 'Subscribe' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <!-- Copyright & Legal Links -->
          <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              © {{ currentYear }} SecureBank. All rights reserved.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                Privacy Policy
              </a>
              <a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                Terms of Service
              </a>
              <a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                Cookie Policy
              </a>
              <a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                Accessibility
              </a>
            </div>
          </div>

          <!-- App Downloads & Language Selector -->
          <div class="flex items-center space-x-4">
            <!-- Language Selector -->
            <select 
              v-model="selectedLanguage"
              @change="changeLanguage"
              class="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </select>

            <!-- App Download Links -->
            <div class="flex space-x-2">
              <a 
                href="#" 
                @click.prevent="downloadApp('ios')"
                class="flex items-center bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-lg text-xs transition-colors"
              >
                <SmartphoneIcon class="w-4 h-4 mr-2" />
                <div>
                  <div class="text-xs opacity-75">Download on</div>
                  <div class="font-medium">App Store</div>
                </div>
              </a>
              <a 
                href="#" 
                @click.prevent="downloadApp('android')"
                class="flex items-center bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-lg text-xs transition-colors"
              >
                <SmartphoneIcon class="w-4 h-4 mr-2" />
                <div>
                  <div class="text-xs opacity-75">Get it on</div>
                  <div class="font-medium">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Important Notices -->
      <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="flex items-start">
          <InfoIcon class="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
          <div class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            <p class="font-medium text-gray-700 dark:text-gray-300 mb-1">Important Banking Information:</p>
            <p>
              SecureBank is a Member FDIC. Equal Housing Lender. Investment products and services are not FDIC insured, 
              are not bank guaranteed, and may lose value. Bank deposit accounts and services are provided by SecureBank, N.A. 
              Investment products and services are provided through SecureBank Investment Services.
            </p>
          </div>
        </div>
      </div>

      <!-- Back to Top Button -->
      <div class="mt-8 text-center">
        <button 
          @click="scrollToTop"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <ChevronUpIcon class="w-4 h-4 mr-2" />
          Back to Top
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  CreditCardIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ShieldCheckIcon,
  LockIcon,
  SmartphoneIcon,
  InfoIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  LoaderIcon,
  ChevronUpIcon
} from 'lucide-vue-next'

// Optional: Import stores if you need them for notifications, etc.
// import { useAppStore } from '../store/appStore'
// const appStore = useAppStore()

// Reactive data
const newsletterEmail = ref('')
const subscribing = ref(false)
const selectedLanguage = ref('en')

// Computed
const currentYear = computed(() => new Date().getFullYear())

// Methods
const subscribeNewsletter = async () => {
  subscribing.value = true
  
  try {
    // Simulate API call for newsletter subscription
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message (you can use your notification system here)
    alert(`Thank you for subscribing with ${newsletterEmail.value}!`)
    newsletterEmail.value = ''
  } catch (error) {
    alert('Subscription failed. Please try again.')
  } finally {
    subscribing.value = false
  }
}

const changeLanguage = () => {
  // Handle language change logic
  console.log(`Language changed to: ${selectedLanguage.value}`)
  // You can integrate this with your app store or i18n system
  // appStore.setLanguage(selectedLanguage.value)
}

const downloadApp = (platform) => {
  // Handle app download links
  if (platform === 'ios') {
    // window.open('https://apps.apple.com/app/securebank', '_blank')
    alert('iOS app download would start here')
  } else if (platform === 'android') {
    // window.open('https://play.google.com/store/apps/details?id=com.securebank', '_blank')
    alert('Android app download would start here')
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
/* Add any custom styles here if needed */
.social-icon {
  transition: transform 0.2s ease-in-out;
}

.social-icon:hover {
  transform: translateY(-2px);
}
</style>