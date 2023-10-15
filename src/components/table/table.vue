<script setup lang="ts">
import { IHeader } from './types';
import { IOrder } from '@/models';

defineProps<{
  headers: IHeader[]
  items: IOrder[]
}>()
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="header in headers">{{ header.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :class="{ 'text-secondary': item?.status === 'Выполнен' }">
        <td v-for="(itemValue, itemName, index) in item">
          <span :class="{ 'text-small': headers[+index]?.fontSize === 'small' }">
            {{ itemValue }}
          </span>
        </td>
        <td class="actions">
          <slot name="actions" v-bind="item"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
@import '@/app/styles/variables.scss';

.table {
  width: 100%;
  border-collapse: collapse;
  
  text-align: center;

  th {
    padding: 9px 13px 7px;
  }

  td {
    padding: 13px;
  }

  th, td {
    border: 1px solid $table-border;
  }

  .actions {
    border: none;
  }

  & .text-small {
    font-size: 0.875rem;
  }
  
  & .text-secondary {
    color: $text-secondary;
  }
}
</style>