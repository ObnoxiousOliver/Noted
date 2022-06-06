<template>
  <LoginView />
  <RegisterView />
</template>

<script lang="ts" setup>
import { getAuth } from '@firebase/auth'
import { onBeforeMount } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import LoginView from './LoginView.vue'
import RegisterView from './RegisterView.vue'

onBeforeMount(() => {
  if (getAuth().currentUser) {
    useRouter().push('/')
  }
})
</script>
