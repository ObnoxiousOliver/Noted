<template>
  <AppLayout />
</template>

<script lang="ts" setup>
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { updateUserState } from './firebase/auth'
import AppLayout from './layout/appLayout/AppLayout.vue'

// Handle Auth
const auth = getAuth()

onMounted(() => {
  var reloadIntervalId: number | undefined

  // Listen for auth state changes
  var unsubscribeUserDocumentChanges: () => void
  var unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    updateUserState(user)
    if (user) {
      if (reloadIntervalId) {
        clearInterval(reloadIntervalId)
      }

      // Create reload interval
      reloadIntervalId = setInterval(() => reloadUser(), 60 * 1000)

      // Subscribe from user document changes
      unsubscribeUserDocumentChanges = subscribeToUserDocumentChanges()
    } else {
      // Clear Reload Interval
      clearInterval(reloadIntervalId)
      reloadIntervalId = undefined

      // Unsubscribe from user document changes
      unsubscribeUserDocumentChanges()
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
