<script setup lang="ts">
import { Table } from '@/components'
import { Modal, Button } from '@/components/ui'
import axios from 'axios';
import { useAppStore } from '@/store/appStore';
import { ref, onMounted } from 'vue'
import { IOrder } from '@/models';

const store = useAppStore()

const isShowConfirmDeleteOrder = ref(false);

const currentOrder = ref<IOrder | null>(null);

const currentRole = JSON.parse((localStorage.getItem('user') as string))?.role;

onMounted(() => store.getOrders())

const headers = [
  {title: '№'},
  {title: 'Имя клиента'},
  {title: 'Адрес', fontSize: 'small'},
  {title: 'Дата заказа'},
  {title: 'Статус'},
  {title: 'Комментарий'},
];

const modalActionsStyles = {
  display: 'flex',
  justifyContent: 'space-evenly',
  marginTop: '68px',
}

const setStatusDoneOrder = (order: IOrder): void => {
  const copyOrder = {...order}
  copyOrder.status = 'Выполнен'
  axios
    .put(`http://localhost:3000/events/${copyOrder.id}`, copyOrder)
    .then((response) => {
      const findOrder = store.orders.find((item) => (item as IOrder).id === (order as IOrder).id);
      if (findOrder) {
        (findOrder as IOrder).status = response.data.status
      }
    })
    .catch((error) => console.log('Error', error.message))
}

const showConfirmDeleteOrder = (order: IOrder): void => {
  currentOrder.value = order;

  isShowConfirmDeleteOrder.value = true;
}

const deleteOrder = (): void => {
  axios
    .delete(`http://localhost:3000/events/${(currentOrder.value as IOrder).id}`)
    .then(() => {
      const findIndexOrder = store.orders.findIndex((order) => (order as IOrder).id === (currentOrder.value as IOrder).id);
      if (findIndexOrder) {
        store.orders.splice(findIndexOrder, 1)
      }

      isShowConfirmDeleteOrder.value = false;
    })
    .catch((error) => console.log('Error', error.message))
}

</script>

<template>
  <div class="container">
    <Table :headers="headers" :items="store.orders">
      <template v-if="currentRole === 'ADMIN'" #actions="item">
        <div class="table__actions">
          <button v-if="item.status === 'Новый'" style="cursor: pointer;" @click="setStatusDoneOrder(item)">✔</button>
          <button style="cursor: pointer;" @click="showConfirmDeleteOrder(item)">✗</button>
        </div>
      </template>
    </Table>

    <!-- Подтверждение удаления заказа -->
    <Modal v-if="isShowConfirmDeleteOrder" @onCloseModal="isShowConfirmDeleteOrder = false">
      <template #default>
        <div class="modal">
          <div class="modal__text">
            Вы действительно хотите удалить заказ?
          </div>
          <div class="modal__actions" :style="modalActionsStyles">
            <Button variant="primary" width="120px" @click="deleteOrder()">Ок</Button>
            <Button variant="primary" width="120px" @click="isShowConfirmDeleteOrder = false">Отмена</Button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<style scoped lang="scss">
@import '@/app/styles/variables.scss';

.container {
  width: 70%;
  margin: 0 auto;
  padding-top: 75px;

  .table__actions {
    display: flex;
    gap: 6px;
  }
}
</style>
