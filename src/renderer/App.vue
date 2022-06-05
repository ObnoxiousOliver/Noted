<template>
  <AppLayout />
</template>

<script lang="ts" setup>
import AppLayout from './layout/appLayout/AppLayout.vue'
</script>

<style lang="scss">
*, ::before, ::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  background-color: #fff;

  user-select: none;
}
</style>
