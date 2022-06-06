<template>
  <RegisterView v-if="route.params.action === 'register'" />
  <LoginView v-else />
</template>

<script lang="ts" setup>
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { onMounted } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import LoginView from './LoginView.vue'
import RegisterView from './RegisterView.vue'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      router.push('/')
      unsubscribe()
    }
  })
})
</script>
