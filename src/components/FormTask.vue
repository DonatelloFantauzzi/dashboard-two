<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore'
import { ref } from 'vue'

const userStore = useUserStore()

const name = ref<string>(userStore.selectedTask?.name || '')
const description = ref<string>(userStore.selectedTask?.description || '')
const status = ref<string>(userStore.selectedTask?.status || '')

const addTask = () => {
  if (!name.value || !description.value || !status.value) {
    alert('Compila tutti i campi')
    return
  }
  console.log('Aggiungi progetto')
  userStore.userAddTask({
    id: Date.now(),
    name: name.value,
    description: description.value,
    status: status.value,
  })
  closeForm()
}

const updateTask = (project) => {
  if (!name.value || !description.value || !status.value) {
    alert('Compila tutti i campi')
    return
  }
  userStore.userUpdateTask({
    id: project.id,
    name: name.value,
    description: description.value,
    status: status.value,
  })

  console.log('Modifica progetto')

  closeForm()
}

const handleSubmit = () => {
  if (userStore.selectedTask) {
    updateTask(userStore.selectedTask)
  } else {
    addTask()
  }
}

const closeForm = () => {
  userStore.toggleForm(false)
}
</script>

<template>
  <!-- Modale per aggiungere il progetto -->
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">Aggiungi Nuovo Progetto</h2>

      <!-- Form di aggiunta progetto -->
      <form @submit.prevent="handleSubmit">
        <!-- Nome del progetto -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium">Nome del Progetto</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nome del progetto"
            required
          />
        </div>

        <!-- Descrizione del progetto -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium">Descrizione</label>
          <input
            type="text"
            id="description"
            v-model="description"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descrizione del progetto"
            required
          />
        </div>

        <!-- Stato del progetto -->
        <div class="mb-4">
          <label for="status" class="block text-sm font-medium">Stato</label>
          <select
            id="status"
            v-model="status"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="In corso">In corso</option>
            <option value="Completato">Completato</option>
            <option value="In attesa">In attesa</option>
          </select>
        </div>

        <!-- Bottone per inviare -->
        <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
          {{ userStore.selectedTask ? 'Modifica Progetto' : 'Aggiungi Progetto' }}
        </button>
      </form>

      <!-- Bottone per chiudere il form -->
      <button @click="closeForm" class="mt-4 text-red-500 hover:text-red-700 w-full text-center">
        Annulla
      </button>
    </div>
  </div>
</template>
