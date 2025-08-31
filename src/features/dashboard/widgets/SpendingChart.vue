<!-- SpendingChart.vue - Complete Banking Spending Analytics -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Spending Analysis</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Track your expenses and budget performance
        </p>
      </div>
      
      <!-- Controls -->
      <div class="flex items-center space-x-3 mt-4 sm:mt-0">
        <!-- Time Period Filter -->
        <select 
          v-model="selectedPeriod" 
          @change="updateChartData"
          class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
        
        <!-- Chart Type Toggle -->
        <div class="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            v-for="type in chartTypes"
            :key="type.value"
            @click="activeChartType = type.value"
            :class="[
              'px-3 py-1 text-xs font-medium rounded-md transition-all',
              activeChartType === type.value
                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
            ]"
          >
            <component :is="type.icon" class="w-4 h-4" />
          </button>
        </div>
        
        <!-- Export Button -->
        <button 
          @click="exportChart"
          class="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          title="Export Chart"
        >
          <Download class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-3">
            <TrendingDown class="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Total Spent</p>
            <p class="text-lg font-bold text-gray-900 dark:text-white">${{ totalSpent.toLocaleString() }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
            <Target class="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Budget</p>
            <p class="text-lg font-bold text-gray-900 dark:text-white">${{ budget.toLocaleString() }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div class="flex items-center">
          <div :class="[
            'w-8 h-8 rounded-lg flex items-center justify-center mr-3',
            remaining >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
          ]">
            <component 
              :is="remaining >= 0 ? Plus : Minus" 
              :class="[
                'w-4 h-4',
                remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              ]"
            />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              {{ remaining >= 0 ? 'Remaining' : 'Over Budget' }}
            </p>
            <p :class="[
              'text-lg font-bold',
              remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            ]">
              ${{ Math.abs(remaining).toLocaleString() }}
            </p>
          </div>
        </div>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
            <BarChart3 class="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Avg Daily</p>
            <p class="text-lg font-bold text-gray-900 dark:text-white">${{ averageDaily.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart Container -->
    <div class="relative">
      <!-- Pie Chart -->
      <div v-if="activeChartType === 'pie'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <div class="relative h-80">
            <canvas ref="pieChartCanvas" class="w-full h-full"></canvas>
          </div>
        </div>
        
        <!-- Category Legend -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Spending by Category</h3>
          <div 
            v-for="(category, index) in spendingData" 
            :key="category.name"
            class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
            @click="toggleCategory(index)"
          >
            <div class="flex items-center">
              <div 
                class="w-4 h-4 rounded-full mr-3"
                :style="{ backgroundColor: category.color }"
              ></div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ category.name }}</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">{{ category.transactions }} transactions</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold text-gray-900 dark:text-white">${{ category.amount.toLocaleString() }}</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">{{ category.percentage }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bar Chart -->
      <div v-if="activeChartType === 'bar'" class="h-80">
        <canvas ref="barChartCanvas" class="w-full h-full"></canvas>
      </div>

      <!-- Line Chart -->
      <div v-if="activeChartType === 'line'" class="h-80">
        <canvas ref="lineChartCanvas" class="w-full h-full"></canvas>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div class="flex items-center space-x-3">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="text-gray-600 dark:text-gray-400">Loading chart data...</span>
        </div>
      </div>
    </div>

    <!-- Budget Progress -->
    <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Budget Progress</h3>
        <span class="text-sm text-gray-600 dark:text-gray-400">
          {{ budgetUsedPercentage }}% used
        </span>
      </div>
      
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div 
          :class="[
            'h-3 rounded-full transition-all duration-1000 ease-out',
            budgetUsedPercentage <= 75 ? 'bg-green-500' :
            budgetUsedPercentage <= 90 ? 'bg-yellow-500' :
            'bg-red-500'
          ]"
          :style="{ width: `${Math.min(budgetUsedPercentage, 100)}%` }"
        ></div>
      </div>
      
      <div class="flex justify-between items-center mt-2 text-xs text-gray-600 dark:text-gray-400">
        <span>$0</span>
        <span v-if="budgetUsedPercentage > 100" class="text-red-600 dark:text-red-400 font-medium">
          Over budget by ${{ (totalSpent - budget).toLocaleString() }}
        </span>
        <span>${{ budget.toLocaleString() }}</span>
      </div>
    </div>

    <!-- Insights -->
    <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
      <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Spending Insights</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <TrendingUp class="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p class="text-sm font-medium text-blue-900 dark:text-blue-100">Top Category</p>
            <p class="text-xs text-blue-700 dark:text-blue-300">
              You spend most on {{ topCategory.name }} ({{ topCategory.percentage }}% of budget)
            </p>
          </div>
        </div>
        
        <div :class="[
          'flex items-start p-3 rounded-lg',
          spendingTrend > 0 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'
        ]">
          <component 
            :is="spendingTrend > 0 ? TrendingUp : TrendingDown"
            :class="[
              'w-5 h-5 mr-3 mt-0.5 flex-shrink-0',
              spendingTrend > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
            ]"
          />
          <div>
            <p :class="[
              'text-sm font-medium',
              spendingTrend > 0 ? 'text-red-900 dark:text-red-100' : 'text-green-900 dark:text-green-100'
            ]">
              {{ spendingTrend > 0 ? 'Spending Up' : 'Spending Down' }}
            </p>
            <p :class="[
              'text-xs',
              spendingTrend > 0 ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'
            ]">
              {{ Math.abs(spendingTrend) }}% compared to last {{ selectedPeriod }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import {
  BarChart3,
  PieChart,
  TrendingUp as LineChartIcon,
  Download,
  TrendingUp,
  TrendingDown,
  Target,
  Plus,
  Minus
} from 'lucide-vue-next'

// Chart.js imports (you'll need to install: npm install chart.js)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

// Refs
const selectedPeriod = ref('month')
const activeChartType = ref('pie')
const loading = ref(false)
const pieChartCanvas = ref(null)
const barChartCanvas = ref(null)
const lineChartCanvas = ref(null)

// Charts
let pieChart = null
let barChart = null
let lineChart = null

// Data
const budget = ref(3000)
const spendingTrend = ref(12) // +12% compared to last period

const chartTypes = [
  { value: 'pie', icon: PieChart },
  { value: 'bar', icon: BarChart3 },
  { value: 'line', icon: LineChartIcon }
]

const spendingData = ref([
  {
    name: 'Food & Dining',
    amount: 650,
    transactions: 23,
    color: '#3B82F6',
    percentage: 21.7
  },
  {
    name: 'Shopping',
    amount: 480,
    transactions: 15,
    color: '#EF4444',
    percentage: 16.0
  },
  {
    name: 'Transportation',
    amount: 320,
    transactions: 18,
    color: '#10B981',
    percentage: 10.7
  },
  {
    name: 'Entertainment',
    amount: 280,
    transactions: 12,
    color: '#F59E0B',
    percentage: 9.3
  },
  {
    name: 'Utilities',
    amount: 250,
    transactions: 5,
    color: '#8B5CF6',
    percentage: 8.3
  },
  {
    name: 'Healthcare',
    amount: 180,
    transactions: 7,
    color: '#EC4899',
    percentage: 6.0
  },
  {
    name: 'Other',
    amount: 340,
    transactions: 28,
    color: '#6B7280',
    percentage: 11.3
  }
])

const monthlyTrends = ref([
  { month: 'Jan', amount: 2800 },
  { month: 'Feb', amount: 2650 },
  { month: 'Mar', amount: 2900 },
  { month: 'Apr', amount: 3200 },
  { month: 'May', amount: 2950 },
  { month: 'Jun', amount: 3100 }
])

// Computed properties
const totalSpent = computed(() => {
  return spendingData.value.reduce((sum, item) => sum + item.amount, 0)
})

const remaining = computed(() => {
  return budget.value - totalSpent.value
})

const budgetUsedPercentage = computed(() => {
  return Math.round((totalSpent.value / budget.value) * 100)
})

const averageDaily = computed(() => {
  const daysInPeriod = selectedPeriod.value === 'week' ? 7 : 30
  return Math.round(totalSpent.value / daysInPeriod)
})

const topCategory = computed(() => {
  return spendingData.value.reduce((top, current) => 
    current.amount > top.amount ? current : top
  )
})

// Methods
const updateChartData = () => {
  loading.value = true
  
  // Simulate API call
  setTimeout(() => {
    // Update data based on selected period
    // In real app, this would fetch from API
    loading.value = false
    
    // Recreate charts with new data
    nextTick(() => {
      createCharts()
    })
  }, 500)
}

const createPieChart = () => {
  if (!pieChartCanvas.value) return

  const ctx = pieChartCanvas.value.getContext('2d')
  
  if (pieChart) {
    pieChart.destroy()
  }

  pieChart = new ChartJS(ctx, {
    type: 'doughnut',
    data: {
      labels: spendingData.value.map(item => item.name),
      datasets: [{
        data: spendingData.value.map(item => item.amount),
        backgroundColor: spendingData.value.map(item => item.color),
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label
              const value = context.parsed
              const percentage = ((value / totalSpent.value) * 100).toFixed(1)
              return `${label}: $${value.toLocaleString()} (${percentage}%)`
            }
          }
        }
      },
      animation: {
        animateScale: true,
        duration: 1000
      }
    }
  })
}

const createBarChart = () => {
  if (!barChartCanvas.value) return

  const ctx = barChartCanvas.value.getContext('2d')
  
  if (barChart) {
    barChart.destroy()
  }

  barChart = new ChartJS(ctx, {
    type: 'bar',
    data: {
      labels: spendingData.value.map(item => item.name),
      datasets: [{
        label: 'Amount Spent',
        data: spendingData.value.map(item => item.amount),
        backgroundColor: spendingData.value.map(item => item.color + '80'),
        borderColor: spendingData.value.map(item => item.color),
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return `$${context.parsed.y.toLocaleString()}`
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => '$' + value.toLocaleString()
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    }
  })
}

const createLineChart = () => {
  if (!lineChartCanvas.value) return

  const ctx = lineChartCanvas.value.getContext('2d')
  
  if (lineChart) {
    lineChart.destroy()
  }

  lineChart = new ChartJS(ctx, {
    type: 'line',
    data: {
      labels: monthlyTrends.value.map(item => item.month),
      datasets: [{
        label: 'Monthly Spending',
        data: monthlyTrends.value.map(item => item.amount),
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F6' + '20',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6
      }, {
        label: 'Budget',
        data: monthlyTrends.value.map(() => budget.value),
        borderColor: '#EF4444',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return context.dataset.label + ': $' + context.parsed.y.toLocaleString()
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => '$' + value.toLocaleString()
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    }
  })
}

const createCharts = () => {
  nextTick(() => {
    if (activeChartType.value === 'pie') createPieChart()
    if (activeChartType.value === 'bar') createBarChart()
    if (activeChartType.value === 'line') createLineChart()
  })
}

const toggleCategory = (index) => {
  // Toggle category visibility (in real app)
  console.log('Toggle category:', spendingData.value[index].name)
}

const exportChart = () => {
  // Export current chart as image
  let canvas = null
  
  switch (activeChartType.value) {
    case 'pie': canvas = pieChartCanvas.value; break
    case 'bar': canvas = barChartCanvas.value; break
    case 'line': canvas = lineChartCanvas.value; break
  }
  
  if (canvas) {
    const link = document.createElement('a')
    link.download = `spending-chart-${activeChartType.value}.png`
    link.href = canvas.toDataURL()
    link.click()
  }
}

// Watch for chart type changes
watch(activeChartType, () => {
  nextTick(() => {
    createCharts()
  })
})

// Lifecycle
onMounted(() => {
  createCharts()
})

onUnmounted(() => {
  if (pieChart) pieChart.destroy()
  if (barChart) barChart.destroy()
  if (lineChart) lineChart.destroy()
})
</script>

<style scoped>
/* Custom animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chart-container {
  animation: slideIn 0.6s ease-out;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid-cols-2.md\:grid-cols-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>