import { App, Ref, ref } from 'vue'

let breakpoint: Ref<string>

export default {
  install (app: App) {
    const breakpoints: { [x: string]: number } = {
      phone: 756,
      tablet: 1024,
      desktop: Infinity
    }

    breakpoint = ref('desktop')

    window.addEventListener('resize', updateBreakpoint)
    updateBreakpoint()

    function updateBreakpoint () {
      const p = Object.keys(breakpoints).find(x => breakpoints[x] > window.innerWidth)

      if (p) {
        breakpoint.value = p
      }
    }

    app.mixin({
      computed: {
        $mq: () => breakpoint.value
      }
    })
  }
}

export function useMq () {
  return breakpoint
}
