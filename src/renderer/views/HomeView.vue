<template>
  <div>
    Home

    <br>

    - Show all Sheets

    <br>

    <button @click="logout">Log Out</button>
  </div>
</template>

<script lang="ts" setup>
import { getAuth, signOut } from '@firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

function logout () {
  signOut(getAuth()).then(() => {
    router.push('/login')
  })
}
</script>
