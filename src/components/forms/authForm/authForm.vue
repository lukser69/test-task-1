<script setup lang="ts">
import { Input, Button, ErrorMessage } from '@/components/ui'
import { ref } from 'vue'
import { IUser } from '@/models'
import router from '@/app/router';
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore()

const user = ref<IUser>({
  name: '',
  password: '',
})

const isErrorsUserName = ref<boolean>(false)
const isErrorsUserPassword = ref<boolean>(false)
const isErrorsVerificationForm = ref<boolean>(false)

const clearStateErrorInputName = () => {
  isErrorsUserName.value = false;
  isErrorsVerificationForm.value = false;
}

const clearStateErrorInputPassword = () => {
  isErrorsUserPassword.value = false;
  isErrorsVerificationForm.value = false;
}

const checkValidationInputName = () => {
  if (!user.value.name) isErrorsUserName.value = true;
}

const checkValidationInputPassword = () => {
  if (!user.value.password || user.value.password.length < 8) {
    isErrorsUserPassword.value = true;
  }
}

const logIn = async () => {
  if (!user.value.name ||
    !user.value.password ||
    isErrorsUserName.value ||
    isErrorsUserPassword.value)
  {
    isErrorsUserName.value = true;
    isErrorsUserPassword.value = true;
    return
  }
  if (await authStore.getUser(user.value.name, user.value.password)) {
     router.push('/orders')
  } else {
    isErrorsVerificationForm.value = true
  }
}
</script>

<template>
  <form class="auth-form">
    <div class="auth-form__inputs">
      <Input
        v-model="user.name"
        type="text"
        placeholder="username"
        :error="isErrorsUserName || isErrorsVerificationForm"
        @input="clearStateErrorInputName()"
        @blur="checkValidationInputName()"
      />
      <Input
        v-model="user.password"
        type="password"
        placeholder="password"
        :error="isErrorsUserPassword || isErrorsVerificationForm"
        @input="clearStateErrorInputPassword()"
        @blur="checkValidationInputPassword()"
      />
    </div>
    <ErrorMessage v-if="isErrorsVerificationForm">Неверный логин/пароль</ErrorMessage>
    <ErrorMessage v-if="!isErrorsVerificationForm && isErrorsUserPassword">Пароль меньше 8 символов</ErrorMessage>

    <div class="auth-form__submit">
      <Button variant="primary" @click="logIn()">Войти</Button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import '@/app/styles/variables.scss';

.auth-form {
  width: 344px;
  min-height: 245px;
  overflow: hidden;

  padding: 57px 38px 22px;

  background-color: $bg-secondary;

  & > .auth-form__inputs{ 
    width: 180px;

    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  & > .auth-form__submit {
    margin-top: 37px;
    padding-left: 24px;
    
    display: flex;
    justify-content: center;
  }
}
</style>
