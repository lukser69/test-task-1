<script setup lang="ts">
import { Button } from '@/components/uiKit';
import router from '@/app/router';
import { useAuthStore } from '@/store/authStore';
import { useOrdersStore } from '@/store/ordersStore';
import { IUserData } from '@/models';

const authStore = useAuthStore()
const ordersStore = useOrdersStore()

const userData: IUserData | null = JSON.parse((localStorage.getItem('userData') as string))

const logOut = () => {
  localStorage.removeItem('userData')
  ordersStore.orders = []
  router.push('/auth')
}
</script>

<template>
  <div class="content">
    <span class="content__user">{{ userData?.name }}</span>
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