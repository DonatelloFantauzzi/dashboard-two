import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLogged = ref<boolean>(false)
  const showForm = ref<boolean>(false)
  const selectedTask = ref<Project | null>(null)

  interface Project {
    id: number
    name: string
    description: string
    status: string
  }

  const userAddTask = (project: Project) => {
    projects.value.push(project)
  }

  const userUpdateTask = (p: Project) => {
    const index = projects.value.findIndex((project) => project.id === p.id)
    projects.value[index] = p
  }

  const toggleForm = (value: boolean) => {
    showForm.value = value
  }

  const openTask = (project: Project) => {
    if (project.id) {
      selectedTask.value = project
      toggleForm(true)
    }
  }

  const projects = ref<Project[]>([
    {
      id: 1,
      name: 'Progetto Alpha',
      description: 'Descrizione del Progetto Alpha',
      status: 'In corso',
    },
    {
      id: 2,
      name: 'Progetto Beta',
      description: 'Descrizione del Progetto Beta',
      status: 'Completato',
    },
    {
      id: 3,
      name: 'Progetto Gamma',
      description: 'Descrizione del Progetto Gamma',
      status: 'In corso',
    },
    {
      id: 4,
      name: 'Progetto Delta',
      description: 'Descrizione del Progetto Delta',
      status: 'Completato',
    },
    {
      id: 5,
      name: 'Progetto Epsilon',
      description: 'Descrizione del Progetto Epsilon',
      status: 'In corso',
    },
    {
      id: 6,
      name: 'Progetto Zeta',
      description: 'Descrizione del Progetto Zeta',
      status: 'In attesa',
    },
    {
      id: 7,
      name: 'Progetto Eta',
      description: 'Descrizione del Progetto Eta',
      status: 'Completato',
    },
    {
      id: 8,
      name: 'Progetto Theta',
      description: 'Descrizione del Progetto Theta',
      status: 'In corso',
    },
    {
      id: 9,
      name: 'Progetto Iota',
      description: 'Descrizione del Progetto Iota',
      status: 'In attesa',
    },
    {
      id: 10,
      name: 'Progetto Kappa',
      description: 'Descrizione del Progetto Kappa',
      status: 'Completato',
    },
  ])

  return {
    isLogged,
    projects,
    showForm,
    selectedTask,
    userAddTask,
    toggleForm,
    openTask,
    userUpdateTask,
  }
})
