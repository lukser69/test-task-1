<template>
  <div class="error">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import '@/app/styles/variables.scss';
.error {
  padding: 6px 12px 0 12px;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.221px;
  color: $error;
}
</style>
