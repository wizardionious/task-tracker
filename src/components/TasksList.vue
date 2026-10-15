<script setup lang="ts">
import type { Task } from '@/types'

defineProps<{ tasks: Task[] }>()

defineEmits<{
  'toggle-completed': [id: Task['id']]
  'remove-task': [id: Task['id']]
}>()
</script>

<template>
  <ul class="tasks-list">
    <li
      v-for="task in tasks"
      :key="task.id"
      class="card tasks-list__item task"
      :class="{ 'task--completed': task.completed }"
    >
      <label class="task__label">
        <input
          class="task__checkbox"
          type="checkbox"
          :checked="task.completed"
          @change="$emit('toggle-completed', task.id)"
        />

        <span class="task__text">
          {{ task.text }}
        </span>
      </label>
      <button
        class="button task__delete-button"
        type="button"
        :aria-label="'Delete task: ' + task.text"
        @click="$emit('remove-task', task.id)"
      >
        <span class="fa6-solid--trash"></span>
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.tasks-list {
  margin: 1.5rem 0;

  &__item:not(:last-child) {
    margin-bottom: 1rem;
  }
}

.task {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  &__label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
  }

  &__checkbox {
    width: 1.125rem;
    height: 1.125rem;
    flex-shrink: 0;
    accent-color: var(--accent);
  }

  &__text {
    overflow-wrap: anywhere;
    user-select: none;
  }

  &__delete-button {
    background-color: transparent;
    border-radius: 0.75rem;
    color: var(--danger);

    &:hover {
      background-color: var(--background);
    }
  }

  &--completed &__text {
    text-decoration: line-through;
    color: var(--foreground-muted);
  }
}
</style>
