<script setup lang="ts">
interface IButtonRoute {
  name: string,
  path: string,
}

const buttonsRoute: IButtonRoute[]  = [
  {name: 'Все заказы', path: '/orders'},
  {name: 'Добавить заказ', path: '/order-create'},
]
</script>

<template>
  <div class="wrapper-links">
    <router-link class="link" v-for="route in buttonsRoute" :to="route.path">{{ route.name }}</router-link>
  </div>
</template>

<style scoped lang="scss">
@import '@/app/styles/variables.scss';

.wrapper-links {
  display: flex;
  gap: 38px;

  .link {
    font-size: inherit;
    font-weight: 400;
    text-decoration: none;
    color: $text-white;
  }
}
</style>