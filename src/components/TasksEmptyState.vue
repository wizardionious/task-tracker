<script setup lang="ts">
import emptyTasksImage from '@/assets/empty-tasks.png'

defineProps<{
  description: string
}>()
</script>

<template>
  <div class="empty-state">
    <img
      class="empty-state__image"
      :src="emptyTasksImage"
      alt=""
      width="260"
      height="260"
    />
    <p class="empty-state__title">No tasks to display</p>
    <p class="empty-state__description">
      {{ description }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
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
