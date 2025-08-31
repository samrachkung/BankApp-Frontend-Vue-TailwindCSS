<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile</h1>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <p class="text-gray-900 dark:text-white font-medium">{{ user.name }}</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
          <p class="text-gray-900 dark:text-white font-medium">{{ user.email }}</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
          <p class="text-gray-900 dark:text-white font-medium">{{ user.phone }}</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
          <p class="text-gray-900 dark:text-white font-medium">{{ formatDate(user.dob) }}</p>
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
          <p class="text-gray-900 dark:text-white font-medium">{{ user.address }}</p>
        </div>
      </div>
      
      <div class="mt-6">
        <button 
          @click="editProfile"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Edit Profile
        </button>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Identification Documents</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="border border-gray-200 dark:border-gray-700 rounded-md p-4">
          <h3 class="font-medium text-gray-900 dark:text-white mb-2">ID Card</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Uploaded on {{ formatDate(user.documents.idCard.uploadDate) }}</p>
          <button class="text-blue-600 dark:text-blue-400 text-sm font-medium">View Document</button>
        </div>
        
        <div class="border border-gray-200 dark:border-gray-700 rounded-md p-4">
          <h3 class="font-medium text-gray-900 dark:text-white mb-2">Proof of Address</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Uploaded on {{ formatDate(user.documents.proofOfAddress.uploadDate) }}</p>
          <button class="text-blue-600 dark:text-blue-400 text-sm font-medium">View Document</button>
        </div>
      </div>
      
      <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
        Upload New Document
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { formatDate } from '@/utils/formatDate'

const authStore = useAuthStore()
const user = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  dob: '1985-05-15',
  address: '123 Main Street, New York, NY 10001',
  documents: {
    idCard: {
      uploadDate: '2023-01-15'
    },
    proofOfAddress: {
      uploadDate: '2023-01-20'
    }
  }
})

const editProfile = () => {
  // Navigate to profile edit page
  console.log('Edit profile')
}
</script>