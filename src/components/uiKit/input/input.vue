<script setup lang="ts">
defineProps<{
  modelValue: string,
  type: 'text' | 'password',
  placeholder?: string,
  error?: boolean,
}>()

defineEmits<{
  (e: 'update:modelValue', value: string ): void
  (e: 'input'): void
  (e: 'blur'): void
}>()

const getEventValue = (event: Event) => (event.target as HTMLInputElement).value;
</script>

<template>
  <input
    class="input"
    :class="{ 'input-error': error}"
    :value="modelValue" :type="type"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', getEventValue($event)), $emit('input')"
    @blur="$emit('blur')"
  />
</template>

<style lang="scss">
@import '@/app/styles/variables.scss';

.input {
  padding: 11px 17px 8px;
  border: none;

  color: $text-primary;

  &:focus {
    outline: none;
  }
}

.input-error {
  outline: 1px solid $error;
  color: $error;
}
</style>
