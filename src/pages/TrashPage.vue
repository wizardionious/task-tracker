<script setup lang="ts">
import TasksEmptyState from '@/components/TasksEmptyState.vue'
import TasksList from '@/components/TasksList.vue'
import { useTasksStore } from '@/stores/tasks'

const tasksStore = useTasksStore()
</script>

<template>
  <main class="page__main">
    <header class="page-header">
      <h1 class="page-header__title">Deleted tasks</h1>
      <p class="page-header__text">
        {{ tasksStore.deletedTasks.length }} tasks deleted
      </p>
    </header>

    <TasksList
      :tasks="tasksStore.deletedTasks"
      @remove-task="tasksStore.deleteTaskPermanently"
    >
      <template #empty>
        <TasksEmptyState description="Deleted tasks will appear here." />
      </template>
    </TasksList>
  </main>
</template>

<style lang="scss" scoped>
.page {
  &__main {
    flex: 1;
    padding: 6rem 6rem;
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
