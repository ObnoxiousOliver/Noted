<template>
  <div class="view-login">
    <router-link to="/auth/register">
      Register
    </router-link>

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
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import FloatingLabelInput from '../components/FloatingLabelInput.vue'
import { logSignInAs } from '../firebase/logging'
import debug, { Log } from '../utils/debug'

const router = useRouter()

function submit () {
  signInWithEmailAndPassword(getAuth(), email.value, password.value).then(() => {
    logSignInAs(email.value)
    router.push('/')
  }).catch((err) => {
    debug.error(Log.auth, err)
  })
}

const email = ref('')
const password = ref('')
</script>
