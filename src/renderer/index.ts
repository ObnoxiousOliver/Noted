import { createApp } from 'vue'

import './firebase'

import App from './App.vue'
import ObnixIcons from './components/ObnixIcons.vue'

import mq from './utils/mq'
import router from './router'
import { config } from './utils/config'

// Create App
createApp(App)
  .use(mq)
  .use(router)
  .component('oi', ObnixIcons)
  .mount('#app')

// Handel Color Theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)
config.watch('theme', updateTheme)

updateTheme()
function updateTheme () {
  switch (config.get('theme')) {
    case 'dark': {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      break
    }
    case 'light': {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      break
    }
    default: {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.add(prefersDark ? 'dark' : 'light')
      document.documentElement.classList.remove(prefersDark ? 'light' : 'dark')
    }
  }
}
