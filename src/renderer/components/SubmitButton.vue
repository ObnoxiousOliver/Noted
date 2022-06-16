<template>
  <button
    class="submit-btn"
    type="submit"
  >
    <div class="submit-btn__content">
      <span>
        <slot />
      </span>
      <oi
        i="arrow-right"
        class="submit-btn__arrow"
      />

      <div class="submit-btn__content submit-btn__content-copy">
        <span>
          <slot />
        </span>
        <oi
          i="arrow-right"
          class="submit-btn__arrow"
        />
      </div>
    </div>
  </button>
</template>

<style lang="scss" scoped>
@use '../scss' as r;

.submit-btn {
  @include r.buttonReset;

  position: relative;

  line-height: 38px;
  border-radius: 10px;

  white-space: nowrap;
  overflow: hidden;

  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  transition:
    border-color .1s,
    box-shadow .15s;

  @include r.light {
    background: r.$col-black;
    color: r.$col-white;
    border: r.$col-black solid 2px;
  }
  @include r.dark {
    background: r.$col-white;
    color: r.$col-black;
    border: r.$col-white solid 2px;
  }

  &:hover:not(:disabled), &:focus-visible {
    border-color: r.$col-accent !important;
    transition: border-color .5s, box-shadow .15s;

    .submit-btn {
      &__content-copy {
        clip-path: circle(100% at 50% 50%);
        opacity: 1;

        transition: clip-path .6s cubic-bezier(0.38, 0.9, 0.49, 0.51), opacity 0s;
      }

      &__arrow {
        transform: translateX(10px);
      }
    }

    &:active {
      transition: border-color .2s, box-shadow .15s;

      @include r.light {
        border-color: r.$col-black !important;
      }
      @include r.dark {
        border-color: r.$col-white !important;
      }

      .submit-btn__content {
        transform: scale(0.99);
      }
    }
  }

  &:focus-visible {
    outline: none;
    box-shadow: r.$col-accent-a-30 0 0 0 5px;
  }

  &__arrow {
    transition: transform .2s;
  }

  &__content {
    padding: 0 30px;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    transition: .2s;
  }

  &__content-copy {
    position: absolute;
    inset: -1px;
    color: r.$col-accent;
    border-radius: 6px;

    clip-path: circle(0 at 50% 50%);
    opacity: 0;

    transition: .2s, opacity 0s .2s;

    @include r.dark {
      background-color: r.$col-900;
    }
    @include r.light {
      background-color: r.$col-50;
    }
  }
}
</style>
