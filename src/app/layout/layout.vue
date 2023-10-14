<script setup lang="ts">
import { Navbar } from '@/components'
</script>

<template>
  <div class="layout-root">
    <Navbar v-if="$route.path !== '/auth'" />
    <div class="pages">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/app/styles/variables.scss';

.layout-root {
  background-color: $bg-light;

  .pages {
    min-height: calc(100vh - $navbar-height);
  }
}
</style>