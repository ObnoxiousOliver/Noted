<template>
  <AppLayout />
</template>

<script lang="ts" setup>
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import { reloadUser, updateUserState } from './firebase/auth'
import AppLayout from './layout/appLayout/AppLayout.vue'

// Handle Auth
const auth = getAuth()

onMounted(() => {
  let reloadIntervalId: number | undefined

  // Listen for auth state changes
  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    updateUserState(user)
    if (user) {
      if (reloadIntervalId) {
        clearInterval(reloadIntervalId)
      }

      // Create reload interval
      reloadIntervalId = setInterval(() => reloadUser(), 60 * 1000)
    } else {
      // Clear Reload Interval
      clearInterval(reloadIntervalId)
      reloadIntervalId = undefined
    }
  })

  // Unsubscribe from auth state changes
  onBeforeUnmount(() => {
    clearInterval(reloadIntervalId)
    unsubscribeAuth()
  })
})
</script>

<style lang="scss" src="./scss/base.scss" />
