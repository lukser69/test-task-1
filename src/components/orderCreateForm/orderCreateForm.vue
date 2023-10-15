<script setup lang="ts">
import { Input, Button } from '@/components/ui'
import { ref } from 'vue'
import router from '@/app/router';

const username = ref<string>('')
const address = ref<string>('')
const comment = ref<string>('')

const getVerification = () => {
  router.push('/orders')
}
</script>

<template>
  <form class="order-create-form">
    <div class="order-create-form__title">
      Добавить заказ
    </div>
    
    <div class="order-create-form__inputs">
      <Input v-model="username" type="text" placeholder="Введите ваше имя"/>
      <Input v-model="address" type="password" placeholder="Введите ваш адрес"/>
      <Input v-model="comment" type="password" placeholder="Комментарий"/>
    </div>

    <div class="order-create-form__submit">
      <Button variant="primary" @click="getVerification()">Добавить заказ</Button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import '@/app/styles/variables.scss';

.order-create-form {
  width: 344px;
  overflow: hidden;

  padding: 51px 58px 0;

  & > .order-create-form__title {
    margin-bottom: 33px;
  }

  & > .order-create-form__inputs { 
    width: 200px;

    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  & > .order-create-form__submit {
    margin-top: 37px;
  }
}
</style>
