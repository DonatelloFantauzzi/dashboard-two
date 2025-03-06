<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import FormTask from '@/components/FormTask.vue'

const router = useRouter()
const userStore = useUserStore()

const signOut = () => {
  userStore.isLogged = false
  localStorage.removeItem('isLogged')
  router.push('/')
}

const openForm = () => {
  userStore.selectedTask = null
  userStore.toggleForm(true)
}

onMounted(() => {
  localStorage.getItem('isLogged') === 'true'
  if (!userStore.isLogged) {
    router.push('/')
  }
})
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md p-4">
      <h2 class="text-xl font-bold">Dashboard</h2>
      <nav class="mt-4">
        <ul>
          <li class="mb-2">
            <a href="#" class="block p-2 rounded hover:bg-gray-200">🏠 Home</a>
          </li>
          <li class="mb-2">
            <a href="#" class="block p-2 rounded hover:bg-gray-200">📂 I miei progetti</a>
          </li>
          <li class="mb-2">
            <a href="#" class="block p-2 rounded hover:bg-gray-200">⚙️ Impostazioni</a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Contenuto principale -->
    <main class="flex-1 p-6">
      <!-- Navbar -->
      <div class="flex justify-between items-center bg-white p-4 shadow-md rounded">
        <h1 class="text-2xl font-semibold">I miei progetti</h1>
        <button
          @click="signOut"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
        <div>
          <button
            @click="openForm"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          >
            Aggiungi Nuovo Progetto
          </button>
        </div>
      </div>

      <!-- Area progetti (per ora vuota) -->
      <div class="mt-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Qui dentro dovrai cicli i progetti con v-for -->
          <div
            v-for="project in userStore.projects"
            :key="project.id"
            @click="userStore.openTask(project)"
            class="bg-white p-4 shadow-md rounded cursor-pointer"
          >
            <h2 class="text-xl font-bold">{{ project.name }}</h2>
            <p class="text-gray-600">{{ project.description }}</p>
            <span class="text-sm text-green-500 font-semibold">Stato: {{ project.status }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
  <FormTask v-if="userStore.showForm" />
</template>
