<script setup lang="ts">
import { Button } from '@/components/ui';
</script>

<template>
  <div class="content">
    <span class="content__user">ИмяФамилия</span>
    <Button variant="secondary">Выйти</Button>
  </div>
</template>

<style scoped lang="scss">
@import '@/app/styles/variables.scss';

.content {
  display: flex;
  align-items: center;
  gap: 28px;
}
</style>