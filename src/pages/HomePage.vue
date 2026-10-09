<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import emptyTasksImage from '@/assets/empty-tasks.png'
</script>

<template>
  <div class="home-page">
    <AppSidebar />

    <main class="home-page__main">
      <header class="page-header">
        <h1 class="page-header__title">My tasks</h1>
        <p class="page-header__text">0 tasks remaining</p>
      </header>

      <div class="empty-state">
        <img
          class="empty-state__image"
          :src="emptyTasksImage"
          alt=""
          width="260"
          height="260"
        />
        <p class="empty-state__title">No tasks to display</p>
        <p class="empty-state__description">Add a task to plan your day.</p>
      </div>

      <button class="button home-page__add-button" type="button">
        <span class="button__icon" aria-hidden="true">+</span>
        Add task
      </button>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  display: flex;
  min-height: 100vh;

  &__main {
    flex: 1;
    padding: 6rem 2rem;
  }

  &__add-button {
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
  }
}

.page-header {
  max-width: 47.5rem;
  margin-inline: auto;

  &__title {
    font-size: 1.5rem;
    line-height: 1.3;
  }

  &__text {
    margin: 0.25rem 0 0;
    color: var(--foreground-muted);
    font-size: 0.75rem;
  }
}

.empty-state {
  margin: 4.5rem auto 0;
  text-align: center;

  &__image {
    width: 16.25rem;
    height: auto;
    margin: 0 auto 1.75rem;
  }

  &__title {
    margin: 0 0 0.375rem;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
  }

  &__description {
    margin: 0;
    font-size: 0.875rem;
    color: var(--foreground-muted);
  }
}
</style>
