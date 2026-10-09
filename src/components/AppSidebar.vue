<script setup lang="ts">
import AppLink from './AppLink.vue'

const links = [
  { to: '/', label: 'All tasks' },
  { to: '/completed', label: 'Completed' },
]
</script>

<template>
  <aside class="sidebar">
    <nav class="sidebar__nav" aria-label="Task navigation">
      <ul class="sidebar__nav-list">
        <li v-for="link in links" :key="link.to" class="sidebar__nav-item">
          <AppLink :to="link.to">
            {{ link.label }}
            <span class="sidebar__count">0</span>
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
