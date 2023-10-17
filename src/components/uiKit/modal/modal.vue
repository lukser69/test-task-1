<script setup lang="ts">
defineEmits(['onCloseModal'])
</script>

<template>
  <Teleport to="body">
    <div class="fade" @click="$emit('onCloseModal')">
      <div class="modal" @click.stop>
          <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
@import '@/app/styles/variables.scss';

.fade {
  z-index: $fade-z-index;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: $fade-bg;
}

.modal {
  position: relative;
  z-index: $modal-z-index;
  background-color: $bg-light;
  min-height: 200px;
  padding: 63px 44px 42px;
  overflow: hidden;
}
</style>
