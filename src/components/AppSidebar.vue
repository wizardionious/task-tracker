<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'
import AppLink from './AppLink.vue'
import { storeToRefs } from 'pinia'

const tasksStore = useTasksStore()

const { remainingTasks, completedTasks, deletedTasks } = storeToRefs(tasksStore)
</script>

<template>
  <aside class="sidebar">
    <nav class="sidebar__nav" aria-label="Task navigation">
      <ul class="sidebar__nav-list">
        <li class="sidebar__nav-item">
          <AppLink to="/" class="sidebar__nav-link">
            My tasks
            <span class="sidebar__tasks-count">
              {{ remainingTasks.length }}
            </span>
          </AppLink>
        </li>
        <li class="sidebar__nav-item">
          <AppLink to="/completed" class="sidebar__nav-link">
            Completed
            <span class="sidebar__tasks-count">
              {{ completedTasks.length }}
            </span>
          </AppLink>
        </li>
        <li class="sidebar__nav-item">
          <AppLink to="/trash" class="sidebar__nav-link">
            Trash
            <span class="sidebar__tasks-count">{{ deletedTasks.length }}</span>
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
    position: fixed;
    inset: auto 0 0;
    z-index: 10;
    width: 100%;
    height: var(--mobile-nav-height);
    padding: 0.5rem max(0.5rem, env(safe-area-inset-right, 0px))
      calc(0.5rem + env(safe-area-inset-bottom, 0px))
      max(0.5rem, env(safe-area-inset-left, 0px));
    border-top: 0.0625rem solid oklch(from var(--foreground) l c h / 0.1);

    &__nav {
      height: 100%;
    }

    &__nav-list {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      height: 100%;
    }

    :deep(.sidebar__nav-link) {
      height: 100%;
      min-height: 2.75rem;
      flex-direction: column;
      justify-content: center;
      gap: 0;
      padding: 0.25rem;
      font-size: 0.875rem;
    }

    &__tasks-count {
      font-size: 0.75rem;
    }

    &__author {
      display: none;
    }
  }
}
</style>
