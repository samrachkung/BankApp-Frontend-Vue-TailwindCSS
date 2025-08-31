<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 safe-area-padding">
    <div
      class="space-y-3 sm:space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 max-w-7xl mx-auto"
    >
      <!-- Welcome Header -->
      <div
        class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center"
      >
        <div class="space-y-1">
          <h1
            class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            Welcome back, Kung Samrach!
          </h1>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Manage your finances with confidence
          </p>
        </div>
        <div class="flex justify-between items-center sm:text-right sm:block">
          <div>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Today
            </p>
            <p
              class="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white"
            >
              {{ formatDate(currentDate) }}
            </p>
          </div>
          <!-- Quick Balance Toggle for Mobile -->
          <button
            v-if="isMobileView"
            @click="toggleBalanceVisibility"
            class="ml-4 p-2 rounded-lg bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors"
            :aria-label="showBalances ? 'Hide balances' : 'Show balances'"
          >
            <EyeIcon v-if="showBalances" class="w-5 h-5" />
            <EyeSlashIcon v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Promotional Slideshow -->
      <div
        class="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg touch-pan-y"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mouseenter="pauseSlideshow"
        @mouseleave="resumeSlideshow"
        role="region"
        aria-label="Promotional offers slideshow"
      >
        <div
          class="flex transition-transform duration-500 ease-out"
          :style="{
            transform: `translateX(-${currentSlide * 100}%)`,
            '--slide-count': slides.length,
          }"
        >
          <!-- Slide 1: Credit Card Offer -->
          <div class="w-full flex-shrink-0 relative">
            <div
              class="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden min-h-[180px] sm:min-h-[220px] lg:min-h-[240px]"
            >
              <div
                class="relative z-10 h-full flex flex-col justify-center max-w-lg"
              >
                <div class="flex items-center space-x-2 mb-3">
                  <div
                    class="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <CreditCardIcon class="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <span
                    class="text-xs font-medium bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm"
                  >
                    LIMITED TIME
                  </span>
                </div>
                <h2
                  class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 leading-tight"
                >
                  Premium Credit Card
                </h2>
                <p
                  class="text-sm sm:text-base lg:text-lg mb-2 text-blue-100 leading-relaxed"
                >
                  0% APR for 12 months + No annual fee
                </p>
                <p
                  class="text-xs sm:text-sm text-blue-100 mb-4 line-clamp-2 leading-relaxed"
                >
                  Earn 2% cashback on all purchases and exclusive travel
                  benefits
                </p>
                <button
                  class="self-start bg-white text-blue-700 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-blue-50 active:bg-blue-100 transition-colors text-sm sm:text-base touch-manipulation"
                  @click="handleCTAClick('credit-card')"
                >
                  Apply Now
                </button>
              </div>
              <!-- Background Elements -->
              <div
                class="absolute -right-8 -top-8 sm:-right-12 sm:-top-12 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full"
              ></div>
              <div
                class="absolute -right-16 -bottom-8 sm:-right-20 sm:-bottom-12 w-32 h-32 sm:w-40 sm:h-40 bg-white/5 rounded-full"
              ></div>
            </div>
          </div>

          <!-- Slide 2: Savings Account -->
          <div class="w-full flex-shrink-0 relative">
            <div
              class="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden min-h-[180px] sm:min-h-[220px] lg:min-h-[240px]"
            >
              <div
                class="relative z-10 h-full flex flex-col justify-center max-w-lg"
              >
                <div class="flex items-center space-x-2 mb-3">
                  <div
                    class="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <BanknotesIcon class="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <span
                    class="text-xs font-medium bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm"
                  >
                    HIGH YIELD
                  </span>
                </div>
                <h2
                  class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 leading-tight"
                >
                  Premium Savings
                </h2>
                <p
                  class="text-sm sm:text-base lg:text-lg mb-2 text-green-100 leading-relaxed"
                >
                  4.5% APY on all balances
                </p>
                <p
                  class="text-xs sm:text-sm text-green-100 mb-4 line-clamp-2 leading-relaxed"
                >
                  No minimum balance • No monthly fees • FDIC insured
                </p>
                <button
                  class="self-start bg-white text-green-700 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-green-50 active:bg-green-100 transition-colors text-sm sm:text-base touch-manipulation"
                  @click="handleCTAClick('savings')"
                >
                  Open Account
                </button>
              </div>
              <div
                class="absolute -right-8 -top-8 sm:-right-12 sm:-top-12 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full"
              ></div>
              <div
                class="absolute -right-16 -bottom-8 sm:-right-20 sm:-bottom-12 w-32 h-32 sm:w-40 sm:h-40 bg-white/5 rounded-full"
              ></div>
            </div>
          </div>

          <!-- Slide 3: Investment Platform -->
          <div class="w-full flex-shrink-0 relative">
            <div
              class="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden min-h-[180px] sm:min-h-[220px] lg:min-h-[240px]"
            >
              <div
                class="relative z-10 h-full flex flex-col justify-center max-w-lg"
              >
                <div class="flex items-center space-x-2 mb-3">
                  <div
                    class="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <ChartBarIcon class="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <span
                    class="text-xs font-medium bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm"
                  >
                    INVESTING
                  </span>
                </div>
                <h2
                  class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 leading-tight"
                >
                  Smart Investing
                </h2>
                <p
                  class="text-sm sm:text-base lg:text-lg mb-2 text-purple-100 leading-relaxed"
                >
                  Commission-free trades
                </p>
                <p
                  class="text-xs sm:text-sm text-purple-100 mb-4 line-clamp-2 leading-relaxed"
                >
                  Start with $1 • Auto-rebalancing • Expert guidance
                </p>
                <button
                  class="self-start bg-white text-purple-700 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-purple-50 active:bg-purple-100 transition-colors text-sm sm:text-base touch-manipulation"
                  @click="handleCTAClick('investing')"
                >
                  Start Investing
                </button>
              </div>
              <div
                class="absolute -right-8 -top-8 sm:-right-12 sm:-top-12 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full"
              ></div>
              <div
                class="absolute -right-16 -bottom-8 sm:-right-20 sm:-bottom-12 w-32 h-32 sm:w-40 sm:h-40 bg-white/5 rounded-full"
              ></div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button
          @click="previousSlide"
          class="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 touch-manipulation"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>
        <button
          @click="nextSlide"
          class="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 touch-manipulation"
          aria-label="Next slide"
        >
          <ChevronRightIcon class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        <!-- Progress Indicator -->
        <div
          class="absolute top-2 right-2 sm:top-4 sm:right-4 text-xs text-white/80 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full"
        >
          {{ currentSlide + 1 }} / {{ slides.length }}
        </div>
      </div>

      <!-- Account Summary Cards -->
      <div
        class="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6"
      >
        <div
          v-for="(card, index) in accountCards"
          :key="card.id"
          class="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
          :class="{ 'animate-pulse': loading }"
        >
          <div class="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
            <div
              :class="[
                'w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0',
                card.bgColor,
              ]"
            >
              <component
                :is="card.icon"
                :class="['w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6', card.iconColor]"
              />
            </div>
            <span
              :class="[
                'text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-medium',
                card.badgeClass,
              ]"
            >
              {{ card.change }}
            </span>
          </div>
          <p
            class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 leading-tight"
          >
            {{ card.label }}
          </p>
          <p
            class="text-sm sm:text-lg lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            <span v-if="!showBalances && card.sensitive" class="select-none"
              >••••••</span
            >
            <span v-else>{{ formatCurrency(card.value) }}</span>
          </p>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <!-- Recent Transactions -->
        <div
          class="xl:col-span-2 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0"
          >
            <h2
              class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white"
            >
              Recent Transactions
            </h2>
            <button
              class="text-sm sm:text-base text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              @click="viewAllTransactions"
            >
              View All
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="space-y-3 sm:space-y-4">
            <div v-for="i in 3" :key="i" class="animate-pulse">
              <div
                class="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg sm:rounded-xl"
              >
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-600 rounded-lg"
                ></div>
                <div class="flex-1 space-y-2">
                  <div
                    class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"
                  ></div>
                  <div
                    class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"
                  ></div>
                </div>
                <div
                  class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16"
                ></div>
              </div>
            </div>
          </div>

          <!-- Transactions List -->
          <div v-else class="space-y-2 sm:space-y-3 lg:space-y-4">
            <div
              v-for="transaction in recentTransactions"
              :key="transaction.id"
              class="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              @click="viewTransaction(transaction.id)"
              role="button"
              :tabindex="0"
              @keydown.enter="viewTransaction(transaction.id)"
            >
              <div
                class="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1"
              >
                <div
                  :class="[
                    'w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0',
                    transaction.type === 'income'
                      ? 'bg-green-100 dark:bg-green-900'
                      : 'bg-red-100 dark:bg-red-900',
                  ]"
                >
                  <component
                    :is="getTransactionIcon(transaction.category)"
                    :class="[
                      'w-5 h-5 sm:w-6 sm:h-6',
                      transaction.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400',
                    ]"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <p
                    class="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate"
                  >
                    {{ transaction.description }}
                  </p>
                  <p
                    class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate"
                  >
                    {{ transaction.date }} • {{ transaction.category }}
                  </p>
                </div>
              </div>
              <div class="flex flex-col items-end ml-2 flex-shrink-0">
                <p
                  :class="[
                    'font-semibold text-sm sm:text-base',
                    transaction.type === 'income'
                      ? 'text-green-600'
                      : 'text-red-600',
                  ]"
                >
                  {{ transaction.type === "income" ? "+" : "-"
                  }}{{ formatCurrency(transaction.amount) }}
                </p>
                <p
                  v-if="transaction.pending"
                  class="text-xs text-yellow-600 dark:text-yellow-400"
                >
                  Pending
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h2
            class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white"
          >
            Quick Actions
          </h2>
          <div class="grid grid-cols-2 gap-3 sm:gap-4">
            <button
              v-for="action in quickActions"
              :key="action.id"
              class="flex flex-col items-center p-3 sm:p-4 rounded-lg sm:rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 touch-manipulation group"
              :class="action.bgColor"
              @click="handleQuickAction(action.id)"
              :aria-label="action.label"
            >
              <div
                :class="[
                  'w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 transition-all duration-200',
                  action.iconBg,
                ]"
              >
                <component
                  :is="action.icon"
                  class="w-5 h-5 sm:w-6 sm:h-6 text-white"
                />
              </div>
              <span
                class="text-xs sm:text-sm font-medium text-gray-900 dark:text-white text-center leading-tight"
              >
                {{ action.label }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Upcoming Payments -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0"
        >
          <h2
            class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white"
          >
            Upcoming Payments
          </h2>
          <button
            class="text-sm sm:text-base text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            @click="managePayments"
          >
            Manage All
          </button>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          <div
            v-for="payment in upcomingPayments"
            :key="payment.id"
            class="p-3 sm:p-4 border rounded-lg sm:rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer"
            :class="[
              payment.urgency === 'high'
                ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                : payment.urgency === 'medium'
                ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
                : 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
            ]"
            @click="handlePayment(payment.id)"
            role="button"
            :tabindex="0"
            @keydown.enter="handlePayment(payment.id)"
          >
            <div
              class="flex flex-col sm:flex-row justify-between items-start mb-2 space-y-1 sm:space-y-0"
            >
              <h3
                class="font-medium text-gray-900 dark:text-white text-sm sm:text-base leading-tight"
              >
                {{ payment.description }}
              </h3>
              <span
                :class="[
                  'text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap',
                  payment.urgency === 'high'
                    ? 'bg-red-100 dark:bg-red-900 text-red-600'
                    : payment.urgency === 'medium'
                    ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600'
                    : 'bg-green-100 dark:bg-green-900 text-green-600',
                ]"
              >
                {{ payment.status }}
              </span>
            </div>
            <p
              :class="[
                'text-lg sm:text-xl lg:text-2xl font-bold mb-1 leading-tight',
                payment.urgency === 'high'
                  ? 'text-red-600'
                  : payment.urgency === 'medium'
                  ? 'text-yellow-600'
                  : 'text-green-600',
              ]"
            >
              {{ formatCurrency(payment.amount) }}
            </p>
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Due {{ payment.dueDate }} • {{ payment.daysUntilDue }} days
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import {
  CreditCardIcon,
  BanknotesIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  ArrowRightIcon,
  PhoneIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";

export default {
  name: "BankingHome",
  components: {
    CreditCardIcon,
    BanknotesIcon,
    ChartBarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EyeIcon,
    EyeSlashIcon,
  },
  setup() {
    const router = useRouter();

    // Reactive state
    const currentSlide = ref(0);
    const showBalances = ref(true);
    const loading = ref(false);
    const isMobileView = ref(false);
    const slideInterval = ref(null);
    const isSlideplayPaused = ref(false);

    // Touch handling for slideshow
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let isSwiping = false;

    // Data
    const slides = ref([
      { id: 1, title: "Premium Credit Card", cta: "credit-card" },
      { id: 2, title: "Premium Savings", cta: "savings" },
      { id: 3, title: "Smart Investing", cta: "investing" },
    ]);

    const accountCards = ref([
      {
        id: "balance",
        label: "Total Balance",
        value: 24580.42,
        change: "+2.5%",
        icon: BanknotesIcon,
        bgColor: "bg-blue-100 dark:bg-blue-900",
        iconColor: "text-blue-600 dark:text-blue-400",
        badgeClass: "text-green-600 bg-green-100",
        sensitive: true,
      },
      {
        id: "income",
        label: "Monthly Income",
        value: 4250.0,
        change: "+8.2%",
        icon: ArrowUpIcon,
        bgColor: "bg-green-100 dark:bg-green-900",
        iconColor: "text-green-600 dark:text-green-400",
        badgeClass: "text-green-600 bg-green-100",
        sensitive: true,
      },
      {
        id: "expenses",
        label: "Monthly Expenses",
        value: 2840.65,
        change: "-3.1%",
        icon: ArrowDownIcon,
        bgColor: "bg-red-100 dark:bg-red-900",
        iconColor: "text-red-600 dark:text-red-400",
        badgeClass: "text-red-600 bg-red-100",
        sensitive: true,
      },
      {
        id: "savings",
        label: "Savings Goal",
        value: 68,
        change: "68%",
        icon: ChartBarIcon,
        bgColor: "bg-purple-100 dark:bg-purple-900",
        iconColor: "text-purple-600 dark:text-purple-400",
        badgeClass: "text-purple-600 bg-purple-100",
        sensitive: false,
      },
    ]);

    const recentTransactions = ref([
      {
        id: 1,
        description: "Salary Deposit",
        amount: 4250.0,
        date: "Aug 28, 2025",
        type: "income",
        category: "Salary",
        pending: false,
      },
      {
        id: 2,
        description: "Grocery Store",
        amount: 85.5,
        date: "Aug 27, 2025",
        type: "expense",
        category: "Groceries",
        pending: false,
      },
      {
        id: 3,
        description: "Online Transfer",
        amount: 150.0,
        date: "Aug 26, 2025",
        type: "expense",
        category: "Transfer",
        pending: true,
      },
      {
        id: 4,
        description: "Cashback Reward",
        amount: 25.99,
        date: "Aug 25, 2025",
        type: "income",
        category: "Rewards",
        pending: false,
      },
    ]);

    const quickActions = ref([
      {
        id: "transfer",
        label: "Transfer Money",
        icon: ArrowRightIcon,
        bgColor:
          "bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800",
        iconBg: "bg-blue-600 group-hover:bg-blue-700",
      },
      {
        id: "pay-bills",
        label: "Pay Bills",
        icon: CreditCardIcon,
        bgColor:
          "bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800",
        iconBg: "bg-green-600 group-hover:bg-green-700",
      },
      {
        id: "cards",
        label: "Manage Cards",
        icon: CreditCardIcon,
        bgColor:
          "bg-purple-50 dark:bg-purple-900 hover:bg-purple-100 dark:hover:bg-purple-800",
        iconBg: "bg-purple-600 group-hover:bg-purple-700",
      },
      {
        id: "support",
        label: "Get Support",
        icon: PhoneIcon,
        bgColor:
          "bg-orange-50 dark:bg-orange-900 hover:bg-orange-100 dark:hover:bg-orange-800",
        iconBg: "bg-orange-600 group-hover:bg-orange-700",
      },
    ]);

    const upcomingPayments = ref([
      {
        id: 1,
        description: "Electricity Bill",
        amount: 75.0,
        dueDate: "Aug 30",
        daysUntilDue: 1,
        status: "Due Soon",
        urgency: "high",
      },
      {
        id: 2,
        description: "Credit Card Payment",
        amount: 200.0,
        dueDate: "Sep 2",
        daysUntilDue: 4,
        status: "Upcoming",
        urgency: "medium",
      },
      {
        id: 3,
        description: "Internet Subscription",
        amount: 45.0,
        dueDate: "Sep 10",
        daysUntilDue: 12,
        status: "Scheduled",
        urgency: "low",
      },
    ]);

    // Computed properties
    const currentDate = computed(() => {
      return new Date();
    });

    const formatDate = (date) => {
      return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(date);
    };

    const formatCurrency = (amount) => {
      if (typeof amount === "number") {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount);
      }
      return `${amount}%`;
    };

    // Mobile detection
    const checkMobileView = () => {
      isMobileView.value = window.innerWidth < 768;
    };

    // Slideshow functionality
    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % slides.value.length;
    };

    const previousSlide = () => {
      currentSlide.value =
        currentSlide.value === 0
          ? slides.value.length - 1
          : currentSlide.value - 1;
    };

    const goToSlide = (index) => {
      currentSlide.value = index;
    };

    const startSlideshow = () => {
      if (!isSlideplayPaused.value) {
        slideInterval.value = setInterval(nextSlide, 5000);
      }
    };

    const stopSlideshow = () => {
      if (slideInterval.value) {
        clearInterval(slideInterval.value);
        slideInterval.value = null;
      }
    };

    const pauseSlideshow = () => {
      isSlideplayPaused.value = true;
      stopSlideshow();
    };

    const resumeSlideshow = () => {
      isSlideplayPaused.value = false;
      startSlideshow();
    };

    // Touch handlers
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isSwiping = false;
      pauseSlideshow();
    };

    const handleTouchMove = (e) => {
      if (!isSwiping) {
        const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
        const deltaY = Math.abs(e.touches[0].clientY - touchStartY);

        if (deltaX > deltaY && deltaX > 10) {
          isSwiping = true;
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e) => {
      if (isSwiping) {
        touchEndX = e.changedTouches[0].clientX;
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
          if (swipeDistance > 0) {
            nextSlide();
          } else {
            previousSlide();
          }
        }
      }

      setTimeout(resumeSlideshow, 3000);
    };

    // Action handlers
    const toggleBalanceVisibility = () => {
      showBalances.value = !showBalances.value;
    };

    const handleCTAClick = (type) => {
      console.log("CTA clicked:", type);
    };

    const handleQuickAction = (actionId) => {
      console.log("Quick action:", actionId);
      switch (actionId) {
        case "transfer":
          router.push("/transfer");
          break;
        case "pay-bills":
          router.push("/pay-bills");
          break;
        case "cards":
          router.push("/cards");
          break;
        case "support":
          router.push("/support");
          break;
      }
    };

    const handlePayment = (paymentId) => {
      console.log("Payment clicked:", paymentId);
    };

    const viewTransaction = (transactionId) => {
      console.log("Transaction clicked:", transactionId);
    };

    const viewAllTransactions = () => {
      router.push("/transactions");
    };

    const managePayments = () => {
      router.push("/payments");
    };

    // Transaction icon mapping using only available icons
    const getTransactionIcon = (category) => {
      const iconMap = {
        Salary: CurrencyDollarIcon,
        Groceries: ShoppingCartIcon,
        Gas: ClockIcon, // Using ClockIcon as substitute
        Entertainment: ChartBarIcon,
        Transfer: ArrowRightIcon,
        Rewards: BanknotesIcon,
        Shipping: ArrowUpIcon,
        Education: BanknotesIcon,
      };
      return iconMap[category] || CreditCardIcon;
    };

    // Lifecycle hooks
    onMounted(() => {
      checkMobileView();
      startSlideshow();
      window.addEventListener("resize", checkMobileView);

      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    });

    onUnmounted(() => {
      stopSlideshow();
      window.removeEventListener("resize", checkMobileView);
    });

    return {
      // State
      currentSlide,
      showBalances,
      loading,
      isMobileView,

      // Data
      slides,
      accountCards,
      recentTransactions,
      quickActions,
      upcomingPayments,

      // Computed
      currentDate,

      // Methods
      formatDate,
      formatCurrency,
      nextSlide,
      previousSlide,
      goToSlide,
      pauseSlideshow,
      resumeSlideshow,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      toggleBalanceVisibility,
      handleCTAClick,
      handleQuickAction,
      handlePayment,
      viewTransaction,
      viewAllTransactions,
      managePayments,
      getTransactionIcon,
    };
  },
};
</script>

<style scoped>
/* Custom line clamping */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Touch manipulation optimization */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* Safe area padding for devices with notches */
.safe-area-padding {
  padding-left: max(0.75rem, env(safe-area-inset-left));
  padding-right: max(0.75rem, env(safe-area-inset-right));
}

/* Smooth scrolling for better UX */
.scrollable {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* Loading animation improvements */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Enhanced focus styles for accessibility */
button:focus-visible,
[role="button"]:focus-visible {
  outline: 2px solid rgb(59 130 246);
  outline-offset: 2px;
  border-radius: 0.375rem;
}

/* Improve touch targets on mobile */
@media (max-width: 767px) {
  button,
  [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Slideshow performance optimization */
.slideshow-container {
  transform: translateZ(0);
  will-change: transform;
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(4px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}
</style>
