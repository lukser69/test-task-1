<script setup lang="ts">
import { IHeader } from '@/components/uiKit/table/types';
import { Modal, Button, Table } from '@/components/uiKit'
import { useAuthStore } from '@/store/authStore';
import { useOrdersStore } from '@/store/ordersStore';
import { ref, onMounted } from 'vue'
import { IOrder } from '@/models';

const authStore = useAuthStore()
const ordersStore = useOrdersStore()

const isShowConfirmDeleteOrder = ref(false);

const selectedOrder = ref<IOrder | null>(null);

const currentRole = JSON.parse((localStorage.getItem('userData') as string))?.role;

onMounted(() => ordersStore.getOrders())

const headers: IHeader[] = [
  {title: '№', value: 'id',},
  {title: 'Имя клиента', value: 'name'},
  {title: 'Адрес', value: 'address', fontSize: 'small', sortable: true},
  {title: 'Дата заказа', value: 'date', sortable: true},
  {title: 'Статус', value: 'status'},
  {title: 'Комментарий', value: 'comment'},
];

const modalActionsStyles = {
  display: 'flex',
  justifyContent: 'space-evenly',
  marginTop: '68px',
}

const setStatusDoneOrder = async (order: IOrder) => {
  const copyOrder = {...order}
  copyOrder.status = 'Выполнен'
  ordersStore.setStatusDone(copyOrder)
}

const showConfirmDeleteOrder = (order: IOrder) => {
  selectedOrder.value = order;

  isShowConfirmDeleteOrder.value = true;
}

const deleteOrder = async() => {
  if (await ordersStore.deleteOrder((selectedOrder.value as IOrder))) {
    isShowConfirmDeleteOrder.value = false;
  }
}

</script>

<template>
  <div class="container">
    <Table :headers="headers" :items="ordersStore.orders">
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
@/components/ui/table/types@/components/uiKit/table/types