<script setup lang="ts">
import { AuthForm } from '@/components'
</script>

<template>
  <div class="auth">
    <AuthForm />
  </div>
</template>

<style scoped lang="scss">
@import '@/app/styles/variables.scss';

.auth {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  padding: 50px;

  display: flex;
  align-items: center;

  background-color: $bg-light;
}
</style>
