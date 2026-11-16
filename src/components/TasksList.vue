<script setup lang="ts">
import type { Task, TaskId } from '@/types'
import TaskItem from './TaskItem.vue'

const { editable = false, editingTaskId = null } = defineProps<{
  tasks: Task[]
  editable?: boolean
  // Task that should open in edit mode when it mounts (e.g. a just-added one).
  editingTaskId?: TaskId | null
}>()

const emit = defineEmits<{
  'toggle-completed': [id: TaskId]
  'remove-task': [id: TaskId]
  'rename-task': [id: TaskId, text: string]
  'restore-task': [id: TaskId]
}>()

function forwardRename(id: TaskId, text: string) {
  emit('rename-task', id, text)
}
</script>

<template>
  <Transition name="tasks-list" mode="out-in">
    <TransitionGroup
      v-if="tasks.length"
      name="tasks-list"
      tag="ul"
      class="tasks-list"
    >
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        class="tasks-list__item"
        :task="task"
        :editable="editable"
        :start-editing="editable && task.id === editingTaskId"
        @toggle-completed="emit('toggle-completed', $event)"
        @remove="emit('remove-task', $event)"
        @rename="forwardRename"
        @restore="emit('restore-task', $event)"
      />
    </TransitionGroup>

    <div v-else>
      <slot name="empty" />
    </div>
  </Transition>
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
