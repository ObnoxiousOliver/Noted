<template>
  <form
    class="auth-form"
    @submit.prevent="emit('submit')"
  >
    <h2 class="auth-form__heading"><slot name="heading" /></h2>
    <p class="auth-form__text"><slot name="text" /></p>

    <div class="auth-form__inputs">
      <slot />
    </div>
  </form>
</template>

<script lang="ts" setup>
const emit = defineEmits(['submit'])
</script>

<style lang="scss" scoped>
.auth-form {
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
  align-items: center;

  &__heading {
    font-weight: 700;
    font-size: 2rem;
    text-transform: uppercase;
  }

  &__text {
    font-weight: 500;
    text-align: center;
  }

  &__inputs {
    display: flex;
    flex-flow: column nowrap;
    gap: 20px;
    align-items: stretch;

    width: min(100%, 300px);
  }
}
</style>
