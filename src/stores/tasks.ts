import type { Task } from '@/types'
import { defineStore } from 'pinia'
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

  return { tasks, addTask, toggleTaskCompleted, removeTask }
})
