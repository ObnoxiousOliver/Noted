<template>
  <svg
    v-if="icon"
    :viewBox="[0, 0, icon.w, icon.h].join(' ')"
    :width="icon.w / 16 + 'em'"
    :height="icon.h / 16 + 'em'"
  >
    <path
      :d="icon.d"
      fill="currentColor"
    />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import obnixIcons from '../assets/icons/obnixIcons'

const props = defineProps({
  i: String
})

const icon = computed(() => props.i && obnixIcons[props.i])
</script>

<style lang="scss" scoped>
svg {
  display: inline;
}
</style>
