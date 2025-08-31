<template>
  <aside
    class="w-72 bg-gradient-to-b from-primary-800 to-primary-900 dark:from-gray-900 dark:to-gray-950 shadow-2xl z-20 flex-shrink-0 hidden md:flex flex-col transition-all duration-300 hover:shadow-primary-500/10 hover:shadow-xl"
    v-show="sidebarOpen"
  >
    <!-- Logo Section -->
    <div
      class="flex items-center justify-between h-20 px-6 bg-gradient-to-r from-primary-700 to-primary-800 dark:from-gray-800 dark:to-gray-900 border-b border-primary-600/30 dark:border-gray-700/50"
    >
      <div class="flex items-center space-x-3">
        <div
          class="bg-white/10 backdrop-blur-sm rounded-2xl h-12 w-12 flex items-center justify-center shadow-lg ring-2 ring-white/20"
        >
          <svg
            class="h-7 w-7 text-white"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M10 20C12.5 15 19.5 15 22 20"
              stroke="#60a5fa"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M16 10V16"
              stroke="#60a5fa"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="16" cy="8" r="1.5" fill="#60a5fa" />
          </svg>
        </div>
        <div>
          <span class="text-white text-xl font-bold tracking-wide"
            >Rach Bank</span
          >
          <p class="text-primary-200 text-xs font-light">Premium Banking</p>
        </div>
      </div>
      <div
        class="h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-emerald-200/50 animate-pulse"
      ></div>
    </div>

    <!-- Balance Preview -->
    <div class="px-5 py-4 border-b border-primary-700/30 dark:border-gray-800/50">
      <p class="text-primary-300 text-xs font-medium uppercase tracking-wider mb-2">
        Total Balance
      </p>
      <div class="flex items-baseline">
        <span class="text-2xl font-bold text-white">$24,562.80</span>
        <span
          class="ml-2 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full"
          >+2.5%</span
        >
      </div>
      <p class="text-primary-200 text-xs mt-1">Available • **** 4589</p>
    </div>

    <!-- Navigation -->
    <div class="flex-1 overflow-y-auto pt-5 pb-4 custom-scrollbar">
      <nav class="mt-2 px-3 space-y-1">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.to"
          class="group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200"
          :class="[
            isActive(item.to)
              ? 'bg-white/10 text-white shadow-lg ring-1 ring-white/10 backdrop-blur-sm'
              : 'text-primary-200 hover:bg-white/5 hover:text-white'
          ]"
        >
          <component
            :is="item.icon"
            class="mr-3 h-5 w-5 flex-shrink-0"
            :class="[
              isActive(item.to) ? 'text-blue-300' : 'text-primary-300 group-hover:text-blue-300'
            ]"
            stroke-width="2"
          />
          {{ item.name }}
          <span
            v-if="item.name === 'Notifications'"
            class="ml-auto bg-rose-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center"
            >3</span
          >
        </RouterLink>
      </nav>

      <!-- Quick Actions -->
      <div class="mt-8 px-3">
        <p
          class="text-primary-400 text-xs font-semibold uppercase tracking-wider mb-2 px-3"
        >
          Quick Actions
        </p>
        <div class="grid grid-cols-2 gap-2">
          <button
            class="bg-white/5 hover:bg-white/10 text-primary-200 hover:text-white text-xs p-2 rounded-lg transition-colors border border-primary-700/30 hover:border-primary-500/30"
          >
            Send Money
          </button>
          <button
            class="bg-white/5 hover:bg-white/10 text-primary-200 hover:text-white text-xs p-2 rounded-lg transition-colors border border-primary-700/30 hover:border-primary-500/30"
          >
            Pay Bills
          </button>
        </div>
      </div>
    </div>

    <!-- User Profile -->
    <div
      class="flex-shrink-0 flex border-t border-primary-700/30 dark:border-gray-800/50 p-4 bg-primary-800/30 dark:bg-gray-900/50 backdrop-blur-sm"
    >
      <div class="flex items-center w-full">
        <div class="flex-shrink-0 relative">
          <img
            class="h-10 w-10 rounded-xl ring-2 ring-white/20"
            :src="user.avatar || 'https://via.placeholder.com/40?text=U'"
            alt="User avatar"
          />
          <span
            class="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-primary-900"
          ></span>
        </div>
        <div class="ml-3 min-w-0 flex-1">
          <p class="text-sm font-medium text-white truncate">
            {{ user.firstName }} {{ user.lastName }}
          </p>
          <p class="text-xs text-primary-300 truncate">Premium Client</p>
        </div>
        <button
          @click="logout"
          class="ml-2 text-primary-300 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          title="Sign out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../store/authStore'
import {
  HomeIcon,
  CreditCardIcon,
  ArrowRightIcon,
  ReceiptRefundIcon,
  BellIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/vue/24/outline'

export default {
  name: 'Sidebar',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()
    const user = computed(() => authStore.user || { firstName: 'User', lastName: 'Name' })

    const navigation = [
      { name: 'Dashboard', to: '/Home', icon: HomeIcon },
      { name: 'Accounts', to: '/accounts', icon: CreditCardIcon },
      { name: 'Transfers', to: '/transfer', icon: ArrowRightIcon },
      { name: 'Bill Payments', to: '/pay-bills', icon: ReceiptRefundIcon },
      { name: 'Cards', to: '/cards', icon: CreditCardIcon },
      { name: 'Notifications', to: '/notifications', icon: BellIcon },
      { name: 'Settings', to: '/settings', icon: CogIcon },
      { name: 'Support', to: '/support', icon: QuestionMarkCircleIcon },
    ]

    const isMobile = ref(window.innerWidth < 768)
    const sidebarCollapsed = ref(false)

    const updateIsMobile = () => {
      isMobile.value = window.innerWidth < 768
      // Optionally reset sidebarCollapsed on desktop
      if (!isMobile.value) sidebarCollapsed.value = false
    }

    onMounted(() => {
      window.addEventListener('resize', updateIsMobile)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateIsMobile)
    })

    const sidebarOpen = computed(() => {
      return isMobile.value ? !sidebarCollapsed.value : true
    })

    const isActive = (path) => {
      return route.path === path || route.path.startsWith(path + '/')
    }

    const logout = () => {
      authStore.logout()
      router.push({ name: 'Login' })
    }

    return {
      navigation,
      user,
      isActive,
      logout,
      isMobile,
      sidebarCollapsed,
      sidebarOpen,
    }
  },
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.router-link-active {
  position: relative;
}

.router-link-active::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  height: 16px;
  width: 4px;
  background: linear-gradient(to bottom, #60a5fa, #3b82f6);
  border-radius: 0 2px 2px 0;
}
</style>
