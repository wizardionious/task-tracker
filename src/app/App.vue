<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppSidebar from '@/components/AppSidebar.vue'
</script>

<template>
  <div class="layout">
    <AppSidebar />

    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

@media (max-width: 40rem) {
  .layout {
    --mobile-nav-height: calc(4.5rem + env(safe-area-inset-bottom, 0px));

    flex-direction: column;
    min-height: 100dvh;
    padding-bottom: var(--mobile-nav-height);
    overflow-x: clip;
  }
}
</style>
