<script setup lang="ts">
import { Input, Button } from '@/components/ui'
import { ref } from 'vue'
import { IOrder } from '@/models'
import { useAppStore } from '@/store/appStore'

const store = useAppStore()

const orderCreateForm = ref<HTMLFormElement>()

const isErrors = ref({
  name: false,
  address: false,
});

const order = ref<IOrder>({
  name: '',
  address: '',
  date: '14 января 2024',
  status: 'Новый',
  comment: '',
})

const createOrder = async (order: IOrder) => {
  if (!order.name) {
    isErrors.value.name = true;

    // Проверка на адрес. Если он пустой, то закрашиваем и его.
    if (!order.address) {
      isErrors.value.address = true;
    }
    return
  }

  if (!order.address) {
    isErrors.value.address = true;
    return
  }
  
  if (await store.createOrder(order)) {
    (orderCreateForm.value as HTMLFormElement).reset()
  }
}
</script>

<template>
  <form class="order-create-form" ref="orderCreateForm">
    <div class="order-create-form__title">
      Добавить заказ
    </div>
    
    <div class="order-create-form__inputs">
      <Input
        v-model="order.name"
        type="text"
        placeholder="Введите ваше имя"
        :error="isErrors.name"
        @input="isErrors.name = false"
        @blur="!order.name ? isErrors.name = true : ''"
      />
      <Input
        v-model="order.address"
        type="text"
        placeholder="Введите ваш адрес"
        :error="isErrors.address"
        @input="isErrors.address = false"
        @blur="!order.address ? isErrors.address = true : ''"
      />
      <Input v-model="order.comment" type="text" placeholder="Комментарий"/>
    </div>

    <div class="order-create-form__submit">
      <Button variant="primary" @click="createOrder(order)">Добавить заказ</Button>
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
