<script setup lang="ts">
import ExtendedLink from './ExtendedLink.vue'
import type { ExtendedLinkProps } from './ExtendedLink.vue'

export type AppLinkProps = Omit<
  ExtendedLinkProps,
  'activeClass' | 'inactiveClass'
>

defineProps<AppLinkProps>()
</script>

<template>
  <ExtendedLink
    v-bind="$props"
    class="app-link"
    active-class="app-link--active"
  >
    <slot />
  </ExtendedLink>
</template>

<style lang="scss" scoped>
.app-link {
  text-decoration: none;
  color: var(--foreground);
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 0.75rem;

  &--active {
    background: var(--surface);
    font-weight: 600;
  }

  &:hover {
    background: oklch(from var(--surface) l c h / 0.8);
  }
}
</style>
