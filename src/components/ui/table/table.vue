<script setup lang="ts">
import { IHeader } from './types';
import { IOrder } from '@/models';
import { ref, computed, onMounted, nextTick } from 'vue';

const props = defineProps<{
  headers: IHeader[]
  items: IOrder[]
}>()

const activeSortingHeaderValue = ref<string | null>(null)
const sortingDirection = ref<'asc' | 'desc'>('asc')

const sortedItems = computed(() => {
  // Если нет сортировки
  if (!activeSortingHeaderValue.value) return props.items

  const copyItems = JSON.parse(JSON.stringify(props.items))

  // Если сортировка от меньшего к большему
  if (sortingDirection.value === 'asc') {
    copyItems.sort((a: IOrder, b: IOrder) => sortingStrategy(a[activeSortingHeaderValue.value], b[activeSortingHeaderValue.value], activeSortingHeaderValue.value))
    return copyItems
  }

  // Если сортировка от большего к меньшему
  if (sortingDirection.value === 'desc') {
    copyItems.sort((a: IOrder, b: IOrder) => sortingStrategy(b[activeSortingHeaderValue.value], a[activeSortingHeaderValue.value], activeSortingHeaderValue.value))
    return copyItems
  }
})

const sortingStrategy = (a: string, b: string, sortingValue: string) => {
  if (sortingValue === 'date') {
    const months = {
      'января': '01',
      'февраля': '02',
      'марта': '03',
      'апреля': '04',
      'майя': '05',
      'июня': '06',
      'июля': '07',
      'августа': '08',
      'сентября': '09',
      'октября': '10',
      'ноября': '11',
      'декабря': '12',
    }

    const [a_day, a_month, a_year] = a.split(' ')
    const c = Date.parse(`${a_year}-${months[a_month]}-${a_day}`)
    
    const [b_day, b_month, b_year] = b.split(' ')
    const d = Date.parse(`${b_year}-${months[b_month]}-${b_day}`)
    if (c > d) return 1;
    if (c < d) return -1;
    return 0;
  }
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

const setSorting = (headerValue: string) => {
  // Если нет активной сортировки или сортировка по другому столбцу
  if (headerValue !== activeSortingHeaderValue.value) {
    activeSortingHeaderValue.value = headerValue
    return
  }

  // Если сортируется уже по этому хедеру
  if (headerValue === activeSortingHeaderValue.value) {
    // Если сортировка от минимального до максимального значения,
    // то меняем направление 
    if (sortingDirection.value === 'asc') {
      sortingDirection.value = 'desc'
      return
    }

    // Если сортировка от максимального до минимального значения,
    // то отключаем сортировку
    if (sortingDirection.value === 'desc') {
      activeSortingHeaderValue.value = null
      sortingDirection.value = 'asc'
      return
    }
  }
}
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :style="header.sortable ? 'cursor: pointer;' : ''"
          @click="header.sortable ? setSorting(header.value) : ''"
        >
          {{ header.title }}
          <span v-if="header.value === activeSortingHeaderValue">
            {{ sortingDirection === 'asc' ? '🠗' : '🠕' }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in sortedItems" :class="{ 'text-secondary': item?.status === 'Выполнен' }">
        <td v-for="header in headers">
          <span :class="{ 'text-small': header.fontSize === 'small' }">
            {{ (item as IOrder)[header.value] }}
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