import {
  computed,
  nextTick,
  ref,
  toValue,
  watch,
  type MaybeRefOrGetter,
  type TemplateRef,
} from 'vue'

export function useTaskEdit(
  text: MaybeRefOrGetter<string>,
  options: {
    input: TemplateRef<HTMLInputElement>
    editButton: TemplateRef<HTMLButtonElement>
    onRename: (newText: string) => void
  },
) {
  const isEditing = ref(false)
  const draftText = ref('')
  const errorMessage = ref('')

  const hasError = computed(() => errorMessage.value !== '')

  watch(draftText, () => {
    errorMessage.value = ''
  })

  async function startEditing() {
    draftText.value = toValue(text)
    errorMessage.value = ''
    isEditing.value = true

    await nextTick()

    options.input.value?.focus()
    options.input.value?.select()
  }

  async function saveEditing(restoreFocus = false) {
    if (!isEditing.value) {
      return
    }

    const newText = draftText.value.trim()

    if (!newText) {
      errorMessage.value = 'Task name cannot be empty.'
      return
    }

    isEditing.value = false
    errorMessage.value = ''

    if (newText !== toValue(text)) {
      options.onRename(newText)
    }

    if (restoreFocus) {
      await nextTick()
      options.editButton.value?.focus()
    }
  }

  async function cancelEditing() {
    isEditing.value = false
    errorMessage.value = ''

    await nextTick()

    options.editButton.value?.focus()
  }

  return {
    isEditing,
    draftText,
    errorMessage,
    hasError,
    startEditing,
    cancelEditing,
    saveEditing,
  }
}
