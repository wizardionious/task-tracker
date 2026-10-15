<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'
import AppLink from './AppLink.vue'
import { computed } from 'vue'

const tasksStore = useTasksStore()

const myTasksCount = computed(
  () => tasksStore.tasks.filter((task) => !task.completed).length,
)
const completedTasksCount = computed(
  () => tasksStore.tasks.filter((task) => task.completed).length,
)
</script>

<template>
  <aside class="sidebar">
    <nav class="sidebar__nav" aria-label="Task navigation">
      <ul class="sidebar__nav-list">
        <li class="sidebar__nav-item">
          <AppLink to="/">
            My tasks
            <span class="sidebar__tasks-count">{{ myTasksCount }}</span>
          </AppLink>
        </li>
        <li class="sidebar__nav-item">
          <AppLink to="/completed">
            Completed
            <span class="sidebar__tasks-count">{{ completedTasksCount }} </span>
          </AppLink>
        </li>
      </ul>
    </nav>

    <div class="sidebar__author">
      <p class="sidebar__author-name">Andrii</p>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 12.5rem;
  background-color: var(--background-muted);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  padding: 1rem;

  &__nav-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__tasks-count {
    font-size: 0.875rem;
  }

  &__author {
    margin-top: auto;
    padding-top: 1rem;
    font-weight: 600;
  }

  &__author-name {
    margin: 0;
  }
}

@media (max-width: 40rem) {
  .sidebar {
    flex-basis: auto;

    &__nav-list {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
}
</style>
