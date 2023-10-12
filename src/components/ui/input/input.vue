<script setup lang="ts">
defineProps<{
  modelValue: string,
  type: 'text' | 'password',
  placeholder: string, 
}>()
</script>

<template>
  <input class="input" :value="modelValue" :type="type" :placeholder="placeholder" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<style lang="scss">
@import '@/app/styles/variables.scss';

.input {
  padding: 11px 17px 8px;

  color: $text-primary;
}
</style>
