<template>
  <div class="o-auth-options">
    <div class="o-auth-options__divider">
      <span>or</span>
    </div>
    <div class="o-auth-options__container">
      <OAuthButton><GoogleIconSvg /></OAuthButton>
      <OAuthButton><TwitterIconSvg /></OAuthButton>
      <OAuthButton><GithubIconSvg /></OAuthButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import OAuthButton from './OAuthButton.vue'
import GoogleIconSvg from './svg/GoogleIconSvg.vue'
import TwitterIconSvg from './svg/TwitterIconSvg.vue'
import GithubIconSvg from './svg/GithubIconSvg.vue'
</script>

<style lang="scss" scoped>
@use '../scss' as r;

.o-auth-options {
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;

  &__divider {
    position: relative;
    background: currentColor;
    height: 2px;

    text-align: center;
    font-weight: 600;

    span {
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 0 10px;

      @include r.light { background: r.$col-50; }
      @include r.dark { background: r.$col-900; }
    }
  }

  &__container {
    display: flex;
    gap: 30px;
    justify-content: center;
  }
}
</style>
