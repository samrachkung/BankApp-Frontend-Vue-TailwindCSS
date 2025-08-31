<template>
  <div class="min-h-screen flex">
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <div class="flex justify-center">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
          </div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white text-center">
            {{ title }}
          </h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
            Or <router-link :to="alternateLink" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">{{ alternateText }}</router-link>
          </p>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <div class="absolute inset-0 h-full w-full bg-gradient-to-r from-primary-800 to-primary-600 opacity-90"></div>
      <div class="absolute inset-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center mix-blend-overlay"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h3 class="text-3xl font-bold mb-4">Secure Banking Made Simple</h3>
        <p class="text-xl opacity-90">Manage your finances with confidence and ease</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'AuthLayout',
  setup() {
    const route = useRoute()
    
    const pageConfig = computed(() => {
      const path = route.path
      if (path.includes('login')) {
        return {
          title: 'Sign in to your account',
          alternateLink: '/auth/register',
          alternateText: 'create a new account'
        }
      } else if (path.includes('register')) {
        return {
          title: 'Create your account',
          alternateLink: '/auth/login',
          alternateText: 'sign in to your account'
        }
      } else if (path.includes('forgot-password')) {
        return {
          title: 'Reset your password',
          alternateLink: '/auth/login',
          alternateText: 'back to sign in'
        }
      } else {
        return {
          title: 'Two-Factor Authentication',
          alternateLink: '/auth/login',
          alternateText: 'back to sign in'
        }
      }
    })
    
    return {
      title: computed(() => pageConfig.value.title),
      alternateLink: computed(() => pageConfig.value.alternateLink),
      alternateText: computed(() => pageConfig.value.alternateText)
    }
  }
}
</script>