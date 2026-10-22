import type { Task } from '@/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  const deletedTasks = computed(() =>
    tasks.value.filter((task) => task.deletedAt !== null),
  )

  const activeTasks = computed(() =>
    tasks.value.filter((task) => task.deletedAt === null),
  )

  const remainingTasks = computed(() =>
    activeTasks.value.filter((task) => !task.completed),
  )

  const completedTasks = computed(() =>
    activeTasks.value.filter((task) => task.completed),
  )

  function addTask(text: string) {
    tasks.value.push({
      id: crypto.randomUUID(),
      completed: false,
      text,
      deletedAt: null,
    })
  }

  function toggleTaskCompleted(id: Task['id']) {
    const task = tasks.value.find((task) => task.id === id)

    if (task) {
      task.completed = !task.completed
    }
  }

  function deleteTaskPermanently(id: Task['id']) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  function moveTaskToTrash(id: Task['id']) {
    const taskToTrash = tasks.value.find((task) => task.id === id)
    if (!taskToTrash) return

    taskToTrash.deletedAt = Date.now()
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
    remainingTasks,
    completedTasks,
    deletedTasks,
    addTask,
    toggleTaskCompleted,
    deleteTaskPermanently,
    moveTaskToTrash,
    renameTask,
  }
})

// Keep existing tasks when store actions change during development.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot))
}
