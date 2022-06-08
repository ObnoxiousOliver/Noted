<template>
  <div class="app-layout">
    <router-view class="app-layout__router" />
    <WindowsTitlebar class="app-layout__titlebar" />
  </div>
</template>

<script lang="ts" setup>
import WindowsTitlebar from '@/renderer/components/WindowsTitlebar.vue'
</script>

<style lang="scss" scoped>
.app-layout {
  position: fixed;
  inset: 0;

  &__titlebar {
    position: absolute;
    inset: 0 0 auto;
  }

  &__router {
    position: absolute;
    inset: 32px 0 0;
  }
}
</style>
