<script setup lang="ts">
import { Table } from '@/components'

const headers = [
  {title: '№'},
  {title: 'Имя клиента'},
  {title: 'Адрес', fontSize: 'small'},
  {title: 'Дата заказа'},
  {title: 'Статус'},
  {title: 'Комментарий'},
];

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
          <button v-if="status === 'Новый'">✔</button>
          <button>✗</button>
        </div>
      </template>
    </Table>
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
