<script setup lang="ts">
import { Layout } from '@/app/layout'
import { useAuthStore } from './store/authStore';

const authStore = useAuthStore()

const userData = JSON.parse((localStorage.getItem('userData') as string))

// Если пользователь авторизован, то проверяем на обновление его данных
if (userData) {
  authStore.updateUserData(userData.user)
}
</script>

<template>
    <Layout />
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;

  font-size: 16px;
  font-weight: 400;
}
</style>
