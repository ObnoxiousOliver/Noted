<template>
  <div class="view-register">
    <router-link to="/auth/login">
      Login
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
      <FloatingLabelInput
        :label="'Display Name (Optional)'"
        type="text"
        v-model="displayName"
      />
      <button type="submit">
        Sign up >
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import FloatingLabelInput from '../components/FloatingLabelInput.vue'
import { createAccountWithEmailPasswordAndName } from '../firebase/auth'

const router = useRouter()

async function submit () {
  createAccountWithEmailPasswordAndName(email.value, password.value, displayName.value)
}

const email = ref('')
const password = ref('')
const displayName = ref('')
</script>
