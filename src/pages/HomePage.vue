<script setup lang="ts">
import TasksEmptyState from '@/components/TasksEmptyState.vue'
import TasksList from '@/components/TasksList.vue'
import { useTasksStore } from '@/stores/tasks'
import { computed } from 'vue'

const tasksStore = useTasksStore()
const remainingTasks = computed(() =>
  tasksStore.tasks.filter((task) => !task.completed),
)
</script>

<template>
  <main class="page__main">
    <header class="page-header">
      <h1 class="page-header__title">My tasks</h1>
      <p class="page-header__text">
        {{ remainingTasks.length }} tasks remaining
      </p>
    </header>

    <TasksList
      v-if="remainingTasks.length"
      :tasks="remainingTasks"
      @toggle-completed="tasksStore.toggleTaskCompleted"
      @remove-task="tasksStore.removeTask"
      @rename-task="tasksStore.renameTask"
      editable
    />

    <TasksEmptyState v-else description="Add a task to plan your day." />

    <button
      type="button"
      class="button button--primary page__add-button"
      @click="tasksStore.addTask('testTask')"
    >
      <span class="button__icon" aria-hidden="true">+</span>
      Add task
    </button>
  </main>
</template>

<style lang="scss" scoped>
.page {
  &__main {
    flex: 1;
    padding: 6rem 6rem;
  }

  &__add-button {
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
  }
}

.page-header {
  &__title {
    font-size: 1.5rem;
    line-height: 1.3;
  }

  &__text {
    margin: 0.25rem 0 0;
    color: var(--foreground-muted);
    font-size: 1rem;
  }
}
</style>
