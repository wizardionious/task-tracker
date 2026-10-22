<script setup lang="ts">
import { useTaskEdit } from '@/composables/useTaskEdit'
import type { Task, TaskId } from '@/types'
import { useTemplateRef } from 'vue'

const { task, editable } = defineProps<{
  task: Task
  editable: boolean
}>()

const emit = defineEmits<{
  'toggle-completed': [id: TaskId]
  remove: [id: TaskId]
  rename: [id: TaskId, text: string]
  restore: [id: TaskId]
}>()

const inputElement = useTemplateRef<HTMLInputElement>('inputElement')
const editButton = useTemplateRef<HTMLButtonElement>('editButton')

const {
  isEditing,
  draftText,
  errorMessage,
  hasError,
  startEditing,
  cancelEditing,
  saveEditing,
} = useTaskEdit(() => task.text, {
  input: inputElement,
  editButton,
  onRename: (newText) => emit('rename', task.id, newText),
})

const checkboxId = `task-${task.id}-completed`
</script>

<template>
  <li class="card task" :class="{ 'task--completed': task.completed }">
    <input
      :id="checkboxId"
      class="task__checkbox"
      type="checkbox"
      :checked="task.completed"
      :disabled="task.deletedAt !== null"
      :aria-label="'Completed: ' + task.text"
      @change="emit('toggle-completed', task.id)"
    />

    <div class="task__content">
      <template v-if="isEditing">
        <input
          ref="inputElement"
          v-model="draftText"
          class="task__input"
          type="text"
          aria-label="Task name"
          :aria-invalid="hasError"
          :aria-describedby="
            hasError ? `task-edit-error-${task.id}` : undefined
          "
          @keydown.enter.prevent="saveEditing(true)"
          @keydown.esc.stop.prevent="cancelEditing"
          @blur="saveEditing()"
        />

        <p
          v-if="errorMessage"
          :id="`task-edit-error-${task.id}`"
          class="task__error"
          role="alert"
        >
          {{ errorMessage }}
        </p>
      </template>

      <label v-else :for="checkboxId" class="task__text">
        {{ task.text }}
      </label>
    </div>

    <button
      v-if="editable && !isEditing"
      ref="editButton"
      class="button button--icon"
      type="button"
      :aria-label="`Edit task: ${task.text}`"
      @click="startEditing()"
    >
      <span class="fa6-solid--pen-clip" aria-hidden="true"></span>
    </button>

    <button
      v-if="task.deletedAt !== null"
      class="button button--icon task__restore-button"
      type="button"
      :aria-label="`Restore task: ${task.text}`"
      @click="emit('restore', task.id)"
    >
      <span class="fa-solid--trash-restore" aria-hidden="true"></span>
    </button>

    <button
      class="button button--icon task__delete-button"
      type="button"
      :aria-label="`${task.deletedAt === null ? 'Move task to trash' : 'Delete task'}: ${task.text}`"
      @click="emit('remove', task.id)"
    >
      <span class="fa6-solid--trash" aria-hidden="true"></span>
    </button>
  </li>
</template>

<style lang="scss" scoped>
.task {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &__checkbox {
    width: 1.125rem;
    height: 1.125rem;
    flex-shrink: 0;
    accent-color: var(--accent);

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__text {
    display: block;
    overflow-wrap: anywhere;
  }

  &__input {
    box-sizing: border-box;
    width: 100%;
    padding: 0.375rem 0.5rem;
    border: 0.0625rem solid var(--foreground-muted);
    border-radius: 0.375rem;
    background: var(--surface);
    color: var(--foreground);
    font: inherit;

    &:focus {
      outline: 0.125rem solid var(--accent);
      outline-offset: 0.125rem;
    }

    &[aria-invalid='true'] {
      border-color: var(--danger);
    }
  }

  &__error {
    margin: 0.375rem 0 0;
    color: var(--danger);
    font-size: 0.875rem;
  }

  &__delete-button {
    color: var(--danger);
  }

  &__restore-button {
    color: var(--success);
  }

  &--completed &__text {
    text-decoration: line-through;
    color: var(--foreground-muted);
  }
}
</style>
