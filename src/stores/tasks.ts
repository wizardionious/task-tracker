import type { Task } from '@/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  function addTask(text: string) {
    tasks.value.push({ id: crypto.randomUUID(), completed: false, text })
  }

  function toggleTaskCompleted(id: Task['id']) {
    const task = tasks.value.find((task) => task.id === id)

    if (task) {
      task.completed = !task.completed
    }
  }

  function removeTask(id: Task['id']) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  function renameTask(id: Task['id'], newText: string) {
    const text = newText.trim()

    if (!text) {
      return
    }

    const task = tasks.value.find((task) => task.id === id)

    if (task) {
      task.text = text
    }
  }

  return {
    tasks,
    addTask,
    toggleTaskCompleted,
    removeTask,
    renameTask,
  }
})

// Keep existing tasks when store actions change during development.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot))
}
