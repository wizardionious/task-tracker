<script setup lang="ts">
import TasksEmptyState from '@/components/TasksEmptyState.vue'
import TasksList from '@/components/TasksList.vue'
import { useTasksStore } from '@/stores/tasks'
import type { TaskId } from '@/types'
import { ref } from 'vue'

const tasksStore = useTasksStore()

const newTaskId = ref<TaskId | null>(null)

function addTask() {
  newTaskId.value = tasksStore.addTask('New task')
}
</script>

<template>
  <main class="page__main">
    <header class="page-header">
      <h1 class="page-header__title">My tasks</h1>
      <p class="page-header__text">
        {{ tasksStore.remainingTasks.length }} tasks remaining
      </p>
    </header>

    <TasksList
      :tasks="tasksStore.remainingTasks"
      @toggle-completed="tasksStore.toggleTaskCompleted"
      @remove-task="tasksStore.moveTaskToTrash"
      @rename-task="tasksStore.renameTask"
      :editing-task-id="newTaskId"
      editable
    >
      <template #empty>
        <TasksEmptyState description="Add a task to plan your day." />
      </template>
    </TasksList>

    <button
      type="button"
      class="button button--primary page__add-button"
      @click="addTask"
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

@media (max-width: 40rem) {
  .page {
    &__main {
      padding: 2rem 1rem 6rem;
    }

    &__add-button {
      right: 1rem;
      bottom: calc(var(--mobile-nav-height) + 1rem);
    }
  }
}
</style>
