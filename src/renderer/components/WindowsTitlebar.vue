<template>
  <div :class="['titlebar', { 'titlebar--maximized': isMaximized }]">
    <div class="titlebar__drag" />
    <div class="titlebar__content">
      <div class="titlebar__brand">
        Noted!
      </div>

      <div class="titlebar__window-controls">
        <div
          @click="minimize()"
          class="titlebar__control"
        >
          <oi i="window-minimize" />
        </div>
        <div
          @click="toggleMaximize()"
          class="titlebar__control"
        >
          <oi
            v-if="isMaximized"
            i="window-restore"
          />
          <oi v-else
              i="window-maximize"
          />
        </div>
        <div
          @click="close()"
          class="titlebar__control titlebar__control--danger"
        >
          <oi i="window-close" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from '@vue/runtime-core'

declare const global: any

const isMaximized = ref(false)

const electron = global?.electron

onMounted(() => {
  electron.window.isMaximized((val: boolean) => { isMaximized.value = val })
})

function close () {
  electron.window.close()
}
function toggleMaximize () {
  if (isMaximized.value) global.electron.window.unmaximize()
  else electron.window.maximize()
}
function minimize () {
  electron.window.minimize()
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '../scss' as r;

$titlebar-height: 32px;

.titlebar {
  flex: 0 0 $titlebar-height;
  position: relative;
  z-index: 9999;

  @include r.light {
    background: r.$col-white;
    color: r.$col-black;
  }
  @include r.dark {
    background: r.$col-800;
    color: r.$col-white;
  }

  height: $titlebar-height;
  width: 100vw;

  display: flex;
  flex-flow: row-reverse nowrap;

  &--maximized {
    .titlebar__drag {
      inset: 0;
    }
  }

  &__drag {
    position: absolute;
    inset: 4px 4px 0 4px;
    -webkit-app-region: drag;
  }

  &__content {
    position: absolute;
    inset: 0;
  }

  &__brand {
    position: absolute;
    inset: 0 auto 0 0;
    padding: 0 15px;
    line-height: $titlebar-height;

    font-family: r.$type-brand;
    font-size: 1.3rem;
    color: r.$col-accent;
    transform: translateY(5%) rotate(1deg);
  }

  &__controls {
    display: flex;
    align-items: center;
    padding-right: 10px;

    .popper-target {
      height: 100%;
    }

    & > * {
      -webkit-app-region: no-drag;
    }
  }

  &__window-controls {
    position: absolute;
    inset: 0 0 0 auto;
    display: flex;
  }

  &__control {
    @include r.buttonReset;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    width: 50px;
    transition: background .1s, color .1s;
    -webkit-app-region: no-drag;

    &:hover:not(&--danger) {
      @include r.light { background: r.$col-100; }
      @include r.dark { background: r.$col-700; }

      &:active {
        @include r.light { background: r.$col-200; }
        @include r.dark { background: r.$col-600; }
      }
    }

    &--danger {
      &:hover {
        background: r.$col-red;
        color: r.$col-white;

        &:active {
          background: color.adjust(r.$col-red, $lightness: 10%);
        }
      }
    }
  }
}
</style>
