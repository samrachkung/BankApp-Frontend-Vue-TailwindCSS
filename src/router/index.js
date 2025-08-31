import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/authStore'

// Layouts
import AuthLayout from '../layouts/AuthLayout.vue'
import MainLayout from '../layouts/MainLayout.vue'

// Auth Pages
import Login from '../features/auth/Login.vue'
import Register from '../features/auth/Register.vue'
import ForgotPassword from '../features/auth/ForgotPassword.vue'

import Home from '../features/dashboard/Home.vue'
import AccountsList from '../features/accounts/AccountsList.vue'
import AccountDetail from '../features/accounts/AccountDetail.vue'
import TransferForm from '../features/transfers/TransferForm.vue'
import TransferList from '../features/transfers/TransferList.vue'
import BillPayment from '../features/payments/BillPayment.vue'
import CardsList from '../features/cards/CardsList.vue'
import Notifications from '../features/notifications/Notifications.vue'
import Profile from '../features/profile/Profile.vue'
import Settings from '../features/profile/Settings.vue'
import Support from '../features/support/Support.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'Login', component: Login },
      { path: 'register', name: 'Register', component: Register },
      { path: 'forgot-password', name: 'ForgotPassword', component: ForgotPassword },
      // { path: '2fa', name: 'TwoFactorAuth', component: TwoFactorAuth }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    // meta: { requiresAuth: true },
    children: [
      { path: 'home', name: 'Home', component: Home },
      { path: 'accounts', name: 'Accounts', component: AccountsList },
      { path: 'accounts/:id', name: 'AccountDetail', component: AccountDetail },
      { path: 'transfer', name: 'Transfer', component: TransferForm },
      { path: 'transfers', name: 'Transfers', component: TransferList },
      { path: 'pay-bills', name: 'BillPayment', component: BillPayment },
      { path: 'cards', name: 'Cards', component: CardsList },
      { path: 'notifications', name: 'Notifications', component: Notifications },
      { path: 'profile', name: 'Profile', component: Profile },
      { path: 'settings', name: 'Settings', component: Settings },
      { path: 'support', name: 'Support', component: Support }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
  
//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next({ name: 'Login' })
//   } else if (to.name === 'Login' && authStore.isAuthenticated) {
//     next({ name: 'Home' })
//   } else {
//     next()
//   }
// })

export default router