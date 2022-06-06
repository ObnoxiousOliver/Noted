<template>
  <div class="input-field">
    <div
      :class="['input-field__floating-label', {
        'float': floating
      }]"
      aria-hidden
    >
      <div class="input-field__floating-label__mask" />
      <div class="input-field__floating-label__text">
        {{ label }}
      </div>
    </div>
    <input
      :type="type"
      class="input-field__input"
      :aria-label="label"
      @focus="focused = true"
      @blur="focused = false"
      v-model="value"
    >
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch, defineEmits, computed } from 'vue'

const props = defineProps({
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: String
})

const emit = defineEmits([
  'update:modelValue'
])

const value = ref(props.modelValue ?? '')
watch(value, (val) => { emit('update:modelValue', val) })
watch(() => props.modelValue, (val) => {
  if (props.modelValue !== undefined) {
    value.value = val
  }
})

const focused = ref(false)
const floating = computed(() => {
  return value.value.length > 0 || focused.value
})

</script>

<style lang="scss" scoped>
@use '../scss' as r;

.input-field {
  margin: 10px;
  position: relative;
  border-radius: 10px;

  @include r.light {
    background: r.$col-50;
    color: r.$col-black;
    border: r.$col-black solid 2px;
  }
  @include r.dark {
    background: r.$col-900;
    color: r.$col-white;
    border: r.$col-white solid 2px;
  }

  &__input {
    position: relative;
    border: none;
    background: none;
    color: inherit;

    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 1rem;

    height: 42px;
    padding: 0 15px 1px;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  &__floating-label {
    position: absolute;
    line-height: 42px;
    left: 15px;

    &__mask {
      position: absolute;
      inset: -4px auto auto -2px;
      height: 4px;
      width: 75%;

      transform: translateX(-1px) scaleX(0);
      transform-origin: 7px 0;
      transition: .2s;

      @include r.light { background: r.$col-50; }
      @include r.dark { background: r.$col-900; }

      .float > & {
        transform: translateX(-1px) scaleX(1);
      }
    }
    &__text {
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 1rem;

      transform-origin: 0 0;
      padding: 0 6px;
      transform: translateX(-3px);

      transition: .2s;

      .float > & {
        transform: scale(0.75) translate(-4px, -24px);
        font-weight: 600;
      }
    }
  }
}
</style>
