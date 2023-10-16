<script setup lang="ts">
import { NavbarLinks, NavbarContent } from './ui';
</script>

<template>
  <nav class="navbar">
    <NavbarLinks />
    <NavbarContent />
  </nav>
</template>

<style scoped lang="scss">
@import '@/app/styles/variables.scss';

.navbar {
  height: $navbar-height;
  padding: 12px 15px 22px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: $navbar-bg;

}
</style>