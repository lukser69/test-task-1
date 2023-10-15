<script setup lang="ts">
import { Input, Button } from '@/components/ui'
import { ref } from 'vue'
import router from '@/app/router';

const username = ref<string>('')
const password = ref<string>('')

const getVerification = () => {
  router.push('/orders')
}
</script>

<template>
  <form class="auth-form">
    <Input class="auth-form__input" v-model="username" type="text" placeholder="username"/>
    <Input class="auth-form__input" v-model="password" type="password" placeholder="password"/>

    <div class="auth-form__submit">
      <Button variant="primary" @click="getVerification()">Войти</Button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import '@/app/styles/variables.scss';

.auth-form {
  width: 344px;
  height: 245px;
  overflow: hidden;

  padding: 57px 38px 22px;

  display: flex;
  flex-direction: column;
  gap: 32px;

  background-color: $bg-secondary;

  & > .auth-form__input{ 
    width: 180px;
  }
  & > .auth-form__submit {
    margin-top: 5px;
    padding-left: 24px;
    
    display: flex;
    justify-content: center;
  }
}
</style>
