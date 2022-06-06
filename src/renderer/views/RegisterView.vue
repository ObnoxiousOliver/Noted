<template>
  <div class="view-register">
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
import { createUserWithEmailAndPassword, getAuth, updateCurrentUser } from '@firebase/auth'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import FloatingLabelInput from '../components/FloatingLabelInput.vue'

const router = useRouter()

async function submit () {
  try {
    await createUserWithEmailAndPassword(getAuth(), email.value, password.value)

    // await updateCurrentUser(getAuth(), { displayName: displayName.value })
    router.push('/')
  } catch (err) {
    console.error(err)
  }
}

const email = ref('')
const password = ref('')
const displayName = ref('')
</script>
