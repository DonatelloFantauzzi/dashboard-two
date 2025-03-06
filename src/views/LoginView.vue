<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
const inputEmail = ref<string>('') // dichiaro una variabile reattiva
const errorEmail = ref<boolean>(false) // dichiaro una variabile reattiva per gestire l'errore dell'email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // regex per validare l'email
const router = useRouter() // ottengo l'istanza del router
const userStore = useUserStore() // ottengo l'istanza dello store

// Funzione per validare l'email
const validateEmail = () => {
  if (!emailRegex.test(inputEmail.value)) {
    errorEmail.value = true
  } else {
    console.log('Email valida')
    router.push('/dashboard')
    userStore.isLogged = true
    localStorage.setItem('isLogged', 'true')
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h2 class="text-2xl font-bold mb-4">Login</h2>

    <!-- Input Email -->
    <input
      v-model="inputEmail"
      type="email"
      placeholder="Inserisci la tua email"
      class="border p-2 rounded w-64 mb-4"
    />

    <!-- Messaggio di errore -->
    <p v-if="errorEmail" class="text-red-500 mt-2">Il formato dell'email non è valido</p>

    <!-- Bottone di login -->
    <button
      @click="validateEmail"
      class="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition"
    >
      Entra
    </button>
  </div>
</template>
