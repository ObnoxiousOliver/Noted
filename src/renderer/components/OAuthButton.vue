<template>
  <button
    type="button"
    class="o-auth-btn"
  >
    <div>
      <slot />
    </div>
  </button>
</template>

<style lang="scss" scoped>
@use '../scss' as r;

.o-auth-btn {
  @include r.buttonReset;

  position: relative;

  border-radius: 25px;
  padding: 10px;
  margin: -10px;

  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: none;
    box-shadow: r.$col-accent 0 0 0 2px inset, r.$col-accent-a-30 0 0 0 5px;
  }

  & :deep(svg) {
    display: block;
    height: 100%;
  }

  & > div {
    transition: .15s;
  }

  &:hover, &:focus-visible {
    &:active > div {
      transform: scale(0.9);
    }
  }
}
</style>
