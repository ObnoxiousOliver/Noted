<template>
  <div :class="['app-layout', {
    'app-layout--titlebar-visible': platform === 'electron'
  }]"
  >
    <router-view class="app-layout__router" />
    <WindowsTitlebar
      v-if="platform === 'electron'"
      class="app-layout__titlebar"
    />
  </div>
</template>

<script lang="ts" setup>
import WindowsTitlebar from '@/renderer/components/WindowsTitlebar.vue'
import { platform } from '../../utils/platform'
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
    inset: 0;
  }

  &--titlebar-visible {
    .app-layout__router {
      inset: 32px 0 0;
    }
  }
}
</style>
