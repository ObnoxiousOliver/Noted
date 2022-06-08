<template>
  <AuthForm>
    <template #heading>
      Sign in
    </template>

    <template #text>
      Don't have an account yet? <router-link to="/auth/register">Sign up for free!</router-link>
    </template>
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
    <SubmitButton>
      Sign in!
    </SubmitButton>
  </AuthForm>
</template>

<script lang="ts" setup>
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import FloatingLabelInput from './FloatingLabelInput.vue'
import SubmitButton from './SubmitButton.vue'
import AuthForm from '../components/AuthForm.vue'
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

defineExpose({
  submit
})

const email = ref('')
const password = ref('')
</script>
