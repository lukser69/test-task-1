<script setup lang="ts">
import { Input, Button } from '@/components/ui'
import { ref } from 'vue'
import { IOrder } from '@/models'
import axios from 'axios'
import { useAppStore } from '@/store/appStore'

const store = useAppStore()

const order = ref<IOrder>({
  id: undefined,
  name: '',
  address: '',
  date: '',
  status: 'Новый',
  comment: '',
})

const createOrder = () => {
  // Подставляем id заказу
  const lastOrderId = (store.orders[store.orders.length - 1] as IOrder)?.id;
  order.value.id = lastOrderId ? lastOrderId + 1 : 1;

  axios
    .post('http://localhost:3000/events', order.value)
    .then(() => {
      (store.orders as IOrder[]).push({...order.value})
      order.value.id = undefined;
      order.value.name = '';
      order.value.address = '';
      order.value.comment = '';
    })
    .catch((error) => console.log('Error', error.message))
}
</script>

<template>
  <form class="order-create-form">
    <div class="order-create-form__title">
      Добавить заказ
    </div>
    
    <div class="order-create-form__inputs">
      <Input v-model="order.name" type="text" placeholder="Введите ваше имя"/>
      <Input v-model="order.address" type="text" placeholder="Введите ваш адрес"/>
      <Input v-model="order.comment" type="text" placeholder="Комментарий"/>
    </div>

    <div class="order-create-form__submit">
      <Button variant="primary" @click="createOrder()">Добавить заказ</Button>
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
