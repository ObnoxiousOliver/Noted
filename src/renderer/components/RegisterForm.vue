<template>
  <auth-form @submit="submit">
    <template #heading>
      Create Account
    </template>
    <template #text>
      Already have an account? <router-link to="/auth/login">Sign in!</router-link>
    </template>

    <FloatingLabelInput
      :label="'Display Name (Optional)'"
      type="text"
      autocomplete="username"
      v-model="displayName"
    />
    <FloatingLabelInput
      :label="'E-Mail'"
      type="email"
      autocomplete="email"
      v-model="email"
    />
    <FloatingLabelInput
      :label="'Password'"
      type="password"
      v-model="password"
    />
    <FloatingLabelInput
      :label="'Confirm Password'"
      type="password"
      v-model="confirmPassword"
    />
    <SubmitButton>
      Create Account!
    </SubmitButton>
  </auth-form>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import FloatingLabelInput from './FloatingLabelInput.vue'
import SubmitButton from './SubmitButton.vue'
import AuthForm from './AuthForm.vue'
import { createAccountWithEmailPasswordAndName } from '../firebase/auth'

async function submit () {
  createAccountWithEmailPasswordAndName(email.value, password.value, displayName.value)
}

const displayName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
</script>
