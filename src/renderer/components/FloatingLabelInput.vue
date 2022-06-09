<template>
  <div
    :class="['input-field', {
      'input-field--focused': focused
    }]"
  >
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
      v-bind="$attrs"
    >

    <transition name="input-field__msg">
      <div
        v-if="msg"
        class="input-field__msg"
      >
        {{ msg }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'

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

const msg = ref(null)
function showMessage (msg: string) {
  msg.value = msg
}

defineExpose(showMessage)
</script>

<style lang="scss" scoped>
@use '../scss' as r;

.input-field {
  position: relative;
  border-radius: 10px;

  transition: border-color .2s;

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

  &--focused {
    border-color: r.$col-accent !important;

    .input-field__floating-label__text {
      color: r.$col-accent;
    }
  }

  &__input {
    position: relative;
    border: none;
    background: none;
    color: inherit;

    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 1rem;

    height: 38px;
    padding: 0 15px 1px;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  &__floating-label {
    position: absolute;
    line-height: 38px;
    left: 15px;

    &__mask {
      position: absolute;
      inset: -3px auto auto -2px;
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
        transform: scale(0.75) translate(-4px, -20px);
        font-weight: 600;
      }
    }
  }

  &__msg {
    position: absolute;
    left: 18px;
    bottom: -1.5rem;

    color: r.$col-red;
    font-size: .75rem;
    font-weight: 600;

    &-enter-active, &-leave-active {
      transition: .2s;
    }
    &-enter-from, &-leave-to {
      opacity: 0;
      transform: translateY(-1rem);
    }
  }
}
</style>
