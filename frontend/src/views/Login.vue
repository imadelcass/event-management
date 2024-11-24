<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-6 rounded shadow-md w-80">
        <h1 class="text-xl font-semibold mb-4">Login</h1>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              v-model="email"
              class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            :disabled="auth.loading"
          >
            {{ auth.loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>
        <p v-if="auth.error" class="mt-4 text-sm text-red-500">{{ auth.error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAuthStore } from '../stores/auth';
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
      const auth = useAuthStore();
  
      const handleSubmit = async () => {
        await auth.login(email.value, password.value);
      };
  
      return {
        email,
        password,
        auth,
        handleSubmit,
      };
    },
  };
  </script>
  