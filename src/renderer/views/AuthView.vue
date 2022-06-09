<template>
  <div class="auth-view">
    <div class="auth-view__background">
      <AuthPageShape01
        class="auth-view__shape01"
        v-if="$mq !== 'phone'"
      />
      <AuthPageShape02
        class="auth-view__shape02"
        v-if="$mq === 'phone'"
      />
      <AuthPageShape03 class="auth-view__shape03" />
    </div>

    <div class="auth-view__scroll-container">
      <div>
        <div class="auth-view__greeting-msg">
          Welcome back!
        </div>
        <RegisterView
          class="auth-view__form"
          v-if="route.params.action === 'register'"
        />
        <LoginForm
          class="auth-view__form"
          v-else
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { onMounted } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'

import AuthPageShape01 from '../components/svg/AuthPageShape01.vue'
import AuthPageShape02 from '../components/svg/AuthPageShape02.vue'
import AuthPageShape03 from '../components/svg/AuthPageShape03.vue'

import LoginForm from '../components/LoginForm.vue'
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

<style lang="scss" scoped>
@use '../scss' as r;

.auth-view {
  &__background {
    position: absolute;
    inset: 0;

    @include r.light { color: r.$col-200; }
    @include r.dark { color: r.$col-600; }
  }

  &__scroll-container {
    position: relative;
    height: 100%;
    display: grid;
    place-items: center;
    overflow: auto;
  }

  &__greeting-msg {
    font-family: r.$type-brand;
    font-size: clamp(3rem, 10vw, 5rem);
    color: r.$col-accent;
    text-align: center;
    line-height: 1;

    margin-bottom: 40px;
  }

  &__form {
    position: relative;
    margin: auto;
    padding: 20px;
  }

  &__shape01 {
    position: absolute;
    top: 10%;
    left: 10%;
    width: min(13vh, 13vw);
    height: auto;
  }

  &__shape02 {
    position: absolute;
    top: 7%;
    left: 3%;
    width: 70px;
    height: auto;
  }

  &__shape03 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: clamp(70vh, 150vh, 80%);
    height: auto;
  }
}
</style>
