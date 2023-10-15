<script setup lang="ts">
import { Button } from '@/components/ui';
import router from '@/app/router';

const username = JSON.parse((localStorage.getItem('user') as string))?.name

const logOut = () => {
  localStorage.removeItem('user')
  router.push('/auth')
}
</script>

<template>
  <div class="content">
    <span class="content__user">{{ username }}</span>
    <Button variant="secondary" @click="logOut()">Выйти</Button>
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