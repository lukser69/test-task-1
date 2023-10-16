<script setup lang="ts">
import { Input, Button } from '@/components/ui'
import { ref } from 'vue'
import { IOrder } from '@/models'
import { useOrdersStore } from '@/store/ordersStore'

const ordersStore = useOrdersStore()

const orderCreateForm = ref<HTMLFormElement>()

const errors = ref({
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

const checkNameOnErrors = () => {
  if (!order.value.name) {
    errors.value.name = true
    return false
  }
  return true
}

const checkAddressOnErrors = () => {
  if (!order.value.address) {
    errors.value.address = true
    return false
  }
  return true
}

const createOrder = async (order: IOrder) => {
  // Проверка на имя
  if (!checkNameOnErrors()) {
    // Проверка на адрес, чтоб пометить ошибкой.
    checkAddressOnErrors()
    return
  }

  // Проверка на адрес
  if (!checkAddressOnErrors()) {
    return
  }
  
  if (await ordersStore.createOrder(order)) {
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
        :error="errors.name"
        @input="errors.name = false"
        @blur="checkNameOnErrors()"
      />
      <Input
        v-model="order.address"
        type="text"
        placeholder="Введите ваш адрес"
        :error="errors.address"
        @input="errors.address = false"
        @blur="checkAddressOnErrors()"
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
