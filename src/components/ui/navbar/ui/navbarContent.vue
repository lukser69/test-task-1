<script setup lang="ts">
import { Button } from '@/components/ui';
import router from '@/app/router';
import { useAuthStore } from '@/store/authStore';
import { useOrdersStore } from '@/store/ordersStore';

const authStore = useAuthStore()
const ordersStore = useOrdersStore()

const userName = localStorage.getItem('userName')

const logOut = () => {
  authStore.userData = null;
  localStorage.removeItem('userName')
  ordersStore.orders = []
  router.push('/auth')
}
</script>

<template>
  <div class="content">
    <span class="content__user">{{ userName }}</span>
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