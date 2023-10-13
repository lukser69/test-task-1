<script setup lang="ts">
defineProps<{
  modelValue: string,
  type: 'text' | 'password',
  placeholder?: string, 
}>()

defineEmits<{
  (e: 'update:modelValue', value: string ): void
}>()

const getEventValue = (event: Event) => (event.target as HTMLInputElement).value
</script>

<template>
  <input class="input" :value="modelValue" :type="type" :placeholder="placeholder" @input="$emit('update:modelValue', getEventValue($event))" />
</template>

<style lang="scss">
@import '@/app/styles/variables.scss';

.input {
  padding: 11px 17px 8px;
  border: none;

  font-size: 12px;
  font-weight: 400;
  color: $text-primary;

  &:focus {
    outline: none;
  }
}
</style>
