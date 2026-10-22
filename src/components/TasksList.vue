<script setup lang="ts">
import type { Task } from '@/types'
import TaskItem from './TaskItem.vue'

const { editable = false } = defineProps<{
  tasks: Task[]
  editable?: boolean
}>()

const emit = defineEmits<{
  'toggle-completed': [id: Task['id']]
  'remove-task': [id: Task['id']]
  'rename-task': [id: Task['id'], text: string]
}>()

function forwardRename(id: Task['id'], text: string) {
  emit('rename-task', id, text)
}
</script>

<template>
  <TransitionGroup name="tasks-list" tag="ul" class="tasks-list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      class="tasks-list__item"
      :task="task"
      :editable="editable"
      @toggle-completed="emit('toggle-completed', $event)"
      @remove-task="emit('remove-task', $event)"
      @rename-task="forwardRename"
    />
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.tasks-list-enter-active,
.tasks-list-leave-active {
  transition: all 0.3s ease;
}

.tasks-list-enter-from,
.tasks-list-leave-to {
  opacity: 0;
  transform: translateX(1.875rem);
}

.tasks-list {
  margin: 1.5rem 0;

  &__item:not(:last-child) {
    margin-bottom: 1rem;
  }
}
</style>
