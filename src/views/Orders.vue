<script setup lang="ts">
import { Table } from '@/components'
import { Modal, Button } from '@/components/ui'
import { ref } from 'vue'

const showConfirmDoneOrder = ref(false);
const showConfirmDeleteOrder = ref(false);

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

const events = [
  {
  "id": 123,
  "name": "Иван Иванов",
  "address": "Самара, проспект Ленина, 26-25",
  "date": "05 февраля 2022",
  "status": "Выполнен",
  "comment": "доставить до 18:00"
  },
  {
  "id": 456,
  "name": "Петр Петров",
  "address": "Москва, проспект Московский, д.100 кв.1",
  "date": "11 июля 2022",
  "status": "Выполнен",
  "comment": "нет домофона"
  },
  {
  "id": 789,
  "name": "Степан Степанов",
  "address": "Екатеринбург, улица Челюскинцев, 222",
  "date": "11 июля 2022",
  "status": "Выполнен",
  "comment": "нет домофона"
  }
];

</script>

<template>
  <div class="container">
    <Table :headers="headers" :items="events">
      <template #actions="{ status }">
        <div class="table__actions">
          <button v-if="status === 'Новый'" style="cursor: pointer;" @click="showConfirmDoneOrder = true">✔</button>
          <button style="cursor: pointer;" @click="showConfirmDeleteOrder = true">✗</button>
        </div>
      </template>
    </Table>

    <!-- Подтверждение готовности заказа -->
    <Modal v-if="showConfirmDoneOrder" @onCloseModal="showConfirmDoneOrder = false">
      <template #default>
        <div class="modal">
          <div class="modal__text">
            Вы действительно хотите подтвердить готовность заказа?
          </div>
          <div class="modal__actions" :style="modalActionsStyles">
            <Button variant="primary" width="120px">Ок</Button>
            <Button variant="primary" width="120px" @click="showConfirmDoneOrder = false">Отмена</Button>
          </div>
        </div>
      </template>
    </Modal>

    <!-- Подтверждение удаления заказа -->
    <Modal v-if="showConfirmDeleteOrder" @onCloseModal="showConfirmDeleteOrder = false">
      <template #default>
        <div class="modal">
          <div class="modal__text">
            Вы действительно хотите удалить заказ?
          </div>
          <div class="modal__actions" :style="modalActionsStyles">
            <Button variant="primary" width="120px">Ок</Button>
            <Button variant="primary" width="120px" @click="showConfirmDeleteOrder = false">Отмена</Button>
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
