<script setup lang="ts">
import type { Task, TaskId } from '@/types'
import { nextTick, ref } from 'vue'

const props = defineProps<{
  task: Task
  editable: boolean
}>()

const emit = defineEmits<{
  'toggle-completed': [id: TaskId]
  remove: [id: TaskId]
  rename: [id: TaskId, text: string]
  restore: [id: TaskId]
}>()

const isEditing = ref(false)
const draftText = ref('')
const errorMessage = ref('')

const inputElement = ref<HTMLInputElement | null>(null)
const editButton = ref<HTMLButtonElement | null>(null)

async function startEditing() {
  if (!props.editable) {
    return
  }

  draftText.value = props.task.text
  errorMessage.value = ''
  isEditing.value = true

  await nextTick()

  inputElement.value?.focus()
  inputElement.value?.select()
}

async function saveEditing(restoreFocus = false) {
  if (!isEditing.value) {
    return
  }

  const text = draftText.value.trim()

  if (!text) {
    errorMessage.value = 'Task name cannot be empty.'
    return
  }

  isEditing.value = false
  errorMessage.value = ''

  if (text !== props.task.text) {
    emit('rename', props.task.id, text)
  }

  if (restoreFocus) {
    await nextTick()
    editButton.value?.focus()
  }
}

async function cancelEditing() {
  isEditing.value = false
  errorMessage.value = ''

  await nextTick()

  editButton.value?.focus()
}
</script>

<template>
  <li class="card task" :class="{ 'task--completed': task.completed }">
    <input
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
          :aria-invalid="Boolean(errorMessage)"
          :aria-describedby="
            errorMessage ? `task-edit-error-${task.id}` : undefined
          "
          @input="errorMessage = ''"
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

      <button
        v-else-if="editable"
        ref="editButton"
        class="task__text task__edit-button"
        type="button"
        :aria-label="'Edit task: ' + task.text"
        @dblclick="startEditing"
      >
        {{ task.text }}
      </button>

      <span v-else class="task__text">
        {{ task.text }}
      </span>
    </div>

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

  &__edit-button {
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: text;

    &:focus-visible {
      outline: 0.125rem solid var(--accent);
      outline-offset: 0.25rem;
      border-radius: 0.25rem;
    }
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
