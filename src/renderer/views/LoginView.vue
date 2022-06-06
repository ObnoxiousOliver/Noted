<template>
  <div class="view-login">
    <form @submit.prevent="submit">
      <FloatingLabelInput
        :label="'E-Mail'"
        type="email"
        v-model="email"
      />
      <FloatingLabelInput
        :label="'Password'"
        type="password"
        v-model="password"
      />
      <button type="submit">
        Sign in >
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import FloatingLabelInput from '../components/FloatingLabelInput.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const electron: any

function submit () {
  electron.auth.signInWithGoogle()
}

const email = ref('')
const password = ref('')
</script>
