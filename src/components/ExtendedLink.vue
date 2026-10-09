<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouterLinkProps } from 'vue-router'

defineOptions({
  inheritAttrs: false,
})

export type ExtendedLinkProps = RouterLinkProps & { inactiveClass?: string }

const props = defineProps<ExtendedLinkProps>()

const isExternalLink = computed(() => {
  return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>

<template>
  <a
    v-if="isExternalLink"
    v-bind="$attrs"
    :href="to.toString()"
    target="_blank"
  >
    <slot />
  </a>

  <RouterLink
    v-else
    v-bind="$props"
    custom
    v-slot="{ isActive, href, navigate }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot />
    </a>
  </RouterLink>
</template>
