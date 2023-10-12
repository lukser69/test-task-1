<script setup lang="ts">
defineProps<{
  variant: 'primary' | 'secondary'
}>()
</script>

<template>
  <button class="button" :class="`button--${variant}`" @click.prevent>
    <slot />
  </button>
</template>

<style lang="scss">
@import '@/app/styles/variables.scss';

.button {
  padding: 5px 34px 9px;

  font-size: 12px;
  font-weight: 400;
  outline: none;
  cursor: pointer;

  user-select: none;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &--primary {
    background-color: $button-bg-primary;
    border: none;

    color: $text-primary;

    &:hover {
      background-color: darken($button-bg-primary, 10%);
    }
    
    &:focus {
      border: none;
    }

    &:active {
      background-color: darken($button-bg-primary, 20%);
    }
  }

  &--secondary {
    padding: 6px 20px;

    background-color: $button-bg-secondary;
    border: none;

    color: $text-primary;

    &:hover {
      background-color: darken($button-bg-secondary, 10%);
    }

    &:active {
      background-color: $button-bg-secondary;
      color: lighten($text-primary, 20%);
    }
  }
}
</style>
